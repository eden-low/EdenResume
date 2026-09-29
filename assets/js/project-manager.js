/* Personal browser workspace: repository discovery, review, and local project choices. */
(() => {
  'use strict';
  const copy = {
    en: {
      managerLabel: 'Project Manager', heading: 'Project workspace', intro: 'Review public repositories and README files before choosing what appears in your portfolio and documents.',
      local: 'Saved in this browser only. Changes here are not published to other visitors or written to GitHub.',
      github: 'GitHub repositories', username: 'GitHub username', sync: 'Sync / Refresh', loading: 'Loading public repositories…',
      empty: 'No public repositories found for this account.', beforeSync: 'Sync to browse public repositories. Nothing is selected automatically.',
      network: 'Could not reach GitHub. Check your connection and try again.', notFound: 'GitHub account or README not found.',
      rateLimit: 'GitHub API rate limit reached. Please try again later.', forbidden: 'GitHub denied this public request.',
      malformed: 'GitHub returned an unreadable response.', genericError: 'Could not complete this request.', invalidUsername: 'Enter a valid GitHub username.',
      viewRepo: 'View Repo', readReadme: 'Read README', generate: 'Generate Project Draft', readmeUnknown: 'README: not checked',
      readmeYes: 'README: available', readmeNo: 'README: unavailable', readmeLoading: 'README: loading…', archived: 'Archived', updated: 'Updated',
      noDescription: 'No repository description.', noLanguage: 'Language not specified', preview: 'README preview (plain text)',
      readmeMissingNote: 'README unavailable or inaccessible. The draft uses public repository metadata only; review every field before saving.',
      manual: 'Paste README manually', manualIntro: 'For projects outside this GitHub account. Pasted text stays in this browser.',
      pasteLabel: 'README Markdown', analyze: 'Analyze README', pasteRequired: 'Paste README text before analyzing.',
      draft: 'Project draft', review: 'Review and edit all extracted fields. Nothing is included automatically.',
      title: 'Title', description: 'Short description', background: 'Background / purpose', features: 'Features (one per line)',
      role: 'Role / contribution', technologies: 'Technologies (comma separated)', type: 'Project type', githubUrl: 'GitHub URL',
      liveUrl: 'Live URL', source: 'Source', setup: 'Setup / usage', readme: 'README (plain Markdown)',
      includeInPortfolio: 'Include in Portfolio', includeInResume: 'Include in Resume', includeInCV: 'Include in CV',
      resumePriority: 'Resume priority', cvPriority: 'CV priority', save: 'Save Draft', cancel: 'Cancel',
      saved: 'Local projects & selections', savedIntro: 'Only checked projects appear in their selected pages. Resume shows the first two by priority to retain one A4 page.',
      remove: 'Remove local project', edit: 'Edit', reset: 'Clear all local projects and selections',
      confirmReset: 'Clear all imported projects and local selections in this browser?', confirmRemove: 'Remove this locally saved project?',
      saveError: 'Could not save in this browser. Storage may be full or disabled.', savedMessage: 'Project saved in this browser.',
      resetMessage: 'Local project data cleared.', removeMessage: 'Local project removed.', statusActive: 'Active', statusArchived: 'Archived',
      other: 'Other', personal: 'Personal', academic: 'Academic', internship: 'Internship', company: 'Company', openSource: 'Open Source', manualSource: 'Manual', legacySource: 'Legacy',
      notChecked: 'Not checked', noReadme: 'README unavailable or inaccessible. You can still review public repository metadata.',
      localProject: 'Local project', publishedProject: 'Published baseline', selected: 'Selected for'
    },
    zh: {
      managerLabel: '项目管理', heading: '项目工作区', intro: '先审阅公开仓库和 README，再决定哪些项目出现在作品集与履历中。',
      local: '仅保存在此浏览器；这里的修改不会发布给其他访客，也不会写回 GitHub。',
      github: 'GitHub 公开仓库', username: 'GitHub 用户名', sync: '同步 / 刷新', loading: '正在读取公开仓库…',
      empty: '此账号没有公开仓库。', beforeSync: '同步后可浏览公开仓库；不会自动收录任何项目。',
      network: '无法连接 GitHub。请检查网络后重试。', notFound: '找不到 GitHub 账号或 README。',
      rateLimit: '已达到 GitHub API 请求限额，请稍后重试。', forbidden: 'GitHub 拒绝了此公开请求。',
      malformed: 'GitHub 返回了无法读取的资料。', genericError: '无法完成此操作。', invalidUsername: '请输入有效的 GitHub 用户名。',
      viewRepo: '查看仓库', readReadme: '读取 README', generate: '生成项目草稿', readmeUnknown: 'README：尚未检查',
      readmeYes: 'README：可读取', readmeNo: 'README：无法读取', readmeLoading: 'README：读取中…', archived: '已归档', updated: '更新于',
      noDescription: '仓库未提供简介。', noLanguage: '未注明主要语言', preview: 'README 预览（纯文字）',
      readmeMissingNote: 'README 不存在或无法访问。草稿仅使用公开仓库资料；保存前请检查每个字段。',
      manual: '手动粘贴 README', manualIntro: '适用于不在此 GitHub 账号下的项目。粘贴内容仅保存在此浏览器。',
      pasteLabel: 'README Markdown', analyze: '分析 README', pasteRequired: '请先粘贴 README 内容。',
      draft: '项目草稿', review: '请逐项检查并编辑。草稿不会自动进入任何页面。',
      title: '项目名称', description: '简短描述', background: '背景 / 目的', features: '功能（每行一项）',
      role: '角色 / 贡献', technologies: '技术（以逗号分隔）', type: '项目类型', githubUrl: 'GitHub 链接',
      liveUrl: '线上链接', source: '来源', setup: '安装 / 使用方法', readme: 'README（纯 Markdown）',
      includeInPortfolio: '加入作品集', includeInResume: '加入 Resume', includeInCV: '加入 CV',
      resumePriority: 'Resume 优先级', cvPriority: 'CV 优先级', save: '保存草稿', cancel: '取消',
      saved: '本地项目与收录设置', savedIntro: '只有勾选的项目才会出现在相应页面。Resume 按优先级最多显示两个项目，以维持一页 A4。',
      remove: '移除本地项目', edit: '编辑', reset: '清除所有本地项目与设置',
      confirmReset: '要清除此浏览器中所有导入项目与本地收录设置吗？', confirmRemove: '要移除此本地项目吗？',
      saveError: '无法保存到此浏览器。储存空间可能已满或被禁用。', savedMessage: '项目已保存到此浏览器。',
      resetMessage: '已清除本地项目资料。', removeMessage: '已移除本地项目。', statusActive: '进行中', statusArchived: '已归档',
      other: '其他', personal: '个人', academic: '学术', internship: '实习', company: '公司', openSource: '开源', manualSource: '手动', legacySource: '历史',
      notChecked: '尚未检查', noReadme: 'README 不存在或无法访问，但仍可审阅公开仓库资料。',
      localProject: '本地项目', publishedProject: '网站原有项目', selected: '收录于'
    }
  };
  const state = { username: 'eden-low', repositories: null, loading: false, error: '', notice: '', readmes: {}, preview: null, draft: null, manual: '' };
  let managerClickHandler;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const localized = (value, language) => value && typeof value === 'object' && !Array.isArray(value) ? value[language] || value.en || '' : value || '';
  const label = (language, key) => copy[language][key] || key;
  const safeUrl = value => window.PROJECT_STORE.url(value);
  const repoKey = repo => repo.fullName;
  const projectId = repo => `github-${repo.owner.toLowerCase()}-${repo.name.toLowerCase()}`.replace(/[^a-z0-9-]/g, '-');
  const field = (language, key, value = '', kind = 'input', required = false) => `<label class="manager-field"><span>${label(language, key)}</span>${kind === 'textarea' ? `<textarea name="${key}" rows="${key === 'readme' ? 7 : 3}">${escape(value)}</textarea>` : `<input name="${key}" type="${key.endsWith('Url') ? 'url' : 'text'}" value="${escape(value)}" ${key === 'title' ? 'maxlength="90"' : ''} ${required ? 'required' : ''}>`}</label>`;
  const checkbox = (language, key, checked) => `<label class="manager-check"><input type="checkbox" name="${key}" ${checked ? 'checked' : ''}><span>${label(language, key)}</span></label>`;
  const numberField = (language, key, value) => `<label class="manager-field manager-priority"><span>${label(language, key)}</span><input type="number" name="${key}" min="1" max="99" step="1" value="${value || ''}"></label>`;
  function draftHtml(language) {
    const draft = state.draft;
    if (!draft) return '';
    const types = ['Other', 'Personal', 'Academic', 'Internship', 'Company', 'Open Source'];
    return `<section class="manager-panel manager-draft" id="draft-panel" aria-labelledby="draft-heading"><div class="manager-section-head"><div><p class="eyebrow">${label(language, 'review')}</p><h2 id="draft-heading" tabindex="-1">${label(language, 'draft')}</h2></div></div>${draft.note ? `<p class="manager-note">${label(language, draft.note)}</p>` : ''}<form id="project-draft-form">
      <div class="manager-form-grid">${field(language, 'title', draft.title, 'input', true)}${field(language, 'description', draft.description, 'textarea')}${field(language, 'background', draft.background, 'textarea')}${field(language, 'features', draft.features.join('\n'), 'textarea')}${field(language, 'role', draft.role)}${field(language, 'technologies', draft.technologies.join(', '))}<label class="manager-field"><span>${label(language, 'type')}</span><select name="type">${types.map(type => `<option value="${type}" ${draft.type === type ? 'selected' : ''}>${label(language, { 'Other': 'other', 'Personal': 'personal', 'Academic': 'academic', 'Internship': 'internship', 'Company': 'company', 'Open Source': 'openSource' }[type])}</option>`).join('')}</select></label>
      ${field(language, 'githubUrl', draft.githubUrl)}${field(language, 'liveUrl', draft.liveUrl)}<label class="manager-field"><span>${label(language, 'source')}</span><select name="source">${['github', 'manual', 'company'].map(source => `<option value="${source}" ${draft.source === source ? 'selected' : ''}>${source === 'manual' ? label(language, 'manualSource') : source === 'company' ? label(language, 'company') : 'GitHub'}</option>`).join('')}</select></label>${field(language, 'setup', draft.setup, 'textarea')}${field(language, 'readme', draft.readme, 'textarea')}</div>
      <div class="manager-choices">${checkbox(language, 'includeInPortfolio', draft.includeInPortfolio)}${checkbox(language, 'includeInResume', draft.includeInResume)}${checkbox(language, 'includeInCV', draft.includeInCV)}${numberField(language, 'resumePriority', draft.resumePriority)}${numberField(language, 'cvPriority', draft.cvPriority)}</div>
      <div class="manager-actions"><button class="button button-primary" type="submit">${label(language, 'save')}</button><button class="button button-secondary" type="button" data-action="cancel">${label(language, 'cancel')}</button></div></form></section>`;
  }
  function repositoryHtml(repo, index, language) {
    const readme = state.readmes[repoKey(repo)];
    const readmeLabel = readme?.status === 'available' ? 'readmeYes' : readme?.status === 'missing' ? 'readmeNo' : readme?.status === 'loading' ? 'readmeLoading' : 'readmeUnknown';
    const githubUrl = safeUrl(repo.htmlUrl);
    return `<article class="manager-repo"><div class="card-top"><span class="eyebrow">${escape(repo.language || label(language, 'noLanguage'))}</span>${repo.archived ? `<span class="manager-archive">${label(language, 'archived')}</span>` : ''}</div><h3>${escape(repo.name)}</h3><p>${escape(repo.description || label(language, 'noDescription'))}</p><div class="manager-meta"><span>${label(language, 'updated')}: ${escape((repo.updatedAt || '').slice(0, 10) || '—')}</span><span>${label(language, readmeLabel)}</span></div>${repo.topics.length ? `<ul class="tag-list">${repo.topics.map(topic => `<li>${escape(topic)}</li>`).join('')}</ul>` : ''}<div class="manager-actions"><a class="text-link" href="${escape(githubUrl)}" target="_blank" rel="noopener noreferrer">${label(language, 'viewRepo')} ↗</a><button class="button button-secondary" type="button" data-action="readme" data-index="${index}">${label(language, 'readReadme')}</button><button class="button button-secondary" type="button" data-action="draft-repo" data-index="${index}">${label(language, 'generate')}</button></div></article>`;
  }
  function savedHtml(data, language) {
    return data.PROJECTS.map(project => {
      const id = project.id;
      const local = project.visibility === 'local';
      const status = project.statusLabel ? localized(project.statusLabel, language) : label(language, project.status === 'archived' ? 'statusArchived' : 'statusActive');
      const sourceLabel = project.source === 'manual' ? label(language, 'manualSource') : project.source === 'company' ? label(language, 'company') : project.source === 'legacy' ? label(language, 'legacySource') : 'GitHub';
      return `<article class="manager-saved-card" data-project-id="${escape(id)}"><div class="manager-saved-head"><div><span class="eyebrow">${label(language, local ? 'localProject' : 'publishedProject')} · ${sourceLabel}</span><h3>${escape(localized(project.title || project.name, language))}</h3></div><span class="manager-status">${escape(status)}</span></div><div class="manager-choices">${checkbox(language, 'includeInPortfolio', project.includeInPortfolio)}${checkbox(language, 'includeInResume', project.includeInResume)}${checkbox(language, 'includeInCV', project.includeInCV)}${numberField(language, 'resumePriority', project.resumePriority)}${numberField(language, 'cvPriority', project.cvPriority)}</div>${local ? `<div class="manager-actions"><button class="button button-secondary" type="button" data-action="edit" data-id="${escape(id)}">${label(language, 'edit')}</button><button class="button button-plain" type="button" data-action="remove" data-id="${escape(id)}">${label(language, 'remove')}</button></div>` : ''}</article>`;
    }).join('');
  }
  function render({ data, language }) {
    document.title = language === 'zh' ? '项目工作区 — Low Fang Jun' : 'Project Workspace — Low Fang Jun';
    const repos = state.repositories;
    const repoContent = state.loading ? `<p class="manager-feedback" role="status">${label(language, 'loading')}</p>`
      : state.error ? `<p class="manager-feedback manager-error" role="alert">${label(language, state.error)}</p>`
      : repos === null ? `<p class="manager-feedback">${label(language, 'beforeSync')}</p>`
      : repos.length ? `<div class="manager-repo-grid">${repos.map((repo, index) => repositoryHtml(repo, index, language)).join('')}</div>`
      : `<p class="manager-feedback">${label(language, 'empty')}</p>`;
    return `<div class="container page-content manager-page"><header class="page-intro"><p class="eyebrow">/ ${label(language, 'managerLabel')}</p><h1>${label(language, 'heading')}<span class="hero-period">.</span></h1><p>${label(language, 'intro')}</p></header><p class="manager-local-note">${label(language, 'local')}</p>${state.notice ? `<p class="manager-feedback" role="status">${label(language, state.notice)}</p>` : ''}
      <section class="manager-panel" aria-labelledby="manager-github"><div class="manager-section-head"><h2 id="manager-github">${label(language, 'github')}</h2></div><form id="github-sync-form" class="manager-sync"><label class="manager-field"><span>${label(language, 'username')}</span><input name="username" value="${escape(state.username)}" autocomplete="off" required></label><button class="button button-primary" type="submit" ${state.loading ? 'disabled' : ''}>${label(language, 'sync')}</button></form>${repoContent}</section>
      ${state.preview ? `<section class="manager-panel" aria-labelledby="readme-preview-heading"><h2 id="readme-preview-heading">${label(language, 'preview')}</h2><pre class="manager-readme">${escape(state.preview.missing ? label(language, 'noReadme') : state.preview.content.slice(0, 12000))}</pre></section>` : ''}
      <section class="manager-panel" aria-labelledby="manager-manual"><div class="manager-section-head"><div><h2 id="manager-manual">${label(language, 'manual')}</h2><p>${label(language, 'manualIntro')}</p></div></div><form id="manual-readme-form"><label class="manager-field"><span>${label(language, 'pasteLabel')}</span><textarea name="manual" rows="8" maxlength="100000" placeholder="# ${label(language, 'title')}">${escape(state.manual)}</textarea></label><div class="manager-actions"><button class="button button-secondary" type="submit">${label(language, 'analyze')}</button></div></form></section>
      ${draftHtml(language)}
      <section class="manager-panel" aria-labelledby="manager-saved"><div class="manager-section-head"><div><h2 id="manager-saved">${label(language, 'saved')}</h2><p>${label(language, 'savedIntro')}</p></div></div><div class="manager-saved-list">${savedHtml(data, language)}</div><button class="button button-secondary manager-reset" type="button" data-action="reset">${label(language, 'reset')}</button></section></div>`;
  }
  function focusDraft() { document.getElementById('draft-heading')?.focus(); }
  function draftFromReadme(readme, repo, source) {
    const parsed = window.README_PARSER.analyze(readme, repo || {});
    return {
      id: repo ? projectId(repo) : `manual-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: parsed.title, description: parsed.description, background: parsed.background,
      features: parsed.features, role: parsed.role, technologies: parsed.technologies,
      type: parsed.type, setup: parsed.setup, githubUrl: repo?.htmlUrl || '', liveUrl: '',
      source, readme, readmeAnalyzed: !!readme, status: repo?.archived || /^edenatlas$/i.test(repo?.name || parsed.title) ? 'archived' : 'active',
      includeInPortfolio: false, includeInResume: false, includeInCV: false, resumePriority: null, cvPriority: null,
      note: !readme ? 'readmeMissingNote' : ''
    };
  }
  function bind({ data, baselineProjects, language, refresh }) {
    const main = document.getElementById('main');
    main.querySelector('#github-sync-form [name="username"]')?.addEventListener('input', event => { state.username = event.target.value; });
    main.querySelector('#manual-readme-form [name="manual"]')?.addEventListener('input', event => { state.manual = event.target.value; });
    main.querySelector('#project-draft-form')?.addEventListener('input', event => {
      if (!state.draft || !event.target.name) return;
      const { name, value } = event.target;
      if (name === 'features') state.draft.features = value.split('\n');
      else if (name === 'technologies') state.draft.technologies = value.split(',');
      else if (name.startsWith('includeIn')) state.draft[name] = event.target.checked;
      else state.draft[name] = value;
    });
    main.querySelector('#project-draft-form')?.addEventListener('change', event => {
      if (!state.draft || !event.target.name) return;
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
        includeInPortfolio: form.has('includeInPortfolio'), includeInResume: form.has('includeInResume'),
        includeInCV: form.has('includeInCV'), resumePriority: form.get('resumePriority'), cvPriority: form.get('cvPriority')
      };
      if (window.PROJECT_STORE.saveDraft(draft)) { state.draft = null; if (draft.source === 'manual') state.manual = ''; state.notice = 'savedMessage'; refresh(); }
      else { state.notice = 'saveError'; refresh(); }
    });
    if (managerClickHandler) main.removeEventListener('click', managerClickHandler);
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
      if (action === 'edit') {
        const project = data.PROJECTS.find(item => item.id === button.dataset.id && item.visibility === 'local');
        if (!project) return;
        state.draft = { ...project, title: project.title, description: project.description, background: project.background,
          features: project.features || [], technologies: project.technologies || [], setup: project.setup || '', note: '' };
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
          cached = { status: 'available', content };
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
      state.draft = draftFromReadme(cached.content, repo, 'github');
      state.draft.note = cached.status === 'missing' ? 'readmeMissingNote' : '';
      state.error = ''; refresh(); focusDraft();
    };
    main.addEventListener('click', managerClickHandler);
    main.querySelectorAll('.manager-saved-card').forEach(card => card.addEventListener('change', () => {
      const form = {
        includeInPortfolio: card.querySelector('[name="includeInPortfolio"]').checked,
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
