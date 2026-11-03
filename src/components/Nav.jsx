const SECTIONS = [
  { id: 'workflow', label: 'Workflow' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Personal projects' },
]

export default function Nav() {
  return (
    <nav className="nav" aria-label="Sections">
      <ul>
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
