/* Deterministic parser, read-only API, and browser-local store checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = file => fs.readFileSync(path.join(root, file), 'utf8');
const storage = new Map();
const context = {
  window: {}, URL, atob, TextDecoder,
  localStorage: {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: key => storage.delete(key)
  }
};
vm.createContext(context);
for (const file of ['assets/js/data.js', 'assets/js/project-store.js', 'assets/js/readme-parser.js', 'assets/js/github-public.js', 'assets/js/project-manager.js']) vm.runInContext(source(file), context);
const { PROJECT_STORE: store, README_PARSER: parser, GITHUB_PUBLIC: github, ProjectManager: manager, RESUME_DATA: data } = context.window;
const readme = [
  '[![Build](https://img.shields.io/badge/build-passing.svg)](https://example.com)',
  '# Sample Project',
  '',
  'A small web tool for organising event proposals and approvals.',
  '',
  '## Features',
  '- Create event proposals',
  '- Review approval requests',
  '',
  '## Tech Stack',
  '- JavaScript',
  '- PostgreSQL',
  '',
  '## Setup',
  'Run npm install and start the app.',
  '',
  '## My Role',
  'Implemented the proposal form.'
].join('\n');
const result = parser.analyze(readme, { name: 'fallback', language: 'HTML', topics: ['javascript'] });
assert.equal(result.title, 'Sample Project');
assert.match(result.description, /small web tool/);
assert.doesNotMatch(result.description, /badge|Build/);
assert.equal(result.features.length, 2);
assert.ok(result.technologies.includes('PostgreSQL'));
assert.equal(result.role, 'Implemented the proposal form.');
assert.match(result.setup, /Run npm install/);
const noRole = parser.analyze('# Another Project\n\nA documented web project for student work.', { name: 'repo' });
assert.equal(noRole.role, '');
assert.equal(noRole.type, 'Other');
const manualDraft = manager.draftFromReadme(readme, null, 'manual');
assert.equal(manualDraft.title, 'Sample Project');
assert.equal(manualDraft.source, 'manual');
assert.equal(manualDraft.includeInPortfolio, false);
const missingReadmeDraft = manager.draftFromReadme('', { owner: 'eden-low', name: 'missing-readme', fullName: 'eden-low/missing-readme', description: 'Public metadata only', topics: [], archived: false, htmlUrl: 'https://github.com/eden-low/missing-readme' }, 'github');
assert.equal(missingReadmeDraft.title, 'missing-readme');
assert.equal(missingReadmeDraft.description, 'Public metadata only');
assert.equal(missingReadmeDraft.readmeAnalyzed, false);
assert.equal(parser.decodePayload({ encoding: 'base64', content: Buffer.from('中文 README').toString('base64') }), '中文 README');
assert.equal(parser.decodePayload('<h1>Raw</h1>'), '<h1>Raw</h1>');
const html = parser.analyze('<script>doSomethingDangerous()</script><h1>HTML Tool</h1><p>A documented utility for organising student events.</p>');
assert.equal(html.title, 'HTML Tool');
assert.match(html.description, /documented utility/);
assert.doesNotMatch(html.description, /doSomethingDangerous/);
storage.set(store.KEY, '{broken');
assert.equal(store.getProjects(data.PROJECTS).length, 3);
store.reset();
const draft = {
  id: 'manual-test', title: 'Manual Test', description: 'Reviewed description',
  background: 'Documented background', features: ['Create proposals'], role: '',
  technologies: ['JavaScript'], type: 'Other', source: 'manual',
  readme, readmeAnalyzed: true, includeInPortfolio: false, includeInResume: false,
  includeInCV: false, resumePriority: null, cvPriority: null
};
assert.ok(store.saveDraft(draft));
assert.equal(store.getProjects(data.PROJECTS).length, 4);
assert.equal(store.getProjects(data.PROJECTS).at(-1).includeInPortfolio, false);
assert.ok(store.updateSelection('manual-test', { includeInPortfolio: true, includeInResume: true, includeInCV: true, resumePriority: 1, cvPriority: 3 }, data.PROJECTS));
assert.equal(store.getProjects(data.PROJECTS).at(-1).includeInCV, true);
assert.ok(store.updateSelection('edenatlas', { includeInPortfolio: false, includeInResume: false, includeInCV: false }, data.PROJECTS));
assert.equal(store.getProjects(data.PROJECTS)[0].includeInPortfolio, false);
assert.ok(store.removeImported('manual-test'));
assert.equal(store.getProjects(data.PROJECTS).length, 3);
assert.ok(store.reset());
assert.equal(storage.has(store.KEY), false);

const repo = { id: 1, name: 'sample', full_name: 'eden-low/sample', owner: { login: 'eden-low' }, html_url: 'https://github.com/eden-low/sample', private: false, archived: false, language: 'JavaScript', topics: ['portfolio'], updated_at: '2026-01-01' };
function response(status, body, headers = {}) {
  return { ok: status >= 200 && status < 300, status, headers: { get: key => headers[key.toLowerCase()] || null }, json: async () => body, text: async () => body };
}
(async () => {
  context.fetch = async () => response(200, [repo]);
  const list = await github.listRepositories('eden-low');
  assert.equal(list.length, 1);
  assert.equal(list[0].name, 'sample');
  context.fetch = async () => response(200, { encoding: 'base64', content: Buffer.from(readme).toString('base64') }, { 'content-type': 'application/json' });
  assert.match(await github.readReadme(list[0]), /Sample Project/);
  context.fetch = async () => response(404, {});
  await assert.rejects(github.readReadme(list[0]), /not-found/);
  context.fetch = async () => response(200, '<h1>Raw README</h1>', { 'content-type': 'text/html' });
  assert.match(await github.readReadme(list[0]), /Raw README/);
  context.fetch = async () => response(403, {}, { 'x-ratelimit-remaining': '0' });
  await assert.rejects(github.listRepositories('eden-low'), /rate-limit/);
  context.fetch = async () => { throw new Error('offline'); };
  await assert.rejects(github.listRepositories('eden-low'), /network/);
  console.log('Project Manager tests passed: README rules, repository parsing, errors, selections, and persistence.');
})().catch(error => { console.error(error); process.exitCode = 1; });
