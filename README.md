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
- Local Resume & CV Workspace for project sources, contribution notes, and document content
- GitHub Pages compatible
- No backend required

## Local development

Open `index.html` directly in a browser, or open this folder in VS Code and use Live Server. The project links and assets use relative paths so the pages work from a GitHub Pages repository subpath.

If Node.js is available, `node scripts/smoke.js` checks page rendering, language switching, project routes, and local asset links. Node.js is not needed to use or deploy the site.

The language switch saves `en` or `zh` under the `resume-language` key in local storage. English is the default. To hide the phone number everywhere, set `PROFILE.showPhone` to `false` in `assets/js/data.js`.

## Resume & CV workspace

Open `project-manager.html` to review project sources and write Resume/CV content. GitHub repositories and pasted README text are input sources, not a publishing system. The owner interface has a client-side password gate. The SHA-256 password hash and a short browser-console command for replacing it are beside `PASSWORD_SHA256` in `assets/js/project-manager.js`; keep the plaintext password out of this public repository. Unlock state lasts for the current tab session, and **Lock** clears that session flag without clearing projects. This only hides the interface in the browser; a static site cannot provide server-side access control or make locally stored data private.

README analysis uses local rules; it does not call an AI service. Every result opens as an editable draft. GitHub repositories are never selected automatically.

Project drafts can include optional English and Chinese case-study sections. Matching README headings supply explicit case-study fields. If no Overview section exists, the README introduction may supply a clearly marked, editable Overview suggestion; other missing sections stay blank. A project shows **View Case Study** when it has an overview and another substantive case-study section. Otherwise, its card offers **View Project** and the detail page identifies that a full case study is unavailable. Existing authored case studies remain in `assets/js/data.js`; older browser-saved projects and their selections remain readable.

The workspace groups project basics, personal contribution, English/Chinese Resume bullets, CV details, and technologies. Deterministic Resume and CV readiness indicators each report six field checks and list missing content; they are not AI scores. Resume and CV inclusion uses visible checkboxes and named priority options, stored as the existing numeric order. Source README, setup notes, and additional case-study fields are collapsed by default. Archived projects are grouped separately.

Saved drafts, local edits to published project content, and selection choices live under the existing `portfolio-project-data` local storage key. Older stored projects remain readable. They affect **only that browser**; they are not published to other site visitors or committed to this repository. The workspace can clear these local changes. The published baseline remains in `assets/js/data.js`. The Resume displays at most two selected projects, ordered by `resumePriority`, and shows the first authored bullet for each to protect its one-page A4 layout; the CV has no project or page-count limit and can show all authored bullets and notes. Portfolio inclusion remains an internal compatibility field and is not a primary workspace control.

GitHub requests use only public, unauthenticated REST endpoints for repository metadata and README content. No token, write access, backend, or GitHub repository update is involved. A missing README can still produce a metadata-only draft for review.

README extraction is deterministic in `assets/js/readme-parser.js`: a level-one heading takes title precedence over the repository name, then an explicit `title:`/`name:` value. The first useful introductory paragraph becomes a draft description after badge, code, command, and boilerplate filtering. When a second introductory paragraph exists, it is preferred as an Overview suggestion; otherwise the first is used. Named sections include nested headings until the next heading at the same or higher level. They supply background, features, technologies, setup, and explicitly titled case-study sections; repository language and technology topics can supplement stated technologies. Role is left blank unless the README explicitly describes it. Project type defaults to `Other`. The workspace displays whether a README was fetched, missing, or had no matching case-study sections. All extracted text remains editable and is displayed as escaped text. Resume bullets and personal outcomes require human review; they are not invented from repository metadata.

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
