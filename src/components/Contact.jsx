import profile from '../data/profile.json'

const EMAIL = profile.links.email.replace(/^mailto:/, '')

// Closing block: whoever reads to the end gets the email, the only place it is offered
export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">
        Let's make it <span>production&#8209;ready</span>
      </h2>
      <p>Have a project, a role or a question? Write to me.</p>
      <div className="actions">
        <a className="btn btn--primary" href={profile.links.email}>
          Get in touch
        </a>
        {/* Written out too, for whoever prefers to copy it */}
        <a className="contact-email" href={profile.links.email}>
          {EMAIL}
        </a>
      </div>
    </section>
  )
}
