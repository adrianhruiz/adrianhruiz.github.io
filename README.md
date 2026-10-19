# adrianhruiz.github.io

Personal portfolio inspired by the Persona 3 Reload menu. Built with Vite + React, deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Content

- `src/data/profile.json`: name shown at the top left.
- `src/data/projects.json`: the projects.
- `src/sections/About.jsx` and `src/sections/Contact.jsx`: about text and contact links.

### Adding a project

Add an entry to `src/data/projects.json`:

```json
{
  "title": "My project",
  "year": 2026,
  "status": "Live",
  "description": "What it does, why I built it and what came out of it.",
  "tags": ["react"],
  "url": "https://live-demo.example",
  "repo": "https://github.com/adrianhruiz/my-project",
  "image": "projects/my-project.png",
  "media": [
    "projects/my-project-1.png",
    { "src": "projects/demo.mp4", "caption": "Demo" },
    "https://www.youtube.com/watch?v=VIDEO_ID"
  ]
}
```

Every field except `title` is optional (leave strings as `""`). Media files go in `public/projects/`.

The list shows `year`, `status`, `title`, `description` and `tags`. Clicking a project opens its page
(Esc goes back) with the year, the description, a gallery, the tech stack (`tags`) and the links.
Media entries can be images, videos (`.mp4`, `.webm`) or YouTube links, as a plain string or as
`{ "src": ..., "caption": ... }`. Without `media`, the gallery shows `image`.

## Deploy

Every push to `main` builds and publishes the site through `.github/workflows/deploy.yml`.
In the repo settings, set **Pages → Source** to **GitHub Actions**.
