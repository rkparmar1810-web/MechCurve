import { useRef } from 'react'
import { motion, useInView, type Target, type Transition } from 'framer-motion'

interface Props {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  once?: boolean
}

const dirMap: Record<NonNullable<Props['direction']>, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className,
  once = true,
}: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px 0px' })

  const { x, y } = dirMap[direction]

  const hidden: Target = { opacity: 0, x, y }
  const visible: Target = { opacity: 1, x: 0, y: 0 }
  const transition: Transition = {
    duration: 0.65,
    ease: [0.16, 1, 0.3, 1],
    delay,
  }

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? visible : hidden}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
