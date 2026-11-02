import projects from '../data/projects.json'
import profile from '../data/profile.json'
import { asset } from '../asset.js'
import Section from './Section.jsx'

export default function Projects() {
  return (
    <Section id="projects" title="Personal projects">
      {projects.map((project) => (
        // The card opens the live site when there is one, otherwise the repository
        <a
          key={project.title}
          className="project"
          href={project.url || project.repo}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={asset(project.image.src)}
            alt={`${project.title} screenshot`}
            width={project.image.width}
            height={project.image.height}
            loading="lazy"
          />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </a>
      ))}
      <a className="btn more-link" href={profile.links.repositories} target="_blank" rel="noreferrer">
        More on GitHub <span aria-hidden="true">↗</span>
      </a>
    </Section>
  )
}
