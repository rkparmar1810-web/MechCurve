import { LuArrowRight } from 'react-icons/lu'
import FadeIn from '../FadeIn/FadeIn'
import styles from './FeaturedProject.module.scss'

const metrics = ['Setup time -30%', 'Tolerance +/-0.02 mm', 'BOM optimized']

export default function FeaturedProject() {
  return (
    <section className={`section section--white ${styles.featured}`}>
      <div className="container">
        <FadeIn>
          <span className="section-label">Featured Project</span>
          <h2 className="section-title">High-Precision Pneumatic Fixture</h2>
          <p className="section-sub">
            A production-focused clamping fixture designed for CNC operations with rigid alignment,
            fast setup, and repeatable tolerance control.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <article className={`card-base ${styles.featuredCard}`}>
            <div className={styles.mediaWrap}>
              <img src="/pp/qhSa4.jpg" alt="Featured pneumatic fixture CAD and fabrication view" loading="lazy" />
            </div>
            <div className={styles.content}>
              <span className="card-tag">Fabrication + Design</span>
              <h3 className="card-title">Pneumatic Clamping Fixture for Batch Machining</h3>
              <p className="card-desc">
                Engineered for quick part loading, accurate repeatability, and reduced operator effort.
                Includes full assembly drawings, exploded documentation, and material specs.
              </p>
              <div className="card-meta">
                {metrics.map((m) => (
                  <span key={m} className="meta-pill">{m}</span>
                ))}
              </div>
              <button
                className="card-cta"
                type="button"
                onClick={() => {
                  const el = document.getElementById('portfolio')
                  if (el) {
                    const navbarHeight = 120
                    const y = el.getBoundingClientRect().top + window.scrollY - navbarHeight
                    window.scrollTo({ top: y, behavior: 'auto' })
                    window.history.replaceState(null, '', window.location.pathname)
                  }
                }}
              >
                View Project <LuArrowRight size={16} />
              </button>
            </div>
          </article>
        </FadeIn>
      </div>
    </section>
  )
}
