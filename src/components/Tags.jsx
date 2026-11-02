export default function Tags({ items, variant }) {
  if (!items?.length) return null
  return (
    <ul className={variant ? `tags tags--${variant}` : 'tags'}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
