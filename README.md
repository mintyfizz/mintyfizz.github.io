# Nathan Gatse — portfolio

A focused React / Vite portfolio in English (default), French, and Dutch, with a warm brown palette and light/dark appearance settings.

## Development

```sh
npm ci
npm run dev
npm run build
```

GitHub Pages deploys on pushes to `main` through `.github/workflows/deploy.yml`.

## Content

- `src/content.js`: translations, four selected project case studies, skills, and contact links.
- `src/App.jsx`: navigation, language/theme preferences, project dialogs, experience, and CV downloads.
- `src/styles.css`: responsive layouts and appearance variables.
- `public/cv/`: English and French CVs, with the company project anonymized for public sharing.

Language and appearance preferences are saved locally. Direct language links use `?lang=fr` and `?lang=nl`. The Dutch website offers the English and French CVs. Further projects are linked through GitHub.

The portfolio uses Nathan’s supplied CVs and LinkedIn profile. Programme wording follows his current specialisation, International Applied Data Intelligence. The public CVs remove the company project’s brand; source copies are preserved locally. KU Leuven is listed as coursework, and spoken Dutch as elementary.

## Project case studies

Each project opens a detailed EN/FR/NL case study with purpose, contribution, interactive workflow, data structure, design decisions, worked example, results, limitations and source links. Public project evidence is pinned to the inspected code revision. The company case is an anonymized functional overview, not a disclosure of its internal schema.

Case studies support direct links through `?project=<project-id>` and can be combined with `&lang=fr` or `&lang=nl`. Workflow steps support arrow keys and Home/End. The dialog supports Escape, browser Back, focus restoration and reduced motion.
