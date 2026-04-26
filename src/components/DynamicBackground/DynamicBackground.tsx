type Variant = 'service' | 'project'
interface DynamicBackgroundProps {
  variant: Variant
}

export default function DynamicBackground({ variant }: DynamicBackgroundProps) {
  const palette =
    variant === 'project'
      ? {
          glowClass:
            'bg-[radial-gradient(circle_at_18%_22%,rgba(37,99,235,0.08),transparent_24%),radial-gradient(circle_at_78%_32%,rgba(14,165,233,0.06),transparent_20%),radial-gradient(circle_at_58%_78%,rgba(37,99,235,0.06),transparent_26%)]',
          wireClass: 'stroke-[rgba(37,99,235,0.18)]',
          dotClass: 'bg-[rgba(37,99,235,0.26)] shadow-[0_0_0_4px_rgba(14,165,233,0.12)]',
        }
      : {
          glowClass:
            'bg-[radial-gradient(circle_at_18%_22%,rgba(29,78,216,0.08),transparent_24%),radial-gradient(circle_at_78%_32%,rgba(14,165,233,0.08),transparent_20%),radial-gradient(circle_at_58%_78%,rgba(29,78,216,0.06),transparent_26%)]',
          wireClass: 'stroke-[rgba(29,78,216,0.16)]',
          dotClass: 'bg-[rgba(14,165,233,0.24)] shadow-[0_0_0_4px_rgba(29,78,216,0.12)]',
        }

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 ${palette.glowClass}`} />

      <div className="absolute left-[-8%] top-[58%] h-[36rem] w-[120%] -translate-y-1/2 rotate-[-8deg] border border-slate-200/60 opacity-70 detail-grid-drift" />
      <div className="absolute left-[-4%] top-[62%] h-[28rem] w-[112%] -translate-y-1/2 rotate-[-8deg] border border-slate-200/40 opacity-55 detail-grid-drift-reverse" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 900" fill="none" preserveAspectRatio="none">
        <path className={palette.wireClass} d="M0 610C180 560 310 540 470 565C630 590 770 655 1200 520" strokeWidth="1.4" />
        <path className={palette.wireClass} d="M0 690C190 630 360 612 540 645C730 680 900 738 1200 640" strokeWidth="1.1" />
        <path className={palette.wireClass} d="M0 780C240 710 390 708 610 732C850 760 980 816 1200 734" strokeWidth="1" />
      </svg>

      <span className={`absolute top-[12%] left-[14%] h-2.5 w-2.5 rounded-full detail-particle-float ${palette.dotClass} [animation-delay:0.1s]`} />
      <span className={`absolute top-[24%] left-[72%] h-2.5 w-2.5 rounded-full detail-particle-float ${palette.dotClass} [animation-delay:0.6s]`} />
      <span className={`absolute top-[38%] left-[48%] h-2.5 w-2.5 rounded-full detail-particle-float ${palette.dotClass} [animation-delay:1.4s]`} />
      <span className={`absolute top-[56%] left-[22%] h-2.5 w-2.5 rounded-full detail-particle-float ${palette.dotClass} [animation-delay:0.9s]`} />
      <span className={`absolute top-[70%] left-[66%] h-2.5 w-2.5 rounded-full detail-particle-float ${palette.dotClass} [animation-delay:1.9s]`} />
      <span className={`absolute top-[82%] left-[36%] h-2.5 w-2.5 rounded-full detail-particle-float ${palette.dotClass} [animation-delay:1.1s]`} />
    </div>
  )
}
