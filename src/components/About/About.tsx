import { useRef } from 'react';
import { LuFactory, LuLightbulb, LuRuler, LuShieldCheck } from 'react-icons/lu';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import TextReveal from '../TextReveal/TextReveal';
import styles from './About.module.scss';

/* ── Data ── */
const PILLARS = [
	{
		num: '01',
		icon: LuLightbulb,
		title: 'Concept Clarity',
		text: 'Build strong understanding and structured thinking before modeling so every design step is intentional and technically explainable.',
		meta: ['Workflow', 'Problem Solving'],
	},
	{
		num: '02',
		icon: LuRuler,
		title: 'Technical Accuracy',
		text: 'Use controlled dimensions, robust assembly standards, and quality checks aligned with modern industry practices.',
		meta: ['Feature Tree', 'Assemblies'],
	},
	{
		num: '03',
		icon: LuFactory,
		title: 'Manufacturability',
		text: 'Apply fabrication constraints, process selection, and Design for Manufacturing awareness for practical production handoff.',
		meta: ['DFM', 'BOM'],
	},
	{
		num: '04',
		icon: LuShieldCheck,
		title: 'Industry Alignment',
		text: 'Deliver project guidance and mentorship focused on internship readiness, job expectations, and real product delivery outcomes.',
		meta: ['CSWA', 'Mentorship'],
	},
];

const SPRING = { type: 'spring' as const, stiffness: 180, damping: 18 };

export default function About() {
	const sectionRef = useRef<HTMLElement>(null);
	const pillarsRef = useRef<HTMLDivElement>(null);
	const pillarsInView = useInView(pillarsRef, { once: true, margin: '-80px 0px' });
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});
	const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
	const beamX = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);

	return (
		<section
			ref={sectionRef}
			id="about"
			className="relative overflow-hidden pt-16 pb-8 md:pt-20 md:pb-10 lg:pt-24 lg:pb-12"
			style={{ background: '#06080D' }}
		>
			{/* ── Parallax video background ── */}
			<motion.div
				className="pointer-events-none absolute inset-0 z-0 opacity-20"
				style={{ y: videoY }}
			>
				<video
					className="h-[120%] w-full object-cover object-center"
					autoPlay muted loop playsInline preload="auto"
				>
					<source src="/about_us.mp4" type="video/mp4" />
				</video>
			</motion.div>

			{/* ── Dark overlay ── */}
			<div
				className="pointer-events-none absolute inset-0 z-[1]"
				style={{ background: 'rgba(6,8,13,0.72)' }}
			/>

			{/* ── Diagonal gold & blue beams (unique to About) ── */}
			<motion.div
				className="pointer-events-none absolute inset-0 z-[2]"
				style={{ x: beamX }}
				aria-hidden="true"
			>
				<div
					className="absolute top-[10%] left-[15%] h-[80%] w-[1px]"
					style={{
						background:
							'linear-gradient(to bottom, transparent, rgba(234,193,23,0.15) 30%, rgba(234,193,23,0.25) 50%, rgba(234,193,23,0.15) 70%, transparent)',
						transform: 'rotate(15deg)',
						filter: 'blur(12px)',
					}}
				/>
				<div
					className="absolute top-[5%] left-[65%] h-[90%] w-[1px]"
					style={{
						background:
							'linear-gradient(to bottom, transparent, rgba(59,130,246,0.1) 40%, rgba(59,130,246,0.15) 55%, transparent)',
						transform: 'rotate(-12deg)',
						filter: 'blur(16px)',
					}}
				/>
			</motion.div>

			{/* ── Content ── */}
			<div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 md:px-12 xl:px-16">

				{/* ── Header ── */}
				<div className="mb-10 md:mb-14">
					<motion.span
						className="inline-flex items-center gap-1.5 rounded-full border border-[#EAC117]/25 bg-[#EAC117]/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300"
						initial={{ opacity: 0, x: -24 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					>
						About Us
					</motion.span>
					<TextReveal
						as="h2"
						className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
						delay={0.12}
					>
						MechCurve Team
					</TextReveal>

					{/* Animated gold underline */}
					<motion.div
						className="mt-3 h-[2px] rounded-full"
						style={{ background: 'linear-gradient(90deg, #EAC117, #D97706, transparent)' }}
						initial={{ width: 0, opacity: 0 }}
						whileInView={{ width: 120, opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
					/>
				</div>

				{/* ── Bento: Company Profile + Approach ── */}
				<div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mb-12">
					{/* Left: Company Profile */}
					<motion.div
						initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
						whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
						viewport={{ once: true, margin: '-60px' }}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					>
						<div className={`${styles.profileCard} flex h-full flex-col rounded-2xl p-6 md:p-7`}>
							<span className="self-start inline-flex items-center rounded-md border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
								Company Profile
							</span>
							<h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-[1.7rem]">
								Engineering training built for real-world application
							</h3>
							<p className="mt-3 text-[14px] leading-[1.8] text-slate-400">
								We combine CAD precision, manufacturing awareness, and practical
								teaching structure so students gain usable skills and clients
								receive dependable engineering output.
							</p>

									<div className="mt-auto flex flex-col min-[360px]:flex-row gap-4 pt-6">
								<div className="flex-1 rounded-xl border border-[#EAC117]/12 bg-[#EAC117]/[0.04] p-4">
									<div className="text-2xl font-extrabold tracking-tight text-[#EAC117]">500+</div>
									<div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
										Students Trained
									</div>
								</div>
								<div className="flex-1 rounded-xl border border-[#EAC117]/12 bg-[#EAC117]/[0.04] p-4">
									<div className="text-2xl font-extrabold tracking-tight text-[#EAC117]">95%</div>
									<div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
										First-attempt Success
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Right: Approach */}
					<motion.div
						initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
						whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
						viewport={{ once: true, margin: '-60px' }}
						transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
					>
						<div className={`${styles.approachCard} flex h-full flex-col rounded-2xl p-6 md:p-7`}>
							<span className="self-start inline-flex items-center rounded-md border border-[#EAC117]/20 bg-[#EAC117]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
								Approach
							</span>
							<h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white md:text-[1.7rem]">
								Structured thinking, accurate modelling, industry-ready output
							</h3>
							<p className="mt-3 text-[14px] leading-[1.8] text-slate-400">
								Since 2022, our team has focused on empowering future engineers
								with practical design knowledge, precision-driven workflows, and
								delivery standards aligned with modern product development.
							</p>
						</div>
					</motion.div>
				</div>

				{/* ── 4 Pillar Cards ── */}
				<div
					ref={pillarsRef}
					className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
				>
					{PILLARS.map((p, i) => (
						<motion.article
							key={p.title}
							className={styles.pillarCard}
							initial={{ opacity: 0, y: 36, scale: 0.97 }}
							animate={pillarsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
							transition={{ ...SPRING, delay: i * 0.08 }}
						>
							{/* Watermark number */}
							<span className={styles.watermark}>{p.num}</span>

							{/* Gold left accent */}
							<div className={styles.goldAccent} />

							<div className="relative z-[1] flex h-full flex-col p-5 md:p-6">
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#EAC117]/20 bg-[#EAC117]/8">
									<p.icon size={18} className="text-[#EAC117]" />
								</div>
								<h4 className="text-lg font-bold tracking-tight text-white">{p.title}</h4>
								<p className="mt-2 text-[13px] leading-[1.7] text-slate-400">{p.text}</p>
								<div className="mt-auto flex flex-wrap gap-2 pt-4">
									{p.meta.map((m) => (
										<span
											key={m}
											className="rounded-full border border-[#EAC117]/15 bg-[#EAC117]/6 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400/80"
										>
											{m}
										</span>
									))}
								</div>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
