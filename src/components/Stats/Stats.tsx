import { LuGauge, LuLayers3, LuShieldCheck, LuUsers } from 'react-icons/lu'
import FadeIn from '../FadeIn/FadeIn'

const STATS = [
  { value: '500+', label: 'Students Trained', icon: LuUsers },
  { value: '50+', label: 'Projects Delivered', icon: LuLayers3 },
  { value: '95%', label: 'First-Attempt Pass Rate', icon: LuShieldCheck },
  { value: '4+', label: 'Years Experience', icon: LuGauge },
]

export default function Stats() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-16"
      style={{
        background: 'linear-gradient(135deg, #071D2E 0%, #0F3460 40%, #1251A3 70%, #0B3C5D 100%)',
      }}
    >
      {/* Radial glow overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 800px 400px at 50% 50%, rgba(30,99,240,0.25), transparent 70%)',
        }}
      />
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATS.map((item, index) => (
            <FadeIn key={item.label} delay={index * 0.05}>
              <article className="flex h-full items-start gap-4 rounded-2xl border border-white/[0.12] bg-white/[0.07] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.12]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white">
                  <item.icon size={22} />
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-white">{item.value}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200">{item.label}</div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}