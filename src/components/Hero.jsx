import profile from '../data/profile.json'
import { asset } from '../asset.js'
import { useYearsOfExperience } from '../useYearsOfExperience.js'

export default function Hero() {
  const years = useYearsOfExperience(profile.careerStart)

  return (
    <header className="hero">
      <div className="hero-top">
        <img className="avatar" src={asset(profile.photo)} alt={profile.name} width="76" height="76" />
        <h1>
          Hi, I'm <span>{profile.name}</span>.
        </h1>
      </div>
      <p className="lead">
        I'm a <b>software developer</b> based in {profile.location}, with {years} years of experience
        in the industry.
      </p>
      <p className="lead">
        AI helps us deliver software faster than ever. My mission is to bring{' '}
        <b>quality, security and control</b> to that process, making the software
        production&#8209;ready.
      </p>
      <div className="actions">
        <a className="btn btn--primary" href={profile.links.email}>
          Get in touch
        </a>
        <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="btn" href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {/* Shown once a CV file is set in profile.json */}
        {profile.cv && (
          <a className="btn" href={asset(profile.cv)} download>
            Download CV
          </a>
        )}
      </div>
    </header>
  )
}
