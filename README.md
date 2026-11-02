# Portfolio

Personal portfolio of Adrian Hermosilla, built with Vite + React and published on GitHub Pages.

**Live:** https://adrianhruiz.github.io/

## Development

```bash
npm install
npm run dev
```

`npm run lint` checks the code with oxlint and `npm run build` generates the site in `dist/`.

## Content

All the content lives in `src/data/`:

- `profile.json`: name, photo and links (email, LinkedIn, GitHub).
- `experience.json`: jobs shown in Experience, with their tags.
- `workflow.json`: tools shown in Workflow and what each one is used for.
- `projects.json`: personal projects.

The hero and Workflow texts are in `src/components/Hero.jsx` and `src/components/Workflow.jsx`.

### Adding a project

Add an entry to `src/data/projects.json` and put the image in `public/projects/`:

```json
{
  "title": "My project",
  "description": "What it does and why I built it.",
  "url": "https://my-project.example",
  "repo": "https://github.com/adrianhruiz/my-project",
  "image": { "src": "projects/my-project.jpg", "width": 1440, "height": 900 }
}
```

The card opens `url` when it is set, otherwise `repo`. Images keep their own aspect ratio, so
`width` and `height` must match the real file to avoid layout shifts.

## Deploy

Every push to `main` builds and publishes the site through `.github/workflows/deploy.yml`.
In the repo settings, **Pages → Source** must be set to **GitHub Actions**.

The repo must be named `adrianhruiz.github.io` so the site is served from the root, which is
why `base` is `/` in `vite.config.js`.

`design-directions.html` is the design exploration the site came from. It is not part of the
build and loads its images from the previous portfolio repo next to this one.
