import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import profile from './data/profile.json'
import { yearsSince } from './yearsSince.js'

/* global __BUILD_DATE__ */

// Used at build time by scripts/prerender.js to ship the page as static HTML
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// Years of experience for the meta tags in index.html, which React does not render
export const years = yearsSince(profile.careerStart, new Date(__BUILD_DATE__))
