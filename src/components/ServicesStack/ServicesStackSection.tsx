import {
	useEffect,
	useRef,
	useState,
	type ComponentType,
	type CSSProperties,
	type MouseEvent as ReactMouseEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useInView } from 'framer-motion';
import {
	LuActivity,
	LuArrowRight,
	LuArrowUpRight,
	LuBoxes,
	LuGraduationCap,
	LuRuler,
} from 'react-icons/lu';
import { servicesByCategory } from '../../data/servicesContent';
import { buildWhatsAppUrl } from '../../data/faqContent';
import './ServicesStackSection.scss';

const EASE = [0.22, 1, 0.36, 1] as const;

type IconType = ComponentType<{ size?: number; className?: string }>;

type Tone = { glow: string; ring: string; chip: string; text: string; icon: string };

const TONES: Tone[] = [
	{ glow: 'rgba(234,193,23,0.22)', ring: 'rgba(234,193,23,0.42)', chip: 'rgba(234,193,23,0.12)', text: '#b45309', icon: '#f59e0b' },
	{ glow: 'rgba(59,130,246,0.20)', ring: 'rgba(59,130,246,0.42)', chip: 'rgba(59,130,246,0.10)', text: '#1d4ed8', icon: '#3b82f6' },
	{ glow: 'rgba(16,185,129,0.20)', ring: 'rgba(16,185,129,0.42)', chip: 'rgba(16,185,129,0.10)', text: '#047857', icon: '#10b981' },
	{ glow: 'rgba(139,92,246,0.20)', ring: 'rgba(139,92,246,0.42)', chip: 'rgba(139,92,246,0.10)', text: '#6d28d9', icon: '#8b5cf6' },
];

const ICONS: IconType[] = [LuRuler, LuActivity, LuBoxes, LuGraduationCap];
const TAGS = ['Design & Engineering', 'Simulation & Validation', 'Prototype & Produce', 'Learn & Certify'];

/* Real photography per track, aligned to servicesByCategory order. */
type TrackImage = { src: string; alt: string };
const TRACK_IMAGES: TrackImage[] = [
	{
		src: '/service_images/design-services.webp',
		alt: 'Exploded gearbox assembly modelled in CAD, with the design tree and transform panel visible',
	},
	{
		src: '/service_images/analysis-services.webp',
		alt: 'Engineer reviewing a structural FEA deformation plot of a bracket alongside a printed simulation report',
	},
	{
		src: '/service_images/rapid-prototyping.webp',
		alt: 'Engineer inspecting a 3D-printed housing next to its CAD model and a running FDM printer',
	},
	{
		src: '/service_images/cad-training.webp',
		alt: 'Instructor walking a group of students through a SolidWorks model of a gearbox housing',
	},
];

const totalCapabilities = servicesByCategory.reduce((s, c) => s + c.items.length, 0);

/* ── Animated counter ── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: '-40px' });
	const [value, setValue] = useState(0);
	useEffect(() => {
		if (!inView) return;
		const controls = animate(0, to, {
			duration: 1.1,
			ease: EASE,
			onUpdate: (v) => setValue(Math.round(v)),
		});
		return () => controls.stop();
	}, [inView, to]);
	return (
		<span ref={ref}>
			{value}
			{suffix}
		</span>
	);
}

/* ── Zig-zag track block ── */
function TrackBlock({
	category,
	index,
	reversed,
}: {
	category: (typeof servicesByCategory)[number];
	index: number;
	reversed: boolean;
}) {
	const tone = TONES[index % TONES.length];
	const Icon = ICONS[index % ICONS.length];
	const image = TRACK_IMAGES[index % TRACK_IMAGES.length];
	const moreTo = category.title === 'CAD Training' ? '/career' : '/services';

	const toneVars = {
		'--tone-glow': tone.glow,
		'--tone-ring': tone.ring,
		'--tone-chip': tone.chip,
		'--tone-text': tone.text,
		'--tone-icon': tone.icon,
	} as CSSProperties;

	const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
		const el = e.currentTarget;
		const rect = el.getBoundingClientRect();
		el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
		el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
	};

	return (
		<div className={`sx__track${reversed ? ' sx__track--rev' : ''}`} style={toneVars}>
			{index > 0 && <span className="sx__spine" aria-hidden="true" />}

			<motion.div
				className="sx__track-visual"
				onMouseMove={handleMove}
				initial={{ opacity: 0, x: reversed ? 46 : -46, filter: 'blur(10px)' }}
				whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
				viewport={{ once: true, margin: '-90px' }}
				transition={{ duration: 0.75, ease: EASE }}
			>
				<div className="sx__view-stage sx__view-stage--photo">
					<img src={image.src} alt={image.alt} className="sx__view-img" loading="lazy" />
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 28 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-90px' }}
				transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
			>
				<div className="sx__track-index">{String(index + 1).padStart(2, '0')}</div>
				<div className="sx__track-eyebrow">
					<span className="sx__track-icon">
						<Icon size={16} />
					</span>
					{TAGS[index % TAGS.length]}
				</div>
				<h3 className="sx__track-title">{category.title}</h3>
				<p className="sx__track-desc">{category.description}</p>

				<div className="sx__rail">
					{category.items.map((item) => (
						<Link key={item.slug} to={item.href ?? `/services/${item.slug}`} className="sx__chip">
							{item.title}
							<LuArrowUpRight size={13} />
						</Link>
					))}
				</div>

				<Link to={moreTo} className="sx__explore">
					<span>Explore {category.title}</span>
					<LuArrowRight size={16} />
				</Link>
			</motion.div>
		</div>
	);
}

export default function ServicesStackSection() {
	return (
		<section
			id="services-overview"
			className="sx"
			style={{ scrollMarginTop: 120 }}
			aria-label="Services"
		>
			<div className="sx__scene" aria-hidden="true">
				<div className="sx__grid" />
				<div className="sx__rays" />
				<div className="sx__blob sx__blob--a" />
				<div className="sx__blob sx__blob--b" />
				<div className="sx__blob sx__blob--c" />
				<div className="sx__geo sx__geo--ring" />
				<div className="sx__geo sx__geo--hex" />
				<div className="sx__noise" />
			</div>

			<div className="sx__shell">
				{/* ── Header ── */}
				<div className="sx__band">
					<img
						src="/service_images/services.webp"
						alt="Mechanical assembly, engineering drawings, and CAD model of a gearbox"
						className="sx__band-img"
						loading="lazy"
					/>
					<div className="sx__band-scrim" aria-hidden="true" />

					<div className="sx__band-copy">
						<motion.h2
							className="sx__title"
							initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
							whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
							viewport={{ once: true, margin: '-80px' }}
							transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
						>
							Mechanical Engineering{' '}
							<span className="sx__title-accent">Designed Around Your Goals</span>
						</motion.h2>

						<motion.p
							className="sx__lead mt-5"
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-80px' }}
							transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
						>
							Design, analysis, rapid prototyping, and industry-focused CAD training —
							engineered end-to-end, from first sketch to production-ready output.
						</motion.p>

						<motion.div
							className="sx__metrics mt-8"
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-80px' }}
							transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
						>
							<div>
								<div className="sx__metric-value">
									<Counter to={servicesByCategory.length} />
								</div>
								<div className="sx__metric-label">Capability Tracks</div>
							</div>
							<div>
								<div className="sx__metric-value">
									<Counter to={totalCapabilities} suffix="+" />
								</div>
								<div className="sx__metric-label">Services Offered</div>
							</div>
							<div>
								<div className="sx__metric-value">E2E</div>
								<div className="sx__metric-label">Concept → Production</div>
							</div>
						</motion.div>

						<motion.div
							className="mt-9 flex flex-wrap gap-3"
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-80px' }}
							transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
						>
							<Link
								to="/services"
								className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-6 py-3.5 text-sm font-bold text-[#06080D] shadow-[0_10px_28px_rgba(234,193,23,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(234,193,23,0.42)]"
							>
								Explore All Services
								<LuArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
							</Link>
							<a
								href={buildWhatsAppUrl(
									'Hi MechCurve Team! I would like to talk to an engineer about a project.',
								)}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur transition-colors duration-300 hover:border-amber-300 hover:text-amber-700"
							>
								Talk to an Engineer
							</a>
						</motion.div>
					</div>
				</div>

				{/* ── Zig-zag capability tracks ── */}
				<div className="mt-24 space-y-24 lg:mt-28 lg:space-y-28">
					{servicesByCategory.map((category, index) => (
						<TrackBlock
							key={category.title}
							category={category}
							index={index}
							reversed={index % 2 === 1}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
