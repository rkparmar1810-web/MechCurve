import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../SmoothScroll/SmoothScroll'

const SECTION_PATHS = ['/about', '/services', '/portfolio', '/contact', '/testimonials', '/faq']

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    // Only scroll to top for non-section routes (e.g. /projects/:id)
    if (!SECTION_PATHS.includes(pathname)) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }
  }, [pathname, lenis])

  return null
}