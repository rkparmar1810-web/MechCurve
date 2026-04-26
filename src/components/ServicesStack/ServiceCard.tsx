import { useRef, useState } from 'react'

export type Service = {
  id: number
  title: string
  eyebrow: string
  features: string[]
  image: string
}

type ServiceCardProps = {
  service: Service
}

function ServiceCard({ service }: ServiceCardProps) {
  const cardRef = useRef<HTMLElement | null>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const relativeX = (event.clientX - rect.left) / rect.width
    const relativeY = (event.clientY - rect.top) / rect.height
    const rotateY = (relativeX - 0.5) * 10
    const rotateX = (0.5 - relativeY) * 8

    setTilt({ x: rotateX, y: rotateY })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div className="service-card-3d-wrap">
      <div className="service-card__bg-glow" aria-hidden="true" />
      <article
        ref={cardRef}
        className="service-card"
        aria-labelledby={`service-title-${service.id}`}
        style={
          {
            '--rx': `${tilt.x}deg`,
            '--ry': `${tilt.y}deg`,
          } as React.CSSProperties
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="service-card__glass-layer" aria-hidden="true" />
        <div className="service-card__content">
          <span className="service-card__badge">{String(service.id).padStart(2, '0')}</span>
          <h3 id={`service-title-${service.id}`} className="service-card__title">
            {service.title}
          </h3>
          <ul className="service-card__list" aria-label={`${service.title} services`}>
            {service.features.map((feature) => (
              <li key={feature} className="service-card__list-item">
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="service-card__visual" aria-hidden="true">
          <img src={service.image} alt="" className="service-card__image" loading="lazy" />
          <div className="service-card__image-overlay" />
        </div>
      </article>
    </div>
  )
}
export default ServiceCard;
