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
      <div className="workflow-text">
        <p>
          In my experience, much of the development time is won in requirements and analysis: a
          well-understood problem is easier to deliver with quality and&nbsp;speed.
        </p>
        <p>
          Once I understand it, I use AI to dig deeper, surfacing <b>edge&nbsp;cases</b> and a
          second point of view to build a <b>robust</b>&nbsp;solution.
        </p>
      </div>
    </Section>
  )
}
