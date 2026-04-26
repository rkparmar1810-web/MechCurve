import styles from './Philosophy.module.scss'
import FadeIn from '../FadeIn/FadeIn'

const principles = [
  { num: '01', title: 'Concept Clarity', desc: 'Every design begins with a clear problem statement. Ambiguity at the concept stage leads to costly changes later.' },
  { num: '02', title: 'Technical Accuracy', desc: 'Tolerances, material selections, and fit conditions are built into the design from the start — not afterthoughts.' },
  { num: '03', title: 'Manufacturability', desc: 'A design is only as good as its ability to be made. DFM principles guide every geometry and feature decision.' },
  { num: '04', title: 'Industry Alignment', desc: 'Engineering education must reflect what companies need. Training detached from industry creates a skills gap.' },
]

export default function Philosophy() {
  return (
    <section className={`section section--gray ${styles.philosophy}`}>
      <div className="container">
        <FadeIn>
        <div className={styles.headingWrap}>
          <span className="section-label">How We Work</span>
          <h2 className="section-title">Design Philosophy</h2>
          <p className={`section-sub ${styles.headingSub}`}>
            The principles that guide every model, product, and lesson.
          </p>
        </div>
        </FadeIn>
        <div className={styles.timeline}>
          {principles.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.12} direction="left">
            <div className={styles.step}>
              <div className={styles.numWrap}>
                <span className={styles.num}>{p.num}</span>
                {i < principles.length - 1 && <div className={styles.line} />}
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.desc}>{p.desc}</p>
              </div>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
