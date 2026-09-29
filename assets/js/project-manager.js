/* Personal browser workspace: repository discovery, review, and local project choices. */
(() => {
  'use strict';
  const copy = {
    en: {
      managerLabel: 'Resume Workspace', heading: 'Resume & CV Workspace', intro: 'Review project sources, refine your contributions, and decide what belongs in your Resume and CV.',
      local: 'Saved in this browser only. Changes here are not published to other visitors or written to GitHub.',
      github: 'Project Sources', username: 'GitHub username', sync: 'Load sources', loading: 'Loading public repositories…',
      empty: 'No public repositories found for this account.', beforeSync: 'Sync to browse public repositories. Nothing is selected automatically.',
      network: 'Could not reach GitHub. Check your connection and try again.', notFound: 'GitHub account or README not found.',
      rateLimit: 'GitHub API rate limit reached. Please try again later.', forbidden: 'GitHub denied this public request.',
      malformed: 'GitHub returned an unreadable response.', genericError: 'Could not complete this request.', invalidUsername: 'Enter a valid GitHub username.',
      viewRepo: 'View source', readReadme: 'Read README', generate: 'Review Resume Content', readmeUnknown: 'README: not checked',
      readmeFetched: 'README fetched', readmeMissing: 'README not found', readmeNoCase: 'README fetched · No case-study sections detected',
      readmeLoading: 'Fetching README…', readmeFetchError: 'README could not be fetched', manualReadme: 'README provided manually',
      readmeLocation: 'Full README text is available in the editable README field.',
      overviewSuggested: 'Overview suggested from the README introduction. Review, edit, or clear it before saving.',
      archived: 'Archived', updated: 'Updated',
      noDescription: 'No repository description.', noLanguage: 'Language not specified', preview: 'README preview (plain text)',
      readmeMissingNote: 'README unavailable or inaccessible. The draft uses public repository metadata only; review every field before saving.',
      manual: 'Import Project Content', manualIntro: 'Paste a README or project description to extract structured fields for your Resume and CV.',
      pasteLabel: 'README or project description', analyze: 'Extract Resume Fields', pasteRequired: 'Paste project content before extracting fields.',
      draft: 'Resume & CV content', review: 'Review every extracted suggestion before saving.',
      title: 'Project name', description: 'One-line summary', background: 'Background / purpose', features: 'Key features (one per line)',
      role: 'Role / contribution', technologies: 'Technologies (comma separated)', type: 'Project type', githubUrl: 'GitHub URL',
      liveUrl: 'Live URL', source: 'Source', setup: 'Setup / usage', readme: 'Source README (plain Markdown)',
      includeInResume: 'Resume', includeInCV: 'CV',
      resumePriority: 'Resume priority', cvPriority: 'CV priority', save: 'Save Draft', cancel: 'Cancel',
      saved: 'Resume & CV selection', savedIntro: 'Choose the projects and order for your documents. Changes stay in this browser.',
      resumeHelp: 'Resume shows the highest-priority selected projects to preserve the one-page layout.',
      caseStudy: 'Case Study',
      caseIntro: 'Optional. Review README suggestions and add only facts you can verify.',
      overview: 'Background / objective', problem: 'Problem', investigation: 'Investigation', solution: 'Solution', result: 'Outcome / impact', learned: 'What I Learned',
      basics: 'Project basics', contribution: 'Your contribution', resumeContent: 'Resume content', cvContent: 'CV content',
      roleHint: 'What did you personally design, build, improve, automate, or maintain?',
      summaryHint: 'Describe what the project does in one clear sentence.', bulletHint: 'Built / improved / designed ... resulting in ...',
      outcomeHint: 'What changed, improved, shipped, reduced, automated, supported, or enabled?',
      resumeBullet: 'Resume bullet', responsibilities: 'Responsibilities', technicalDecisions: 'Technical decisions',
      cvResponsibilities: 'Key contributions / responsibilities', cvTechnicalDecisions: 'Technical decisions', techSection: 'Technologies',
      resumeBullets: 'Resume bullet', outcome: 'Outcome / result', descriptionHint: 'One-line summary',
      resetEdit: 'Reset local content edit', confirmResetEdit: 'Restore this project’s published content in this browser?',
      sourceMaterial: 'Source material and additional case-study notes', readiness: 'Resume readiness', missing: 'Missing',
      cvReadiness: 'CV readiness', useIn: 'Use in', cvDetails: 'CV responsibilities / features',
      notReviewed: 'Resume / CV content: not reviewed',
      archivedGroup: 'Archived / Legacy Projects', priorityPrimary: 'Primary', prioritySecondary: 'Secondary', priorityOptional: 'Optional',
      priorityFeatured: 'Featured', priorityStandard: 'Standard', priorityReference: 'Reference', priorityExclude: 'Exclude',
      priorityExisting: 'Current position', selectionHelp: 'Resume shows at most two selected projects on its A4 page.',
      gateIntro: 'Local editing gate. It only hides this interface in the browser.', password: 'Password', unlock: 'Unlock', lock: 'Lock',
      incorrectPassword: 'Incorrect password. Please try again.', cryptoUnavailable: 'Password verification is unavailable in this browser.',
      remove: 'Remove local project', edit: 'Edit', reset: 'Clear all local projects and selections',
      confirmReset: 'Clear all imported projects and local selections in this browser?', confirmRemove: 'Remove this locally saved project?',
      saveError: 'Could not save in this browser. Storage may be full or disabled.', savedMessage: 'Project saved in this browser.',
      resetMessage: 'Local project data cleared.', removeMessage: 'Local project removed.', statusActive: 'Active', statusArchived: 'Archived',
      other: 'Other', personal: 'Personal', academic: 'Academic', internship: 'Internship', company: 'Company', openSource: 'Open Source', manualSource: 'Manual', legacySource: 'Legacy',
      notChecked: 'Not checked', noReadme: 'README unavailable or inaccessible. You can still review public repository metadata.',
      localProject: 'Local project', publishedProject: 'Published baseline', selected: 'Selected for'
    },
    zh: {
      managerLabel: '简历工作区', heading: 'Resume 与 CV 工作区', intro: '审阅项目资料、完善个人贡献，并决定哪些内容用于 Resume 和 CV。',
      local: '仅保存在此浏览器；这里的修改不会发布给其他访客，也不会写回 GitHub。',
      github: '项目资料来源', username: 'GitHub 用户名', sync: '载入资料', loading: '正在读取公开仓库…',
      empty: '此账号没有公开仓库。', beforeSync: '同步后可浏览公开仓库；不会自动收录任何项目。',
      network: '无法连接 GitHub。请检查网络后重试。', notFound: '找不到 GitHub 账号或 README。',
      rateLimit: '已达到 GitHub API 请求限额，请稍后重试。', forbidden: 'GitHub 拒绝了此公开请求。',
      malformed: 'GitHub 返回了无法读取的资料。', genericError: '无法完成此操作。', invalidUsername: '请输入有效的 GitHub 用户名。',
      viewRepo: '查看来源', readReadme: '读取 README', generate: '审阅简历内容', readmeUnknown: 'README：尚未检查',
      readmeFetched: 'README 已读取', readmeMissing: '找不到 README', readmeNoCase: 'README 已读取 · 未找到项目案例章节',
      readmeLoading: '正在读取 README…', readmeFetchError: '无法读取 README', manualReadme: '已手动提供 README',
      readmeLocation: '完整 README 位于可编辑的 README 栏位。',
      overviewSuggested: '项目概述来自 README 开头简介的建议；保存前请检查、修改或清空。',
      archived: '已归档', updated: '更新于',
      noDescription: '仓库未提供简介。', noLanguage: '未注明主要语言', preview: 'README 预览（纯文字）',
      readmeMissingNote: 'README 不存在或无法访问。草稿仅使用公开仓库资料；保存前请检查每个字段。',
      manual: '导入项目内容', manualIntro: '粘贴 README 或项目说明，提取可用于 Resume 与 CV 的结构化字段。',
      pasteLabel: 'README 或项目说明', analyze: '提取简历字段', pasteRequired: '请先粘贴项目内容。',
      draft: 'Resume 与 CV 内容', review: '保存前请逐项核对提取建议。',
      title: '项目名称', description: '一句话概述', background: '背景 / 目的', features: '主要功能（每行一项）',
      role: '角色 / 贡献', technologies: '技术（以逗号分隔）', type: '项目类型', githubUrl: 'GitHub 链接',
      liveUrl: '线上链接', source: '来源', setup: '安装 / 使用方法', readme: '来源 README（纯 Markdown）',
      includeInResume: 'Resume', includeInCV: 'CV',
      resumePriority: 'Resume 优先级', cvPriority: 'CV 优先级', save: '保存草稿', cancel: '取消',
      saved: 'Resume 与 CV 项目选择', savedIntro: '选择项目及排序；更改只保存在此浏览器。',
      resumeHelp: '为保持一页简历版式，Resume 只显示优先级最高的已选项目。',
      caseStudy: '项目案例',
      caseIntro: '选填。请核对 README 提取建议，只填写可证实的资料。',
      overview: '背景 / 目标', problem: '问题', investigation: '分析过程', solution: '解决方案', result: '成果 / 影响', learned: '学习与收获',
      basics: '项目基本资料', contribution: '个人贡献', resumeContent: 'Resume 内容', cvContent: 'CV 内容',
      roleHint: '你亲自设计、开发、改善、自动化或维护了什么？', summaryHint: '用清楚的一句话说明项目用途。',
      bulletHint: '开发 / 改善 / 设计……，带来……', outcomeHint: '项目交付、改善、减少、自动化、支持或促成了什么？',
      resumeBullet: 'Resume 要点', responsibilities: '职责', technicalDecisions: '技术决策',
      cvResponsibilities: '主要贡献 / 职责', cvTechnicalDecisions: '技术决策', techSection: '技术',
      resumeBullets: 'Resume 要点', outcome: '成果', descriptionHint: '一句话概述',
      resetEdit: '还原本地内容修改', confirmResetEdit: '要在此浏览器还原该项目原有的公开内容吗？',
      sourceMaterial: '来源资料与其他案例笔记', readiness: 'Resume 完整度', missing: '尚缺',
      cvReadiness: 'CV 完整度', useIn: '用于', cvDetails: 'CV 职责 / 功能',
      notReviewed: 'Resume / CV 内容：尚未审阅',
      archivedGroup: '归档 / 历史项目', priorityPrimary: '首选', prioritySecondary: '次选', priorityOptional: '备选',
      priorityFeatured: '重点', priorityStandard: '标准', priorityReference: '参考', priorityExclude: '不收录',
      priorityExisting: '当前排序', selectionHelp: '为保持 A4 单页，Resume 最多显示两个已选项目。',
      gateIntro: '本地编辑界面锁定；此设置只会在浏览器中隐藏界面。', password: '密码', unlock: '解锁', lock: '锁定',
      incorrectPassword: '密码错误，请重试。', cryptoUnavailable: '此浏览器无法验证密码。',
      remove: '移除本地项目', edit: '编辑', reset: '清除所有本地项目与设置',
      confirmReset: '要清除此浏览器中所有导入项目与本地收录设置吗？', confirmRemove: '要移除此本地项目吗？',
      saveError: '无法保存到此浏览器。储存空间可能已满或被禁用。', savedMessage: '项目已保存到此浏览器。',
      resetMessage: '已清除本地项目资料。', removeMessage: '已移除本地项目。', statusActive: '进行中', statusArchived: '已归档',
      other: '其他', personal: '个人', academic: '学术', internship: '实习', company: '公司', openSource: '开源', manualSource: '手动', legacySource: '历史',
      notChecked: '尚未检查', noReadme: 'README 不存在或无法访问，但仍可审阅公开仓库资料。',
      localProject: '本地项目', publishedProject: '网站原有项目', selected: '收录于'
    }
  };
  const AUTH_KEY = 'project-manager-authenticated';
  // To change the password, generate a SHA-256 hex digest in the browser console:
  // crypto.subtle.digest('SHA-256', new TextEncoder().encode(prompt('New password'))).then(bytes => console.log(Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('')))
  // Replace only this hash; never commit the password itself. This is a client-side UI gate, not server authentication.
  const PASSWORD_SHA256 = 'df6d1181353697e4f4c1e5e54b4218545c3fb52be47fd218a934a7bb09e281a4';
  let unlocked = false;
  try { unlocked = sessionStorage.getItem(AUTH_KEY) === 'true'; } catch { /* Storage may be unavailable in file browsers. */ }
  let gateError = '';
  const state = { username: 'eden-low', repositories: null, loading: false, error: '', notice: '', readmes: {}, preview: null, draft: null, manual: '' };
  const CASE_FIELDS = ['overview', 'problem', 'investigation', 'solution', 'result', 'learned'];
  let managerClickHandler;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const localized = (value, language) => value && typeof value === 'object' && !Array.isArray(value) ? value[language] || value.en || '' : value || '';
  const label = (language, key) => copy[language][key] || key;
  const safeUrl = value => window.PROJECT_STORE.url(value);
  const repoKey = repo => repo.fullName;
  const projectId = repo => `github-${repo.owner.toLowerCase()}-${repo.name.toLowerCase()}`.replace(/[^a-z0-9-]/g, '-');
  const field = (language, key, value = '', kind = 'input', required = false, hint = '') => `<label class="manager-field"><span>${label(language, key)}</span>${kind === 'textarea' ? `<textarea name="${key}" ${key === 'readme' ? 'id="draft-readme"' : ''} rows="${key === 'readme' ? 5 : 2}" placeholder="${escape(hint)}">${escape(value)}</textarea>` : `<input name="${key}" type="${key.endsWith('Url') ? 'url' : 'text'}" value="${escape(value)}" placeholder="${escape(hint)}" ${key === 'title' ? 'maxlength="90"' : ''} ${required ? 'required' : ''}>`}</label>`;
  const priorityField = (language, kind, included, value) => {
    const key = `${kind}Priority`;
    const labels = kind === 'resume' ? ['priorityPrimary', 'prioritySecondary', 'priorityOptional'] : ['priorityFeatured', 'priorityStandard', 'priorityReference'];
    const selected = included ? String(value || 3) : '';
    const options = [[ '', 'priorityExclude' ], ...labels.map((name, index) => [String(index + 1), name])];
    if (selected && !options.some(([number]) => number === selected)) options.push([selected, 'priorityExisting']);
    return `<label class="manager-field manager-priority"><span>${label(language, key)}</span><select name="${key}">${options.map(([number, name]) => `<option value="${number}" ${selected === number ? 'selected' : ''}>${label(language, name)}${name === 'priorityExisting' ? ` (${escape(number)})` : ''}</option>`).join('')}</select></label>`;
  };
  const selectionHtml = (language, project) => `<div class="manager-choices"><span class="manager-use-label">${label(language, 'useIn')}</span>${['resume', 'cv'].map(kind => `<label class="manager-check"><input type="checkbox" name="includeIn${kind === 'resume' ? 'Resume' : 'CV'}" ${project[kind === 'resume' ? 'includeInResume' : 'includeInCV'] ? 'checked' : ''}><span>${label(language, kind === 'resume' ? 'includeInResume' : 'includeInCV')}</span></label>`).join('')}${priorityField(language, 'resume', project.includeInResume, project.resumePriority)}${priorityField(language, 'cv', project.includeInCV, project.cvPriority)}</div>`;
  const syncSelection = (container, target) => {
    const kind = /Resume|resume/.test(target.name) ? 'Resume' : /CV|cv/.test(target.name) ? 'CV' : '';
    if (!kind || !/^(includeIn|resumePriority|cvPriority)/.test(target.name)) return;
    const checkbox = container.querySelector(`[name="includeIn${kind}"]`);
    const priority = container.querySelector(`[name="${kind.toLowerCase()}Priority"]`);
    if (!checkbox || !priority) return;
    if (target === checkbox) priority.value = checkbox.checked ? (priority.value || '3') : '';
    else checkbox.checked = !!priority.value;
  };
  const readinessHtml = (language, project) => {
    return `<div class="manager-readiness">${[['readiness', window.PROJECT_STORE.resumeReadiness(project)], ['cvReadiness', window.PROJECT_STORE.cvReadiness(project)]].map(([key, result]) => `<p>${label(language, key)}: <strong>${result.complete} / ${result.total}</strong>${result.missing.length ? `<span>${label(language, 'missing')}: ${result.missing.map(field => label(language, field)).join(' · ')}</span>` : ''}</p>`).join('')}</div>`;
  };
  const caseLanguage = value => {
    const han = (value.match(/[\u3400-\u9fff]/g) || []).length;
    const latin = (value.match(/[a-z]/gi) || []).length;
    return han && han * 2 >= latin ? 'zh' : 'en';
  };
  const casePair = value => value && typeof value === 'object' && !Array.isArray(value)
    ? { en: value.en || '', zh: value.zh || '' }
    : { en: value && caseLanguage(value) === 'en' ? value : '', zh: value && caseLanguage(value) === 'zh' ? value : '' };
  const caseDraft = study => Object.fromEntries(CASE_FIELDS.map(key => [key, casePair(study?.[key])]));
  const readmeStatusKey = entry => entry?.status === 'available'
    ? entry.explicitCaseSections ? 'readmeFetched' : 'readmeNoCase'
    : entry?.status === 'missing' ? 'readmeMissing'
      : entry?.status === 'loading' ? 'readmeLoading'
        : entry?.status === 'error' ? 'readmeFetchError' : 'readmeUnknown';
  const caseField = (language, key, contentLanguage, value, hint = '') => `<label class="manager-field"><span>${label(language, key)} · ${contentLanguage.toUpperCase()}</span><textarea name="caseStudy.${key}.${contentLanguage}" rows="2" placeholder="${escape(hint)}">${escape(value)}</textarea></label>`;
  const localizedField = (language, key, contentLanguage, value, hint = '') => `<label class="manager-field"><span>${label(language, key)} · ${contentLanguage.toUpperCase()}</span><textarea name="${key}.${contentLanguage}" rows="2" placeholder="${escape(hint)}">${escape(value)}</textarea></label>`;
  const typeOption = (language, type, selected) => {
    const key = { Other: 'other', Personal: 'personal', Academic: 'academic', Internship: 'internship', Company: 'company', 'Open Source': 'openSource' }[type];
    return `<option value="${escape(type)}" ${selected === type ? 'selected' : ''}>${escape(key ? label(language, key) : type)}</option>`;
  };
  function draftHtml(language) {
    const draft = state.draft;
    if (!draft) return '';
    const types = ['Other', 'Personal', 'Academic', 'Internship', 'Company', 'Open Source'];
    if (draft.type && !types.includes(draft.type)) types.unshift(draft.type);
    return `<section class="manager-panel manager-draft" id="draft-panel" aria-labelledby="draft-heading"><div class="manager-section-head"><div><p class="eyebrow">${label(language, 'review')}</p><h2 id="draft-heading" tabindex="-1">${label(language, 'draft')}</h2></div></div>${draft.note ? `<p class="manager-note">${label(language, draft.note)}</p>` : ''}${draft.readmeStatus ? `<p class="manager-readme-status" role="status">${label(language, draft.readmeStatus)}${draft.readme ? ` · ${label(language, 'readmeLocation')}` : ''}</p>` : ''}<form id="project-draft-form">
      <div id="draft-readiness">${readinessHtml(language, draft)}</div>
      <fieldset class="manager-editor-section"><legend>${label(language, 'basics')}</legend><div class="manager-form-grid">${field(language, 'title', draft.title, 'input', true)}${field(language, 'description', draft.description, 'input', false, label(language, 'summaryHint'))}<label class="manager-field"><span>${label(language, 'type')}</span><select name="type">${types.map(type => typeOption(language, type, draft.type)).join('')}</select></label><label class="manager-field"><span>${label(language, 'statusActive')} / ${label(language, 'statusArchived')}</span><select name="status"><option value="active" ${draft.status !== 'archived' ? 'selected' : ''}>${label(language, 'statusActive')}</option><option value="archived" ${draft.status === 'archived' ? 'selected' : ''}>${label(language, 'statusArchived')}</option></select></label>${field(language, 'githubUrl', draft.githubUrl)}${field(language, 'liveUrl', draft.liveUrl)}</div></fieldset>
      <fieldset class="manager-editor-section"><legend>${label(language, 'contribution')}</legend><div class="manager-case-grid manager-contribution-grid">${field(language, 'role', draft.role, 'textarea', false, label(language, 'roleHint'))}${['en', 'zh'].map(contentLanguage => localizedField(language, 'cvResponsibilities', contentLanguage, draft.cvResponsibilities?.[contentLanguage] || '', label(language, 'roleHint'))).join('')}</div></fieldset>
      <fieldset class="manager-editor-section"><legend>${label(language, 'resumeContent')}</legend><div class="manager-bullet-grid">${['en', 'zh'].map(contentLanguage => `<div><h3>${contentLanguage.toUpperCase()}</h3>${[0, 1, 2].map(index => `<label class="manager-field"><span>${label(language, 'resumeBullet')} ${index + 1}</span><input name="resumeBullets.${contentLanguage}.${index}" value="${escape(draft.resumeBullets?.[contentLanguage]?.[index] || '')}" placeholder="${escape(label(language, 'bulletHint'))}"></label>`).join('')}</div>`).join('')}</div></fieldset>
      <fieldset class="manager-editor-section"><legend>${label(language, 'cvContent')}</legend>${draft.overviewSuggested ? `<p class="manager-suggestion">${label(language, 'overviewSuggested')}</p>` : ''}<div class="manager-case-grid">${['en', 'zh'].map(contentLanguage => caseField(language, 'overview', contentLanguage, draft.caseStudy?.overview?.[contentLanguage] || '')).join('')}${field(language, 'features', draft.features.join('\n'), 'textarea')}${['en', 'zh'].map(contentLanguage => localizedField(language, 'cvTechnicalDecisions', contentLanguage, draft.cvTechnicalDecisions?.[contentLanguage] || '')).join('')}${['en', 'zh'].map(contentLanguage => caseField(language, 'result', contentLanguage, draft.caseStudy?.result?.[contentLanguage] || '', label(language, 'outcomeHint'))).join('')}</div><details class="manager-details"><summary>${label(language, 'sourceMaterial')}</summary><div class="manager-case-grid">${['problem', 'investigation', 'solution', 'learned'].map(key => ['en', 'zh'].map(contentLanguage => caseField(language, key, contentLanguage, draft.caseStudy?.[key]?.[contentLanguage] || '')).join('')).join('')}${field(language, 'background', draft.background, 'textarea')}${field(language, 'setup', draft.setup, 'textarea')}<label class="manager-field"><span>${label(language, 'source')}</span><select name="source">${['github', 'manual', 'company', 'legacy'].map(source => `<option value="${source}" ${draft.source === source ? 'selected' : ''}>${source === 'manual' ? label(language, 'manualSource') : source === 'company' ? label(language, 'company') : source === 'legacy' ? label(language, 'legacySource') : 'GitHub'}</option>`).join('')}</select></label>${field(language, 'readme', draft.readme, 'textarea')}</div></details></fieldset>
      <fieldset class="manager-editor-section"><legend>${label(language, 'techSection')}</legend>${field(language, 'technologies', draft.technologies.join(', '), 'input')}</fieldset>
      ${selectionHtml(language, draft)}<p class="manager-help">${label(language, 'selectionHelp')}</p>
      <div class="manager-actions"><button class="button button-primary" type="submit">${label(language, 'save')}</button><button class="button button-secondary" type="button" data-action="cancel">${label(language, 'cancel')}</button></div></form></section>`;
  }
  function repositoryHtml(repo, index, language) {
    const readme = state.readmes[repoKey(repo)];
    const readmeLabel = readmeStatusKey(readme);
    const githubUrl = safeUrl(repo.htmlUrl);
    const saved = window.RESUME_DATA.PROJECTS.find(project => project.id === projectId(repo));
    return `<article class="manager-repo"><div class="card-top"><span class="eyebrow">GitHub</span><span class="manager-archive">${label(language, repo.archived ? 'archived' : 'statusActive')}</span></div><h3>${escape(repo.name)}</h3><p>${escape(repo.description || label(language, 'noDescription'))}</p><div class="manager-meta"><span>${escape(repo.language || label(language, 'noLanguage'))}</span><span>${label(language, 'updated')}: ${escape((repo.updatedAt || '').slice(0, 10) || '—')}</span></div><p class="manager-readme-status" role="status">${label(language, readmeLabel)}</p>${saved ? readinessHtml(language, saved) : `<p class="manager-readiness">${label(language, 'notReviewed')}</p>`}<div class="manager-actions"><button class="button button-primary" type="button" data-action="draft-repo" data-index="${index}">${label(language, 'generate')}</button><button class="button button-secondary" type="button" data-action="readme" data-index="${index}">${label(language, 'readReadme')}</button><a class="text-link" href="${escape(githubUrl)}" target="_blank" rel="noopener noreferrer">${label(language, 'viewRepo')} ↗</a></div></article>`;
  }
  function savedHtml(data, language) {
    const card = project => {
      const id = project.id;
      const local = project.visibility === 'local';
      const status = project.statusLabel ? localized(project.statusLabel, language) : label(language, project.status === 'archived' ? 'statusArchived' : 'statusActive');
      const sourceLabel = project.source === 'manual' ? label(language, 'manualSource') : project.source === 'company' ? label(language, 'company') : project.source === 'legacy' ? label(language, 'legacySource') : 'GitHub';
      return `<article class="manager-saved-card" data-project-id="${escape(id)}"><div class="manager-saved-head"><div><span class="eyebrow">${label(language, local ? 'localProject' : 'publishedProject')} · ${sourceLabel}</span><h3>${escape(localized(project.title || project.name, language))}</h3>${readinessHtml(language, project)}</div><span class="manager-status">${escape(status)}</span></div>${selectionHtml(language, project)}<div class="manager-actions"><button class="button button-secondary" type="button" data-action="edit" data-id="${escape(id)}">${label(language, 'edit')}</button>${project.isEditedBaseline ? `<button class="button button-plain" type="button" data-action="reset-edit" data-id="${escape(id)}">${label(language, 'resetEdit')}</button>` : local ? `<button class="button button-plain" type="button" data-action="remove" data-id="${escape(id)}">${label(language, 'remove')}</button>` : ''}</div></article>`;
    };
    const active = data.PROJECTS.filter(project => project.status !== 'archived' && project.visibility !== 'historical');
    const archived = data.PROJECTS.filter(project => project.status === 'archived' || project.visibility === 'historical');
    return active.map(card).join('') + (archived.length ? `<details class="manager-details manager-archived"><summary>${label(language, 'archivedGroup')} (${archived.length})</summary><div class="manager-saved-list">${archived.map(card).join('')}</div></details>` : '');
  }
  function render({ data, language }) {
    document.title = language === 'zh' ? 'Resume 与 CV 工作区 — Low Fang Jun' : 'Resume & CV Workspace — Low Fang Jun';
    if (!unlocked) return `<div class="container page-content manager-page"><section class="manager-gate manager-panel" aria-labelledby="manager-gate-heading"><p class="eyebrow">/ ${label(language, 'managerLabel')}</p><h1 id="manager-gate-heading">${label(language, 'managerLabel')}</h1><p>${label(language, 'gateIntro')}</p><form id="manager-unlock-form"><label class="manager-field" for="manager-password"><span>${label(language, 'password')}</span></label><input id="manager-password" name="password" type="password" autocomplete="current-password" required aria-describedby="manager-gate-feedback" ${gateError ? 'aria-invalid="true"' : ''}><div class="manager-actions"><button class="button button-primary" type="submit">${label(language, 'unlock')}</button></div><p class="manager-gate-feedback${gateError ? ' manager-error' : ''}" id="manager-gate-feedback" aria-live="polite" ${gateError ? 'role="alert"' : ''}>${gateError ? label(language, gateError) : ''}</p></form></section></div>`;
    const repos = state.repositories;
    const repoContent = state.loading ? `<p class="manager-feedback" role="status">${label(language, 'loading')}</p>`
      : state.error ? `<p class="manager-feedback manager-error" role="alert">${label(language, state.error)}</p>`
      : repos === null ? `<p class="manager-feedback">${label(language, 'beforeSync')}</p>`
      : repos.length ? `<div class="manager-repo-grid">${repos.map((repo, index) => repo.archived ? '' : repositoryHtml(repo, index, language)).join('')}</div>${repos.some(repo => repo.archived) ? `<details class="manager-details manager-archived"><summary>${label(language, 'archivedGroup')} (${repos.filter(repo => repo.archived).length})</summary><div class="manager-repo-grid">${repos.map((repo, index) => repo.archived ? repositoryHtml(repo, index, language) : '').join('')}</div></details>` : ''}`
      : `<p class="manager-feedback">${label(language, 'empty')}</p>`;
    return `<div class="container page-content manager-page"><header class="page-intro"><p class="eyebrow">/ ${label(language, 'managerLabel')}</p><div class="manager-heading-row"><h1 id="manager-heading" tabindex="-1">${label(language, 'heading')}<span class="hero-period">.</span></h1><button class="button button-secondary manager-lock" type="button" id="manager-lock">${label(language, 'lock')}</button></div><p>${label(language, 'intro')}</p></header><p class="manager-local-note">${label(language, 'local')}</p>${state.notice ? `<p class="manager-feedback" role="status">${label(language, state.notice)}</p>` : ''}
      <section class="manager-panel" aria-labelledby="manager-github"><div class="manager-section-head"><h2 id="manager-github">${label(language, 'github')}</h2></div><form id="github-sync-form" class="manager-sync"><label class="manager-field"><span>${label(language, 'username')}</span><input name="username" value="${escape(state.username)}" autocomplete="off" required></label><button class="button button-primary" type="submit" ${state.loading ? 'disabled' : ''}>${label(language, 'sync')}</button></form>${repoContent}</section>
      ${state.preview ? `<details class="manager-panel manager-details" open><summary id="readme-preview-heading">${label(language, 'preview')}</summary><pre class="manager-readme">${escape(state.preview.missing ? label(language, 'noReadme') : state.preview.content.slice(0, 12000))}</pre></details>` : ''}
      <section class="manager-panel" aria-labelledby="manager-manual"><div class="manager-section-head"><div><h2 id="manager-manual">${label(language, 'manual')}</h2><p>${label(language, 'manualIntro')}</p></div></div><form id="manual-readme-form"><label class="manager-field"><span>${label(language, 'pasteLabel')}</span><textarea name="manual" rows="5" maxlength="100000" placeholder="# ${label(language, 'title')}">${escape(state.manual)}</textarea></label><div class="manager-actions"><button class="button button-secondary" type="submit">${label(language, 'analyze')}</button></div></form></section>
      ${draftHtml(language)}
      <section class="manager-panel" aria-labelledby="manager-saved"><div class="manager-section-head"><div><h2 id="manager-saved">${label(language, 'saved')}</h2><p>${label(language, 'savedIntro')}</p><p>${label(language, 'resumeHelp')}</p></div></div><div class="manager-saved-list">${savedHtml(data, language)}</div><button class="button button-secondary manager-reset" type="button" data-action="reset">${label(language, 'reset')}</button></section></div>`;
  }
  function focusDraft() { document.getElementById('draft-heading')?.focus(); }
  function draftFromReadme(readme, repo, source, existing = null) {
    const parsed = window.README_PARSER.analyze(readme, repo || {});
    const authored = existing ? caseDraft(window.PROJECT_STORE.caseStudyOf(existing)) : caseDraft();
    const overviewSuggested = !existing && !parsed.caseStudy.overview && !!parsed.overviewSuggestion;
    const suggested = caseDraft({
      ...parsed.caseStudy,
      overview: overviewSuggested ? parsed.overviewSuggestion : parsed.caseStudy.overview
    });
    // A saved local draft has already been reviewed; even intentionally blank fields stay blank.
    const caseStudy = existing ? authored : suggested;
    return {
      id: repo ? projectId(repo) : `manual-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: existing?.title || parsed.title, description: existing?.description || parsed.description,
      background: existing?.background || parsed.background, caseStudy,
      features: existing?.features?.length ? existing.features : parsed.features,
      role: existing?.role || parsed.role, technologies: existing?.technologies?.length ? existing.technologies : parsed.technologies,
      resumeBullets: existing?.resumeBullets || { en: [], zh: [] },
      cvResponsibilities: existing?.cvResponsibilities || { en: '', zh: '' },
      cvTechnicalDecisions: existing?.cvTechnicalDecisions || { en: '', zh: '' },
      type: existing?.type || parsed.type, setup: existing?.setup || parsed.setup,
      githubUrl: existing?.githubUrl || repo?.htmlUrl || '', liveUrl: existing?.liveUrl || '',
      source: existing?.source || source, readme, readmeAnalyzed: !!readme,
      readmeStatus: source === 'github'
        ? readmeStatusKey({ status: readme ? 'available' : 'missing', explicitCaseSections: Object.values(parsed.caseStudy).filter(Boolean).length })
        : readme ? 'manualReadme' : '',
      overviewSuggested,
      status: existing?.status || (repo?.archived || /^edenatlas$/i.test(repo?.name || parsed.title) ? 'archived' : 'active'),
      includeInPortfolio: existing?.includeInPortfolio === true, includeInResume: existing?.includeInResume === true,
      includeInCV: existing?.includeInCV === true, resumePriority: existing?.resumePriority ?? null, cvPriority: existing?.cvPriority ?? null,
      note: !readme ? 'readmeMissingNote' : ''
    };
  }
  function bind({ data, baselineProjects, language, refresh }) {
    const main = document.getElementById('main');
    if (managerClickHandler) main.removeEventListener('click', managerClickHandler);
    if (!unlocked) {
      main.querySelector('#manager-unlock-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const passwordInput = main.querySelector('#manager-password');
        if (!passwordInput || !globalThis.crypto?.subtle) {
          gateError = 'cryptoUnavailable'; refresh(); main.querySelector('#manager-password')?.focus(); return;
        }
        const password = passwordInput.value;
        passwordInput.value = '';
        const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
        const hash = Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
        if (hash === PASSWORD_SHA256) {
          unlocked = true; gateError = '';
          try { sessionStorage.setItem(AUTH_KEY, 'true'); } catch { /* Current-page access still works. */ }
          refresh(); main.querySelector('#manager-heading')?.focus();
        } else {
          gateError = 'incorrectPassword'; refresh(); main.querySelector('#manager-password')?.focus();
        }
      });
      main.querySelector('#manager-password')?.addEventListener('keydown', event => {
        if (event.key === 'Escape') { gateError = ''; refresh(); main.querySelector('#manager-password')?.focus(); }
      });
      return;
    }
    main.querySelector('#manager-lock')?.addEventListener('click', () => {
      unlocked = false; gateError = '';
      try { sessionStorage.removeItem(AUTH_KEY); } catch { /* Current-page access still ends. */ }
      refresh(); main.querySelector('#manager-password')?.focus();
    });
    main.querySelector('#github-sync-form [name="username"]')?.addEventListener('input', event => { state.username = event.target.value; });
    main.querySelector('#manual-readme-form [name="manual"]')?.addEventListener('input', event => { state.manual = event.target.value; });
    main.querySelector('#project-draft-form')?.addEventListener('input', event => {
      if (!state.draft || !event.target.name) return;
      const { name, value } = event.target;
      if (name.startsWith('caseStudy.')) {
        const [, field, contentLanguage] = name.split('.');
        if (CASE_FIELDS.includes(field) && ['en', 'zh'].includes(contentLanguage)) state.draft.caseStudy[field][contentLanguage] = value;
      } else if (name.startsWith('resumeBullets.')) {
        const [, contentLanguage, index] = name.split('.');
        state.draft.resumeBullets[contentLanguage][Number(index)] = value;
      } else if (name.startsWith('cvResponsibilities.') || name.startsWith('cvTechnicalDecisions.')) {
        const [key, contentLanguage] = name.split('.');
        state.draft[key][contentLanguage] = value;
      } else if (name === 'features') state.draft.features = value.split('\n');
      else if (name === 'technologies') state.draft.technologies = value.split(',');
      else if (name.startsWith('includeIn')) state.draft[name] = event.target.checked;
      else state.draft[name] = value;
      const readiness = main.querySelector('#draft-readiness');
      if (readiness) readiness.innerHTML = readinessHtml(language, state.draft);
    });
    main.querySelector('#project-draft-form')?.addEventListener('change', event => {
      if (!state.draft || !event.target.name) return;
      if (event.target.name.startsWith('caseStudy.')) return;
      syncSelection(event.currentTarget, event.target);
      if (/^(?:includeInResume|includeInCV|resumePriority|cvPriority)$/.test(event.target.name)) {
        state.draft.includeInResume = event.currentTarget.querySelector('[name="includeInResume"]').checked;
        state.draft.includeInCV = event.currentTarget.querySelector('[name="includeInCV"]').checked;
        state.draft.resumePriority = event.currentTarget.querySelector('[name="resumePriority"]').value;
        state.draft.cvPriority = event.currentTarget.querySelector('[name="cvPriority"]').value;
        return;
      }
      state.draft[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    });
    main.querySelector('#github-sync-form')?.addEventListener('submit', async event => {
      event.preventDefault();
      state.username = new FormData(event.currentTarget).get('username').trim();
      state.loading = true; state.error = ''; state.notice = ''; state.repositories = null; state.readmes = {}; state.preview = null; refresh();
      try { state.repositories = await window.GITHUB_PUBLIC.listRepositories(state.username); }
      catch (error) { state.error = error.message === 'username' ? 'invalidUsername' : ({ 'network': 'network', 'not-found': 'notFound', 'rate-limit': 'rateLimit', 'forbidden': 'forbidden', 'malformed': 'malformed' }[error.message] || 'genericError'); }
      state.loading = false; refresh();
    });
    main.querySelector('#manual-readme-form')?.addEventListener('submit', event => {
      event.preventDefault();
      state.manual = new FormData(event.currentTarget).get('manual').trim();
      if (!state.manual) { state.notice = 'pasteRequired'; refresh(); return; }
      state.draft = draftFromReadme(state.manual, null, 'manual');
      state.notice = ''; refresh(); focusDraft();
    });
    main.querySelector('#project-draft-form')?.addEventListener('submit', event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const draft = {
        ...state.draft,
        title: form.get('title'), description: form.get('description'), background: form.get('background'),
        features: form.get('features').split('\n').map(item => item.trim()).filter(Boolean),
        role: form.get('role'), technologies: form.get('technologies').split(',').map(item => item.trim()).filter(Boolean),
        type: form.get('type'), githubUrl: form.get('githubUrl'), liveUrl: form.get('liveUrl'),
        source: form.get('source'), setup: form.get('setup'), readme: form.get('readme'),
        status: form.get('status'),
        resumeBullets: Object.fromEntries(['en', 'zh'].map(contentLanguage => [contentLanguage,
          [0, 1, 2].map(index => form.get(`resumeBullets.${contentLanguage}.${index}`)?.trim() || '').filter(Boolean)])),
        cvResponsibilities: { en: form.get('cvResponsibilities.en') || '', zh: form.get('cvResponsibilities.zh') || '' },
        cvTechnicalDecisions: { en: form.get('cvTechnicalDecisions.en') || '', zh: form.get('cvTechnicalDecisions.zh') || '' },
        caseStudy: Object.fromEntries(CASE_FIELDS.map(key => [key, {
          en: form.get(`caseStudy.${key}.en`) || '', zh: form.get(`caseStudy.${key}.zh`) || ''
        }])),
        includeInPortfolio: state.draft.includeInPortfolio === true,
        includeInResume: form.has('includeInResume') && !!form.get('resumePriority'), includeInCV: form.has('includeInCV') && !!form.get('cvPriority'),
        resumePriority: form.get('resumePriority'), cvPriority: form.get('cvPriority')
      };
      if (baselineProjects.some(project => project.id === draft.id)) {
        const basics = state.draft.localizedBasics || {};
        draft.localizedBasics = {
          name: { ...(basics.name || {}), [language]: draft.title },
          short: { ...(basics.short || {}), [language]: draft.description },
          role: { ...(basics.role || {}), [language]: draft.role }
        };
      }
      if (window.PROJECT_STORE.saveDraft(draft, baselineProjects)) { state.draft = null; if (draft.source === 'manual') state.manual = ''; state.notice = 'savedMessage'; refresh(); }
      else { state.notice = 'saveError'; refresh(); }
    });
    managerClickHandler = async event => {
      const button = event.target.closest('[data-action]');
      if (!button) return;
      const action = button.dataset.action;
      if (action === 'cancel') { state.draft = null; refresh(); return; }
      if (action === 'reset') {
        if (!window.confirm(label(language, 'confirmReset'))) return;
        state.notice = window.PROJECT_STORE.reset() ? 'resetMessage' : 'saveError'; state.draft = null; state.manual = ''; state.preview = null; refresh(); return;
      }
      if (action === 'remove') {
        if (!window.confirm(label(language, 'confirmRemove'))) return;
        state.notice = window.PROJECT_STORE.removeImported(button.dataset.id) ? 'removeMessage' : 'saveError'; refresh(); return;
      }
      if (action === 'reset-edit') {
        if (!window.confirm(label(language, 'confirmResetEdit'))) return;
        state.notice = window.PROJECT_STORE.removeContentOverride(button.dataset.id) ? 'resetMessage' : 'saveError';
        refresh(); return;
      }
      if (action === 'edit') {
        const project = data.PROJECTS.find(item => item.id === button.dataset.id);
        if (!project) return;
        state.draft = { ...project, title: localized(project.title || project.name, language),
          description: localized(project.description || project.short, language),
          background: localized(project.background || project.overview, language),
          role: localized(project.role, language), type: localized(project.type || project.category, 'en'),
          localizedBasics: baselineProjects.some(item => item.id === project.id) ? {
            name: typeof project.name === 'object' ? { ...project.name } : { en: project.name, zh: project.name },
            short: typeof project.short === 'object' ? { ...project.short } : { en: project.short, zh: project.short },
            role: typeof project.role === 'object' ? { ...project.role } : { en: project.role, zh: project.role }
          } : null,
          features: project.features || [], technologies: project.technologies || [], setup: project.setup || '',
          resumeBullets: { en: [...(project.resumeBullets?.en || [])], zh: [...(project.resumeBullets?.zh || [])] },
          cvResponsibilities: { ...project.cvResponsibilities }, cvTechnicalDecisions: { ...project.cvTechnicalDecisions },
          caseStudy: caseDraft(window.PROJECT_STORE.caseStudyOf(project)), note: '' };
        refresh(); focusDraft(); return;
      }
      if (action !== 'readme' && action !== 'draft-repo') return;
      const repo = state.repositories?.[Number(button.dataset.index)];
      if (!repo) return;
      const key = repoKey(repo);
      let cached = state.readmes[key];
      if (!cached) {
        state.readmes[key] = { status: 'loading' }; refresh();
        try {
          const content = await window.GITHUB_PUBLIC.readReadme(repo);
          const analyzed = window.README_PARSER.analyze(content, repo);
          cached = { status: 'available', content, explicitCaseSections: Object.values(analyzed.caseStudy).filter(Boolean).length };
        } catch (error) {
          cached = error.message === 'not-found' ? { status: 'missing', content: '' } : { status: 'error', content: '', error: error.message };
        }
        state.readmes[key] = cached;
      }
      if (cached.status === 'error') {
        state.notice = ({ 'network': 'network', 'rate-limit': 'rateLimit', 'forbidden': 'forbidden', 'malformed': 'malformed' }[cached.error] || 'genericError');
        refresh(); return;
      }
      if (action === 'readme') { state.preview = { missing: cached.status === 'missing', content: cached.content }; refresh(); return; }
      const existing = data.PROJECTS.find(project => project.id === projectId(repo) && project.visibility === 'local');
      state.draft = draftFromReadme(cached.content, repo, 'github', existing);
      state.draft.readmeStatus = readmeStatusKey(cached);
      state.draft.note = cached.status === 'missing' ? 'readmeMissingNote' : '';
      state.error = ''; refresh(); focusDraft();
    };
    main.addEventListener('click', managerClickHandler);
    main.querySelectorAll('.manager-saved-card').forEach(card => card.addEventListener('change', event => {
      syncSelection(card, event.target);
      const form = {
        includeInPortfolio: data.PROJECTS.find(project => project.id === card.dataset.projectId)?.includeInPortfolio === true,
        includeInResume: card.querySelector('[name="includeInResume"]').checked,
        includeInCV: card.querySelector('[name="includeInCV"]').checked,
        resumePriority: card.querySelector('[name="resumePriority"]').value,
        cvPriority: card.querySelector('[name="cvPriority"]').value
      };
      state.notice = window.PROJECT_STORE.updateSelection(card.dataset.projectId, form, baselineProjects) ? '' : 'saveError';
      refresh();
    }));
  }
  window.ProjectManager = { render, bind, state, draftFromReadme };
})();
