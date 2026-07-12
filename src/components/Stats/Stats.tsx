import { LuGauge, LuLayers3, LuShieldCheck, LuUsers } from 'react-icons/lu'
import FadeIn from '../FadeIn/FadeIn'

const STATS = [
  { value: '500+', label: 'Students Trained', icon: LuUsers },
  { value: '50+', label: 'Projects Delivered', icon: LuLayers3 },
  { value: '95%', label: 'Success Rate', icon: LuShieldCheck },
  { value: '4+', label: 'Years of Experience', icon: LuGauge },
]

export default function Stats() {
  return (
    <section
      className="relative overflow-hidden pb-14 pt-2 md:pb-16 md:pt-4"
      style={{ background: '#ffffff' }}
    >
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATS.map((item, index) => (
            <FadeIn key={item.label} delay={index * 0.05}>
              <article className="flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-amber-300/60 hover:shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-700">
                  <item.icon size={22} />
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-slate-900">{item.value}</div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">{item.label}</div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}