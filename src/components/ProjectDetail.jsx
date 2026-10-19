import { useEffect, useRef } from 'react'
import MediaGallery from './MediaGallery.jsx'

// Extended project sheet, with a header styled like the Social Link screen
// of Persona 3 Reload. Esc goes back to the list.
export default function ProjectDetail({ project, onBack }) {
  const rootRef = useRef(null)
  const backRef = useRef(null)

  useEffect(() => {
    backRef.current?.focus({ preventScroll: true })
    rootRef.current?.scrollIntoView({ block: 'start' })
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  const media = project.media?.length ? project.media : project.image ? [project.image] : []

  return (
    <article className="detail" ref={rootRef}>
      <button ref={backRef} type="button" className="detail-back" onClick={onBack}>
        <span className="chevron">‹</span> Back <kbd>Esc</kbd>
      </button>

      <header className="detail-card">
        <span className="detail-tag">Project</span>
        <h2 className="detail-title">{project.title}</h2>
        {project.year && (
          <div className="detail-year">
            <span className="detail-year-label">Year</span>
            <span className="detail-year-value">{project.year}</span>
          </div>
        )}
      </header>

      <p className="detail-description">{project.description}</p>

      {media.length > 0 && <MediaGallery items={media} />}

      {project.tags?.length > 0 && (
        <section>
          <h3 className="detail-label">Tech stack</h3>
          <ul className="detail-list">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </section>
      )}

      {(project.url || project.repo) && (
        <div className="detail-actions">
          {project.url && (
            <span className="slash-hover">
              <a href={project.url} target="_blank" rel="noreferrer"><span>Live</span></a>
            </span>
          )}
          {project.repo && (
            <span className="slash-hover">
              <a href={project.repo} target="_blank" rel="noreferrer"><span>GitHub repository</span></a>
            </span>
          )}
        </div>
      )}
    </article>
  )
}
