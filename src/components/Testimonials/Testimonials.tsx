import { useEffect, useRef, useState } from 'react';
import { LuChevronLeft, LuChevronRight, LuQuote, LuStar, LuMessageSquare } from 'react-icons/lu';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './Testimonials.module.scss';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Testimonial {
	name: string;
	role: string;
	text: string;
	initials: string;
	stars: number;
}

const testimonials: Testimonial[] = [
	{
		name: 'Nexus Automation',
		role: 'Manufacturing Client',
		text: 'MechCurve delivered production-ready CAD and drawings quickly. Their DFM inputs reduced our machining iterations and saved significant time.',
		initials: 'NA',
		stars: 5,
	},
	{
		name: 'Apex Fabrication',
		role: 'SME Product Team',
		text: 'From concept refinement to final documentation, the workflow stayed clear and practical. The team aligned design choices with our manufacturing constraints.',
		initials: 'AF',
		stars: 5,
	},
	{
		name: 'Vertex Motion Systems',
		role: 'Engineering Lead',
		text: 'Their parametric modelling structure was clean and revision-friendly. We integrated the files directly into our release process without rework.',
		initials: 'VM',
		stars: 5,
	},
	{
		name: 'Orion Robotics',
		role: 'Prototype Program Manager',
		text: 'The transition from CAD to prototyping was smooth. Their communication and milestone tracking helped us move from idea to physical validation faster.',
		initials: 'OR',
		stars: 5,
	},
	{
		name: 'PrecisionWorks India',
		role: 'Operations Partner',
		text: 'We appreciated the practical approach and manufacturing-first mindset. Deliverables were complete, organized, and ready for execution.',
		initials: 'PI',
		stars: 5,
	},
];

function Stars({ count, active }: { count: number; active: boolean }) {
	return (
		<div className="flex gap-1.5">
			{Array.from({ length: count }).map((_, i) => (
				<motion.span
					key={i}
					initial={{ opacity: 0, scale: 0, rotate: -30 }}
					animate={active ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0 }}
					transition={{
						delay: i * 0.07,
						type: 'spring',
						stiffness: 400,
						damping: 14,
					}}
					style={{
						display: 'inline-flex',
						filter: 'drop-shadow(0 0 5px rgba(234,193,23,0.5))',
					}}
				>
					<LuStar size={16} fill="#EAC117" color="#EAC117" />
				</motion.span>
			))}
		</div>
	);
}

export default function Testimonials() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [direction, setDirection] = useState(1);
	const sectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const headerInView = useInView(headerRef, { once: true, margin: '-80px 0px' });
	const cardInView = useInView(sectionRef, { once: true, margin: '-100px 0px' });

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});
	const starburstRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

	// Auto-advance
	useEffect(() => {
		const timer = window.setInterval(() => {
			setDirection(1);
			setActiveIndex((c) => (c + 1) % testimonials.length);
		}, 5000);
		return () => window.clearInterval(timer);
	}, []);

	const goPrev = () => {
		setDirection(-1);
		setActiveIndex((c) => (c - 1 + testimonials.length) % testimonials.length);
	};

	const goNext = () => {
		setDirection(1);
		setActiveIndex((c) => (c + 1) % testimonials.length);
	};

	const current = testimonials[activeIndex];

	// Slide variants for AnimatePresence
	const slideVariants = {
		enter: (dir: number) => ({
			x: dir > 0 ? 80 : -80,
			opacity: 0,
			scale: 0.97,
		}),
		center: {
			x: 0,
			opacity: 1,
			scale: 1,
		},
		exit: (dir: number) => ({
			x: dir > 0 ? -80 : 80,
			opacity: 0,
			scale: 0.97,
		}),
	};

	return (
		<section
			ref={sectionRef}
			id="testimonials"
			className={styles.section}
			aria-label="Testimonials"
		>
			{/* ── Radial starburst lines (unique to Testimonials) ── */}
			<motion.div
				className={styles.starburst}
				style={{ rotate: starburstRotate }}
				aria-hidden="true"
			>
				<svg viewBox="0 0 800 800" fill="none" className={styles.starburstSvg}>
					{Array.from({ length: 36 }).map((_, i) => {
						const angle = (i * 10 * Math.PI) / 180;
						const x2 = 400 + Math.cos(angle) * 400;
						const y2 = 400 + Math.sin(angle) * 400;
						return (
							<line
								key={i}
								x1="400"
								y1="400"
								x2={x2}
								y2={y2}
								stroke="#EAC117"
								strokeWidth="0.4"
								opacity={i % 3 === 0 ? 0.12 : 0.05}
							/>
						);
					})}
					<circle cx="400" cy="400" r="120" stroke="#EAC117" strokeWidth="0.3" opacity="0.08" />
					<circle cx="400" cy="400" r="240" stroke="#EAC117" strokeWidth="0.3" opacity="0.05" />
				</svg>
			</motion.div>

			<div className={styles.inner}>
				{/* ── Header ── */}
				<div ref={headerRef} className="mb-10 text-center md:mb-12">
					<motion.span
						className={styles.badge}
						initial={{ opacity: 0, scale: 0.92 }}
						animate={headerInView ? { opacity: 1, scale: 1 } : {}}
						transition={{ duration: 0.5, ease: EASE }}
					>
						<LuMessageSquare size={11} />
						Testimonials
					</motion.span>

					<motion.h2
						className={styles.heading}
						initial={{ opacity: 0, y: 24 }}
						animate={headerInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
					>
						Client Reviews
					</motion.h2>

					<motion.p
						className={styles.subtext}
						initial={{ opacity: 0 }}
						animate={headerInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.6, delay: 0.25 }}
					>
						Feedback from businesses and engineering teams that used our design,
						manufacturing, and product development support.
					</motion.p>
				</div>

				{/* ── Main testimonial card ── */}
				<motion.div
					className={styles.cardWrapper}
					initial={{ opacity: 0, y: 40 }}
					animate={cardInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
				>
					{/* Large decorative quote */}
					<div className={styles.quoteDecor} aria-hidden="true">
						<LuQuote size={64} />
					</div>

					{/* Controls */}
					<div className={styles.controls}>
						<span className={styles.feedbackBadge}>
							<LuQuote size={12} /> Client Feedback
						</span>

						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={goPrev}
								className={styles.navBtn}
								aria-label="Previous review"
							>
								<LuChevronLeft size={18} />
							</button>
							<button
								type="button"
								onClick={goNext}
								className={styles.navBtn}
								aria-label="Next review"
							>
								<LuChevronRight size={18} />
							</button>
						</div>
					</div>

					{/* Slide area */}
					<div className={styles.slideArea}>
						<AnimatePresence mode="wait" custom={direction}>
							<motion.article
								key={activeIndex}
								className={styles.slide}
								custom={direction}
								variants={slideVariants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{ duration: 0.45, ease: EASE }}
							>
								<Stars count={current.stars} active />

								<p className={styles.quoteText}>
									&ldquo;{current.text}&rdquo;
								</p>

								<div className={styles.author}>
									<div className={styles.avatar}>
										<span>{current.initials}</span>
									</div>
									<div>
										<div className={styles.authorName}>{current.name}</div>
										<div className={styles.authorRole}>{current.role}</div>
									</div>
								</div>
							</motion.article>
						</AnimatePresence>
					</div>

					{/* Dot indicators */}
					<div className={styles.dots}>
						{testimonials.map((item, idx) => (
							<button
								key={item.name}
								type="button"
								onClick={() => {
									setDirection(idx > activeIndex ? 1 : -1);
									setActiveIndex(idx);
								}}
								className={`${styles.dot} ${activeIndex === idx ? styles.dotActive : ''}`}
								aria-label={`Go to review ${idx + 1}`}
							/>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
