import { useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const x = useSpring(0, { stiffness: 150, damping: 25 })
  const y = useSpring(0, { stiffness: 150, damping: 25 })
  // Visibility rides a motion value rather than state: toggling it must not
  // re-render, because a re-render here re-runs the effect and tears the
  // mousemove listener down and back up on every entry/exit.
  const opacity = useMotionValue(0)

  useEffect(() => {
    // Skip on touch devices and for reduced-motion users.
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setEnabled(true)

    let primed = false
    const move = (e: MouseEvent) => {
      if (!primed) {
        // First sighting: jump to the pointer so the glow doesn't spring in
        // from the top-left corner.
        primed = true
        x.jump(e.clientX)
        y.jump(e.clientY)
        opacity.set(1)
        return
      }
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const leave = () => opacity.set(0)
    const enter = () => {
      if (primed) opacity.set(1)
    }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [x, y, opacity])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        opacity,
        position: 'fixed',
        top: -140,
        left: -140,
        width: 180,
        height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.045) 0%, rgba(6,182,212,0.02) 38%, transparent 72%)',
        pointerEvents: 'none',
        zIndex: 9998,
        willChange: 'transform, opacity',
      }}
    />
  )
}
