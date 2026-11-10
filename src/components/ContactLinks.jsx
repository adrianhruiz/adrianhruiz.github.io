import profile from '../data/profile.json'
import { asset } from '../asset.js'

// Shared by the hero and the closing contact block, so both offer the same ways in
export default function ContactLinks() {
  return (
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
  )
}
