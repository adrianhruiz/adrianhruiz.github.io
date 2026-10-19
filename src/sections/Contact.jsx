const LINKS = [
  { label: 'Email', detail: 'groveh8@gmail.com', href: 'mailto:groveh8@gmail.com' },
  { label: 'GitHub', detail: 'github.com/adrianhruiz', href: 'https://github.com/adrianhruiz' },
  { label: 'LinkedIn', detail: 'linkedin.com/in/groveh8', href: 'https://www.linkedin.com/in/groveh8/' },
]

export default function Contact() {
  return (
    <ul className="contact">
      {LINKS.map((link) => (
        <li key={link.label} className="card slash-hover">
          <a
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
          >
            <span>{link.label}</span>
          </a>
          <span className="contact-detail">{link.detail}</span>
        </li>
      ))}
    </ul>
  )
}
