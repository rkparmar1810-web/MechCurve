import { useState, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [visible, setVisible] = useState(false)
  const x = useSpring(0, { stiffness: 150, damping: 25 })
  const y = useSpring(0, { stiffness: 150, damping: 25 })

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [x, y, visible])

  if (!visible) return null

  return (
    <motion.div
      style={{
        x,
        y,
        position: 'fixed',
        top: -140,
        left: -140,
        width: 180,
        height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.045) 0%, rgba(6,182,212,0.02) 38%, transparent 72%)',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  )
}
