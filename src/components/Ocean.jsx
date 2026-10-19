import Bubbles from './Bubbles.jsx'
import WaterSurface from './WaterSurface.jsx'

// Animated ocean background. The `--depth` custom property (0 = surface,
// 1 = deepest) is set on a parent and drives every layer through CSS.
export default function Ocean({ depth }) {
  return (
    <div className="ocean" aria-hidden="true">
      <div className="ocean-column" />
      <WaterSurface />
      <Bubbles depth={depth} />
    </div>
  )
}
