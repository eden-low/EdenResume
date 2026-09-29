/* Case study routing stays separate from shared page rendering. */
window.renderProjectPage = ({ data, language, t, safe, escapeHtml, tags, projectHref }) => {
  const slug = new URLSearchParams(window.location.search).get('slug');
  const index = data.PROJECTS.findIndex(project => project.slug === slug);
  if (index < 0) {
    document.title = `${t('notFound')} — Low Fang Jun`;
    return `<div class="container page-content"><div class="not-found"><span class="eyebrow">404 / ${t('projects')}</span><h1>${t('notFound')}</h1><p>${t('notFoundCopy')}</p><a class="button button-primary" href="./projects.html">${t('backProjects')} <span aria-hidden="true">↗</span></a></div></div>`;
  }
  const project = data.PROJECTS[index];
  document.title = `${project.name} — Low Fang Jun`;
  const fields = ['overview', 'problem', 'role', 'investigation', 'solution', 'result', 'learned'];
  const detail = fields.map((field, fieldIndex) => `<section class="case-section" aria-labelledby="case-${field}"><div class="case-label"><span class="section-index">0${fieldIndex + 1}</span><h2 id="case-${field}">${t(field)}</h2></div><p>${safe(project[field])}</p></section>`).join('');
  const activeProjects = data.PROJECTS.filter(item => item.includeInPortfolio);
  const activeIndex = activeProjects.findIndex(item => item.slug === slug);
  const previous = activeIndex > 0 ? activeProjects[activeIndex - 1] : null;
  const next = activeIndex >= 0 ? activeProjects[activeIndex + 1] : null;
  const archived = !project.includeInPortfolio;
  return `<div class="container page-content"><a class="back-link" href="./projects.html"><span aria-hidden="true">←</span> ${t('backProjects')}</a><header class="case-hero"><div><p class="eyebrow">${archived ? `${t('archived')} / ` : ''}${safe(project.category)}</p><h1>${escapeHtml(project.name)}<span class="hero-period">.</span></h1><p class="case-summary">${safe(project.short)}</p><div class="case-meta"><span><strong>${t('role')}:</strong> ${safe(project.role)}</span><span><strong>${safe(project.status)}</strong></span></div></div></header><div class="case-layout"><div class="case-details">${detail}</div><aside class="case-aside" aria-label="${t('technology')}"><h2>${t('technology')}</h2>${tags(project.technologies)}</aside></div>${activeIndex >= 0 && (previous || next) ? `<nav class="project-pager" aria-label="${t('projectNavigation')}">${previous ? `<a href="${projectHref(previous)}"><span>${t('previous')}</span><strong>← ${escapeHtml(previous.name)}</strong></a>` : '<span></span>'}${next ? `<a href="${projectHref(next)}"><span>${t('next')}</span><strong>${escapeHtml(next.name)} →</strong></a>` : '<span></span>'}</nav>` : ''}</div>`;
};
