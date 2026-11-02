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
        In my experience, a lot of development time is won during requirements and analysis:
        when everything is well understood and organized, it's easier to deliver with both
        quality and speed. So I start by understanding the problem, then use AI to dig deeper,
        surfacing <b>edge cases</b> and a second point of view. That gives me a solid base to
        build a <b>robust</b>&nbsp;solution.
      </p>
    </Section>
  )
}
