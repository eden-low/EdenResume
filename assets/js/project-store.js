/* Browser-local project choices. data.js remains the published baseline. */
(() => {
  'use strict';
  const KEY = 'portfolio-project-data';
  const VERSION = 1;
  const empty = () => ({ version: VERSION, overrides: {}, imported: [], contentOverrides: {} });
  const text = (value, max = 5000) => typeof value === 'string' ? value.trim().slice(0, max) : '';
  const list = (value, max = 24, itemMax = 100) => Array.isArray(value) ? value.filter(item => typeof item === 'string').map(item => text(item, itemMax)).filter(Boolean).slice(0, max) : [];
  const CASE_FIELDS = ['overview', 'problem', 'investigation', 'solution', 'result', 'learned'];
  const caseText = value => value && typeof value === 'object' && !Array.isArray(value)
    ? { en: text(value.en, 1800), zh: text(value.zh, 1800) }
    : text(value, 1800);
  const hasText = value => typeof value === 'string' ? !!value.trim() : !!(value?.en?.trim() || value?.zh?.trim());
  const localizedText = (value, max = 1800) => value && typeof value === 'object' && !Array.isArray(value)
    ? { en: text(value.en, max), zh: text(value.zh, max) } : { en: text(value, max), zh: '' };
  const localizedBullets = value => ({
    en: list(value?.en, 3, 300), zh: list(value?.zh, 3, 300)
  });
  const caseStudyOf = project => Object.fromEntries(CASE_FIELDS.map(field => {
    const nestedExists = Object.prototype.hasOwnProperty.call(project.caseStudy || {}, field);
    const nested = caseText(project.caseStudy?.[field]);
    const legacy = caseText(field === 'overview' ? project.overview || (!project.caseStudy ? project.background : '') : project[field]);
    return [field, nestedExists ? nested : legacy];
  }));
  const substantive = (value, minimum) => {
    const values = typeof value === 'string' ? [value] : [value?.en, value?.zh];
    return values.some(item => typeof item === 'string'
      && Array.from(item.trim()).reduce((length, char) => length + (/[\u3400-\u9fff]/.test(char) ? 2 : 1), 0) >= minimum
      && !/^(?:tbd|todo|n\/?a|coming soon|placeholder)$/i.test(item.trim()));
  };
  const caseStudyReady = project => {
    if (!project?.id || !/^[a-z0-9][a-z0-9_-]*$/i.test(project.slug || '') || !project.name) return false;
    const study = caseStudyOf(project);
    return substantive(study.overview, 20) && CASE_FIELDS.slice(1).some(field => substantive(study[field], 12));
  };
  const resumeReadiness = project => {
    const bullets = project?.resumeBullets || {};
    const fields = {
      title: hasText(project?.title || project?.name),
      description: hasText(project?.description || project?.short),
      role: hasText(project?.role),
      technologies: Array.isArray(project?.technologies) && project.technologies.some(item => typeof item === 'string' && !!item.trim()),
      resumeBullets: (bullets.en || []).some(item => typeof item === 'string' && !!item.trim()) || (bullets.zh || []).some(item => typeof item === 'string' && !!item.trim()),
      outcome: hasText(caseStudyOf(project || {}).result)
    };
    return { complete: Object.values(fields).filter(Boolean).length, total: 6, missing: Object.keys(fields).filter(key => !fields[key]) };
  };
  const cvReadiness = project => {
    const study = caseStudyOf(project || {});
    const highlights = window.RESUME_DATA?.CV?.projectHighlights?.[project?.slug];
    const hasHighlights = [highlights?.en, highlights?.zh, project?.resumeBullets?.en, project?.resumeBullets?.zh]
      .some(items => Array.isArray(items) && items.some(item => typeof item === 'string' && !!item.trim()));
    const fields = {
      title: hasText(project?.title || project?.name),
      description: hasText(project?.description || project?.short),
      role: hasText(project?.role),
      technologies: Array.isArray(project?.technologies) && project.technologies.some(item => typeof item === 'string' && !!item.trim()),
      cvDetails: hasText(project?.cvResponsibilities) || (Array.isArray(project?.features) && project.features.some(item => typeof item === 'string' && !!item.trim())) || hasHighlights,
      outcome: hasText(study.result)
    };
    return { complete: Object.values(fields).filter(Boolean).length, total: 6, missing: Object.keys(fields).filter(key => !fields[key]) };
  };
  const priority = value => Number.isInteger(Number(value)) && Number(value) > 0 && Number(value) <= 99 ? Number(value) : null;
  const url = value => {
    try {
      const parsed = new URL(value);
      return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : '';
    } catch { return ''; }
  };
  function read() {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (parsed?.version !== VERSION || !Array.isArray(parsed.imported) || !parsed.overrides || typeof parsed.overrides !== 'object' || Array.isArray(parsed.overrides)) return empty();
      return { ...parsed, contentOverrides: parsed.contentOverrides && typeof parsed.contentOverrides === 'object' && !Array.isArray(parsed.contentOverrides) ? parsed.contentOverrides : {} };
    } catch { return empty(); }
  }
  function write(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
    catch { return false; }
  }
  function selection(input) {
    return {
      includeInPortfolio: input.includeInPortfolio === true,
      includeInResume: input.includeInResume === true,
      includeInCV: input.includeInCV === true,
      resumePriority: priority(input.resumePriority),
      cvPriority: priority(input.cvPriority)
    };
  }
  function imported(input) {
    const title = text(input.title || input.name, 90);
    const description = text(input.description || input.short, 500);
    const background = text(input.background || input.overview, 1800);
    const type = text(input.type || input.category, 60) || 'Other';
    const id = text(input.id, 100);
    const caseStudy = caseStudyOf(input);
    return {
      id, slug: id, title, name: title, description, short: description,
      background, overview: hasText(caseStudy.overview) ? caseStudy.overview : '',
      problem: caseStudy.problem, investigation: caseStudy.investigation, solution: caseStudy.solution,
      result: caseStudy.result, learned: caseStudy.learned, caseStudy,
      features: list(input.features, 8, 240),
      role: text(input.role, 300), technologies: list(input.technologies, 24, 40),
      resumeBullets: localizedBullets(input.resumeBullets),
      cvResponsibilities: localizedText(input.cvResponsibilities),
      cvTechnicalDecisions: localizedText(input.cvTechnicalDecisions),
      type, category: type, githubUrl: url(input.githubUrl), liveUrl: url(input.liveUrl),
      source: ['github', 'manual', 'company', 'legacy'].includes(input.source) ? input.source : 'manual',
      visibility: 'local', setup: text(input.setup, 1500), readme: text(input.readme, 100000), readmeAnalyzed: input.readmeAnalyzed === true,
      status: input.status === 'archived' ? 'archived' : 'active',
      ...selection(input)
    };
  }
  function getProjects(baseline) {
    const state = read();
    const originals = baseline.map(project => {
      const override = state.overrides[project.id];
      const normalized = { ...project, title: project.name, description: project.short, background: project.overview,
        type: project.category, features: project.features || [], readme: project.readme || '', readmeAnalyzed: false,
        caseStudy: caseStudyOf(project), resumeBullets: localizedBullets(project.resumeBullets),
        cvResponsibilities: localizedText(project.cvResponsibilities), cvTechnicalDecisions: localizedText(project.cvTechnicalDecisions) };
      const content = state.contentOverrides[project.id];
      const edited = content && typeof content === 'object' ? { ...normalized, ...imported({ ...normalized, ...content, id: project.id }), visibility: 'local', isEditedBaseline: true } : normalized;
      if (edited.isEditedBaseline) {
        const basics = content.localizedBasics || {};
        for (const [field, aliases] of Object.entries({ name: ['title'], short: ['description'], role: [] })) {
          if (basics[field]) {
            edited[field] = localizedText(basics[field]);
            for (const alias of aliases) edited[alias] = edited[field];
          }
        }
        if (content.type === project.category?.en) edited.category = project.category;
        if (edited.status !== project.status) delete edited.statusLabel;
      }
      return override && typeof override === 'object' ? { ...edited, ...selection(override) } : edited;
    });
    const ids = new Set(originals.map(project => project.id));
    for (const raw of state.imported.slice(0, 100)) {
      const project = imported(raw);
      if (project.id && project.title && !ids.has(project.id)) {
        originals.push(project);
        ids.add(project.id);
      }
    }
    return originals;
  }
  function saveDraft(input, baseline = []) {
    const state = read();
    const project = imported(input);
    if (!project.id || !project.title) return false;
    if (baseline.some(item => item.id === project.id)) {
      state.contentOverrides[project.id] = { ...project, localizedBasics: input.localizedBasics || {} };
      state.overrides[project.id] = selection(input);
      return write(state);
    }
    const index = state.imported.findIndex(item => item.id === project.id);
    if (index < 0 && state.imported.length >= 100) return false;
    if (index < 0) state.imported.push(project);
    else state.imported[index] = project;
    return write(state);
  }
  function updateSelection(id, input, baseline) {
    const state = read();
    if (baseline.some(item => item.id === id)) state.overrides[id] = selection(input);
    else {
      const index = state.imported.findIndex(item => item.id === id);
      if (index < 0) return false;
      state.imported[index] = { ...state.imported[index], ...selection(input) };
    }
    return write(state);
  }
  function removeImported(id) {
    const state = read();
    state.imported = state.imported.filter(project => project.id !== id);
    return write(state);
  }
  function removeContentOverride(id) {
    const state = read();
    if (!Object.prototype.hasOwnProperty.call(state.contentOverrides, id)) return false;
    delete state.contentOverrides[id];
    return write(state);
  }
  function reset() {
    try { localStorage.removeItem(KEY); return true; }
    catch { return false; }
  }
  window.PROJECT_STORE = { KEY, read, getProjects, saveDraft, updateSelection, removeImported, removeContentOverride, reset, priority, url, caseStudyOf, caseStudyReady, resumeReadiness, cvReadiness };
})();
