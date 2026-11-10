import { useEffect, useState } from 'react'

// Tracks the section crossing a line near the top third of the screen, and whether the
// hero has left the screen. Both start empty, so the prerendered HTML and the first
// client render match.
export function useScrollState(sectionIds, heroId) {
  const [active, setActive] = useState(null)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const sections = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    const hero = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting)
      // Back at the hero, no section is current
      if (entry.isIntersecting) setActive(null)
    })

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) sections.observe(element)
    })
    const heroElement = document.getElementById(heroId)
    if (heroElement) hero.observe(heroElement)

    return () => {
      sections.disconnect()
      hero.disconnect()
    }
  }, [sectionIds, heroId])

  return { active, pastHero }
}
