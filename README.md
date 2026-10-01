# Nathan Gatse — portfolio

A responsive React / Vite portfolio with a warm brown palette, glass navigation, light **Latte** and dark **Espresso** themes, and English (default), French, and Dutch content.

## Run locally

```sh
npm ci
npm run dev
```

Build with `npm run build`. GitHub Pages deploys automatically when changes reach `main` through `.github/workflows/deploy.yml`.

## Content and behaviour

- `src/content.js`: translations, selected project case studies, skills, and contact links.
- `src/App.jsx`: language/theme preferences, searchable project filters, native modal dialogs, pipeline illustration, skills tabs, mobile navigation, and CV downloads.
- `src/styles.css`: responsive layouts, colour variables, project illustrations, and reduced-motion support.
- `public/cv/`: original, unmodified English and French CVs supplied by Nathan. The Dutch website links to these originals; no Dutch CV is implied.

English is the default for new visitors. Language and theme preferences are saved on the device when storage is available. French and Dutch can be linked directly with `?lang=fr` and `?lang=nl`. The language switch also updates the document language, title, description, and canonical URL.

Selected projects remain available if GitHub’s unauthenticated API is unavailable. Additional public repositories are added when the API succeeds. The lab animation and card illustrations are explanatory visuals, not live analytics or screenshots of the projects. No contact form backend is required: email links open the visitor’s mail app, and the copy action uses the clipboard with a clear fallback message.

## Content provenance

The English and French CVs (`Nathan_Gatse_CV_EN_F.pdf` and `Nathan_Gatse_CV_FR.pdf`) and Nathan’s public LinkedIn profile informed experience, tools, education, and the three principal CV projects. Existing repository project descriptions were retained and translated. Current programme wording uses International Business Management with specialisation International Applied Data Intelligence; the downloaded PDFs retain their original historical wording.

No exact graduation date is asserted. Internship interest is presented for 2027. KU Leuven is explicitly described as coursework, not an awarded degree. Spoken Dutch is described as elementary, irrespective of the availability of a Dutch website translation.
