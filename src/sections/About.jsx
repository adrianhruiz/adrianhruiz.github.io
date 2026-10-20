import profile from '../data/profile.json'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const EXPERIENCE = [
  {
    role: 'Software Developer',
    place: 'Tecnalis',
    dates: 'Jul 2021 – Present',
    text: 'Development of Alira, a gaming management platform used by online gaming and sports betting operators.',
    tags: ['Java', 'SQL', 'Linux', 'AI Tools', 'Performance', 'Testing'],
  },
  {
    role: 'Software Developer Intern',
    place: 'Suertia',
    dates: 'Apr 2021 – Jun 2021',
    text: 'Web development for an online gaming and betting operator.',
    tags: ['JavaScript', 'PHP', 'Responsive Web Design'],
  },
  {
    role: 'IT Helpdesk Intern',
    place: 'Zbitt & VistaJet',
    dates: 'Mar 2019 – Jun 2019',
    text: 'Support, repair and maintenance of devices for customers and employees.',
  },
]

const EDUCATION = [
  {
    role: 'Higher Vocational Training in Web Application Development',
    place: 'IES Puertas del Campo',
    dates: '2019 – 2021',
    text: 'Studies focused on web development, where I learned everything I needed to build a video game e-commerce site as my final project.',
    tags: ['JavaScript', 'Java', 'PHP', 'SQL', 'Docker'],
  },
  {
    role: 'Intermediate Vocational Training in Microcomputer Systems and Networks',
    place: 'IES Puertas del Campo',
    dates: '2017 – 2019',
    text: 'Studies on how computers work in a broad sense. This is where I started programming, through scripting.',
    tags: ['Linux', 'Scripting', 'Apache', 'Tomcat'],
  },
]

function Timeline({ title, items }) {
  return (
    <section className="card">
      <h2 className="detail-label">{title}</h2>
      <ul className="timeline">
        {items.map((item) => (
          <li key={item.role + item.dates}>
            <h3 className="timeline-role">{item.role}</h3>
            <p className="timeline-meta">
              {item.place} <span className="timeline-dates">{item.dates}</span>
            </p>
            {item.text && <p className="timeline-text">{item.text}</p>}
            {item.tags?.length > 0 && (
              <ul className="tags tags-sm">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function About() {
  return (
    <div className="about-sections">
      <div className="about card">
        <div className="prose">
          <p>
            Hi! I'm a <b>software developer</b> based in Ceuta, Spain. I fell in love with
            computers as a kid, and I spend a lot of time in this digital world.
          </p>
          <p>
            Here you'll find information about me and the personal projects I'm working on.
          </p>
        </div>
        <img className="about-photo" src={asset('photo.webp')} alt={profile.name} />
      </div>

      <Timeline title="Experience" items={EXPERIENCE} />
      <Timeline title="Education" items={EDUCATION} />
    </div>
  )
}
