/* Deterministic parser, read-only API, and browser-local store checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = file => fs.readFileSync(path.join(root, file), 'utf8');
const storage = new Map();
const context = {
  window: {}, URL, atob, TextDecoder, document: { title: '' },
  localStorage: {
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: key => storage.delete(key)
  }
};
vm.createContext(context);
for (const file of ['assets/js/data.js', 'assets/js/project-store.js', 'assets/js/readme-parser.js', 'assets/js/github-public.js', 'assets/js/project-manager.js']) vm.runInContext(source(file), context);
const { PROJECT_STORE: store, README_PARSER: parser, GITHUB_PUBLIC: github, ProjectManager: manager, RESUME_DATA: data } = context.window;
const lockedEnglish = manager.render({ data, language: 'en' });
assert.match(lockedEnglish, /Local editing gate/);
assert.match(lockedEnglish, /id="manager-unlock-form"/);
assert.doesNotMatch(lockedEnglish, /id="github-sync-form"|id="manager-saved"/);
const lockedChinese = manager.render({ data, language: 'zh' });
assert.match(lockedChinese, /本地编辑界面锁定/);
assert.match(lockedChinese, /密码/);
const unlockedContext = {
  window: {}, URL, atob, TextDecoder, document: { title: '' },
  localStorage: context.localStorage,
  sessionStorage: { getItem: () => 'true' }
};
vm.createContext(unlockedContext);
for (const file of ['assets/js/data.js', 'assets/js/project-store.js', 'assets/js/readme-parser.js', 'assets/js/github-public.js', 'assets/js/project-manager.js']) vm.runInContext(source(file), unlockedContext);
const unlocked = unlockedContext.window.ProjectManager;
const workspace = unlocked.render({ data: unlockedContext.window.RESUME_DATA, language: 'en' });
assert.match(workspace, /Resume & CV Workspace/);
assert.match(workspace, /Project Sources/);
assert.match(workspace, /Import Project Content/);
assert.match(workspace, /Archived \/ Legacy Projects/);
assert.match(workspace, /Resume readiness/);
assert.match(workspace, /CV readiness/);
assert.match(workspace, /name="includeInResume"/);
assert.match(workspace, /name="includeInCV"/);
assert.match(workspace, /Primary|Secondary/);
assert.doesNotMatch(workspace, /name="includeInPortfolio"/);
unlocked.state.draft = unlocked.draftFromReadme('# Sample Project\n\nA project for documenting event proposals.', null, 'manual');
const editor = unlocked.render({ data: unlockedContext.window.RESUME_DATA, language: 'en' });
assert.match(editor, /Resume bullet 1/);
assert.match(editor, /name="resumeBullets.en.0"/);
assert.match(editor, /Source material and additional case-study notes/);
assert.match(editor, /<details class="manager-details">/);
assert.doesNotMatch(editor, /name="includeInPortfolio"/);
unlocked.state.draft.includeInResume = true;
unlocked.state.draft.resumePriority = 4;
assert.match(unlocked.render({ data: unlockedContext.window.RESUME_DATA, language: 'en' }), /Current position \(4\)/);
unlocked.state.draft.type = '"><script>alert(1)</script>';
assert.doesNotMatch(unlocked.render({ data: unlockedContext.window.RESUME_DATA, language: 'en' }), /<script>alert\(1\)<\/script>/);
assert.match(unlocked.render({ data: unlockedContext.window.RESUME_DATA, language: 'zh' }), /简历工作区/);
unlocked.state.repositories = [
  { owner: 'eden-low', name: 'current', fullName: 'eden-low/current', description: 'Current project source',
    language: 'JavaScript', updatedAt: '2026-09-01', topics: [], htmlUrl: 'https://github.com/eden-low/current', archived: false },
  { owner: 'eden-low', name: 'old', fullName: 'eden-low/old', description: 'Older source',
    language: 'HTML', updatedAt: '2025-01-01', topics: [], htmlUrl: 'https://github.com/eden-low/old', archived: true }
];
const sourcesHtml = unlocked.render({ data: unlockedContext.window.RESUME_DATA, language: 'en' });
assert.match(sourcesHtml, /Review Resume Content/);
assert.match(sourcesHtml, /Resume \/ CV content: not reviewed/);
assert.match(sourcesHtml, /README: not checked/);
assert.match(sourcesHtml, /Archived \/ Legacy Projects \(1\)/);
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
assert.equal(result.caseStudy.overview, '');
assert.equal(result.caseStudy.problem, '');
assert.equal(result.caseStudy.result, '');
assert.equal(result.caseStudy.learned, '');
assert.match(result.overviewSuggestion, /small web tool/);
const introductory = parser.analyze('# Intro Project\n\nA concise description of the project.\n\nA separate introductory paragraph explaining the documented project purpose.\n\n## Features\n- Build a searchable list of project entries.');
assert.match(introductory.overviewSuggestion, /separate introductory paragraph/);
assert.equal(introductory.caseStudy.overview, '');
assert.equal(introductory.caseStudy.problem, '');
assert.equal(introductory.caseStudy.solution, '');
assert.equal(introductory.caseStudy.result, '');
const nested = parser.analyze('# Nested Project\n\n## Features\n### Authentication\nUsers can sign in to the documented application.\n### Dashboard\n- Show the current project entries.\n\n## Problems\n### Review workflow\nExisting proposal records needed a clearer review workflow.\n\n## Approach\n### Data model\nStructured the documented proposal records.\n\n## Outcome\nThe README states that proposals became easier to review.\n\n## My Contribution\nImplemented the documented proposal review form.');
assert.ok(nested.features.some(item => /Authentication.*sign in/.test(item)));
assert.ok(nested.features.some(item => /Dashboard.*project entries/.test(item)));
assert.match(nested.caseStudy.problem, /clearer review workflow/);
assert.match(nested.caseStudy.solution, /Structured the documented/);
assert.match(nested.caseStudy.result, /easier to review/);
assert.match(nested.role, /proposal review form/);
assert.equal(nested.caseStudy.learned, '');
const explicitCase = parser.analyze('# Documented Project\n\nA documented project.\n\n## Project Overview\nA web tool for reviewing event proposals.\n\n## Problem Statement\nEvent proposals needed a clearer review process.\n\n## Analysis\nReviewed the existing proposal and approval steps.\n\n## Implementation\nStructured the proposal and approval workflow.\n\n## Results\nThe proposal and approval workflow was structured.\n\n## Lessons Learned\nApplied requirements analysis to the review workflow.');
assert.match(explicitCase.caseStudy.overview, /web tool/);
assert.match(explicitCase.caseStudy.problem, /proposals needed/);
assert.match(explicitCase.caseStudy.investigation, /Reviewed the existing/);
assert.match(explicitCase.caseStudy.solution, /Structured the proposal/);
assert.match(explicitCase.caseStudy.result, /workflow was structured/);
assert.match(explicitCase.caseStudy.learned, /requirements analysis/);
assert.equal(explicitCase.role, '');
assert.equal(explicitCase.overviewSuggestion, '');
const noRole = parser.analyze('# Another Project\n\nA documented web project for student work.', { name: 'repo' });
assert.equal(noRole.role, '');
assert.equal(noRole.type, 'Other');
assert.equal(parser.analyze('# Team Project\n\nThe repository was developed by a group of students.\n\n## Features\n- Show documented student work.').role, '');
const manualDraft = manager.draftFromReadme(readme, null, 'manual');
assert.equal(manualDraft.title, 'Sample Project');
assert.equal(manualDraft.source, 'manual');
assert.equal(manualDraft.includeInPortfolio, false);
assert.equal(manualDraft.caseStudy.problem.en, '');
assert.equal(manualDraft.readmeStatus, 'manualReadme');
assert.equal(manualDraft.overviewSuggested, true);
assert.match(manualDraft.caseStudy.overview.en, /small web tool/);
assert.equal(manualDraft.caseStudy.solution.en, '');
const githubDraft = manager.draftFromReadme('# GitHub Project\n\nA documented project with an introductory description.',
  { owner: 'eden-low', name: 'github-project', fullName: 'eden-low/github-project', topics: [] }, 'github');
assert.equal(githubDraft.readmeStatus, 'readmeNoCase');
assert.equal(githubDraft.readmeAnalyzed, true);
assert.equal(githubDraft.caseStudy.problem.en, '');
const caseDraft = manager.draftFromReadme('# Documented Project\n\n## Overview\nA documented project for event planning.\n\n## Solution\nStructured the event proposal workflow.', null, 'manual');
assert.match(caseDraft.caseStudy.overview.en, /documented project/);
assert.match(caseDraft.caseStudy.solution.en, /Structured the event/);
assert.equal(caseDraft.caseStudy.result.en, '');
assert.equal(caseDraft.overviewSuggested, false);
const githubCaseDraft = manager.draftFromReadme('# GitHub Project\n\n## Overview\nA documented project for event planning.\n\n## Solution\nStructured the event proposal workflow.',
  { owner: 'eden-low', name: 'github-project', fullName: 'eden-low/github-project', topics: [] }, 'github');
assert.equal(githubCaseDraft.readmeStatus, 'readmeFetched');
const missingReadmeDraft = manager.draftFromReadme('', { owner: 'eden-low', name: 'missing-readme', fullName: 'eden-low/missing-readme', description: 'Public metadata only', topics: [], archived: false, htmlUrl: 'https://github.com/eden-low/missing-readme' }, 'github');
assert.equal(missingReadmeDraft.title, 'missing-readme');
assert.equal(missingReadmeDraft.description, 'Public metadata only');
assert.equal(missingReadmeDraft.readmeAnalyzed, false);
assert.equal(missingReadmeDraft.readmeStatus, 'readmeMissing');
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
assert.equal(store.caseStudyReady(store.getProjects(data.PROJECTS).at(-1)), false);
const authoredDraft = { ...draft, id: 'manual-case', title: 'Case Project', role: 'Implemented the proposal form.',
  caseStudy: { overview: { en: 'A documented project for event planning.', zh: '用于活动策划的项目。' },
    solution: { en: 'Structured the event proposal workflow.', zh: '将活动提案流程结构化。' },
    result: { en: 'Delivered a documented proposal workflow.', zh: '完成有文档记录的提案流程。' } },
  includeInPortfolio: true, includeInResume: true, includeInCV: true, resumePriority: 1, cvPriority: 4 };
assert.ok(store.saveDraft(authoredDraft));
const savedCase = store.getProjects(data.PROJECTS).find(project => project.id === 'manual-case');
assert.equal(store.caseStudyReady(savedCase), true);
assert.equal(store.caseStudyReady({ ...savedCase, slug: '' }), false);
assert.match(store.caseStudyOf(savedCase).overview.en, /documented project/);
assert.match(store.caseStudyOf(savedCase).overview.zh, /活动策划/);
assert.equal(savedCase.includeInResume, true);
assert.equal(savedCase.resumePriority, 1);
assert.equal(store.resumeReadiness(savedCase).complete, 5);
assert.equal(store.cvReadiness(savedCase).complete, 6);
assert.ok(store.saveDraft({ ...authoredDraft, resumeBullets: { en: ['Built a documented proposal workflow.'], zh: ['开发提案流程。'] },
  cvResponsibilities: { en: 'Implemented the proposal form.', zh: '实现提案表单。' } }));
const withBullets = store.getProjects(data.PROJECTS).find(project => project.id === 'manual-case');
assert.equal(withBullets.resumeBullets.en[0], 'Built a documented proposal workflow.');
assert.equal(withBullets.cvResponsibilities.zh, '实现提案表单。');
assert.equal(store.resumeReadiness(withBullets).complete, 6);
assert.equal(store.cvReadiness(withBullets).complete, 6);
const suggestedUpdate = manager.draftFromReadme('# New Project\n\n## Overview\nA changed overview from the repository README.\n\n## Solution\nA changed implementation from the README.',
  { owner: 'eden-low', name: 'case', fullName: 'eden-low/case', htmlUrl: 'https://github.com/eden-low/case', topics: [] }, 'github', savedCase);
assert.equal(suggestedUpdate.caseStudy.overview.en, authoredDraft.caseStudy.overview.en);
assert.equal(suggestedUpdate.caseStudy.solution.zh, authoredDraft.caseStudy.solution.zh);
assert.equal(suggestedUpdate.includeInResume, true);
assert.equal(suggestedUpdate.resumePriority, 1);
const introductoryUpdate = manager.draftFromReadme('# New Project\n\nA newly introduced project description without a named case-study section.',
  { owner: 'eden-low', name: 'case', fullName: 'eden-low/case', htmlUrl: 'https://github.com/eden-low/case', topics: [] }, 'github', savedCase);
assert.equal(introductoryUpdate.caseStudy.overview.en, authoredDraft.caseStudy.overview.en);
assert.equal(introductoryUpdate.overviewSuggested, false);
assert.ok(store.saveDraft({ ...authoredDraft, caseStudy: {
  ...authoredDraft.caseStudy, solution: { en: '', zh: '' }, result: { en: '', zh: '' }
} }));
const clearedCase = store.getProjects(data.PROJECTS).find(project => project.id === 'manual-case');
assert.equal(store.caseStudyOf(clearedCase).solution.en, '');
assert.equal(store.caseStudyReady(clearedCase), false);
const clearedCaseUpdate = manager.draftFromReadme('# New Project\n\n## Solution\nA README solution must not replace a reviewed blank field.',
  { owner: 'eden-low', name: 'case', fullName: 'eden-low/case', topics: [] }, 'github', clearedCase);
assert.equal(clearedCaseUpdate.caseStudy.solution.en, '');
assert.ok(store.updateSelection('manual-test', { includeInPortfolio: true, includeInResume: true, includeInCV: true, resumePriority: 1, cvPriority: 3 }, data.PROJECTS));
assert.equal(store.getProjects(data.PROJECTS).at(-1).includeInCV, true);
assert.ok(store.updateSelection('edenatlas', { includeInPortfolio: false, includeInResume: false, includeInCV: false }, data.PROJECTS));
assert.equal(store.getProjects(data.PROJECTS)[0].includeInPortfolio, false);
assert.ok(store.removeImported('manual-test'));
assert.equal(store.getProjects(data.PROJECTS).length, 4);
const utar = store.getProjects(data.PROJECTS).find(project => project.id === 'utar-epms');
assert.equal(store.caseStudyReady(utar), true);
assert.equal(store.caseStudyOf(utar).problem.en, data.PROJECTS.find(project => project.id === 'utar-epms').problem.en);
assert.ok(store.saveDraft({ ...utar, title: 'Edited UTAR Project', description: 'A revised local summary.',
  role: 'Designed the project workflow.', resumeBullets: { en: ['Designed the project workflow.'], zh: [] },
  localizedBasics: { name: { en: 'Edited UTAR Project', zh: '拉曼大学活动策划管理系统' },
    short: { en: 'A revised local summary.', zh: '将活动提案、审批与策划流程结构化。' },
    role: { en: 'Designed the project workflow.', zh: '参与需求分析、系统与数据库设计及核心模块实现' } } }, data.PROJECTS));
const editedUtar = store.getProjects(data.PROJECTS).find(project => project.id === 'utar-epms');
assert.equal(editedUtar.name.en, 'Edited UTAR Project');
assert.equal(editedUtar.name.zh, '拉曼大学活动策划管理系统');
assert.equal(editedUtar.isEditedBaseline, true);
assert.equal(editedUtar.resumeBullets.en[0], 'Designed the project workflow.');
assert.ok(store.removeContentOverride('utar-epms'));
assert.equal(store.getProjects(data.PROJECTS).find(project => project.id === 'utar-epms').name, data.PROJECTS.find(project => project.id === 'utar-epms').name);
assert.ok(store.reset());
assert.equal(storage.has(store.KEY), false);
storage.set(store.KEY, JSON.stringify({ version: 1, overrides: {}, imported: [{
  id: 'manual-legacy', title: 'Legacy Local Project', description: 'An older saved project.',
  background: 'An older documented project for event planning.',
  includeInPortfolio: true, includeInResume: true, includeInCV: false,
  resumePriority: 1, cvPriority: 4, status: 'archived', source: 'manual'
}] }));
const migrated = store.getProjects(data.PROJECTS).find(project => project.id === 'manual-legacy');
assert.equal(migrated.includeInPortfolio, true);
assert.equal(migrated.includeInResume, true);
assert.equal(migrated.includeInCV, false);
assert.equal(migrated.resumePriority, 1);
assert.equal(migrated.cvPriority, 4);
assert.equal(migrated.status, 'archived');
assert.equal(store.caseStudyOf(migrated).overview, 'An older documented project for event planning.');
assert.ok(store.reset());

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
  console.log('Resume Workspace tests passed: README rules, source parsing, readiness, selections, and persistence.');
})().catch(error => { console.error(error); process.exitCode = 1; });
