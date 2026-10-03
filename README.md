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
- `public/cv/`: the original English and French CV PDFs supplied by Nathan.

Language and appearance preferences are saved locally. Direct language links use `?lang=fr` and `?lang=nl`. The Dutch website offers the original English and French CVs. Further projects are linked through GitHub.

The portfolio uses Nathan’s supplied CVs and LinkedIn profile. Programme wording follows his current specialisation, International Applied Data Intelligence. The CV files retain their original wording. KU Leuven is listed as coursework, and spoken Dutch as elementary.
