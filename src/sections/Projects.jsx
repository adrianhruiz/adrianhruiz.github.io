import projects from '../data/projects.json'
import ProjectCarousel from '../components/ProjectCarousel.jsx'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export default function Projects() {
  if (projects.length === 0) {
    return <p className="muted">Coming soon.</p>
  }

  return (
    <ul className="project-list">
      {projects.map((project) => (
        <li key={project.title} className="project">
          {Array.isArray(project.image) ? (
            <ProjectCarousel images={project.image} />
          ) : (
            project.image && (
              <img className="project-image" src={asset(project.image)} alt="" />
            )
          )}
          {(project.year || project.status) && (
            <p className="project-meta">
              {project.year}
              {project.status && <span className="status">{project.status}</span>}
            </p>
          )}
          <h2 className="slash-hover">
            <a className="project-open" href={project.repo} target="_blank" rel="noreferrer">
              <span>{project.title}</span>
            </a>
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
