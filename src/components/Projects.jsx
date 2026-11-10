import projects from '../data/projects.json'
import profile from '../data/profile.json'
import Section from './Section.jsx'

// The language only picks the tint of the card's glow; unknown languages keep the default one
const projectClass = (language) => `project project--${language.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

export default function Projects() {
  return (
    <Section id="projects" title="Personal projects">
      <ul className="project-grid">
        {projects.map((project) => (
          <li key={project.title}>
            {/* The card opens the live site when there is one, otherwise the repository */}
            <a className={projectClass(project.language)} href={project.url || project.repo} target="_blank" rel="noreferrer">
              {project.url && <span className="project-live">live</span>}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </a>
          </li>
        ))}
      </ul>
      <a className="btn more-link" href={profile.links.repositories} target="_blank" rel="noreferrer">
        More on GitHub <span aria-hidden="true">↗</span>
      </a>
    </Section>
  )
}
