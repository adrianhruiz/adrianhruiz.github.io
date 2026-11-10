import ContactLinks from './ContactLinks.jsx'

// Closing block: whoever reads to the end gets the main action again
export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">
        Let's make it <span>production&#8209;ready</span>
      </h2>
      <p>Have a project, a role or a question? Write to me.</p>
      <ContactLinks />
    </section>
  )
}
