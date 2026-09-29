/* Browser-local project choices. data.js remains the published baseline. */
(() => {
  'use strict';
  const KEY = 'portfolio-project-data';
  const VERSION = 1;
  const empty = () => ({ version: VERSION, overrides: {}, imported: [] });
  const text = (value, max = 5000) => typeof value === 'string' ? value.trim().slice(0, max) : '';
  const list = (value, max = 24, itemMax = 100) => Array.isArray(value) ? value.filter(item => typeof item === 'string').map(item => text(item, itemMax)).filter(Boolean).slice(0, max) : [];
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
      return parsed;
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
    return {
      id, slug: id, title, name: title, description, short: description,
      background, overview: background, features: list(input.features, 8, 240),
      role: text(input.role, 300), technologies: list(input.technologies, 24, 40),
      type, category: type, githubUrl: url(input.githubUrl), liveUrl: url(input.liveUrl),
      source: ['github', 'manual', 'company'].includes(input.source) ? input.source : 'manual',
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
        type: project.category, features: project.features || [], readme: project.readme || '', readmeAnalyzed: false };
      return override && typeof override === 'object' ? { ...normalized, ...selection(override) } : normalized;
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
  function saveDraft(input) {
    const state = read();
    const project = imported(input);
    if (!project.id || !project.title) return false;
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
  function reset() {
    try { localStorage.removeItem(KEY); return true; }
    catch { return false; }
  }
  window.PROJECT_STORE = { KEY, read, getProjects, saveDraft, updateSelection, removeImported, reset, priority, url };
})();
