import profile from '../data/profile.json'
import { useScrollState } from '../useScrollState.js'

const SECTIONS = [
  { id: 'workflow', label: 'Workflow' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
]
const SECTION_IDS = SECTIONS.map((section) => section.id)

const INITIALS = profile.name
  .split(' ')
  .map((word) => `${word[0]}.`)
  .join('')

export default function Nav() {
  const { active, pastHero } = useScrollState(SECTION_IDS, 'top')

  return (
    <nav className="nav" aria-label="Sections">
      <ul>
        {/* The initials lead back to the top once the hero is out of sight */}
        {pastHero && (
          <li className="nav-mark">
            <a href="#top" aria-label="Back to top">
              {INITIALS}
            </a>
          </li>
        )}
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}>
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
