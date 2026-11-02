import experience from '../data/experience.json'
import Section from './Section.jsx'
import Tags from './Tags.jsx'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.company + job.dates}>
            <div className="timeline-head">
              <h3 className="timeline-role">{job.role}</h3>
              <p className="timeline-meta">
                {job.company}
                <span className="timeline-dates">{job.dates}</span>
              </p>
            </div>
            <div className="timeline-body">
              <p className="timeline-text">{job.description}</p>
              {job.highlights?.length > 0 && (
                <ul className="timeline-highlights">
                  {job.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
              <Tags items={job.tags} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
