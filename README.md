# Low Fang Jun — Resume

A bilingual personal portfolio and printable resume for Low Fang Jun. All public resume facts live in `assets/js/data.js`; the pages render from that file.

## Tech stack

HTML5, CSS3, and vanilla JavaScript. No build step, backend, database, CDN, or external font is required.

## Features

- Responsive portfolio
- Bilingual English / Chinese
- Three project case studies
- Printable A4 resume
- Printable bilingual CV
- GitHub Pages compatible
- No backend required

## Local development

Open `index.html` directly in a browser, or open this folder in VS Code and use Live Server. The project links and assets use relative paths so the pages work from a GitHub Pages repository subpath.

If Node.js is available, `node scripts/smoke.js` checks page rendering, language switching, project routes, and local asset links. Node.js is not needed to use or deploy the site.

The language switch saves `en` or `zh` under the `resume-language` key in local storage. English is the default. To hide the phone number everywhere, set `PROFILE.showPhone` to `false` in `assets/js/data.js`.

## Portfolio and professional resume

`index.html`, `projects.html`, and `project.html` are the bilingual portfolio: they retain detailed project stories and the dark site design. `resume.html` is a concise, one-page A4 job application document. `cv.html` is a detailed, two-page A4 professional record. Both documents share `assets/css/resume.css` and the browser print dialog. Their editorial copy and the public facts remain in `assets/js/data.js`.

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

This site has no Firebase connection. Firebase technologies appear only as descriptions of EdenAtlas project work and skills. Do not place private records, employer or client information, credentials, API keys, or internal URLs in `assets/js/data.js` or other public files.
