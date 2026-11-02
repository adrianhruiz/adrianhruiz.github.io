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
        For me, AI should multiply software <b>quality</b>, not just speed. I use it to
        understand the problem in depth, map the <b>edge cases</b> and think one step ahead to
        catch failures before they&nbsp;happen.
      </p>
    </Section>
  )
}
