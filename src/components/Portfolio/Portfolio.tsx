import { useRef, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowUpRight, LuLayers } from 'react-icons/lu';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import styles from './Portfolio.module.scss';
import {
	getDetailPath,
	projectCards,
	projectDetails,
} from '../../data/detailContent';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Category → amber/gold-tinted gradient ── */
const categoryGradients: Record<string, string> = {
	'Sheet Metal': 'linear-gradient(135deg, #EAC117, #F59E0B)',
	'Assembly Design': 'linear-gradient(135deg, #D97706, #EAC117)',
	'Weldment Design': 'linear-gradient(135deg, #F59E0B, #D97706)',
	'Parametric Design': 'linear-gradient(135deg, #EAC117, #D97706)',
};

/* ── Animated counter ── */
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: '-40px' });
	const [val, setVal] = useState(0);

	useEffect(() => {
		if (!inView) return;
		const dur = 1500;
		const t0 = performance.now();
		function tick(now: number) {
			const p = Math.min((now - t0) / dur, 1);
			const ease = 1 - Math.pow(1 - p, 3);
			setVal(Math.round(ease * end));
			if (p < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}, [inView, end]);

	return (
		<span ref={ref}>
			{val}
			{suffix}
		</span>
	);
}

/* ── Card with mouse-tracking glow border ── */
function GlowCard({
	children,
	className,
}: {
	children: React.ReactNode;
	className: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [pos, setPos] = useState({ x: 50, y: 50 });

	const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const el = ref.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		setPos({
			x: ((e.clientX - r.left) / r.width) * 100,
			y: ((e.clientY - r.top) / r.height) * 100,
		});
	}, []);

	return (
		<div
			ref={ref}
			className={className}
			style={
				{
					'--glow-x': `${pos.x}%`,
					'--glow-y': `${pos.y}%`,
				} as React.CSSProperties
			}
			onMouseMove={onMove}
		>
			{children}
		</div>
	);
}

export default function Portfolio() {
	const cards = projectCards;
	const totalGallery = Object.values(projectDetails).reduce(
		(n, p) => n + p.gallery.length,
		0,
	);

	const sectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const headerInView = useInView(headerRef, { once: true, margin: '-60px 0px' });
	const gridRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});

	const orbY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);
	const orbX = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);

	return (
		<section
			ref={sectionRef}
			id="portfolio"
			className={styles.section}
			aria-label="Portfolio"
		>
			{/* ── Hexagonal grid pattern (unique to Portfolio) ── */}
			<div className={styles.hexPattern} aria-hidden="true" />

			{/* ── Ambient orbs (gold/amber) ── */}
			<motion.div
				className={styles.orbA}
				style={{ y: orbY, x: orbX }}
				aria-hidden="true"
			/>
			<motion.div
				className={styles.orbB}
				style={{ y: orbY }}
				aria-hidden="true"
			/>

			<div className={styles.inner}>
				{/* ── Header ── */}
				<motion.div
					ref={headerRef}
					className={styles.header}
					initial={{ opacity: 0 }}
					animate={headerInView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6 }}
				>
					<div className={styles.headerLeft}>
						<motion.span
							className={styles.badge}
							initial={{ opacity: 0, scale: 0.92 }}
							animate={headerInView ? { opacity: 1, scale: 1 } : {}}
							transition={{ duration: 0.5, ease: EASE }}
						>
							<LuLayers size={11} />
							Portfolio
						</motion.span>

						<motion.h2
							className={styles.heading}
							initial={{ opacity: 0, y: 28 }}
							animate={headerInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
						>
							Precision-engineered
							<br />
							<span className={styles.headingAccent}>SolidWorks projects</span>
						</motion.h2>

						<motion.p
							className={styles.subtext}
							initial={{ opacity: 0 }}
							animate={headerInView ? { opacity: 1 } : {}}
							transition={{ duration: 0.6, delay: 0.25 }}
						>
							Real-world CAD projects spanning sheet metal, assemblies,
							weldments, and parametric design — built to production standards.
						</motion.p>
					</div>

					<motion.div
						className={styles.metrics}
						initial={{ opacity: 0, y: 20 }}
						animate={headerInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
					>
						{[
							{ val: cards.length, suf: '', label: 'Projects' },
							{ val: totalGallery, suf: '+', label: 'Detail Visuals' },
							{ val: 100, suf: '%', label: 'Real Content' },
						].map((m) => (
							<div key={m.label} className={styles.metric}>
								<span className={styles.metricVal}>
									<CountUp end={m.val} suffix={m.suf} />
								</span>
								<span className={styles.metricLabel}>{m.label}</span>
							</div>
						))}
					</motion.div>
				</motion.div>

				{/* ── Project card grid ── */}
				<div ref={gridRef} className={styles.grid}>
					{cards.map((card, i) => (
						<motion.div
							key={card.id}
							className={styles.cell}
							initial={{ opacity: 0, y: 50, rotateX: 8 }}
							whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
							viewport={{ once: true, margin: '-40px' }}
							transition={{
								duration: 0.7,
								ease: EASE,
								delay: i * 0.08,
							}}
						>
							<GlowCard className={styles.card}>
								{/* Mouse-tracking glow border */}
								<div className={styles.glowBorder} aria-hidden="true" />

								<div className={styles.imageWrap}>
									<img
										src={card.image}
										alt={card.title}
										loading="lazy"
										className={styles.image}
										style={{
											objectFit: card.imageFit ?? 'contain',
											objectPosition: card.imagePosition ?? 'center',
										}}
									/>
									<div className={styles.imageGradient} />

									{/* Index chip */}
									<span className={styles.indexChip}>
										{String(i + 1).padStart(2, '0')}
									</span>

									{/* Category ribbon */}
									<span
										className={styles.categoryRibbon}
										style={{
											background:
												categoryGradients[card.category] ||
												categoryGradients['Sheet Metal'],
										}}
									>
										{card.category}
									</span>
								</div>

								<div className={styles.body}>
									<h3 className={styles.cardTitle}>{card.title}</h3>
									<p className={styles.cardDesc}>{card.desc}</p>

									<div className={styles.tags}>
										{card.meta.map((tag) => (
											<span key={tag} className={styles.tag}>
												{tag}
											</span>
										))}
									</div>

									<Link
										to={getDetailPath('project', card.id)}
										className={styles.link}
									>
										<span>Explore Project</span>
										<span className={styles.linkArrow}>
											<LuArrowUpRight size={15} />
										</span>
									</Link>
								</div>
							</GlowCard>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
