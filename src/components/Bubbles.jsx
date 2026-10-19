import { useEffect, useRef } from 'react'

// Soft, irregular bubbles like the ones floating in the Persona 3 Reload pause
// menu, drawn on a low-resolution canvas and upscaled by CSS so they share the
// same look as the water surface patches.

const SCALE = 6 // screen pixels per canvas pixel (matches WaterSurface)
const COUNT = 16
const FPS = 24
// How far bubbles travel (in screen heights, roughly) per unit of depth when
// the section changes, so they follow the camera diving or rising
const DIVE_TRAVEL = 5
// Wait before reacting to a section change, so bubbles move once the diagonal
// wipe (0.8s, slow start, see .wipe-band) has reached the middle of the screen
const DIVE_DELAY = 450

// Deterministic pseudo-random values so bubbles stay stable between renders
const rand = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

// How deep below its target depth the camera starts on page load, so the
// bubbles rush up as if diving into the water
const ENTRY_DIVE = 0.25

// Positions are in 0..1 of the viewport, radius in canvas pixels. Each bubble
// is a cluster of a few overlapping circles, which gives the irregular shape.
const BUBBLES = Array.from({ length: COUNT }, (_, i) => {
  const radius = 1 + rand(i + 50) ** 2 * 3
  return {
    x: rand(i),
    radius,
    duration: 26 + rand(i + 100) * 20,
    offset: rand(i + 150),
    wobble: 0.005 + rand(i + 200) * 0.02,
    wobbleSpeed: 0.4 + rand(i + 250) * 0.6,
    lobes: Array.from({ length: 3 }, (_, j) => ({
      dx: (rand(i * 7 + j + 300) - 0.5) * radius * 1.2,
      dy: (rand(i * 7 + j + 400) - 0.5) * radius * 1.4,
      r: radius * (0.55 + rand(i * 7 + j + 500) * 0.45),
    })),
  }
})

export default function Bubbles({ depth }) {
  const canvasRef = useRef(null)
  // Read by the animation loop without restarting it
  const depthRef = useRef(depth)

  useEffect(() => {
    const timer = setTimeout(() => {
      depthRef.current = depth
    }, DIVE_DELAY)
    return () => clearTimeout(timer)
  }, [depth])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let last = 0
    // Eased copy of the depth that drives the dive movement
    let dive = reduceMotion ? depthRef.current : depthRef.current - ENTRY_DIVE

    function resize() {
      canvas.width = Math.ceil(window.innerWidth / SCALE)
      canvas.height = Math.ceil(window.innerHeight / SCALE)
    }

    function draw(time) {
      const t = time / 1000
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = 'rgb(17 163 255 / 0.75)'

      // Diving deeper pushes bubbles up; rising pushes them down
      dive += (depthRef.current - dive) * 0.1
      for (const bubble of BUBBLES) {
        // Bigger (closer) bubbles move more, for a bit of parallax
        const parallax = 0.5 + bubble.radius / 3.4
        const travel = dive * DIVE_TRAVEL * parallax
        const progress = (((t / bubble.duration + bubble.offset + travel) % 1) + 1) % 1
        const x = (bubble.x + Math.sin(t * bubble.wobbleSpeed + bubble.offset * 10) * bubble.wobble) * width
        const y = (1.05 - progress * 1.15) * height

        // One path for all lobes, so overlaps don't get darker
        ctx.beginPath()
        for (const lobe of bubble.lobes) {
          ctx.moveTo(x + lobe.dx + lobe.r, y + lobe.dy)
          ctx.arc(x + lobe.dx, y + lobe.dy, lobe.r, 0, Math.PI * 2)
        }
        ctx.fill()
      }
    }

    function loop(time) {
      frame = requestAnimationFrame(loop)
      if (time - last < 1000 / FPS) return
      last = time
      draw(time)
    }

    resize()
    window.addEventListener('resize', resize)
    if (reduceMotion) draw(0)
    else frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="bubbles" />
}
