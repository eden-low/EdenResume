# Low Fang Jun — Resume

A bilingual personal portfolio and printable resume for Low Fang Jun. All public resume facts live in `assets/js/data.js`; the pages render from that file.

## Tech stack

HTML5, CSS3, and vanilla JavaScript. No build step, backend, database, CDN, or external font is required.

## Features

- Responsive portfolio
- Bilingual English / Chinese
- Two selected project case studies, with an archived EdenAtlas case study still available by direct link
- Printable A4 resume
- Printable bilingual CV
- Local Project Manager for public GitHub repositories and pasted README files
- GitHub Pages compatible
- No backend required

## Local development

Open `index.html` directly in a browser, or open this folder in VS Code and use Live Server. The project links and assets use relative paths so the pages work from a GitHub Pages repository subpath.

If Node.js is available, `node scripts/smoke.js` checks page rendering, language switching, project routes, and local asset links. Node.js is not needed to use or deploy the site.

The language switch saves `en` or `zh` under the `resume-language` key in local storage. English is the default. To hide the phone number everywhere, set `PROFILE.showPhone` to `false` in `assets/js/data.js`.

## Project workspace

Open `project-manager.html` to browse public repositories for `eden-low`, read a repository README, or paste Markdown manually. README analysis uses local rules; it does not call an AI service. Every result opens as an editable draft. GitHub repositories are never selected automatically.

Saved drafts and Portfolio, Resume, and CV inclusion choices live under the `portfolio-project-data` local storage key. They affect **only that browser**; they are not published to other site visitors or committed to this repository. The Project Manager can clear these local changes. The published baseline remains in `assets/js/data.js`. The Resume displays at most two selected projects, ordered by `resumePriority`, to retain its one-page A4 layout; the CV has no project or page-count limit.

GitHub requests use only public, unauthenticated REST endpoints for repository metadata and README content. No token, write access, backend, or GitHub repository update is involved. A missing README can still produce a metadata-only draft for review.

README extraction is deterministic in `assets/js/readme-parser.js`: a level-one heading takes title precedence over the repository name, then an explicit `title:`/`name:` value. The first useful introductory paragraph becomes a draft description after badge, code, command, and boilerplate filtering. Named sections supply background, features, technologies, and setup; repository language and technology topics can supplement stated technologies. Role is left blank unless the README explicitly describes it. Project type defaults to `Other`. All extracted text remains editable and is displayed as escaped text.

## Portfolio and professional resume

`index.html`, `projects.html`, and `project.html` are the bilingual portfolio. EdenAtlas is discontinued and no longer appears in selected work; its historical case study remains accessible by its direct link. `resume.html` is a concise, one-page A4 job application document. `cv.html` is a detailed professional record that paginates naturally on A4 when printed. Both documents share `assets/css/resume.css`; CV print rules live in `assets/css/cv.css`. Public facts and project visibility settings remain in `assets/js/data.js`.

## Deployment

Create an empty GitHub repository, then run the commands below from this folder. Replace `<your-repository-url>` with the repository URL you create:

```bash
git init
git add .
git commit -m "Create resume portfolio"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

In the GitHub repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub will show the published URL when deployment completes. No repository name or custom domain is assumed.

## Content and privacy

This site has no Firebase connection. Firebase technologies appear only in the archived EdenAtlas case study and skills. Do not place private records, employer or client information, credentials, API keys, or internal URLs in `assets/js/data.js` or other public files. Review pasted README text before saving it in browser storage, especially for company work.
