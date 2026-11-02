export default function Tags({ items }) {
  if (!items?.length) return null
  return (
    <ul className="tags">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
