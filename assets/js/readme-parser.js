/* README analysis is local, deterministic, and never executes markup. */
(() => {
  'use strict';
  const entities = value => value
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp);/gi, entity => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&nbsp;': ' ' })[entity.toLowerCase()] || entity)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Math.min(Number(code), 0x10ffff)));
  const cleanLine = line => entities(line
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[*_`~]/g, '')
    .replace(/^\s*(?:[-*+] |\d+[.)] )/, '')
    .replace(/\s+/g, ' ').trim());
  const useful = line => {
    const value = cleanLine(line);
    return value.length >= 18
      && !/^(?:https?:\/\/|npm |yarn |pnpm |pip |git clone|cd |#|\$|license|copyright|install|usage:)/i.test(value)
      && !/^\[?!?\[|^<img\b/i.test(line.trim())
      && !/shields\.io|badge|build status|download|stars|contributors/i.test(line)
      && !/^[-=\s]+$/.test(line);
  };
  const flatten = source => String(source || '')
    .replace(/<!--[^]*?-->/g, '')
    .replace(/<(script|style)[^>]*>[^]*?<\/\1>/gi, '')
    .replace(/^```[^\n]*\n[^]*?^\s*```\s*$/gm, '')
    .replace(/<h([1-6])[^>]*>/gi, (_, level) => `\n${'#'.repeat(Number(level))} `)
    .replace(/<\s*br\s*\/?\s*>/gi, '\n')
    .replace(/<\/(?:p|div|li|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\r\n?/g, '\n');
  const firstSection = (sections, pattern) => sections.find(section => pattern.test(section.heading));
  const sectionGroup = (sections, section) => {
    const start = sections.indexOf(section);
    const group = [section];
    for (let index = start + 1; index < sections.length && sections[index].level > section.level; index++) group.push(sections[index]);
    return group;
  };
  const sectionText = (sections, pattern, max = 1200, predicate = useful) => {
    for (const section of sections.filter(item => pattern.test(item.heading))) {
      const content = sectionGroup(sections, section).flatMap(item => item.lines).filter(predicate).map(cleanLine).join(' ').slice(0, max);
      if (content) return content;
    }
    return '';
  };
  function analyze(markdown, repo = {}) {
    const packageTitle = String(markdown || '').match(/^(?:title|name)\s*:\s*["']?([^\n"']+)/im)?.[1]?.trim() || '';
    const source = flatten(markdown);
    const lines = source.split('\n');
    const headings = [];
    const sections = [{ heading: '', title: '', level: 0, lines: [] }];
    for (const line of lines) {
      const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
      if (heading) {
        const value = cleanLine(heading[2]);
        if (value) headings.push({ level: heading[1].length, value });
        sections.push({ heading: value.toLowerCase(), title: value, level: heading[1].length, lines: [] });
      } else sections[sections.length - 1].lines.push(line);
    }
    const title = headings.find(item => item.level === 1)?.value || String(repo.name || '').trim() || packageTitle || headings[0]?.value || '';
    const introSections = sections.filter(section => section.level <= 1 || /^(about|overview|introduction|description|purpose|background|motivation)/i.test(section.heading));
    const paragraphs = introSections.flatMap(section => section.lines.join('\n').split(/\n\s*\n/));
    const description = cleanLine(paragraphs.find(item => useful(item)) || '') || String(repo.description || '').trim();
    const titleSection = sections.find(section => section.level === 1) || sections[0];
    const introductoryParagraphs = titleSection.lines.join('\n').split(/\n\s*\n/).filter(useful);
    // Prefer the paragraph following the card description when the README has one.
    const introduction = cleanLine(introductoryParagraphs[1] || introductoryParagraphs[0] || '').slice(0, 1200);
    const featureSection = firstSection(sections, /^(key )?(features|functionality|capabilities)$/i);
    const features = featureSection
      ? sectionGroup(sections, featureSection).flatMap((part, index) => {
        const bullets = part.lines.filter(line => /^\s*(?:[-*+] |\d+[.)] )/.test(line) && useful(line)).map(cleanLine);
        if (index === 0) return bullets;
        if (bullets.length) return bullets.map(item => `${part.title}: ${item}`);
        const summary = part.lines.find(useful);
        return summary ? [`${part.title}: ${cleanLine(summary)}`] : [];
      }).slice(0, 6)
      : [];
    const techSection = firstSection(sections, /^(tech stack|technologies|built with|frameworks?|tools?|dependencies)$/i);
    const explicitTech = techSection
      ? sectionGroup(sections, techSection).flatMap(part => part.lines).flatMap(line => cleanLine(line).split(/[,·|]/)).map(item => item.trim()).filter(item => item && item.length <= 50 && !/^(?:npm|yarn|pip|install)\b/i.test(item)).slice(0, 20)
      : [];
    const topicTech = (repo.topics || []).filter(topic => /^(?:html|css|javascript|typescript|python|sql|react|vue|nodejs|node-js|django|postgresql|redis|docker|playwright|pwa|firebase|java|csharp|go|rust)$/i.test(topic));
    const technologies = [];
    const seenTechnologies = new Set();
    for (const item of [repo.language, ...explicitTech, ...topicTech].filter(Boolean)) {
      const candidate = String(item).trim();
      if (!seenTechnologies.has(candidate.toLowerCase())) {
        technologies.push(candidate);
        seenTechnologies.add(candidate.toLowerCase());
      }
    }
    technologies.length = Math.min(technologies.length, 20);
    const roleSection = firstSection(sections, /^(?:my )?(?:role|contribution)$/i);
    const explicitRole = roleSection && sectionGroup(sections, roleSection).flatMap(part => part.lines).find(useful);
    const role = explicitRole ? cleanLine(explicitRole).slice(0, 300) : '';
    const topics = (repo.topics || []).map(item => String(item).toLowerCase());
    const typeText = sections.map(section => section.heading).join(' ') + ' ' + topics.join(' ');
    const type = /\b(?:coursework|academic|university|school)\b/i.test(typeText) ? 'Academic'
      : /\b(?:open source|open-source|opensource)\b/i.test(typeText) ? 'Open Source'
      : /\b(?:internship)\b/i.test(typeText) ? 'Internship'
      : /\b(?:personal project|personal)\b/i.test(typeText) ? 'Personal'
      : 'Other';
    // Case-study suggestions come only from explicitly named README sections.
    // Missing sections stay blank; introductory text and feature lists are not inferred into outcomes.
    const caseStudy = {
      overview: sectionText(sections, /^(?:overview|background|about|introduction|project overview|description)$/i),
      problem: sectionText(sections, /^(?:problem|problems|problem statement|motivation|challenge|challenges)$/i),
      investigation: sectionText(sections, /^(?:investigation|analysis|research|process)$/i),
      solution: sectionText(sections, /^(?:solution|approach|implementation|architecture|design|methodology)$/i),
      result: sectionText(sections, /^(?:result|results|outcome|achievements|impact)$/i),
      learned: sectionText(sections, /^(?:what i learned|lessons learned|learning|reflection)$/i)
    };
    return {
      title: title.slice(0, 90),
      description: description.slice(0, 240),
      background: sectionText(sections, /^(?:about|overview|background|problem|motivation|purpose)$/i, 1200),
      features,
      role,
      technologies,
      type,
      setup: sectionText(sections, /^(?:installation|setup|usage|getting started)$/i, 1200, line => !!cleanLine(line)),
      caseStudy,
      overviewSuggestion: caseStudy.overview ? '' : introduction
    };
  }
  function decodePayload(payload) {
    if (typeof payload === 'string') return payload;
    if (!payload || typeof payload !== 'object') throw new Error('malformed');
    if (payload.encoding === 'base64' && typeof payload.content === 'string') {
      const binary = atob(payload.content.replace(/\s/g, ''));
      return new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0)));
    }
    if (typeof payload.content === 'string' && (!payload.encoding || payload.encoding === 'utf-8')) return payload.content;
    throw new Error('malformed');
  }
  window.README_PARSER = { analyze, decodePayload };
})();
