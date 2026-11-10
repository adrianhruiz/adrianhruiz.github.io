import experience from '../data/experience.json'
import { formatDuration, formatMonth } from '../months.js'
import { useCurrentMonth } from '../useCurrentMonth.js'
import Section from './Section.jsx'
import Tags from './Tags.jsx'

const period = (job) => `${formatMonth(job.start)} – ${job.end ? formatMonth(job.end) : 'Present'}`

export default function Experience() {
  const currentMonth = useCurrentMonth()
  const jobs = experience.filter((job) => !job.earlier)
  // Short roles from the start of the career get one line, so they don't outweigh the main job
  const earlier = experience.filter((job) => job.earlier)

  return (
    <Section id="experience" title="Experience">
      <ol className="timeline">
        {jobs.map((job) => (
          <li key={job.company + job.start}>
            <div className="timeline-head">
              <div className="timeline-title">
                <div>
                  <h3 className="timeline-role">{job.role}</h3>
                  <p className="timeline-meta">{job.company}</p>
                </div>
                <p className="timeline-dates">
                  <b>{formatDuration(job.start, job.end ?? currentMonth)}</b>
                  {period(job)}
                </p>
              </div>
              <div className="timeline-tags">
                <Tags items={job.tags} />
                <Tags items={job.tools} variant="tools" />
              </div>
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
            </div>
          </li>
        ))}
      </ol>
      {earlier.map((job) => (
        <p className="timeline-earlier" key={job.company + job.start}>
          <b>Earlier:</b> {job.role} at {job.company}, {period(job)}
          {job.tags?.length > 0 && ` (${job.tags.join(', ')})`}.
        </p>
      ))}
    </Section>
  )
}
