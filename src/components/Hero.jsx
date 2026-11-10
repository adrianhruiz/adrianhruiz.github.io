import profile from '../data/profile.json'
import { asset } from '../asset.js'
import { useYearsOfExperience } from '../useYearsOfExperience.js'
import ContactLinks from './ContactLinks.jsx'

export default function Hero() {
  const years = useYearsOfExperience(profile.careerStart)
  const [firstName, ...lastNames] = profile.name.split(' ')

  return (
    <header className="hero" id="top">
      {/* The facts come first and small; the mission is the one sentence that stands out */}
      <p className="hero-facts">
        <span>Software developer</span>
        <span>{profile.location}</span>
        <span>{years} years</span>
      </p>
      <div className="hero-top">
        <img className="avatar" src={asset(profile.photo)} alt="" width="76" height="76" />
        <h1>
          {firstName} <span>{lastNames.join(' ')}</span>
        </h1>
      </div>
      <p className="mission">
        I bring <em>quality, security and control</em> to AI-assisted software delivery, so what
        ships fast is also production&#8209;ready.
      </p>
      <ContactLinks />
    </header>
  )
}
