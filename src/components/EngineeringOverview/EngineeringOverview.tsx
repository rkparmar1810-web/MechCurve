import {
	LuBinary,
	LuCog,
	LuFactory,
	LuFileCheck,
	LuGauge,
	LuGraduationCap,
	LuLayers3,
	LuRuler,
	LuShieldCheck,
	LuUsers,
} from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import TextReveal from '../TextReveal/TextReveal';
import styles from './EngineeringOverview.module.scss';

/* ── Data ── */
const CARDS = [
	{
		icon: LuBinary,
		tag: '01',
		title: 'Workflow & Modeling Structure',
		subtitle: 'Parametric Precision',
		description:
			'End-to-end parametric modeling with feature-tree discipline, reference geometry standards, and assembly-level interlocking tolerances.',
		image: '/DM/modelling structure.png',
		imageAlt: 'Workflow and modeling structure CAD assembly',
		badges: ['Parametric Geometry', 'Interlocking Tolerances'],
	},
	{
		icon: LuFileCheck,
		tag: '02',
		title: 'Manufacturing-Ready Deliverables',
		subtitle: 'Production-Grade Output',
		description:
			'ISO-standard modeling with revision control, GD&T annotations, and manufacturing-ready 2D drawings for accurate review and practical handoff.',
		bullets: [
			{ icon: LuRuler, text: 'GD&T Annotations' },
			{ icon: LuLayers3, text: 'Assembly BOMs' },
			{ icon: LuFactory, text: 'Tooling Layouts' },
			{ icon: LuShieldCheck, text: 'Quality Validation' },
		],
	},
	{
		icon: LuGraduationCap,
		tag: '03',
		title: 'Professional CAD Mentorship',
		subtitle: 'Industry-Ready Skills',
		description:
			'Structured training from fundamentals to advanced simulation — concept clarity, technical accuracy, manufacturing logic, and industry-ready documentation.',
		steps: [
			{ icon: LuBinary, label: 'Concept Clarity', text: 'Fundamentals-first approach' },
			{ icon: LuRuler, label: 'Technical Accuracy', text: 'Modeling to precision standards' },
			{ icon: LuFactory, label: 'Manufacturing Logic', text: 'Tooling and process design' },
			{ icon: LuShieldCheck, label: 'Industry-Ready', text: 'Comprehensive documentation' },
		],
	},
];

const STATS = [
	{ value: 500, suffix: '+', label: 'Students Trained', icon: LuUsers },
	{ value: 50, suffix: '+', label: 'Projects Delivered', icon: LuLayers3 },
	{ value: 95, suffix: '%', label: 'Success Rate', icon: LuGauge },
	{ value: 4, suffix: '+', label: 'Years Experience', icon: LuRuler },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Animated counter hook ── */
function useCounter(target: number, inView: boolean, duration = 2000) {
	const [count, setCount] = useState(0);
	useEffect(() => {
		if (!inView) return;
		let start = 0;
		const startTime = performance.now();
		const step = (now: number) => {
			const progress = Math.min((now - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			start = Math.round(eased * target);
			setCount(start);
			if (progress < 1) requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	}, [inView, target, duration]);
	return count;
}

export default function EngineeringOverview() {
	const sectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const headerInView = useInView(headerRef, { once: true, margin: '-80px 0px' });
	const statsRef = useRef<HTMLDivElement>(null);
	const statsInView = useInView(statsRef, { once: true, margin: '-60px 0px' });
	const [activeStep, setActiveStep] = useState(-1);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});
	const gridY = useTransform(scrollYProgress, [0, 1], ['24px', '-24px']);
	const gearRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

	return (
		<section
			ref={sectionRef}
			id="engineering"
			className="relative overflow-hidden pt-10 pb-12 md:pt-12 md:pb-16 lg:pt-14 lg:pb-20"
			style={{ background: '#06080D' }}
		>
			{/* ── Ambient background layers ── */}
			<div
				className="pointer-events-none absolute inset-0"
				aria-hidden="true"
				style={{
					backgroundImage:
						'linear-gradient(rgba(234,193,23,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(234,193,23,0.03) 1px, transparent 1px)',
					backgroundSize: '72px 72px',
					maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 70%)',
					WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 10%, transparent 70%)',
				}}
			/>
			<div
				className="pointer-events-none absolute inset-0"
				aria-hidden="true"
				style={{
					background:
						'radial-gradient(ellipse 800px 500px at 10% 20%, rgba(234,193,23,0.06), transparent), radial-gradient(ellipse 600px 400px at 90% 75%, rgba(59,130,246,0.05), transparent)',
				}}
			/>

			{/* ── Floating gear decoration ── */}
			<motion.div
				className="pointer-events-none absolute top-16 right-[8%] hidden opacity-[0.04] lg:block"
				style={{ rotate: gearRotate }}
				aria-hidden="true"
			>
				<LuCog size={220} className="text-[#EAC117]" />
			</motion.div>

			{/* ── Section container ── */}
			<div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 xl:px-16">

				{/* ── Header ── */}
				<div ref={headerRef}>
					<motion.div
						className="mb-12 max-w-3xl md:mb-16"
						initial={{ opacity: 0, y: 36 }}
						animate={headerInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.75, ease: EASE }}
					>
						<motion.span
							className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={headerInView ? { opacity: 1, scale: 1 } : {}}
							transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
						>
							<LuCog size={12} className="animate-[spin_6s_linear_infinite]" />
							Engineering Overview
						</motion.span>

						<TextReveal
							as="h2"
							className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
							delay={0.18}
						>
							Integrated Engineering Delivery System
						</TextReveal>

						<motion.p
							className="mt-4 max-w-2xl text-base leading-[1.8] text-slate-400"
							initial={{ opacity: 0, filter: 'blur(6px)' }}
							animate={headerInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
							transition={{ duration: 0.65, delay: 0.4 }}
						>
							A focused workflow for design and training — technical clarity
							first, then accurate modeling, then manufacturable output and
							industry-ready documentation.
						</motion.p>
					</motion.div>
				</div>

				{/* ── Three-card grid ── */}
				<motion.div
					className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-6"
					style={{ y: gridY }}
				>
					{CARDS.map((card, cardIdx) => (
						<motion.div
							key={card.tag}
							initial={{ opacity: 0, y: 48, filter: 'blur(6px)' }}
							whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.75, ease: EASE, delay: cardIdx * 0.1 }}
						>
							<motion.div
								className={styles.currentBorderWrap}
								whileHover={{ y: -8 }}
								transition={{ type: 'spring', stiffness: 220, damping: 22 }}
							>
								<article
									className={`${styles.currentBorderInner} relative overflow-hidden p-6 md:p-7`}
									style={{
										backdropFilter: 'blur(28px)',
										WebkitBackdropFilter: 'blur(28px)',
										background: 'rgba(10,20,44,0.92)',
										boxShadow: '0 32px 72px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
									}}
								>
									{/* Tag + Icon header */}
									<div className="mb-5 flex items-start justify-between gap-3">
										<div>
											<span className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-400/50">
												{card.tag}
											</span>
											<h3 className="mt-1.5 text-xl font-extrabold leading-tight tracking-tight text-white md:text-2xl">
												{card.title}
											</h3>
										</div>
										<motion.div
											className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#EAC117]/20 bg-[#EAC117]/8"
											animate={{ y: [0, -4, 0] }}
											transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: cardIdx * 0.5 }}
										>
											<card.icon size={20} className="text-[#EAC117]" />
										</motion.div>
									</div>

									{/* Subtitle line */}
									<p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400/40">
										{card.subtitle}
									</p>

									{/* Description */}
									<p className="mb-5 text-[14px] leading-[1.75] text-slate-400">
										{card.description}
									</p>

									{/* ── Card-specific content ── */}

									{/* Card 1: Image */}
									{card.image && (
										<div className="relative overflow-hidden rounded-xl border border-white/[0.06]">
											<img
												src={card.image}
												alt={card.imageAlt}
												className="h-auto w-full rounded-lg object-contain"
												loading="lazy"
											/>
											<div
												className="pointer-events-none absolute inset-0"
												style={{
													background: 'linear-gradient(to top, rgba(10,20,44,0.6) 0%, transparent 50%)',
												}}
											/>
											{card.badges && (
												<div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
													{card.badges.map((b) => (
														<span
															key={b}
															className="rounded-md border border-white/10 bg-[#06080D]/70 px-2.5 py-1 text-[10px] font-semibold text-slate-300 backdrop-blur-sm"
														>
															{b}
														</span>
													))}
												</div>
											)}
										</div>
									)}

									{/* Card 2: Bullet list */}
									{card.bullets && (
										<div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
											{card.bullets.map((b, bi) => (
												<motion.div
													key={b.text}
													className="flex items-center gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.03] p-3 cursor-default"
													initial={{ opacity: 0, x: 16 }}
													whileInView={{ opacity: 1, x: 0 }}
													viewport={{ once: true }}
													transition={{ duration: 0.4, ease: EASE, delay: 0.3 + bi * 0.08 }}
													whileHover={{ borderColor: 'rgba(234,193,23,0.25)', background: 'rgba(234,193,23,0.04)' }}
												>
													<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAC117]/10 border border-[#EAC117]/15">
														<b.icon size={14} className="text-[#EAC117]" />
													</div>
													<span className="text-[12px] font-semibold text-slate-300">{b.text}</span>
												</motion.div>
											))}
										</div>
									)}

									{/* Card 3: Training steps */}
									{card.steps && (
										<div className="space-y-2">
											{card.steps.map((step, si) => (
												<motion.div
													key={step.label}
													className="flex items-start gap-3 rounded-xl p-2.5 -mx-2.5 cursor-default transition-all duration-300"
													style={{
														background: activeStep === si ? 'rgba(234,193,23,0.05)' : 'transparent',
														border: activeStep === si ? '1px solid rgba(234,193,23,0.18)' : '1px solid transparent',
													}}
													onMouseEnter={() => setActiveStep(si)}
													onMouseLeave={() => setActiveStep(-1)}
													whileHover={{ x: 4 }}
												>
													<div
														className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300"
														style={{
															background: activeStep === si
																? 'rgba(234,193,23,0.12)'
																: 'rgba(234,193,23,0.06)',
															border: `1px solid ${activeStep === si ? 'rgba(234,193,23,0.3)' : 'rgba(234,193,23,0.12)'}`,
															boxShadow: activeStep === si ? '0 0 16px rgba(234,193,23,0.1)' : 'none',
														}}
													>
														<step.icon size={14} className="text-[#EAC117]" />
													</div>
													<p className="text-[13px] leading-6 text-slate-500">
														<span className="font-bold text-slate-200">
															{String(si + 1).padStart(2, '0')}. {step.label}:
														</span>{' '}
														{step.text}
													</p>
												</motion.div>
											))}
										</div>
									)}

									{/* Ambient gold glow bottom-right */}
									<div
										className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full"
										style={{
											background: 'radial-gradient(circle, rgba(234,193,23,0.06), transparent 70%)',
											filter: 'blur(30px)',
										}}
									/>
								</article>
							</motion.div>
						</motion.div>
					))}
				</motion.div>

				{/* ── Stats row ── */}
				<div
					ref={statsRef}
					className="mt-12 grid grid-cols-1 min-[360px]:grid-cols-2 gap-4 md:mt-14 xl:grid-cols-4"
				>
					{STATS.map((item, index) => (
						<StatCard key={item.label} item={item} index={index} inView={statsInView} />
					))}
				</div>
			</div>


		</section>
	);
}

/* ── Stat card sub-component with animated counter ── */
function StatCard({
	item,
	index,
	inView,
}: {
	item: (typeof STATS)[number];
	index: number;
	inView: boolean;
}) {
	const count = useCounter(item.value, inView);
	return (
		<motion.div
			initial={{ opacity: 0, y: 30, scale: 0.95 }}
			animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
			transition={{ duration: 0.55, ease: EASE, delay: index * 0.09 }}
		>
			<motion.article
				className="flex h-full items-center gap-3.5 rounded-xl px-5 py-4"
				style={{
					backdropFilter: 'blur(20px)',
					WebkitBackdropFilter: 'blur(20px)',
					background: 'rgba(10,20,44,0.65)',
					border: '1px solid rgba(255,255,255,0.07)',
					boxShadow: '0 12px 36px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
				}}
				whileHover={{
					y: -4,
					boxShadow: '0 20px 50px rgba(0,0,0,0.45), 0 0 30px rgba(234,193,23,0.06)',
				}}
				transition={{ type: 'spring', stiffness: 300, damping: 22 }}
			>
				<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#EAC117]/15 bg-[#EAC117]/8">
					<item.icon size={18} className="text-[#EAC117]" />
				</div>
				<div>
					<div className="text-2xl font-extrabold tracking-tight text-white md:text-[1.7rem]">
						{count}
						{item.suffix}
					</div>
					<div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
						{item.label}
					</div>
				</div>
			</motion.article>
		</motion.div>
	);
}
