import workflow from '../data/workflow.json'
import Section from './Section.jsx'
import Tags from './Tags.jsx'

// The steps follow the order the work happens in, with each tool attached to its step
export default function Workflow() {
  return (
    <Section id="workflow" title="Workflow">
      <ol className="steps">
        {workflow.map((step, index) => (
          <li key={step.title}>
            <span className="step-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <Tags items={step.tools} variant="tools" />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
