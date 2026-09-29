/* Dependency-free rendering checks: node scripts/smoke.js */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const script = ['assets/js/data.js', 'assets/js/project-store.js', 'assets/js/project.js', 'assets/js/cv.js', 'assets/js/main.js'];
const dataSource = read(script[0]);
const storeSource = read(script[1]);
const projectSource = read(script[2]);
const cvSource = read(script[3]);
const mainSource = read(script[4]);

function load(page, slug = '', seeded = {}) {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { innerHTML: '', listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; } });
    return elements.get(id);
  };
  const buttons = ['en', 'zh'].map(lang => ({ dataset: { language: lang }, listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; } }));
  const menu = { attrs: { 'aria-expanded': 'false' }, listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; }, getAttribute(name) { return this.attrs[name]; }, setAttribute(name, value) { this.attrs[name] = value; } };
  const document = {
    body: { dataset: { page } }, documentElement: { lang: 'en' },
    addEventListener() {}, removeEventListener() {},
    getElementById(id) { return id === 'print-resume' && page !== 'resume' ? null : element(id); },
    querySelector(selector) { return selector === '.menu-toggle' ? menu : null; },
    querySelectorAll(selector) { return selector === '[data-language]' ? buttons : []; }
  };
  const storage = new Map(Object.entries(seeded));
  const context = { window: { location: { search: slug ? `?slug=${slug}` : '' }, print() {} }, document, URL, URLSearchParams, Date, localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) } };
  vm.createContext(context);
  vm.runInContext(dataSource, context);
  vm.runInContext(storeSource, context);
  if (page === 'project') vm.runInContext(projectSource, context);
  if (page === 'cv') vm.runInContext(cvSource, context);
  vm.runInContext(mainSource, context);
  return { main: element('main'), header: element('site-header'), buttons, document, storage };
}

for (const page of ['home', 'projects', 'resume', 'cv']) {
  const view = load(page);
  assert.match(view.main.innerHTML, /Low Fang Jun|Enterprise AI/);
  assert.match(view.header.innerHTML, /resume\.html/);
  assert.match(view.header.innerHTML, /cv\.html/);
  assert.equal((view.header.innerHTML.match(/href="\.\/project-manager\.html"/g) || []).length, 1);
  assert.match(view.header.innerHTML, /Resume Workspace/);
  view.buttons[1].listeners.click();
  assert.equal(view.document.documentElement.lang, 'zh-Hans');
  assert.equal(view.storage.get('resume-language'), 'zh');
  assert.match(view.header.innerHTML, /简历工作区/);
  assert.match(view.main.innerHTML, /项目|履历|个人/);
}
for (const slug of ['edenatlas', 'utar-epms', 'enterprise-ai-ops']) {
  const view = load('project', slug);
  assert.match(view.main.innerHTML, /case-section/);
  assert.match(view.main.innerHTML, /Technology \/ Skills/);
  view.buttons[1].listeners.click();
  assert.match(view.main.innerHTML, /技术 \/ 技能/);
}
const utarCase = load('project', 'utar-epms');
assert.match(utarCase.main.innerHTML, /Event proposals, approvals, and planning steps needed a clearer structure\./);
assert.match(utarCase.main.innerHTML, /Applied requirements analysis and database design to a defined web workflow\./);
assert.doesNotMatch(utarCase.main.innerHTML, /A detailed case study is not available/);
utarCase.buttons[1].listeners.click();
assert.match(utarCase.main.innerHTML, /活动提案、审批和策划步骤需要更清晰的结构/);
assert.match(load('project', 'missing').main.innerHTML, /Project not found/);
const resume = load('resume').main.innerHTML;
assert.match(resume, /011-10574969/);
assert.match(resume, /Warrior 3\.0/);
assert.match(resume, /class="resume-page"/);
assert.match(resume, /Professional Summary/);
assert.equal((resume.match(/class="cv-project-row"/g) || []).length, 2);
assert.doesNotMatch(resume, /EdenAtlas/);
assert.doesNotMatch(resume, /class="project-card"/);
const cv = load('cv').main.innerHTML;
assert.equal((cv.match(/class="resume-page cv-page"/g) || []).length, 1);
assert.equal((cv.match(/class="cv-project-entry"/g) || []).length, 2);
assert.doesNotMatch(cv, /EdenAtlas|01 \/ 02|02 \/ 02/);
assert.equal((cv.match(/class="cv-activity"/g) || []).length, 6);
assert.match(cv, /document tampering/);
const imported = [1, 2, 3].map(number => ({
  id: `manual-${number}`, title: `Imported ${number}`, description: 'Reviewed project',
  type: 'Other', source: 'manual', technologies: ['JavaScript'],
  includeInPortfolio: number === 1, includeInResume: true, includeInCV: true,
  resumePriority: number, cvPriority: number
}));
const overrides = Object.fromEntries(['utar-epms', 'enterprise-ai-ops'].map(id => [id, { includeInPortfolio: false, includeInResume: false, includeInCV: false }]));
const seeded = { 'portfolio-project-data': JSON.stringify({ version: 1, overrides, imported }) };
const selectedProjects = load('projects', '', seeded).main.innerHTML;
assert.match(selectedProjects, /Imported 1/);
assert.match(selectedProjects, /View Project/);
assert.doesNotMatch(selectedProjects, /View Case Study/);
assert.doesNotMatch(selectedProjects, /Imported 2|Imported 3|EdenAtlas/);
const selectedResume = load('resume', '', seeded).main.innerHTML;
assert.match(selectedResume, /Imported 1|Imported 2/);
assert.doesNotMatch(selectedResume, /Imported 3|EdenAtlas/);
assert.equal((selectedResume.match(/class="cv-project-row"/g) || []).length, 2);
const selectedCV = load('cv', '', seeded).main.innerHTML;
assert.match(selectedCV, /Imported 1|Imported 2|Imported 3/);
const incompleteCase = load('project', 'manual-1', seeded).main.innerHTML;
assert.match(incompleteCase, /A detailed case study is not available/);
assert.doesNotMatch(incompleteCase, /case-section/);
const readyImported = { id: 'manual-ready', title: 'Ready Case', description: 'A documented student project.',
  source: 'manual', type: 'Academic', technologies: ['JavaScript'], features: ['Proposal review form'], includeInPortfolio: true,
  includeInResume: true, includeInCV: true, resumePriority: 3, cvPriority: 3,
  resumeBullets: { en: ['Built a project planning flow.', 'Improved approval clarity.'], zh: ['开发项目策划流程。'] },
  cvResponsibilities: { en: 'Implemented the proposal review form.', zh: '实现提案审核表单。' },
  cvTechnicalDecisions: { en: 'Used structured proposal records.', zh: '采用结构化提案记录。' },
  caseStudy: { overview: { en: 'A documented project for event planning.', zh: '一个用于活动策划与审批流程的课程项目。' },
    solution: { en: 'Structured the event proposal workflow.', zh: '将活动提案与审批流程结构化。' } } };
const readySeed = { 'portfolio-project-data': JSON.stringify({ version: 1, overrides: {}, imported: [readyImported] }) };
const readyProjects = load('projects', '', readySeed).main.innerHTML;
assert.match(readyProjects, /Ready Case/);
assert.match(readyProjects, /View Case Study/);
const readyCase = load('project', 'manual-ready', readySeed);
assert.match(readyCase.main.innerHTML, /Structured the event proposal workflow/);
readyCase.buttons[1].listeners.click();
assert.match(readyCase.main.innerHTML, /将活动提案与审批流程结构化/);
assert.doesNotMatch(load('resume', '', readySeed).main.innerHTML, /Ready Case/);
assert.match(load('cv', '', readySeed).main.innerHTML, /Ready Case/);
assert.match(load('cv', '', readySeed).main.innerHTML, /Implemented the proposal review form/);
assert.match(load('cv', '', readySeed).main.innerHTML, /Proposal review form/);
const readyResumeSeed = { 'portfolio-project-data': JSON.stringify({ version: 1, overrides, imported: [readyImported] }) };
assert.match(load('resume', '', readyResumeSeed).main.innerHTML, /Built a project planning flow/);
assert.doesNotMatch(load('resume', '', readyResumeSeed).main.innerHTML, /Improved approval clarity/);
const editedBaseline = { 'portfolio-project-data': JSON.stringify({ version: 1, overrides: {}, imported: [], contentOverrides: {
  'utar-epms': { id: 'utar-epms', title: 'Edited event project', description: 'An edited English summary.',
    role: 'Designed the workflow.', type: 'Coursework', source: 'manual', technologies: ['JavaScript'],
    includeInPortfolio: true, includeInResume: true, includeInCV: true, resumePriority: 2, cvPriority: 2,
    resumeBullets: { en: ['Designed the event workflow.'], zh: ['设计活动流程。'] },
    localizedBasics: { name: { en: 'Edited event project', zh: '活动项目修订版' },
      short: { en: 'An edited English summary.', zh: '修订后的中文概述。' },
      role: { en: 'Designed the workflow.', zh: '设计活动流程。' } } }
} }) };
const editedResume = load('resume', '', editedBaseline);
assert.match(editedResume.main.innerHTML, /Edited event project/);
assert.match(editedResume.main.innerHTML, /Designed the event workflow/);
editedResume.buttons[1].listeners.click();
assert.match(editedResume.main.innerHTML, /活动项目修订版/);
assert.match(editedResume.main.innerHTML, /设计活动流程/);
for (const html of ['index.html', 'projects.html', 'project.html', 'resume.html', 'cv.html', 'project-manager.html']) {
  const source = read(html);
  for (const match of source.matchAll(/(?:src|href)="(\.\/[^"#?]+)"/g)) {
    assert.ok(fs.existsSync(path.join(root, match[1])), `${html}: missing ${match[1]}`);
  }
}
console.log('Smoke checks passed: portfolio, resume, CV, languages, project slugs, and links.');
