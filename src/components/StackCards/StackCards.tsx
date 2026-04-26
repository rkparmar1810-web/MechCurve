import type { ReactNode } from 'react'
import styles from './StackCards.module.scss'

/* ── Types ──────────────────────────────────────────────── */

export interface StackCardData {
  id: string
  icon?: ReactNode
  image?: string
  imageAlt?: string
  title: string
  desc: string
  tags?: string[]
  badge?: string
  badgeColor?: string
  color?: string          // icon background color key
}

interface StackCardsProps {
  /** "left" = cards on left / text on right; "right" = the reverse */
  direction?: 'left' | 'right'
  cards: StackCardData[]
  heading: ReactNode
  children?: ReactNode    // extra text content alongside the heading
}

/* ── Single animated card ───────────────────────────────── */

interface CardProps {
  card: StackCardData
}

function Card({ card }: CardProps) {
  return (
    <div className={styles.card}>
      {card.image && (
        <div className={styles.media}>
          <img src={card.image} alt={card.imageAlt || card.title} loading="lazy" />
        </div>
      )}

      {card.icon && (
        <span className={`${styles.cardIcon} ${card.color ? styles[card.color] : ''}`}>
          {card.icon}
        </span>
      )}

      {card.badge && (
        <span className={`${styles.badge} ${card.badgeColor ? styles[card.badgeColor] : ''}`}>
          {card.badge}
        </span>
      )}

      <h3 className={styles.cardTitle}>{card.title}</h3>
      <p className={styles.cardDesc}>{card.desc}</p>

      {card.tags && card.tags.length > 0 && (
        <div className={styles.tags}>
          {card.tags.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Main section ───────────────────────────────────────── */

export default function StackCards({
  direction = 'right',
  cards,
  heading,
  children,
}: StackCardsProps) {
  return (
    <div
      className={`${styles.section} ${direction === 'left' ? styles.reversed : ''}`}
    >
      {/* Text column */}
      <div className={styles.text}>
        {heading}
        {children}
      </div>

      {/* Cards stack column */}
      <div className={styles.stack}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
          />
        ))}
      </div>
    </div>
  )
}
