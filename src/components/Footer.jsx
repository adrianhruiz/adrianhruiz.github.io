import profile from '../data/profile.json'

// Read once at load, so the year stays stable across renders
const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        © {YEAR} {profile.name}
      </span>
      <a href="#top">Back to top</a>
    </footer>
  )
}
