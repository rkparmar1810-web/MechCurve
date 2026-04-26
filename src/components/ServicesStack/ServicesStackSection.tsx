import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { LuArrowRight, LuCheck, LuWrench } from 'react-icons/lu';
import './ServicesStackSection.scss';

/* ── Data ── */
type Service = {
	id: number;
	title: string;
	eyebrow: string;
	description: string;
	features: string[];
	image: string;
};

const SERVICES: Service[] = [
	{
		id: 1,
		title: '3D CAD Modeling',
		eyebrow: 'Precision Modeling',
		description:
			'Professional 3D modeling in SolidWorks — parts, assemblies, surfaces, sheet metal, and detailed 2D drawings.',
		features: [
			'Part & assembly modeling',
			'Surface & sheet metal design',
			'Parametric modeling',
			'2D drafting & documentation',
		],
		image: '/DM/pd_1.jpg',
	},
	{
		id: 2,
		title: 'Product Development',
		eyebrow: 'Concept to Production',
		description:
			'End-to-end product development from concept design to production-ready prototypes with DFM analysis and 3D printing.',
		features: [
			'Concept to production design',
			'DFM analysis & validation',
			'Rapid prototyping & 3D printing',
			'Reverse engineering',
		],
		image: '/DM/pd_4.jpg',
	},
	{
		id: 3,
		title: 'Manufacturing Support',
		eyebrow: 'Shop-Floor Ready',
		description:
			'Complete manufacturing support — production drawings, CNC machining, finishing, and quality inspection from prototype to batch.',
		features: [
			'Manufacturing drawings & BOMs',
			'CNC/VMC & EDM machining',
			'Heat treatment & finishing',
			'CMM inspection & quality control',
		],
		image: '/DM/Manufacturing.png',
	},
	{
		id: 4,
		title: 'SolidWorks Training',
		eyebrow: 'Skill Development',
		description:
			'Structured SolidWorks certification tracks with hands-on projects, specialisations, and placement support.',
		features: [
			'CSWA & CSWP certification',
			'GD&T & advanced drafting',
			'Project-based learning',
			'Placement assistance',
		],
		image: '/DM/training_2.jpg',
	},
];

const STATS = [
	{ value: 500, suffix: '+', label: 'Students' },
	{ value: 50, suffix: '+', label: 'Projects' },
	{ value: 95, suffix: '%', label: 'Success Rate' },
	{ value: 4, suffix: '+', label: 'Years Experience' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Animated counter ── */
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: '-40px 0px' });
	const [display, setDisplay] = useState(0);

	useEffect(() => {
		if (!inView) return;
		const start = performance.now();
		const dur = 1800;
		function tick(now: number) {
			const p = Math.min((now - start) / dur, 1);
			const eased = 1 - Math.pow(1 - p, 3);
			setDisplay(Math.round(eased * end));
			if (p < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}, [inView, end]);

	return (
		<span ref={ref}>
			{display}
			{suffix}
		</span>
	);
}

/* ── 3D tilt card ── */
function TiltCard({
	children,
	className,
	'aria-labelledby': ariaLabel,
}: {
	children: React.ReactNode;
	className: string;
	'aria-labelledby'?: string;
}) {
	const ref = useRef<HTMLElement>(null);
	const [style, setStyle] = useState<React.CSSProperties>({});

	function onMove(e: React.MouseEvent<HTMLElement>) {
		const el = ref.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
		const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
		const mx = ((e.clientX - r.left) / r.width) * 100;
		const my = ((e.clientY - r.top) / r.height) * 100;
		setStyle({
			'--mx': `${mx}%`,
			'--my': `${my}%`,
			transform: `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`,
			transition: 'transform 80ms linear',
		} as React.CSSProperties);
	}

	function onLeave() {
		setStyle({
			transform: 'perspective(1400px) rotateX(0) rotateY(0)',
			transition: 'transform 600ms cubic-bezier(0.34,1.56,0.64,1)',
		});
	}

	return (
		<article
			ref={ref}
			className={className}
			aria-labelledby={ariaLabel}
			style={style}
			onMouseMove={onMove}
			onMouseLeave={onLeave}
		>
			{children}
		</article>
	);
}

/* ── Main Component ── */
export default function ServicesStackSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const headerInView = useInView(headerRef, { once: true, margin: '-80px 0px' });
	const statsRef = useRef<HTMLDivElement>(null);
	const statsInView = useInView(statsRef, { once: true, margin: '-60px 0px' });
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});
	const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 50]);

	return (
		<section
			ref={sectionRef}
			id="services"
			className="relative overflow-hidden pt-16 pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14"
			style={{ background: '#06080D' }}
			aria-label="Engineering Services"
		>
			{/* ── Concentric ring decoration (unique to Services) ── */}
			<motion.div
				className="pointer-events-none absolute -top-[200px] -right-[200px] z-0 hidden opacity-[0.03] lg:block"
				style={{ rotate: ringRotate }}
				aria-hidden="true"
			>
				<svg width="700" height="700" viewBox="0 0 700 700" fill="none">
					<circle cx="350" cy="350" r="340" stroke="#EAC117" strokeWidth="0.5" />
					<circle cx="350" cy="350" r="260" stroke="#EAC117" strokeWidth="0.5" />
					<circle cx="350" cy="350" r="180" stroke="#EAC117" strokeWidth="0.5" />
					<circle cx="350" cy="350" r="100" stroke="#EAC117" strokeWidth="0.5" />
				</svg>
			</motion.div>

			{/* ── Subtle noise grain overlay ── */}
			<div
				className="pointer-events-none absolute inset-0 z-[1] opacity-[0.015]"
				aria-hidden="true"
				style={{
					backgroundImage:
						'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
					backgroundRepeat: 'repeat',
					backgroundSize: '180px 180px',
				}}
			/>

			{/* ── Section container ── */}
			<div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 xl:px-16">

				{/* ── Header ── */}
				<div ref={headerRef} className="mb-10 text-center md:mb-14">
					<motion.span
						className="inline-flex items-center gap-2 rounded-full border border-[#EAC117]/20 bg-[#EAC117]/6 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300"
						initial={{ opacity: 0, scale: 0.92 }}
						animate={headerInView ? { opacity: 1, scale: 1 } : {}}
						transition={{ duration: 0.5, ease: EASE }}
					>
						<LuWrench size={11} />
						Services
					</motion.span>

					<motion.h2
						className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
						initial={{ opacity: 0, y: 24 }}
						animate={headerInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
					>
						Engineering capabilities under one roof
					</motion.h2>

					<motion.p
						className="mx-auto mt-4 max-w-xl text-base leading-[1.8] text-slate-400"
						initial={{ opacity: 0 }}
						animate={headerInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.6, delay: 0.25 }}
					>
						CAD, training, additive manufacturing and shop-floor capabilities
						— everything your project needs, start to finish.
					</motion.p>
				</div>

				{/* ── Stats ribbon ── */}
				<motion.div
					ref={statsRef}
					className="mx-auto mb-10 flex max-w-3xl flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/[0.06] px-6 py-5 md:mb-14 md:gap-10"
					style={{
						background: 'rgba(10,20,44,0.5)',
						backdropFilter: 'blur(16px)',
						WebkitBackdropFilter: 'blur(16px)',
						boxShadow: '0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
					}}
					initial={{ opacity: 0, y: 20 }}
					animate={statsInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, ease: EASE }}
				>
					{STATS.map((s) => (
						<div key={s.label} className="flex flex-col items-center gap-0.5">
							<span className="text-xl font-extrabold tracking-tight text-[#EAC117] md:text-2xl">
								<CountUp end={s.value} suffix={s.suffix} />
							</span>
							<span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
								{s.label}
							</span>
						</div>
					))}
				</motion.div>

				{/* ── Service cards ── */}
				<div className="mx-auto flex max-w-[1280px] flex-col gap-6">
					{SERVICES.map((svc, idx) => {
						const reversed = idx % 2 !== 0;
						return (
							<motion.div
								key={svc.id}
								initial={{ opacity: 0, scale: 0.96, y: 30 }}
								whileInView={{ opacity: 1, scale: 1, y: 0 }}
								viewport={{ once: true, margin: '-60px' }}
								transition={{ duration: 0.65, ease: EASE, delay: idx * 0.06 }}
							>
								<TiltCard
									className={`svc-card${reversed ? ' svc-card--reversed' : ''}`}
									aria-labelledby={`svc-title-${svc.id}`}
								>
									{/* Image side */}
									<div className="svc-card__visual">
										<img
											src={svc.image}
											alt=""
											className="svc-card__image"
											loading="lazy"
										/>
										<div className="svc-card__image-overlay" />
									</div>

									{/* Content side */}
									<div className="svc-card__content">
										<div className="svc-card__number-bg" aria-hidden="true">
											{String(svc.id).padStart(2, '0')}
										</div>

										{/* Gold shimmer on hover */}
										<div className="svc-card__shimmer" />

										<span className="svc-card__eyebrow">
											<span className="svc-card__eyebrow-dot" aria-hidden="true" />
											{svc.eyebrow}
										</span>
										<h3 id={`svc-title-${svc.id}`} className="svc-card__title">
											{svc.title}
										</h3>
										<p className="svc-card__desc">{svc.description}</p>
										<ul className="svc-card__features">
											{svc.features.map((f) => (
												<li key={f} className="svc-card__feature">
													<span className="svc-card__feature-icon" aria-hidden="true">
														<LuCheck size={9} />
													</span>
													{f}
												</li>
											))}
										</ul>
									</div>
								</TiltCard>
							</motion.div>
						);
					})}
				</div>

				{/* ── CTA ── */}
				<motion.div
					className="mt-12 flex justify-center md:mt-14"
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					<button
						className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-[#EAC117]/25 px-7 py-3.5 text-[15px] font-bold text-white"
						type="button"
						style={{
							background: 'linear-gradient(135deg, #EAC117, #D97706)',
							boxShadow: '0 8px 28px rgba(234,193,23,0.2), 0 2px 6px rgba(0,0,0,0.25)',
						}}
						onClick={() => {
							const el = document.getElementById('contact');
							if (el) {
								const y = el.getBoundingClientRect().top + window.scrollY - 120;
								window.scrollTo({ top: y, behavior: 'auto' });
								window.history.replaceState(null, '', window.location.pathname);
							}
						}}
					>
						<span className="relative z-[1]" style={{ color: '#06080D' }}>
							Request Consultation
						</span>
						<LuArrowRight
							size={18}
							className="relative z-[1] transition-transform duration-300 group-hover:translate-x-1"
							style={{ color: '#06080D' }}
						/>
						{/* Hover sweep */}
						<span
							className="absolute inset-0 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"
							style={{ background: 'linear-gradient(135deg, #F59E0B, #EAC117)' }}
						/>
					</button>
				</motion.div>
			</div>
		</section>
	);
}
