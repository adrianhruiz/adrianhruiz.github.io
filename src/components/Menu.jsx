import { useRef } from 'react'

// Persona 3 Reload style command menu. Arrow keys move focus like in the game.
export default function Menu({ sections, active, onSelect }) {
  const refs = useRef([])

  function handleKeyDown(event, index) {
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key]
    if (!step) return
    event.preventDefault()
    const next = (index + step + sections.length) % sections.length
    refs.current[next]?.focus()
  }

  return (
    <nav className="menu" aria-label="Main">
      <ul>
        {sections.map((section, index) => (
          <li key={section.id} style={{ '--i': index }}>
            <button
              ref={(el) => (refs.current[index] = el)}
              type="button"
              className="menu-item"
              aria-current={section.id === active ? 'page' : undefined}
              onClick={() => onSelect(section.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span>{section.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
