import { useEffect, useState } from 'react'
import profile from './data/profile.json'
import Menu from './components/Menu.jsx'
import Ocean from './components/Ocean.jsx'
import Wipe from './components/Wipe.jsx'
import preloadProjectImages from './preloadProjectImages.js'
import Projects from './sections/Projects.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'

// depth: how far down the ocean the background sits (0 = surface, 1 = deepest)
const SECTIONS = [
  { id: 'about', label: 'About', depth: 0.1, Component: About },
  { id: 'projects', label: 'Projects', depth: 0.2, Component: Projects },
  { id: 'contact', label: 'Contact', depth: 0.3, Component: Contact },
]

export default function App() {
  const [active, setActive] = useState(SECTIONS[0].id)
  // 1 when moving down the menu, -1 when moving up, 0 before any change
  const [direction, setDirection] = useState(0)
  const current = SECTIONS.find((s) => s.id === active)
  const { Component } = current

  // Once the first screen is done, fetch what the other sections will need
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 200))
    idle(preloadProjectImages)
  }, [])

  function select(id) {
    if (id === active) return
    const index = (sectionId) => SECTIONS.findIndex((s) => s.id === sectionId)
    setDirection(index(id) > index(active) ? 1 : -1)
    setActive(id)
  }

  return (
    <div className="screen" style={{ '--depth': current.depth }}>
      <Ocean depth={current.depth} />
      {/* White flash that splashes away on load, like entering the pause menu */}
      <div className="splash" aria-hidden="true" />

      <header className="wallet">
        <span className="wallet-name">{profile.name}</span>
      </header>

      <main className="panel" key={active}>
        <h1 className="panel-title">{current.label}</h1>
        <Component />
      </main>

      <Menu sections={SECTIONS} active={active} onSelect={select} />

      {direction !== 0 && <Wipe key={`wipe-${active}`} direction={direction} />}
    </div>
  )
}
