import { useRef, type ComponentType } from 'react';
import { motion, useInView } from 'framer-motion';
import {
	LuArrowRight,
	LuAward,
	LuBrain,
	LuCalendarDays,
	LuFactory,
	LuGauge,
	LuTarget,
	LuUsers,
} from 'react-icons/lu';
import styles from './About.module.scss';

const EASE = [0.22, 1, 0.36, 1] as const;

type StoryCard = {
	icon: ComponentType<{ size?: number; className?: string }>;
	title: string;
	description: string;
};

const STORY_POINTS = [
	{
		icon: LuTarget,
		title: 'Practical by design',
		description:
			'We focus on solutions that work in the real world, not just in the model tree.',
	},
	{
		icon: LuFactory,
		title: 'Manufacturing aware',
		description:
			'Every decision is checked against production feasibility, handoff clarity, and quality.',
	},
	{
		icon: LuBrain,
		title: 'Training with intent',
		description:
			'Our CAD programs help students build the confidence and discipline industry expects.',
	},
] satisfies StoryCard[];

const PILLARS = [
	{
		icon: LuGauge,
		title: 'Fast, focused delivery',
		description: 'Clear milestones and responsive collaboration keep projects moving.',
	},
	{
		icon: LuAward,
		title: 'Precision-first workflows',
		description: 'Controlled modeling, documentation, and review standards guide every output.',
	},
	{
		icon: LuUsers,
		title: 'Built for teams and learners',
		description: 'We support manufacturers, startups, students, and working professionals.',
	},
	{
		icon: LuCalendarDays,
		title: 'Founded in 2022',
		description: 'A focused team bridging engineering concepts with execution.',
	},
] satisfies StoryCard[];

const METRICS = [
	{ value: '500+', label: 'Students trained' },
	{ value: '50+', label: 'Projects delivered' },
	{ value: '95%', label: 'First-attempt success' },
	{ value: '4+', label: 'Years of combined experience' },
];

export default function About() {
	const sectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const storyInView = useInView(sectionRef, { once: true, margin: '-120px 0px' });
	const headerInView = useInView(headerRef, { once: true, margin: '-80px 0px' });

	return (
		<section
			ref={sectionRef}
			id="about"
			className={styles.section}
			aria-label="Our Story"
		>
			<div className={styles.glowOne} aria-hidden="true" />
			<div className={styles.glowTwo} aria-hidden="true" />

			<div className={styles.container}>
				<div ref={headerRef} className={styles.header}>
					<motion.span
						className={styles.badge}
						initial={{ opacity: 0, y: 12 }}
						animate={headerInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.45, ease: EASE }}
					>
						About MechCurve
					</motion.span>

					<motion.h2
						className={styles.title}
						initial={{ opacity: 0, y: 18 }}
						animate={headerInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
					>
						Engineering expertise shaped by real-world outcomes
					</motion.h2>

					<motion.p
						className={styles.lead}
						initial={{ opacity: 0, y: 14 }}
						animate={headerInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
					>
						At MechCurve, we bridge the gap between engineering concepts and
						practical execution. The result is work that feels modern, looks
						polished, and stays grounded in manufacturability.
					</motion.p>
				</div>

				<div className={styles.storyGrid}>
					<motion.article
						className={styles.storyCard}
						initial={{ opacity: 0, y: 24 }}
						animate={storyInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.65, ease: EASE }}
					>
						<div className={styles.storyCardHeader}>
							<span className={styles.storyLabel}>Our Story</span>
							<h3 className={styles.storyTitle}>
								A design partner built for clarity, precision, and momentum
							</h3>
						</div>

						<div className={styles.storyBody}>
							<p>
								Founded in 2022, MechCurve was created with a simple goal: make
								engineering feel more practical, more dependable, and more usable for
								real projects.
							</p>
							<p>
								We support manufacturers, startups, engineering teams, students, and
								professionals with services that move from concept to manufacturable
								output without losing design intent.
							</p>
							<p>
								By combining mechanical design services with hands-on CAD training, we
								create value for businesses that need reliable engineering support and
								for learners who want to grow into industry-ready talent.
							</p>
						</div>

						<div className={styles.metricGrid}>
							{METRICS.map((metric) => (
								<div key={metric.label} className={styles.metricCard}>
									<div className={styles.metricValue}>{metric.value}</div>
									<div className={styles.metricLabel}>{metric.label}</div>
								</div>
							))}
						</div>
					</motion.article>

					<div className={styles.sideStack}>
						<motion.article
							className={styles.sideCard}
							initial={{ opacity: 0, y: 24 }}
							animate={storyInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.65, ease: EASE, delay: 0.06 }}
						>
							<div className={styles.sideCardSplit}>
								<div>
									<p className={styles.sideEyebrow}>Our Mission</p>
									<p className={styles.sideText}>
										To deliver practical engineering solutions and industry-focused
										training that improve manufacturability and build capable teams.
									</p>
								</div>
								<div>
									<p className={styles.sideEyebrow}>Our Vision</p>
									<p className={styles.sideText}>
										To become a trusted engineering partner known for precision,
										innovation, and reliable real-world impact.
									</p>
								</div>
							</div>
						</motion.article>

						<motion.article
							className={styles.sideCardAlt}
							initial={{ opacity: 0, y: 24 }}
							animate={storyInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
						>
							<p className={styles.sideEyebrow}>What Defines Our Work</p>
							<ul className={styles.storyPoints}>
								{STORY_POINTS.map((point) => (
									<li key={point.title} className={styles.storyPoint}>
										<span className={styles.storyIconWrap} aria-hidden="true">
											<point.icon size={18} />
										</span>
										<div>
											<h4>{point.title}</h4>
											<p>{point.description}</p>
										</div>
									</li>
								))}
							</ul>
						</motion.article>
					</div>
				</div>

				<motion.div
					className={styles.pillarGrid}
					initial={{ opacity: 0, y: 20 }}
					animate={storyInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
				>
					{PILLARS.map((pillar) => (
						<article key={pillar.title} className={styles.pillarCard}>
							<div className={styles.pillarIconWrap} aria-hidden="true">
								<pillar.icon size={18} />
							</div>
							<h3 className={styles.pillarTitle}>{pillar.title}</h3>
							<p className={styles.pillarText}>{pillar.description}</p>
						</article>
					))}
				</motion.div>

				<motion.div
					className={styles.footerNote}
					initial={{ opacity: 0, y: 16 }}
					animate={storyInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.65, ease: EASE, delay: 0.24 }}
				>
					<p
						className={styles.footerCopy}
						style={{ color: '#0F172A', textShadow: 'none' }}
					>
						At MechCurve, we do not just deliver designs or teach software. We
						help turn ideas into dependable outcomes.
					</p>
					<a href="mailto:admin@mechcurve.com" className={styles.footerLink}>
						Start a conversation
						<LuArrowRight size={16} />
					</a>
				</motion.div>
			</div>
		</section>
	);
}
