import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../SmoothScroll/SmoothScroll'

// Only /faq still renders the HomePage and relies on section-scrolling; every
// other route is now a standalone page that should scroll to top on navigation.
const SECTION_PATHS = ['/faq']

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
  // Only scroll to top for non-section routes
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