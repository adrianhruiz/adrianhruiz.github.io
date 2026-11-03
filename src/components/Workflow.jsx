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
          In my experience, a lot of development time is won during requirements and analysis:
          when everything is well understood and organized, it's easier to deliver with both
          quality and&nbsp;speed.
        </p>
        <p>
          Once I understand the problem, I use AI to dig deeper into it, surfacing{' '}
          <b>edge&nbsp;cases</b> and a second point of view. That gives me a solid base to build a{' '}
          <b>robust</b>&nbsp;solution.
        </p>
      </div>
    </Section>
  )
}
