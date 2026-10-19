import { useState } from 'react'
import projects from '../data/projects.json'
import ProjectDetail from '../components/ProjectDetail.jsx'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export default function Projects() {
  // Index of the project whose sheet is open, or null for the list
  const [selected, setSelected] = useState(null)

  if (projects.length === 0) {
    return <p className="muted">Coming soon.</p>
  }

  if (selected !== null) {
    return <ProjectDetail project={projects[selected]} onBack={() => setSelected(null)} />
  }

  return (
    <ul className="project-list">
      {projects.map((project, index) => (
        <li key={project.title} className="project">
          {project.image && (
            <img className="project-image" src={asset(project.image)} alt="" loading="lazy" />
          )}
          {(project.year || project.status) && (
            <p className="project-meta">
              {project.year}
              {project.status && <span className="status">{project.status}</span>}
            </p>
          )}
          <h2 className="slash-hover">
            <button type="button" className="project-open" onClick={() => setSelected(index)}>
              <span>{project.title}</span>
            </button>
          </h2>
          <p>{project.description}</p>
          {project.tags?.length > 0 && (
            <ul className="tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
