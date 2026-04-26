export default function HeroBackground3D() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(37,99,235,0.06),transparent_22%),radial-gradient(circle_at_84%_20%,rgba(6,182,212,0.05),transparent_24%),radial-gradient(circle_at_72%_76%,rgba(37,99,235,0.05),transparent_24%)]" />
      <div className="absolute left-[4%] top-[18%] h-[180px] w-[180px] rounded-xl border border-slate-200/70 bg-white/70 hero-float-soft" />
      <div className="absolute right-[8%] top-[12%] h-[260px] w-[260px] rounded-xl border border-blue-100/80 bg-white/72 hero-float-soft-delayed" />
      <div className="absolute right-[16%] bottom-[8%] h-[120px] w-[120px] rounded-xl border border-cyan-100/80 bg-white/76 hero-float-soft" />

      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 1200 780" fill="none" preserveAspectRatio="none">
        <path d="M0 182H1200" stroke="rgba(148,163,184,0.12)" />
        <path d="M0 312H1200" stroke="rgba(148,163,184,0.12)" />
        <path d="M0 442H1200" stroke="rgba(148,163,184,0.12)" />
        <path d="M0 572H1200" stroke="rgba(148,163,184,0.12)" />
        <path d="M160 0V780" stroke="rgba(148,163,184,0.12)" />
        <path d="M360 0V780" stroke="rgba(148,163,184,0.12)" />
        <path d="M560 0V780" stroke="rgba(148,163,184,0.12)" />
        <path d="M760 0V780" stroke="rgba(148,163,184,0.12)" />
        <path d="M960 0V780" stroke="rgba(148,163,184,0.12)" />
        <path d="M600 140C740 170 860 222 980 308" stroke="rgba(37,99,235,0.26)" strokeWidth="1.4" />
        <path d="M520 254C670 272 852 338 1038 440" stroke="rgba(6,182,212,0.24)" strokeWidth="1.2" />
        <path d="M380 506C560 454 768 470 1048 610" stroke="rgba(37,99,235,0.18)" strokeWidth="1.2" strokeDasharray="8 10" />
        <rect x="702" y="118" width="222" height="142" rx="10" stroke="rgba(15,23,42,0.18)" strokeWidth="1.2" />
        <rect x="786" y="336" width="176" height="118" rx="10" stroke="rgba(15,23,42,0.18)" strokeWidth="1.2" />
        <circle cx="806" cy="554" r="48" stroke="rgba(37,99,235,0.32)" strokeWidth="1.6" />
        <circle cx="806" cy="554" r="18" stroke="rgba(37,99,235,0.18)" strokeWidth="1.2" />
      </svg>
    </div>
  )
}
