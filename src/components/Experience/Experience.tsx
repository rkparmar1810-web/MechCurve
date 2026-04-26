import styles from './Experience.module.scss'
import { LuPresentation, LuUsers, LuLaptop, LuFactory, LuBookOpen, LuBuilding2 } from 'react-icons/lu'
import type { ComponentType } from 'react'
import FadeIn from '../FadeIn/FadeIn'
import { motion } from 'framer-motion'

interface Item {
  icon: ComponentType<{ size?: number }>
  color: string
  title: string
  desc: string
  metric: string
}

const items: Item[] = [
  { icon: LuPresentation, color: 'primary', title: 'Workshops & Seminars', desc: 'Conducted 20+ technical workshops at engineering colleges on SolidWorks, GD&T, and product design.', metric: '20+ events' },
  { icon: LuUsers, color: 'secondary', title: 'Student Mentorship', desc: 'Mentored 500+ students through final-year projects, career transitions, and design internships.', metric: '500+ students' },
  { icon: LuLaptop, color: 'emerald', title: 'CAD Training Delivery', desc: 'Designed and delivered CSWA/CSWP preparation programmes with industry-standard assessments.', metric: '95% pass rate' },
  { icon: LuFactory, color: 'violet', title: 'Industry Product Work', desc: 'Production-ready CAD models and documentation for automotive and consumer goods manufacturers.', metric: '30+ projects' },
  { icon: LuBookOpen, color: 'amber', title: 'Curriculum Development', desc: 'Training curricula used across 5+ institutes covering concepts, practicals, and case studies.', metric: '5 institutes' },
  { icon: LuBuilding2, color: 'primary', title: 'Corporate Training', desc: 'On-site SolidWorks upskilling programmes for engineering teams at manufacturing companies.', metric: '3 companies' },
]

export default function Experience() {
  return (
    <section id="experience" className={`section section--white ${styles.experience}`}>
      <div className="container">
        <FadeIn>
          <span className="section-label">Track Record</span>
          <h2 className="section-title">Experience &amp; Contributions</h2>
          <p className="section-sub">
            A consistent record of teaching, mentoring, and delivering engineering
            design work across academia and industry.
          </p>
        </FadeIn>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
            <motion.div
              className={styles.card}
              whileHover={{ y: -4, boxShadow: '0 14px 36px rgba(0,0,0,0.09)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className={styles.top}>
                <span className={`${styles.icon} ${styles[item.color]}`}>
                  <item.icon size={22} />
                </span>
                <span className={styles.metric}>{item.metric}</span>
              </div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
