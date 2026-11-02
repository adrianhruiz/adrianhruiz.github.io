import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used at build time by scripts/prerender.js to ship the page as static HTML
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
