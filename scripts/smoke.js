/* Dependency-free rendering checks: node scripts/smoke.js */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const script = ['assets/js/data.js', 'assets/js/project.js', 'assets/js/main.js'];
const dataSource = read(script[0]);
const projectSource = read(script[1]);
const mainSource = read(script[2]);

function load(page, slug = '') {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { innerHTML: '', listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; } });
    return elements.get(id);
  };
  const buttons = ['en', 'zh'].map(lang => ({ dataset: { language: lang }, listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; } }));
  const menu = { attrs: { 'aria-expanded': 'false' }, listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; }, getAttribute(name) { return this.attrs[name]; }, setAttribute(name, value) { this.attrs[name] = value; } };
  const document = {
    body: { dataset: { page } }, documentElement: { lang: 'en' },
    getElementById(id) { return id === 'print-resume' && page !== 'resume' ? null : element(id); },
    querySelector(selector) { return selector === '.menu-toggle' ? menu : null; },
    querySelectorAll(selector) { return selector === '[data-language]' ? buttons : []; }
  };
  const storage = new Map();
  const context = { window: { location: { search: slug ? `?slug=${slug}` : '' }, print() {} }, document, URLSearchParams, Date, localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) } };
  vm.createContext(context);
  vm.runInContext(dataSource, context);
  if (page === 'project') vm.runInContext(projectSource, context);
  vm.runInContext(mainSource, context);
  return { main: element('main'), header: element('site-header'), buttons, document, storage };
}

for (const page of ['home', 'projects', 'resume']) {
  const view = load(page);
  assert.match(view.main.innerHTML, /Low Fang Jun|EdenAtlas/);
  assert.match(view.header.innerHTML, /resume\.html/);
  view.buttons[1].listeners.click();
  assert.equal(view.document.documentElement.lang, 'zh-Hans');
  assert.equal(view.storage.get('resume-language'), 'zh');
  assert.match(view.main.innerHTML, /项目|履历|个人/);
}
for (const slug of ['edenatlas', 'utar-epms', 'enterprise-ai-ops']) {
  const view = load('project', slug);
  assert.match(view.main.innerHTML, /case-section/);
  assert.match(view.main.innerHTML, /Technology \/ Skills/);
  view.buttons[1].listeners.click();
  assert.match(view.main.innerHTML, /技术 \/ 技能/);
}
assert.match(load('project', 'missing').main.innerHTML, /Project not found/);
const resume = load('resume').main.innerHTML;
assert.match(resume, /011-10574969/);
assert.match(resume, /Warrior 3\.0/);
assert.equal((resume.match(/class="resume-project"/g) || []).length, 3);
for (const html of ['index.html', 'projects.html', 'project.html', 'resume.html']) {
  const source = read(html);
  for (const match of source.matchAll(/(?:src|href)="(\.\/[^"#?]+)"/g)) {
    assert.ok(fs.existsSync(path.join(root, match[1])), `${html}: missing ${match[1]}`);
  }
}
console.log('Smoke checks passed: pages, languages, project slugs, links, and resume content.');
