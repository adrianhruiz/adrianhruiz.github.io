import projects from './data/projects.json'

// Downloads and decodes every project image ahead of time, so the cards have
// their final height when the section first opens instead of growing as the
// images arrive
export default function preloadProjectImages() {
  for (const project of projects) {
    for (const image of [project.image].flat()) {
      if (!image) continue
      const img = new Image()
      img.src = `${import.meta.env.BASE_URL}${image}`
      img.decode().catch(() => {})
    }
  }
}
