/* Case study routing stays separate from shared page rendering. */
window.renderProjectPage = ({ data, language, t, safe, escapeHtml, tags, projectHref }) => {
  const slug = new URLSearchParams(window.location.search).get('slug');
  const index = data.PROJECTS.findIndex(project => project.slug === slug);
  if (index < 0) {
    document.title = `${t('notFound')} — Low Fang Jun`;
    return `<div class="container page-content"><div class="not-found"><span class="eyebrow">404 / ${t('projects')}</span><h1>${t('notFound')}</h1><p>${t('notFoundCopy')}</p><a class="button button-primary" href="./projects.html">${t('backProjects')} <span aria-hidden="true">↗</span></a></div></div>`;
  }
  const project = data.PROJECTS[index];
  const localized = value => value && typeof value === 'object' && !Array.isArray(value) ? value[language] || value.en || value.zh || '' : value || '';
  document.title = `${localized(project.name)} — Low Fang Jun`;
  const study = window.PROJECT_STORE.caseStudyOf(project);
  const ready = window.PROJECT_STORE.caseStudyReady(project);
  const fields = ['overview', 'problem', 'role', 'investigation', 'solution', 'result', 'learned', 'features', 'setup'];
  const detailValue = field => field in study ? study[field] : project[field];
  const detail = fields.filter(field => {
    const value = detailValue(field);
    return Array.isArray(value) ? value.length > 0 : !!String(localized(value)).trim();
  }).map((field, fieldIndex) => `<section class="case-section" aria-labelledby="case-${field}"><div class="case-label"><span class="section-index">0${fieldIndex + 1}</span><h2 id="case-${field}">${t(field)}</h2></div>${field === 'features' ? `<ul class="detail-list">${project.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join('')}</ul>` : `<p>${escapeHtml(localized(detailValue(field)))}</p>`}</section>`).join('');
  const projectLinks = [['GitHub', project.githubUrl], [t('live'), project.liveUrl]].filter(([, url]) => window.PROJECT_STORE.url(url));
  const activeProjects = data.PROJECTS.filter(item => item.includeInPortfolio);
  const activeIndex = activeProjects.findIndex(item => item.slug === slug);
  const previous = activeIndex > 0 ? activeProjects[activeIndex - 1] : null;
  const next = activeIndex >= 0 ? activeProjects[activeIndex + 1] : null;
  const archived = project.id === 'edenatlas' || project.status === 'archived' || project.visibility === 'historical';
  return `<div class="container page-content"><a class="back-link" href="./projects.html"><span aria-hidden="true">←</span> ${t('backProjects')}</a><header class="case-hero"><div><p class="eyebrow">${archived ? `${t('archived')} / ` : ''}${safe(project.category)}</p><h1>${safe(project.name)}<span class="hero-period">.</span></h1><p class="case-summary">${safe(project.short)}</p><div class="case-meta">${project.role ? `<span><strong>${t('role')}:</strong> ${safe(project.role)}</span>` : ''}<span><strong>${project.statusLabel ? safe(project.statusLabel) : t(project.status === 'archived' ? 'archived' : 'active')}</strong></span></div>${projectLinks.length ? `<div class="project-links">${projectLinks.map(([name, url]) => `<a class="text-link" href="${escapeHtml(window.PROJECT_STORE.url(url))}" target="_blank" rel="noopener noreferrer">${name} ↗</a>`).join('')}</div>` : ''}</div></header><div class="case-layout"><div class="case-details">${!ready ? `<p class="case-note">${t('caseStudyUnavailable')}</p>` : ''}${detail}</div>${project.technologies.length ? `<aside class="case-aside" aria-label="${t('technology')}"><h2>${t('technology')}</h2>${tags(project.technologies)}</aside>` : ''}</div>${activeIndex >= 0 && (previous || next) ? `<nav class="project-pager" aria-label="${t('projectNavigation')}">${previous ? `<a href="${projectHref(previous)}"><span>${t('previous')}</span><strong>← ${safe(previous.name)}</strong></a>` : '<span></span>'}${next ? `<a href="${projectHref(next)}"><span>${t('next')}</span><strong>${safe(next.name)} →</strong></a>` : ''}</nav>` : ''}</div>`;
};
