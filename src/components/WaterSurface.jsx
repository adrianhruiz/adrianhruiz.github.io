import { useEffect, useRef } from 'react'

// Rippling light patches of the water surface seen from below, in the flat
// cel-shaded style of the Persona 3 Reload pause menu: a pool of light right
// under the centre of the screen that narrows as it goes down. Animated value noise is
// rendered at a tiny resolution, thresholded into flat bands and upscaled by CSS.

const WIDTH = 240
const HEIGHT = 108
const FPS = 24

// Hash-based 3D value noise
function hash(x, y, z) {
  let h = x * 374761393 + y * 668265263 + z * 2147483647
  h = (h ^ (h >>> 13)) * 1274126177
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

const smooth = (t) => t * t * (3 - 2 * t)
const lerp = (a, b, t) => a + (b - a) * t

function noise(x, y, z) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const zi = Math.floor(z)
  const u = smooth(x - xi)
  const v = smooth(y - yi)
  const w = smooth(z - zi)
  const corner = (dx, dy, dz) => hash(xi + dx, yi + dy, zi + dz)
  return lerp(
    lerp(lerp(corner(0, 0, 0), corner(1, 0, 0), u), lerp(corner(0, 1, 0), corner(1, 1, 0), u), v),
    lerp(lerp(corner(0, 0, 1), corner(1, 0, 1), u), lerp(corner(0, 1, 1), corner(1, 1, 1), u), v),
    w,
  )
}

// Flat colour bands, outermost first: [threshold, r, g, b, alpha 0-255]
const BANDS = [
  [0.42, 69, 241, 254, 235],
  [0.58, 170, 251, 255, 245],
]
// Darker ripple lines across the cyan band near the top
const RIPPLE = [0.74, 0, 150, 235, 110]
// Half-width of the soft edge around each threshold, so the upscaled
// canvas shows smooth flat blobs instead of pixel steps
const EDGE = 0.018

// Smooth 0..1 coverage of a band at noise value n
const coverage = (n, threshold) =>
  smooth(Math.min(1, Math.max(0, (n - threshold + EDGE) / (2 * EDGE))))

export default function WaterSurface() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const image = ctx.createImageData(WIDTH, HEIGHT)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let last = 0

    function draw(time) {
      const t = time / 1000
      const data = image.data
      // Current pixel, built up layer by layer
      let r, g, b, a
      // Paints one layer over the pixel ("over" operator, straight alpha as ImageData expects)
      const over = (value, [threshold, lr, lg, lb, la]) => {
        const c = (coverage(value, threshold) * la) / 255
        if (c === 0) return
        const out = c + a * (1 - c)
        r = (lr * c + r * a * (1 - c)) / out
        g = (lg * c + g * a * (1 - c)) / out
        b = (lb * c + b * a * (1 - c)) / out
        a = out
      }
      for (let y = 0; y < HEIGHT; y++) {
        // Patches get flatter and smaller towards the bottom (further away)
        const depth = y / HEIGHT
        const sy = y * (0.11 + depth * 0.08)
        // The light pool narrows with depth
        const spread = 0.34 - depth * 0.22
        for (let x = 0; x < WIDTH; x++) {
          const sx = x * 0.047 + Math.sin(sy * 0.8 + t * 0.9) * 0.35
          const raw = noise(sx, sy, t * 0.35) * 0.65 + noise(sx * 2.1, sy * 2.1, t * 0.6 + 40) * 0.35
          const dx = x / WIDTH - 0.58
          const pool = Math.exp(-(dx * dx) / (2 * spread * spread))
          const n = raw * (0.35 + pool * 0.75)
          const i = (y * WIDTH + x) * 4
          // Composite the layers over each other
          r = g = b = a = 0
          // Ripples use the inverted noise, so they sit between the patches
          if (depth < 0.45) over(1 - raw, RIPPLE)
          for (const band of BANDS) over(n, band)
          data[i] = r
          data[i + 1] = g
          data[i + 2] = b
          data[i + 3] = a * 255
        }
      }
      ctx.putImageData(image, 0, 0)
    }

    function loop(time) {
      frame = requestAnimationFrame(loop)
      if (time - last < 1000 / FPS) return
      last = time
      draw(time)
    }

    if (reduceMotion) draw(0)
    else frame = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(frame)
  }, [])

  return <canvas ref={canvasRef} className="water-surface" width={WIDTH} height={HEIGHT} />
}
