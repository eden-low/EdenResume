/* Read-only GitHub public REST requests. No authentication or write operations. */
(() => {
  'use strict';
  const headers = { Accept: 'application/vnd.github+json' };
  async function issue(response) {
    if (response.status === 404) return 'not-found';
    if (response.status === 403 || response.status === 429) {
      if (response.headers.get('x-ratelimit-remaining') === '0' || response.status === 429) return 'rate-limit';
      try {
        const body = await response.json();
        if (/rate limit/i.test(body?.message || '')) return 'rate-limit';
      } catch { /* A 403 response may not include JSON. */ }
      return 'forbidden';
    }
    return 'github-error';
  }
  async function request(url) {
    let response;
    try { response = await fetch(url, { headers }); }
    catch { throw new Error('network'); }
    if (!response.ok) throw new Error(await issue(response));
    return response;
  }
  async function listRepositories(username = 'eden-low') {
    if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(username)) throw new Error('username');
    const repositories = [];
    for (let page = 1; page <= 10; page++) {
      const response = await request(`https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100&page=${page}`);
      let batch;
      try { batch = await response.json(); } catch { throw new Error('malformed'); }
      if (!Array.isArray(batch)) throw new Error('malformed');
      repositories.push(...batch.filter(repo => !repo.private && repo.name && repo.html_url));
      if (batch.length < 100) break;
    }
    return repositories.map(repo => ({
      id: repo.id, name: String(repo.name), fullName: String(repo.full_name || `${username}/${repo.name}`),
      description: typeof repo.description === 'string' ? repo.description : '',
      language: typeof repo.language === 'string' ? repo.language : '',
      topics: Array.isArray(repo.topics) ? repo.topics.filter(item => typeof item === 'string') : [],
      updatedAt: repo.updated_at || '', htmlUrl: repo.html_url,
      archived: repo.archived === true, owner: repo.owner?.login || username
    }));
  }
  async function readReadme(repo) {
    const response = await request(`https://api.github.com/repos/${encodeURIComponent(repo.owner)}/${encodeURIComponent(repo.name)}/readme`);
    const kind = response.headers.get('content-type') || '';
    if (/json/i.test(kind)) {
      let payload;
      try { payload = await response.json(); } catch { throw new Error('malformed'); }
      try { return window.README_PARSER.decodePayload(payload).slice(0, 100000); } catch { throw new Error('malformed'); }
    }
    if (/^(?:text\/|application\/octet-stream)/i.test(kind)) return (await response.text()).slice(0, 100000);
    throw new Error('malformed');
  }
  window.GITHUB_PUBLIC = { listRepositories, readReadme };
})();
