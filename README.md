# Portfolio

Personal portfolio of Adrian Hermosilla, built with Vite + React and published on GitHub Pages.

**Live:** https://adrianhruiz.github.io/

## Development

```bash
npm install
npm run dev
```

`npm run lint` checks the code with oxlint and `npm run build` generates the site in `dist/`.

The build prerenders the page to static HTML (`scripts/prerender.js`) and inlines the
stylesheet, so the content paints before React loads; React then hydrates it.

## Content

All the content lives in `src/data/`:

- `profile.json`: name, location, career start, photo, CV and links (email, LinkedIn, GitHub).
  The years of experience in the hero are calculated from `careerStart` (`YYYY-MM`). The meta and
  Open Graph descriptions in `index.html` get the same number at build time: the `__YEARS__`
  placeholder is replaced in `scripts/prerender.js`.
- `experience.json`: jobs shown in Experience, with their highlights and tags. Each job has
  `start` and `end` (`YYYY-MM`; `end: null` means Present); the period and the duration are
  calculated from them. A job with `"earlier": true` is shown as a one-line "Earlier:" note
  under the timeline.
- `workflow.json`: ordered steps shown in Workflow, each with `title`, `text` and optional `tools`.
- `projects.json`: personal projects.

The only hand-written hero copy is in `src/components/Hero.jsx`; the Workflow copy lives in
`workflow.json` and the closing block copy in `src/components/Contact.jsx`.

### CV

Put the PDF in `public/` (for example `public/cv.pdf`) and set `"cv": "cv.pdf"` in `profile.json`.
The **Download CV** button only shows up when `cv` is set.

### Link preview

`public/og-image.png` is the image shown when the site is shared. It is generated from
`scripts/og-image.html`; the command to regenerate it is at the top of that file.

### Fonts and images

Fonts are self-hosted in `public/fonts/`, subset to the characters the site uses.
`scripts/fonts.sh` downloads and subsets them again (it needs `uv`); add any new symbol
used in the copy to its `UNICODES` list first.

Project screenshots and the avatar are served as resized WebP variants. After adding or
replacing an image, run `scripts/optimize-images.sh` (it needs ImageMagick).

### Adding a project

Add an entry to `src/data/projects.json`. No image is needed: the card is generated.

```json
{
  "title": "My project",
  "description": "What it does and why I built it.",
  "language": "TypeScript",
  "url": "https://my-project.example",
  "repo": "https://github.com/adrianhruiz/my-project"
}
```

The card opens `url` when it is set, otherwise `repo`. `language` tints the card glow: the known
ones are javascript, kotlin, typescript, python and php (the `.project--<language>` rules in
`src/styles.css`); any other language uses the default glow.

## Deploy

Every push to `main` builds and publishes the site through `.github/workflows/deploy.yml`.
In the repo settings, **Pages → Source** must be set to **GitHub Actions**.

The repo must be named `adrianhruiz.github.io` so the site is served from the root, which is
why `base` is `/` in `vite.config.js`.

`design-directions.html` is the design exploration the site came from. It is not part of the
build and loads its images from the previous portfolio repo next to this one.
