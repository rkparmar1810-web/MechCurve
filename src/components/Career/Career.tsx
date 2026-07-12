import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import {
	LuArrowRight,
	LuArrowUpRight,
	LuAward,
	LuBadgeCheck,
	LuBookOpen,
	LuBox,
	LuBriefcase,
	LuCheck,
	LuChevronDown,
	LuFileText,
	LuGraduationCap,
	LuLayers,
	LuLightbulb,
	LuMonitor,
	LuRocket,
	LuRuler,
	LuTarget,
	LuTrophy,
	LuUsers,
	LuWrench,
} from 'react-icons/lu';
import './Career.scss';

const EASE = [0.22, 1, 0.36, 1] as const;

type Tone = { icon: string; ring: string; glow: string; chip: string; text: string };
const TONES: Record<'amber' | 'blue' | 'emerald' | 'violet', Tone> = {
	amber: { icon: '#f59e0b', ring: 'rgba(234,193,23,0.42)', glow: 'rgba(245,158,11,0.4)', chip: 'rgba(234,193,23,0.12)', text: '#b45309' },
	blue: { icon: '#3b82f6', ring: 'rgba(59,130,246,0.42)', glow: 'rgba(59,130,246,0.4)', chip: 'rgba(59,130,246,0.1)', text: '#1d4ed8' },
	emerald: { icon: '#10b981', ring: 'rgba(16,185,129,0.42)', glow: 'rgba(16,185,129,0.4)', chip: 'rgba(16,185,129,0.1)', text: '#047857' },
	violet: { icon: '#8b5cf6', ring: 'rgba(139,92,246,0.42)', glow: 'rgba(139,92,246,0.4)', chip: 'rgba(139,92,246,0.1)', text: '#6d28d9' },
};
const toneVars = (t: Tone) =>
	({ '--tone-icon': t.icon, '--tone-ring': t.ring, '--tone-glow': t.glow, '--tone-chip': t.chip, '--tone-text': t.text }) as CSSProperties;

/* ── Content ── */
const STATS = [
	{ to: 500, suffix: '+', label: 'Students Trained' },
	{ to: 50, suffix: '+', label: 'Projects Delivered' },
	{ to: 95, suffix: '%', label: 'Success Rate' },
	{ to: 4, suffix: '+', label: 'Years of Experience' },
];

const WHY = [
	{ icon: LuWrench, tone: 'amber', title: 'Manufacturing-First Curriculum', desc: 'Every module is grounded in real production logic, DFM, and industry documentation standards.' },
	{ icon: LuLayers, tone: 'blue', title: 'Hands-On Practical Training', desc: 'Learn by building — modeling, assemblies, drawings, and manufacturing-oriented design.' },
	{ icon: LuBadgeCheck, tone: 'emerald', title: 'International Certification', desc: 'Industry-recognized certification that strengthens your engineering profile.' },
	{ icon: LuUsers, tone: 'violet', title: 'Mentorship & Career Guidance', desc: 'Personalized guidance, portfolio reviews, and interview preparation from practicing engineers.' },
] as const;

const JOURNEY = [
	{ icon: LuBookOpen, tone: 'amber', title: 'Learn', desc: 'Master fundamentals with industry-relevant theory and guided modeling.' },
	{ icon: LuWrench, tone: 'blue', title: 'Practice', desc: 'Sharpen skills through hands-on exercises and design reviews.' },
	{ icon: LuRocket, tone: 'emerald', title: 'Projects', desc: 'Build real, manufacturable projects that become portfolio pieces.' },
	{ icon: LuBadgeCheck, tone: 'violet', title: 'Certification', desc: 'Validate your expertise with international certification.' },
	{ icon: LuBriefcase, tone: 'amber', title: 'Career', desc: 'Step into design, product development, and manufacturing roles.' },
] as const;

const PROGRAMS = [
	{
		icon: LuUsers,
		badge: 'For Professionals',
		title: 'Professional Program',
		desc: 'Upskilling path for working professionals with customizable modules and mentoring.',
		items: ['Custom module selection', 'Real project-style exercises', 'Simulation and validation exposure'],
	},
	{
		icon: LuAward,
		badge: 'Most Advanced',
		title: 'Expert Program',
		desc: 'Advanced industry projects and simulations with deep engineering practice.',
		items: ['CAD — Professional, 4 modules (SM, WD, SU, DT)', 'GD&T', 'CAE — Professional, Expert', 'CFD — Professional, Expert', 'Fully customizable per learner'],
	},
] as const;

type Track = {
	key: string;
	tone: keyof typeof TONES;
	title: string;
	tagline: string;
	lead: string;
	skills: string[];
	software: string[];
	who: string;
	/* Real photo for the track viewport. */
	image: { src: string; alt: string };
};
const TRACKS: Track[] = [
	{
		key: 'CAD',
		tone: 'amber',
		title: 'CAD Training',
		tagline: 'Design foundation',
		lead: 'Build a strong foundation in computer-aided design. Learn the complete design workflow — from 3D modeling and assemblies to engineering drawings and manufacturing-oriented design practices.',
		skills: ['3D part & assembly modeling', 'Sheet metal & weldments', 'Engineering drawings', 'Design intent & manufacturability'],
		software: ['SolidWorks', 'Siemens NX', 'CATIA'],
		who: 'Students, Fresh Graduates, Design Engineers, Product Development Engineers, and Manufacturing Professionals seeking practical CAD skills and industry-recognized certifications.',
		image: {
			src: '/service_images/track-cad.webp',
			alt: 'CAD training session with a 3D model on screen',
		},
	},
	{
		key: 'GD&T',
		tone: 'blue',
		title: 'GD&T Training',
		tagline: 'Language of drawings',
		lead: 'Master Geometric Dimensioning & Tolerancing — interpret engineering drawings, apply geometric tolerances, establish datum structures, and communicate design intent with precision.',
		skills: ['Reading engineering drawings', 'Geometric tolerances', 'Datum reference frames', 'Inspection & quality logic'],
		software: ['ISO & ASME standards', 'Drawing-based case studies'],
		who: 'Mechanical Engineering Students, Design Engineers, Manufacturing Engineers, Quality Engineers, CNC Programmers, and professionals involved in product design, production, and inspection.',
		image: {
			src: '/service_images/track-gdt.webp',
			alt: 'MechCurve trainer walking a student through feature control frames and datums on a GD&T drawing',
		},
	},
	{
		key: 'CAE',
		tone: 'emerald',
		title: 'CAE Training',
		tagline: 'Simulation-driven',
		lead: 'Evaluate product performance before manufacturing. Validate designs, optimize components, and identify potential failures using industry-standard CAE tools.',
		skills: ['Structural behavior analysis', 'Stress & deformation', 'Safety factors', 'Design optimization'],
		software: ['Industry-standard CAE tools', 'Simulation workflows'],
		who: 'Mechanical Engineering Students, Design Engineers, Product Development Engineers, R&D Professionals, and engineers building expertise in simulation-driven product development.',
		image: {
			src: '/service_images/track-cae.webp',
			alt: 'Trainer presenting a von Mises stress plot to students running FEA simulations at their workstations',
		},
	},
	{
		key: 'CFD',
		tone: 'violet',
		title: 'CFD Training',
		tagline: 'Fluid & thermal',
		lead: 'Simulate real-world fluid and heat-transfer phenomena. Analyze flow behavior, pressure distribution, turbulence, and thermal performance to drive better engineering decisions.',
		skills: ['Fluid flow analysis', 'Pressure & turbulence', 'Thermal performance', 'Pumps, fans, HVAC systems'],
		software: ['Industry-standard CFD tools', 'Project-based simulations'],
		who: 'Mechanical Engineering Students, Design Engineers, Thermal Engineers, R&D Professionals, and engineers working in fluid systems, energy, HVAC, and process industries.',
		image: {
			src: '/service_images/track-cfd.webp',
			alt: 'CFD training class working through flow simulations at their workstations',
		},
	},
];

const HANDS_ON = [
	{ icon: LuLightbulb, title: 'Concept Clarity', desc: 'Understand the why behind every design decision.' },
	{ icon: LuTarget, title: 'Technical Accuracy', desc: 'Controlled dimensions and disciplined CAD practice.' },
	{ icon: LuRocket, title: 'Project-Based Learning', desc: 'Real, manufacturable assignments end-to-end.' },
	{ icon: LuFileText, title: 'Industry Documentation', desc: 'Drawings, BOMs, and standards used on the shop floor.' },
] as const;

const SOFTWARE = ['SolidWorks', 'Siemens NX', 'CATIA', 'AutoCAD'];

const CERT_STEPS = ['Enroll', 'Learn', 'Build a Project', 'Assessment', 'Get Certified'];

const PLACEMENT_ROLES = ['Design Engineer', 'Product Development Engineer', 'CAE / CFD Analyst', 'Manufacturing Engineer', 'Drafting & Documentation Specialist'];
const PLACEMENT_SUPPORT = [
	{ icon: LuBriefcase, title: 'Portfolio Building', desc: 'Turn projects into a job-ready engineering portfolio.' },
	{ icon: LuUsers, title: 'Interview Preparation', desc: 'Mock interviews and technical readiness coaching.' },
	{ icon: LuBadgeCheck, title: 'Certification Guidance', desc: 'Support through assessment and certification.' },
	{ icon: LuTrophy, title: 'Industry Mentorship', desc: 'Guidance from practicing design engineers.' },
] as const;

const TESTIMONIALS = [
	{ quote: 'The manufacturing-first approach made the difference. I walked into my first role already thinking like a design engineer.', role: 'Mechanical Design Engineer', meta: 'Automotive · Alumnus' },
	{ quote: 'Project-based learning gave me a real portfolio. The certification and mentorship helped me stand out in interviews.', role: 'Product Development Engineer', meta: 'Industrial Equipment · Alumnus' },
	{ quote: 'From assemblies to GD&T and simulation, everything connected to real production. Truly practical training.', role: 'CAE Analyst', meta: 'R&D · Alumnus' },
];

/* ── Small building blocks ── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: '-40px' });
	const [v, setV] = useState(0);
	useEffect(() => {
		if (!inView) return;
		const c = animate(0, to, { duration: 1.2, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
		return () => c.stop();
	}, [inView, to]);
	return (
		<span ref={ref}>
			{v}
			{suffix}
		</span>
	);
}

function SectionHead({ eyebrow, title, sub, center = true }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
	return (
		<motion.div
			className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}
			initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
			whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			viewport={{ once: true, margin: '-80px' }}
			transition={{ duration: 0.6, ease: EASE }}
		>
			<span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700">
				<span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
				{eyebrow}
			</span>
			<h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-[2.4rem] md:leading-[1.1]">{title}</h2>
			{sub && <p className="mt-3 text-[15px] leading-8 text-slate-600">{sub}</p>}
		</motion.div>
	);
}

export default function Career() {
	const [activeTrack, setActiveTrack] = useState(0);
	const [tIndex, setTIndex] = useState(0);

	const track = TRACKS[activeTrack];
	const trackTone = TONES[track.tone];

	useEffect(() => {
		const id = setInterval(() => setTIndex((p) => (p + 1) % TESTIMONIALS.length), 5200);
		return () => clearInterval(id);
	}, []);

	return (
		<section id="career" className="cr" aria-label="CAD and Engineering Training">
			<div className="cr__scene" aria-hidden="true">
				<div className="cr__grid" />
				<div className="cr__blob cr__blob--a" />
				<div className="cr__blob cr__blob--b" />
				<div className="cr__blob cr__blob--c" />
				<div className="cr__noise" />
			</div>

			{/* ── Hero ── */}
			<div className="cr__hero-band">
				<img
					src="/service_images/career.webp"
					alt="Instructor teaching a CAD training session to students modelling a gear assembly in SolidWorks"
					className="cr__hero-img"
				/>
				<div className="cr__hero-scrim" aria-hidden="true" />

				<div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-12 pt-28 sm:px-8 md:px-12 lg:pt-32">
					<div className="max-w-xl">
						<motion.span
							className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700"
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: EASE }}
						>
							<LuGraduationCap size={14} />
							MechCurve Engineering Academy
						</motion.span>
						<motion.h1
							className="mt-5 text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 md:text-[3rem]"
							initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
							animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
							transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
						>
							Build the CAD skills{' '}
							<span className="bg-gradient-to-r from-[#EAC117] to-[#F59E0B] bg-clip-text text-transparent">industry actually demands</span>
						</motion.h1>
						<motion.p
							className="mt-5 max-w-xl text-[15px] leading-8 text-slate-600 md:text-base"
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
						>
							Industry-relevant theory meets hands-on practical training. Learn the complete design workflow — from 3D modeling and assemblies to drawings, simulation, and manufacturing-ready design — and graduate job-ready.
						</motion.p>
						<motion.div
							className="mt-7 flex flex-wrap gap-3"
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
						>
							<a href="mailto:admin@mechcurve.com" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-6 py-3.5 text-sm font-bold text-[#06080D] shadow-[0_10px_28px_rgba(234,193,23,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(234,193,23,0.44)]">
								Enroll Now
								<LuArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
							</a>
							<a href="https://wa.me/919106297853" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur transition-colors duration-300 hover:border-amber-300 hover:text-amber-700">
								Book a Free Demo
							</a>
						</motion.div>
						<motion.div
							className="mt-7 flex flex-wrap gap-2.5"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.32 }}
						>
							{['International Certification', 'Online & Offline', 'Project-Based', 'Since 2022'].map((t) => (
								<span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-600">
									<LuCheck size={12} className="text-emerald-600" />
									{t}
								</span>
							))}
						</motion.div>
					</div>
				</div>
			</div>

			{/* ── Stats band ── */}
			<div className="px-5 py-8 sm:px-8 md:px-12">
				<div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-3 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] backdrop-blur md:grid-cols-4 md:p-7">
					{STATS.map((s) => (
						<div key={s.label} className="text-center">
							<div className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
								<Counter to={s.to} suffix={s.suffix} />
							</div>
							<div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">{s.label}</div>
						</div>
					))}
				</div>
			</div>

			{/* ── Why learn with us ── */}
			<div className="px-5 py-14 sm:px-8 md:px-12 md:py-20">
				<div className="mx-auto max-w-[1180px]">
					<SectionHead eyebrow="Why MechCurve" title="An academy built by practicing engineers" sub="Not a generic training institute — a manufacturing-first learning experience designed around how real engineering teams work." />
					<div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{WHY.map((w, i) => {
							const tone = TONES[w.tone];
							return (
								<motion.article
									key={w.title}
									className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_56px_rgba(15,23,42,0.1)]"
									style={toneVars(tone)}
									initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
									whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
									viewport={{ once: true, margin: '-70px' }}
									transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
								>
									<span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-6deg]" style={{ color: tone.icon, background: tone.chip, borderColor: tone.ring }}>
										<w.icon size={22} />
									</span>
									<h3 className="mt-4 text-lg font-bold text-slate-900">{w.title}</h3>
									<p className="mt-2 text-[14px] leading-7 text-slate-600">{w.desc}</p>
								</motion.article>
							);
						})}
					</div>
				</div>
			</div>

			{/* ── Journey roadmap ── */}
			<div className="px-5 py-14 sm:px-8 md:px-12 md:py-20">
				<div className="mx-auto max-w-[1180px]">
					<SectionHead eyebrow="Your Journey" title="From first sketch to first job" sub="A guided path that turns curiosity into an industry-ready engineering career." />
					<div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5 md:gap-4">
						<motion.div
							className="cr__road-line hidden md:block"
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							viewport={{ once: true, margin: '-80px' }}
							transition={{ duration: 1.1, ease: EASE }}
						/>
						{JOURNEY.map((step, i) => {
							const tone = TONES[step.tone];
							return (
								<motion.div
									key={step.title}
									className="cr__road-step flex flex-col items-center text-center"
									style={toneVars(tone)}
									initial={{ opacity: 0, y: 24 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-60px' }}
									transition={{ duration: 0.55, delay: 0.12 + i * 0.12, ease: EASE }}
								>
									<div className="cr__road-node">
										<step.icon size={22} />
									</div>
									<div className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: tone.text }}>
										Step {i + 1}
									</div>
									<h3 className="mt-1 text-base font-bold text-slate-900">{step.title}</h3>
									<p className="mt-1 max-w-[15rem] text-[13px] leading-6 text-slate-600">{step.desc}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>

			{/* ── Programs ── */}
			<div className="px-5 py-14 sm:px-8 md:px-12 md:py-20">
				<div className="mx-auto max-w-[1180px]">
					<SectionHead eyebrow="Programs" title="Pick the path that fits your stage" sub="Structured programs tailored to your goals, background, and pace." />
					<div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
						{PROGRAMS.map((p, i) => (
							<motion.article
								key={p.title}
								className={`group relative overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 ${
									i === 0
										? 'border-amber-300/60 bg-gradient-to-b from-amber-50/70 to-white shadow-[0_24px_56px_rgba(234,193,23,0.16)]'
										: 'border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] hover:shadow-[0_26px_56px_rgba(15,23,42,0.1)]'
								}`}
								initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
								whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
								viewport={{ once: true, margin: '-70px' }}
								transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
							>
								<div className="flex items-center justify-between">
									<span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
										<p.icon size={22} />
									</span>
									<span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">{p.badge}</span>
								</div>
								<h3 className="mt-4 text-xl font-bold text-slate-900">{p.title}</h3>
								<p className="mt-2 text-[14px] leading-7 text-slate-600">{p.desc}</p>
								<ul className="mt-4 space-y-2.5">
									{p.items.map((it) => (
										<li key={it} className="flex items-start gap-2.5 text-[14px] text-slate-700">
											<span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
												<LuCheck size={11} />
											</span>
											<span>{it}</span>
										</li>
									))}
								</ul>
								<a href="mailto:admin@mechcurve.com" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors hover:text-amber-700">
									Enquire about {p.title.split(' ')[0]}
									<LuArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
								</a>
							</motion.article>
						))}
					</div>
				</div>
			</div>

			{/* ── Interactive Course Explorer ── */}
			<div className="px-5 py-14 sm:px-8 md:px-12 md:py-20">
				<div className="mx-auto max-w-[1180px]">
					<SectionHead eyebrow="Course Explorer" title="Explore each specialized track" sub="Hover or tap a track to see the skills, tools, and outcomes you'll gain." />
					<div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
						{/* track list */}
						<div className="flex flex-col gap-2.5">
							{TRACKS.map((t, i) => {
								const tone = TONES[t.tone];
								const isActive = i === activeTrack;
								return (
									<button
										key={t.key}
										type="button"
										onMouseEnter={() => setActiveTrack(i)}
										onFocus={() => setActiveTrack(i)}
										onClick={() => setActiveTrack(i)}
										className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${isActive ? 'bg-white shadow-[0_18px_44px_rgba(15,23,42,0.1)]' : 'border-slate-200 bg-white/60 hover:bg-white'}`}
										style={{ borderColor: isActive ? tone.ring : undefined, ...toneVars(tone) }}
									>
										{isActive && <motion.span layoutId="crTrackHl" className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full" style={{ background: tone.icon }} transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
										<span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style={{ color: tone.icon, background: tone.chip, borderColor: tone.ring }}>
											{i === 0 ? <LuBox size={19} /> : i === 1 ? <LuRuler size={19} /> : i === 2 ? <LuTarget size={19} /> : <LuLayers size={19} />}
										</span>
										<span className="min-w-0">
											<span className="block text-[15px] font-bold text-slate-900">{t.title}</span>
											<span className="block text-xs text-slate-500">{t.tagline}</span>
										</span>
										<LuChevronDown size={16} className={`ml-auto shrink-0 text-slate-400 transition-transform duration-300 ${isActive ? '-rotate-90' : ''}`} />
									</button>
								);
							})}
						</div>

						{/* detail panel */}
						<div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] md:p-8" style={toneVars(trackTone)}>
							<AnimatePresence mode="wait">
								<motion.div
									key={track.key}
									initial={{ opacity: 0, y: 14 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3, ease: EASE }}
									className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_240px]"
								>
									<div>
										<span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: trackTone.text, background: trackTone.chip }}>
											{track.tagline}
										</span>
										<h3 className="mt-3 text-2xl font-bold text-slate-900">{track.title}</h3>
										<p className="mt-3 text-[14.5px] leading-7 text-slate-600">{track.lead}</p>

										<p className="mt-5 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">Skills you'll gain</p>
										<div className="mt-2.5 flex flex-wrap gap-2">
											{track.skills.map((s) => (
												<span key={s} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[13px] font-medium text-slate-700">
													<LuCheck size={12} style={{ color: trackTone.icon }} />
													{s}
												</span>
											))}
										</div>

										<div className="mt-5 flex flex-wrap items-center gap-2">
											<span className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">Tools</span>
											{track.software.map((sw) => (
												<span key={sw} className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-slate-700">
													{sw}
												</span>
											))}
										</div>
									</div>

									<div className="flex flex-col gap-3">
										<div className="relative overflow-hidden rounded-2xl border border-slate-200" style={{ background: 'linear-gradient(180deg,#0a1120,#0e1a30)' }}>
											<img
												src={track.image.src}
												alt={track.image.alt}
												className="aspect-[26/18] w-full object-cover"
												loading="lazy"
											/>
										</div>
										<div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
											<p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Who should attend</p>
											<p className="mt-1.5 text-[12.5px] leading-6 text-slate-600">{track.who}</p>
										</div>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
					<p className="mt-4 text-center text-[13px] text-slate-500">Downloadable training modules available on request from the MechCurve team.</p>
				</div>
			</div>

			{/* ── Hands-on + Software ── */}
			<div className="px-5 py-14 sm:px-8 md:px-12 md:py-20">
				<div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
					<div>
						<SectionHead eyebrow="Hands-On Experience" title="Learning that feels like the job" center={false} />
						<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
							{HANDS_ON.map((h, i) => (
								<motion.div
									key={h.title}
									className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-60px' }}
									transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
								>
									<span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600">
										<h.icon size={19} />
									</span>
									<div>
										<h3 className="text-[15px] font-bold text-slate-900">{h.title}</h3>
										<p className="mt-1 text-[13px] leading-6 text-slate-600">{h.desc}</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>

					<motion.div
						className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.07)]"
						initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
						whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
						viewport={{ once: true, margin: '-80px' }}
						transition={{ duration: 0.7, ease: EASE }}
					>
						<p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600">
							<LuMonitor size={13} />
							Software You'll Master
						</p>
						<div className="mt-5 grid grid-cols-2 gap-3">
							{SOFTWARE.map((sw, i) => (
								<motion.div
									key={sw}
									className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/60 hover:shadow-[0_16px_34px_rgba(15,23,42,0.1)]"
									initial={{ opacity: 0, scale: 0.94 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true, margin: '-50px' }}
									transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
								>
									<span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-amber-600 transition-transform duration-300 group-hover:scale-105">
										<LuBox size={18} />
									</span>
									<span className="text-[14px] font-bold text-slate-800">{sw}</span>
								</motion.div>
							))}
						</div>
						<p className="mt-4 text-[13px] text-slate-500">…and industry-standard CAE / CFD simulation tools.</p>
					</motion.div>
				</div>
			</div>

			{/* ── Certification journey ── */}
			<div className="px-5 py-14 sm:px-8 md:px-12 md:py-16">
				<div className="mx-auto max-w-[1180px] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-8 md:p-10">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
						<div>
							<span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-amber-300">
								<LuBadgeCheck size={13} />
								Certification Journey
							</span>
							<h2 className="mt-4 text-2xl font-extrabold text-white md:text-3xl">Earn certification that stands out</h2>
							<p className="mt-3 max-w-lg text-[14.5px] leading-7 text-slate-300">International, industry-recognized certification awarded after successful evaluation and project submission — proof of practical, job-ready capability.</p>
						</div>
						<div className="flex flex-wrap items-center gap-x-1 gap-y-4">
							{CERT_STEPS.map((s, i) => (
								<motion.div
									key={s}
									className="flex items-center"
									initial={{ opacity: 0, y: 14 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-40px' }}
									transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
								>
									<div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2">
										<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#EAC117] to-[#F59E0B] text-[11px] font-bold text-[#06080D]">{i + 1}</span>
										<span className="text-[13px] font-semibold text-slate-200">{s}</span>
									</div>
									{i < CERT_STEPS.length - 1 && <LuArrowRight size={16} className="mx-1 text-slate-600" />}
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* ── Placement + testimonials ── */}
			<div className="px-5 py-14 sm:px-8 md:px-12 md:py-20">
				<div className="mx-auto max-w-[1180px]">
					<SectionHead eyebrow="Placement Support" title="We prepare you for the role, not just the exam" sub="Career readiness is built into the training — from portfolio to interview." />
					<div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.85fr]">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{PLACEMENT_SUPPORT.map((p, i) => (
								<motion.div
									key={p.title}
									className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-60px' }}
									transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
								>
									<span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-600">
										<p.icon size={19} />
									</span>
									<h3 className="mt-3 text-[15px] font-bold text-slate-900">{p.title}</h3>
									<p className="mt-1 text-[13px] leading-6 text-slate-600">{p.desc}</p>
								</motion.div>
							))}
							<div className="rounded-2xl border border-slate-200 bg-white p-5 sm:col-span-2">
								<p className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">Roles our students target</p>
								<div className="mt-3 flex flex-wrap gap-2">
									{PLACEMENT_ROLES.map((r) => (
										<span key={r} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[13px] font-medium text-slate-700">
											<LuBriefcase size={12} className="text-amber-600" />
											{r}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* testimonial slider */}
						<motion.div
							className="relative flex min-h-[280px] flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-7 text-white"
							initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
							whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
							viewport={{ once: true, margin: '-80px' }}
							transition={{ duration: 0.7, ease: EASE }}
						>
							<div className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(234,193,23,0.2),transparent_70%)] blur-2xl" aria-hidden="true" />
							<div className="relative flex items-center gap-2 text-amber-300">
								<LuTrophy size={16} />
								<span className="text-[11px] font-bold uppercase tracking-[0.16em]">Student Success</span>
							</div>
							<div className="relative mt-5 flex-1">
								<AnimatePresence mode="wait">
									<motion.blockquote
										key={tIndex}
										initial={{ opacity: 0, y: 14 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -12 }}
										transition={{ duration: 0.4, ease: EASE }}
									>
										<p className="text-[16px] leading-8 text-slate-100">“{TESTIMONIALS[tIndex].quote}”</p>
										<footer className="mt-5">
											<div className="text-sm font-bold text-white">{TESTIMONIALS[tIndex].role}</div>
											<div className="text-[12px] text-slate-400">{TESTIMONIALS[tIndex].meta}</div>
										</footer>
									</motion.blockquote>
								</AnimatePresence>
							</div>
							<div className="relative mt-4 flex gap-1.5">
								{TESTIMONIALS.map((_, i) => (
									<button key={i} type="button" aria-label={`Testimonial ${i + 1}`} onClick={() => setTIndex(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === tIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/25'}`} />
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			{/* ── Final CTA ── */}
			<div className="px-5 pb-20 pt-6 sm:px-8 md:px-12">
				<motion.div
					className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950 px-6 py-14 text-center md:px-12 md:py-20"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-80px' }}
					transition={{ duration: 0.7, ease: EASE }}
				>
					<div className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(234,193,23,0.24),transparent_70%)] blur-2xl" aria-hidden="true" />
					<div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_70%)] blur-2xl" aria-hidden="true" />
					<div className="relative">
						<span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-300">
							<LuGraduationCap size={14} />
							Enrollment Open
						</span>
						<h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-[2.6rem]">
							Ready to become an{' '}
							<span className="bg-gradient-to-r from-[#EAC117] to-[#F59E0B] bg-clip-text text-transparent">industry-ready engineer?</span>
						</h2>
						<p className="mx-auto mt-4 max-w-xl text-[15px] leading-8 text-slate-300">Join 500+ engineers who trained with MechCurve. Book a free demo session and start building skills that industry demands.</p>
						<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
							<a href="mailto:admin@mechcurve.com" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-7 py-4 text-sm font-bold text-[#06080D] shadow-[0_12px_34px_rgba(234,193,23,0.4)] transition-transform duration-300 hover:-translate-y-0.5">
								Enroll Now
								<LuArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
							</a>
							<a href="https://wa.me/919106297853" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-colors duration-300 hover:border-white/30">
								Chat on WhatsApp
								<LuArrowUpRight size={16} />
							</a>
						</div>
						<div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-semibold text-slate-400">
							<span className="inline-flex items-center gap-1.5"><LuBadgeCheck size={14} className="text-emerald-400" /> International Certification</span>
							<span className="inline-flex items-center gap-1.5"><LuUsers size={14} className="text-blue-400" /> 500+ Trained</span>
							<span className="inline-flex items-center gap-1.5"><LuMonitor size={14} className="text-amber-400" /> Online &amp; Offline</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
