// Diagonal panels that sweep across the screen when the section changes,
// like the menu transitions in Persona 3 Reload. Remount it (via `key`) to replay.
export default function Wipe({ direction }) {
  return (
    <div className={`wipe ${direction < 0 ? 'wipe--back' : ''}`} aria-hidden="true">
      <span className="wipe-band wipe-band--blue" />
      <span className="wipe-band wipe-band--cyan" />
      <span className="wipe-band wipe-band--navy" />
    </div>
  )
}
