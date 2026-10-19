import { useState } from 'react'

const asset = (path) => (/^https?:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path}`)

const youtubeId = (src) =>
  src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)?.[1]

// Media items can be a plain path/URL or { src, caption }
function normalize(item) {
  const { src, caption = '' } = typeof item === 'string' ? { src: item } : item
  const id = youtubeId(src)
  if (id) return { type: 'youtube', src, id, caption }
  if (/\.(mp4|webm|ogg|mov)$/i.test(src)) return { type: 'video', src: asset(src), caption }
  return { type: 'image', src: asset(src), caption }
}

function Viewer({ item }) {
  if (item.type === 'youtube') {
    return (
      <iframe
        className="media-frame"
        src={`https://www.youtube-nocookie.com/embed/${item.id}`}
        title={item.caption || 'Video'}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    )
  }
  if (item.type === 'video') {
    return <video className="media-frame" src={item.src} controls playsInline preload="metadata" />
  }
  return <img className="media-frame" src={item.src} alt={item.caption} />
}

function Thumb({ item }) {
  if (item.type === 'youtube') {
    return <img src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`} alt="" loading="lazy" />
  }
  if (item.type === 'video') {
    return <video src={item.src} muted preload="metadata" />
  }
  return <img src={item.src} alt="" loading="lazy" />
}

// Large viewer plus a strip of thumbnails to pick what to show
export default function MediaGallery({ items }) {
  const media = items.map(normalize)
  const [current, setCurrent] = useState(0)
  const item = media[current]

  return (
    <div className="gallery">
      <figure className="gallery-main">
        <Viewer key={item.src} item={item} />
        {item.caption && <figcaption>{item.caption}</figcaption>}
      </figure>
      {media.length > 1 && (
        <ul className="gallery-thumbs">
          {media.map((m, i) => (
            <li key={m.src}>
              <button
                type="button"
                className={`gallery-thumb ${m.type !== 'image' ? 'gallery-thumb--video' : ''}`}
                aria-current={i === current ? 'true' : undefined}
                aria-label={m.caption || `Media ${i + 1}`}
                onClick={() => setCurrent(i)}
              >
                <Thumb item={m} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
