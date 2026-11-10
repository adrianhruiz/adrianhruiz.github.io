// Renders the app to static HTML after the client build, so the page paints before
// React downloads. The stylesheet is small, so it is inlined to save a render-blocking
// request. Run through `npm run build`.
import { readFile, rm, writeFile } from 'node:fs/promises'

const PLACEHOLDER = '<!--app-html-->'
const STYLESHEET = /<link rel="stylesheet" crossorigin href="\/(assets\/[^"]+\.css)">/

let html = await readFile('dist/index.html', 'utf8')

if (!html.includes(PLACEHOLDER)) {
  throw new Error(`dist/index.html is missing the ${PLACEHOLDER} placeholder`)
}

const stylesheet = html.match(STYLESHEET)
if (!stylesheet) {
  throw new Error('dist/index.html has no stylesheet link to inline')
}

const css = await readFile(`dist/${stylesheet[1]}`, 'utf8')
html = html.replace(stylesheet[0], () => `<style>${css}</style>`)

const { render, years } = await import('../dist-server/entry-server.js')
html = html.replace(PLACEHOLDER, () => render())
// The meta description and its link-preview copy carry the years of experience too
html = html.replaceAll('__YEARS__', String(years))

await writeFile('dist/index.html', html)
await rm('dist-server', { recursive: true, force: true })
