import { useRef, useState, useMemo } from 'react';
import { LuChevronDown, LuCircleHelp } from 'react-icons/lu';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { faqItems } from '../../data/faqContent';
import styles from './FaqSection.module.scss';

const EASE = [0.22, 1, 0.36, 1] as const;
const ALL = 'All';

export default function FaqSection() {
	const [openId, setOpenId] = useState('');
	const [activeCat, setActiveCat] = useState(ALL);
	const sectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const headerInView = useInView(headerRef, { once: true, margin: '-80px 0px' });

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});
	const floatY1 = useTransform(scrollYProgress, [0, 1], [-18, 22]);
	const floatY2 = useTransform(scrollYProgress, [0, 1], [14, -20]);

	const categories = useMemo(() => {
		const unique = Array.from(new Set(faqItems.map((f) => f.category)));
		return [ALL, ...unique];
	}, []);

	const filtered = useMemo(
		() =>
			activeCat === ALL
				? faqItems
				: faqItems.filter((f) => f.category === activeCat),
		[activeCat],
	);

	return (
		<section
			ref={sectionRef}
			id="faq"
			className={styles.section}
			aria-label="Frequently Asked Questions"
		>
			{/* ── Diamond crosshatch pattern (unique to FAQ) ── */}
			<div className={styles.crosshatch} aria-hidden="true">
				<svg
					width="100%"
					height="100%"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<pattern
							id="faq-diamonds"
							x="0"
							y="0"
							width="48"
							height="48"
							patternUnits="userSpaceOnUse"
							patternTransform="rotate(45)"
						>
							<line
								x1="0"
								y1="0"
								x2="0"
								y2="48"
								stroke="#EAC117"
								strokeWidth="0.4"
								opacity="0.07"
							/>
							<line
								x1="0"
								y1="0"
								x2="48"
								y2="0"
								stroke="#EAC117"
								strokeWidth="0.4"
								opacity="0.07"
							/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#faq-diamonds)" />
				</svg>
			</div>

			{/* Ambient gold gradient glow */}
			<div className={styles.ambientGlow} aria-hidden="true" />

			{/* Floating diamond shapes (parallax) */}
			<motion.div
				className={styles.floatingDiamond}
				style={{ y: floatY1 }}
				aria-hidden="true"
			>
				<div className={styles.diamondShape} />
			</motion.div>
			<motion.div
				className={styles.floatingDiamond2}
				style={{ y: floatY2 }}
				aria-hidden="true"
			>
				<div className={styles.diamondShape2} />
			</motion.div>

			<div className={styles.inner}>
				{/* ── Header ── */}
				<div ref={headerRef} className={styles.header}>
					<motion.span
						className={styles.badge}
						initial={{ opacity: 0, scale: 0.92 }}
						animate={headerInView ? { opacity: 1, scale: 1 } : {}}
						transition={{ duration: 0.5, ease: EASE }}
					>
						<LuCircleHelp size={11} />
						FAQ
					</motion.span>

					<motion.h2
						className={styles.heading}
						initial={{ opacity: 0, y: 24 }}
						animate={headerInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
					>
						Frequently Asked Questions
					</motion.h2>

					<motion.p
						className={styles.subtext}
						initial={{ opacity: 0 }}
						animate={headerInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.6, delay: 0.25 }}
					>
						Clear answers about training, projects, locations, enrollment, and
						how MechCurve works with students and businesses.
					</motion.p>
				</div>

				{/* ── Category filter pills ── */}
				<motion.div
					className={styles.categories}
					initial={{ opacity: 0, y: 14 }}
					animate={headerInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
				>
					{categories.map((cat) => (
						<button
							key={cat}
							type="button"
							className={`${styles.pill} ${activeCat === cat ? styles.pillActive : ''}`}
							onClick={() => {
								setActiveCat(cat);
								setOpenId('');
							}}
						>
							{cat}
						</button>
					))}
				</motion.div>

				{/* ── Accordion list ── */}
				<div className={styles.list}>
					{filtered.map((item, i) => {
						const isOpen = openId === item.id;

						return (
							<motion.article
								key={`${activeCat}-${item.id}`}
								className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-30px 0px' }}
								transition={{
									duration: 0.35,
									ease: EASE,
									delay: i * 0.035,
								}}
							>
								<button
									type="button"
									className={styles.trigger}
									onClick={() =>
										setOpenId(isOpen ? '' : item.id)
									}
									aria-expanded={isOpen}
								>
									<span className={styles.question}>
										{item.question}
									</span>
									<motion.span
										className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
										animate={{ rotate: isOpen ? 180 : 0 }}
										transition={{
											duration: 0.35,
											ease: EASE,
										}}
									>
										<LuChevronDown size={16} />
									</motion.span>
								</button>

								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											className={styles.answerWrap}
											initial={{
												height: 0,
												opacity: 0,
											}}
											animate={{
												height: 'auto',
												opacity: 1,
											}}
											exit={{
												height: 0,
												opacity: 0,
											}}
											transition={{
												duration: 0.32,
												ease: EASE,
											}}
										>
											<p className={styles.answer}>
												{item.answer}
											</p>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
