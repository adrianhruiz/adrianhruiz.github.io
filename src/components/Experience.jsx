import experience from '../data/experience.json'
import Section from './Section.jsx'
import Tags from './Tags.jsx'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="timeline">
        {experience.map((job) => (
          <li key={job.company + job.dates}>
            <h3 className="timeline-role">{job.role}</h3>
            <p className="timeline-meta">
              {job.company}
              <span className="timeline-dates">{job.dates}</span>
            </p>
            <p className="timeline-text">{job.description}</p>
            <Tags items={job.tags} />
          </li>
        ))}
      </ol>
    </Section>
  )
}
