import profile from '../data/profile.json'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const EXPERIENCE = [
  {
    role: 'Software Developer',
    place: 'Tecnalis',
    dates: 'Jul 2021 – Present',
    text: 'Full-time full stack development, working with Java and Linux among other technologies.',
  },
  {
    role: 'Web Developer Intern',
    place: 'Suertia Interactiva',
    dates: 'Apr 2021 – Jun 2021',
    text: 'Front-end layout and JavaScript for the company website, some back-end fixes, and a project to make several pages responsive.',
  },
  {
    role: 'IT Technician Intern',
    place: 'VistaJet',
    dates: 'May 2019 – Jun 2019',
    text: 'Erasmus+ internship: support, repair and maintenance of the employees’ computers.',
  },
  {
    role: 'IT Technician Intern',
    place: 'Zbitt',
    dates: 'Mar 2019 – Apr 2019',
    text: 'Repair and maintenance of customers’ computers at a computer store.',
  },
]

const EDUCATION = [
  {
    role: 'Higher Vocational Training in Web Application Development',
    place: 'IES Puertas del Campo',
    dates: '2019 – 2021',
    text: 'Front end including HTML, CSS, responsive design, Flexbox, Grid, Bootstrap and modern JavaScript. Backend including Java, PHP, OOP, MVC and relational databases (MySQL, SQLite). Deployment with Apache, Tomcat and Docker.',
  },
  {
    role: 'Intermediate Vocational Training in Microcomputer Systems and Networks',
    place: 'IES Puertas del Campo',
    dates: '2017 – 2019',
    text: 'Hardware and operating system installation, maintenance, monitoring, backups, Bash scripting and virtual machines.',
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
            <p className="timeline-text">{item.text}</p>
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
            Hi! I'm a <b>software developer</b> based in Ceuta, Spain, and I've always loved
            computers and video games.
          </p>
          <p>
            I've been working at Tecnalis since 2021, where I develop software mostly in Java.
            In my free time, I build personal projects with AI tools.
          </p>
        </div>
        <img className="about-photo" src={asset('photo.jpg')} alt={profile.name} />
      </div>

      <Timeline title="Experience" items={EXPERIENCE} />
      <Timeline title="Education" items={EDUCATION} />
    </div>
  )
}
