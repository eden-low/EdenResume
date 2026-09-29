(() => {
  'use strict';
  const data = window.RESUME_DATA;
  const page = document.body.dataset.page;
  const ui = {
    en: {
      home: 'Home', projects: 'Projects', resume: 'Resume', contact: 'Contact', menu: 'Open navigation menu',
      intro: 'Personal portfolio', viewProjects: 'View Projects', viewResume: 'View Resume', github: 'GitHub',
      about: 'About / Snapshot', featured: 'Featured Projects', allProjects: 'All Projects', experience: 'Experience',
      leadership: 'Leadership', skills: 'Skills', education: 'Education', languages: 'Languages',
      programming: 'Programming', platforms: 'Platforms', tools: 'Tools', soft: 'Soft Skills',
      contactHeading: 'Let’s connect', contactCopy: 'Open to internship and graduate opportunities.',
      emailMe: 'Email me', seeAll: 'See all projects', caseStudy: 'View Case Study',
      selectedWork: 'Selected work', projectIntro: 'Three projects across independent development, coursework, and internship work.',
      profile: 'Profile', relevantCourses: 'Relevant coursework', print: 'Print / Save PDF',
      curriculum: 'Curriculum vitae', cgpa: 'CGPA', phone: 'Phone',
      overview: 'Overview', problem: 'Problem', role: 'Role', investigation: 'Investigation',
      solution: 'Solution', result: 'Result', learned: 'What I Learned', technology: 'Technology / Skills',
      previous: 'Previous Project', next: 'Next Project', backProjects: 'All Projects',
      notFound: 'Project not found', notFoundCopy: 'This project link does not match a published case study.',
      footer: 'Portfolio & resume'
    },
    zh: {
      home: '首页', projects: '项目', resume: '履历', contact: '联系', menu: '打开导航菜单',
      intro: '个人作品集', viewProjects: '查看项目', viewResume: '查看履历', github: 'GitHub',
      about: '关于 / 简介', featured: '精选项目', allProjects: '所有项目', experience: '工作经历',
      leadership: '领导经历', skills: '技能', education: '教育经历', languages: '语言',
      programming: '编程', platforms: '平台与技术', tools: '工具', soft: '软技能',
      contactHeading: '保持联系', contactCopy: '开放实习与毕业生职位机会。',
      emailMe: '发送邮件', seeAll: '查看所有项目', caseStudy: '查看案例',
      selectedWork: '精选作品', projectIntro: '涵盖独立开发、课程项目与实习工作的三个项目。',
      profile: '个人简介', relevantCourses: '相关课程', print: '打印 / 保存 PDF',
      curriculum: '正式履历', cgpa: 'CGPA', phone: '电话',
      overview: '概览', problem: '问题', role: '职责', investigation: '研究过程',
      solution: '解决方案', result: '成果', learned: '所学经验', technology: '技术 / 技能',
      previous: '上一个项目', next: '下一个项目', backProjects: '所有项目',
      notFound: '找不到项目', notFoundCopy: '此项目链接与现有案例不符。',
      footer: '作品集与履历'
    }
  };
  let language;
  try { language = localStorage.getItem('resume-language') === 'zh' ? 'zh' : 'en'; }
  catch { language = 'en'; }

  const t = (key) => ui[language][key];
  const value = (item) => item && typeof item === 'object' && !Array.isArray(item) ? item[language] : item;
  const escapeHtml = (input) => String(input ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const safe = (input) => escapeHtml(value(input));
  const tags = (items) => `<ul class="tag-list">${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  const section = (id, heading, body, extra = '') => `<section class="section ${extra}" id="${id}" aria-labelledby="${id}-heading"><div class="section-heading"><span class="section-index" aria-hidden="true">/</span><h2 id="${id}-heading">${heading}</h2></div>${body}</section>`;
  const projectHref = (project) => `./project.html?slug=${encodeURIComponent(project.slug)}`;

  function projectCard(project, index) {
    return `<article class="project-card"><div class="card-top"><span class="eyebrow">${safe(project.category)}</span><span class="card-number">0${index + 1}</span></div><h3>${escapeHtml(project.name)}</h3><p>${safe(project.short)}</p>${tags(project.technologies)}<a class="text-link" href="${projectHref(project)}">${t('caseStudy')} <span aria-hidden="true">↗</span></a></article>`;
  }
  function experienceCard(item, compact = false) {
    return `<article class="entry"><div class="entry-head"><div><h3>${safe(item.role)}</h3><p class="entry-sub">${safe(item.company)} · ${safe(item.location)}</p></div><span class="entry-date">${safe(item.period)}</span></div>${compact ? `<p>${safe(item.bullets[language][0])}</p>` : `<ul class="detail-list">${item.bullets[language].map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`}</article>`;
  }
  function leadershipCards(items) {
    return `<div class="leadership-grid">${items.map(item => `<article class="leadership-card"><span class="entry-date">${safe(item.period) || '&nbsp;'}</span><h3>${safe(item.role)}</h3><p>${safe(item.event)}</p>${item.detail ? `<p class="muted small">${safe(item.detail)}</p>` : ''}</article>`).join('')}</div>`;
  }
  function educationCards() {
    return `<div class="education-grid">${data.EDUCATION.map(item => `<article class="entry education-card"><span class="entry-date">${escapeHtml(item.period)}</span><h3>${safe(item.degree)}</h3><p class="entry-sub">${safe(item.school)}</p><p class="muted">${t('cgpa')} ${escapeHtml(item.cgpa)}</p>${item.coursework ? `<p class="small muted">${t('relevantCourses')}: ${item.coursework[language].map(escapeHtml).join(' · ')}</p>` : ''}</article>`).join('')}</div>`;
  }
  function skillsGrid(includeLanguages = false) {
    const groups = [['programming', data.SKILLS.programming], ['platforms', data.SKILLS.platforms], ['tools', data.SKILLS.tools], ['soft', data.SKILLS.soft[language]]];
    if (includeLanguages) groups.push(['languages', data.LANGUAGES[language]]);
    return `<div class="skills-grid">${groups.map(([label, items]) => `<div class="skill-group"><h3>${t(label)}</h3>${tags(items)}</div>`).join('')}</div>`;
  }
  function contactSection() {
    return section('contact', t('contactHeading'), `<div class="contact-panel"><div><p class="contact-copy">${safe(data.PROFILE.opportunity)}</p><p class="muted">${safe(data.PROFILE.location)}</p></div><div class="contact-actions"><a class="button button-primary" href="mailto:${escapeHtml(data.PROFILE.email)}">${t('emailMe')} <span aria-hidden="true">↗</span></a><a class="text-link" href="${escapeHtml(data.PROFILE.github)}" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>${data.PROFILE.showPhone ? `<a class="text-link" href="tel:${escapeHtml(data.PROFILE.phone.replace(/[^+\d]/g, ''))}">${escapeHtml(data.PROFILE.phone)}</a>` : ''}</div></div>`, 'contact-section');
  }
  function renderHome() {
    const profile = data.PROFILE;
    return `<div class="container"><section class="hero" aria-labelledby="hero-heading"><div class="hero-copy"><p class="eyebrow"><span class="status-dot"></span>${safe(profile.availability)}</p><p class="hero-kicker">${t('intro')} / ${safe(profile.displayName)}</p><h1 id="hero-heading">${escapeHtml(profile.name)}<span class="hero-period">.</span></h1><p class="hero-title">${safe(profile.title)}</p><p class="hero-location">${safe(profile.location)}</p><div class="hero-actions"><a class="button button-primary" href="./projects.html">${t('viewProjects')} <span aria-hidden="true">↗</span></a><a class="button button-secondary" href="./resume.html">${t('viewResume')}</a><a class="button button-plain" href="${escapeHtml(profile.github)}" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></div></div><div class="monogram" aria-hidden="true"><span>${escapeHtml(profile.initials)}</span><small>01 / 03</small></div></section>
    ${section('about', t('about'), `<div class="about-layout"><p class="statement">${safe(profile.summary)}</p><div class="about-aside"><span class="eyebrow">${t('profile')}</span><p>${safe(profile.title)}</p><p class="muted">${safe(profile.location)}</p></div></div>`)}
    ${section('featured', t('featured'), `<div class="project-grid">${data.PROJECTS.map(projectCard).join('')}</div><div class="section-tail"><a class="text-link" href="./projects.html">${t('seeAll')} <span aria-hidden="true">↗</span></a></div>`)}
    ${section('experience', t('experience'), data.EXPERIENCE.map(item => experienceCard(item, true)).join(''))}
    ${section('leadership', t('leadership'), leadershipCards(data.LEADERSHIP.slice(0, 3)))}
    ${section('skills', t('skills'), skillsGrid())}
    ${section('education', t('education'), educationCards())}
    ${contactSection()}</div>`;
  }
  function renderProjects() {
    return `<div class="container page-content"><header class="page-intro"><p class="eyebrow">${t('selectedWork')} / 01—03</p><h1>${t('allProjects')}<span class="hero-period">.</span></h1><p>${t('projectIntro')}</p></header><div class="project-grid projects-page-grid">${data.PROJECTS.map(projectCard).join('')}</div></div>`;
  }
  function renderResume() {
    const profile = data.PROFILE;
    return `<div class="container resume-shell"><div class="resume-toolbar"><span class="eyebrow">${t('curriculum')}</span><button class="button button-secondary print-button" type="button" id="print-resume">${t('print')} <span aria-hidden="true">↗</span></button></div><article class="resume-paper"><header class="resume-head"><div><p class="eyebrow">${safe(profile.displayName)}</p><h1>${escapeHtml(profile.name)}</h1><p class="resume-title">${safe(profile.title)}</p></div><div class="resume-contact"><span>${safe(profile.location)}</span><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>${profile.showPhone ? `<a href="tel:${escapeHtml(profile.phone.replace(/[^+\d]/g, ''))}">${escapeHtml(profile.phone)}</a>` : ''}<a href="${escapeHtml(profile.github)}" target="_blank" rel="noopener noreferrer">${escapeHtml(profile.github)}</a></div></header>
      ${section('profile', t('profile'), `<p class="resume-summary">${safe(profile.summary)}</p>`)}
      ${section('education', t('education'), educationCards())}
      ${section('experience', t('experience'), data.EXPERIENCE.map(item => experienceCard(item)).join(''))}
      ${section('projects', t('projects'), `<div class="resume-projects">${data.PROJECTS.map(project => `<article class="resume-project"><div class="entry-head"><h3><a href="${projectHref(project)}">${escapeHtml(project.name)}</a></h3><span class="entry-date">${safe(project.category)}</span></div><p>${safe(project.short)}</p><p class="small muted">${safe(project.role)}</p></article>`).join('')}</div>`)}
      ${section('leadership', t('leadership'), leadershipCards(data.LEADERSHIP))}
      ${section('skills', t('skills'), skillsGrid(true))}
    </article></div>`;
  }
  function renderHeader() {
    const active = page === 'project' ? 'projects' : page;
    document.getElementById('site-header').innerHTML = `<header class="site-header"><div class="container nav-inner"><a class="brand" href="./index.html" aria-label="${escapeHtml(data.PROFILE.name)} — ${t('home')}"><span class="brand-mark" aria-hidden="true">${escapeHtml(data.PROFILE.initials)}</span><span><strong>${escapeHtml(data.PROFILE.displayName)}</strong><small>${escapeHtml(data.PROFILE.name)}</small></span></a><button class="menu-toggle" type="button" aria-label="${t('menu')}" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span></button><nav id="primary-nav" class="primary-nav" aria-label="Primary"><a href="./index.html" ${active === 'home' ? 'aria-current="page"' : ''}>${t('home')}</a><a href="./projects.html" ${active === 'projects' ? 'aria-current="page"' : ''}>${t('projects')}</a><a href="./resume.html" ${active === 'resume' ? 'aria-current="page"' : ''}>${t('resume')}</a><a href="./index.html#contact">${t('contact')}</a><div class="language-switch" role="group" aria-label="Language"><button type="button" data-language="en" aria-pressed="${language === 'en'}">EN</button><span aria-hidden="true">/</span><button type="button" data-language="zh" aria-pressed="${language === 'zh'}">中文</button></div></nav></div></header>`;
  }
  function renderFooter() {
    document.getElementById('site-footer').innerHTML = `<footer class="site-footer"><div class="container footer-inner"><span>© ${new Date().getFullYear()} ${escapeHtml(data.PROFILE.name)}</span><span>${t('footer')}</span><a href="mailto:${escapeHtml(data.PROFILE.email)}">${escapeHtml(data.PROFILE.email)}</a></div></footer>`;
  }
  function render() {
    document.documentElement.lang = language === 'zh' ? 'zh-Hans' : 'en';
    renderHeader();
    const main = document.getElementById('main');
    main.innerHTML = page === 'home' ? renderHome() : page === 'projects' ? renderProjects() : page === 'resume' ? renderResume() : window.renderProjectPage({ data, language, t, safe, escapeHtml, tags, projectHref });
    renderFooter();
    document.getElementById('print-resume')?.addEventListener('click', () => window.print());
    document.querySelector('.menu-toggle').addEventListener('click', event => {
      const button = event.currentTarget;
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      document.getElementById('primary-nav').classList.toggle('is-open', open);
    });
    document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
      language = button.dataset.language;
      try { localStorage.setItem('resume-language', language); } catch { /* file browsers may block storage */ }
      render();
    }));
  }
  render();
})();
