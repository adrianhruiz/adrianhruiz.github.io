import workflow from '../data/workflow.json'
import Section from './Section.jsx'

export default function Workflow() {
  return (
    <Section id="workflow" title="Workflow">
      <ul className="workflow">
        {workflow.map((tool) => (
          <li key={tool.name}>
            <strong>{tool.name}</strong>
            <span>{tool.use}</span>
          </li>
        ))}
      </ul>
      <p className="workflow-text">
        Every piece of code I ship goes through <b>thorough analysis and testing</b>: covering
        scenarios, handling <b>edge cases</b> and thinking&nbsp;ahead.
      </p>
    </Section>
  )
}
