import { useEffect, useState } from 'react'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const INTERVAL_MS = 4000

// Cross-fading slideshow for the project card image
export default function ProjectCarousel({ images }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = () => setCurrent((i) => (i + 1) % images.length)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setCurrent((i) => (i + 1) % images.length), INTERVAL_MS)
    return () => clearInterval(id)
    // current restarts the timer after a manual change
  }, [paused, current, images.length])

  return (
    // Clicking the image shows the next one instead of following the card link
    <div
      className="carousel"
      onClick={next}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, index) => (
        <img
          key={src}
          className="project-image carousel-slide"
          src={asset(src)}
          alt=""
          loading="lazy"
          aria-hidden={index !== current}
          data-active={index === current}
        />
      ))}
      <div className="carousel-dots">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Show image ${index + 1}`}
            aria-current={index === current}
            onClick={(event) => {
              event.stopPropagation()
              setCurrent(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}
