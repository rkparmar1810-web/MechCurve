import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './SectionDivider.module.scss';

export type DividerVariant =
	| 'cinematic-burst'
	| 'fog-reveal'
	| 'energy-sweep'
	| 'morph-shape'
	| 'glass-panel'
	| 'split-panel'
	| 'perspective-tilt';

interface Props {
	variant: DividerVariant;
	text?: string;
	subtext?: string;
}

/* ── Shared text reveal component ── */
function RevealText({
	text,
	subtext,
	inView,
	accent = false,
}: {
	text: string;
	subtext?: string;
	inView: boolean;
	accent?: boolean;
}) {
	return (
		<div className={styles.textBlock}>
			<motion.div
				className={styles.textLineWrap}
				initial={{ width: 0 }}
				animate={inView ? { width: '60px' } : {}}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			>
				<div className={accent ? styles.lineAccent : styles.lineGold} />
			</motion.div>
			<motion.span
				className={styles.dividerText}
				initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
				animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
				transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
			>
				{text}
			</motion.span>
			{subtext && (
				<motion.span
					className={styles.dividerSubtext}
					initial={{ opacity: 0, y: 12 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
				>
					{subtext}
				</motion.span>
			)}
			<motion.div
				className={styles.textLineWrap}
				initial={{ width: 0 }}
				animate={inView ? { width: '60px' } : {}}
				transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
			>
				<div className={accent ? styles.lineAccent : styles.lineGold} />
			</motion.div>
		</div>
	);
}

/* ══════════════════════════════════════════════════════════
   1. Cinematic Light Burst — Hero → Engineering
   Gold radial glow expands like a camera flash
   ══════════════════════════════════════════════════════════ */
function CinematicBurst({ text, subtext }: { text?: string; subtext?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const scale = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.3, 1.6, 2.2]);
	const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8], [0, 0.9, 0.7, 0]);
	const ringScale = useTransform(scrollYProgress, [0, 0.5], [0.5, 2.5]);
	const ringOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.5, 0]);

	return (
		<div ref={ref} className={`${styles.divider} ${styles.cinematicBurst}`}>
			{/* Main gold glow */}
			<motion.div className={styles.burstOrb} style={{ scale, opacity: glowOpacity }} />
			{/* Expanding ring */}
			<motion.div className={styles.burstRing} style={{ scale: ringScale, opacity: ringOpacity }} />
			{/* Horizontal light streak */}
			<motion.div
				className={styles.lightStreak}
				initial={{ scaleX: 0, opacity: 0 }}
				animate={inView ? { scaleX: 1, opacity: 1 } : {}}
				transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
			/>
			{/* Particle dots */}
			{[...Array(6)].map((_, i) => (
				<motion.div
					key={i}
					className={styles.sparkDot}
					style={{
						left: `${20 + i * 12}%`,
						top: `${30 + (i % 3) * 20}%`,
					}}
					initial={{ opacity: 0, scale: 0 }}
					animate={inView ? { opacity: [0, 1, 0], scale: [0, 1.5, 0] } : {}}
					transition={{ duration: 1.5, delay: 0.2 + i * 0.12, repeat: 0 }}
				/>
			))}
			{text && <RevealText text={text} subtext={subtext} inView={inView} />}
		</div>
	);
}

/* ══════════════════════════════════════════════════════════
   2. Fog Gradient Reveal — Engineering → About
   Navy/gold fog layers with text emerging
   ══════════════════════════════════════════════════════════ */
function FogReveal({ text, subtext }: { text?: string; subtext?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const fog1Y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
	const fog2Y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
	const fogOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 0.85, 0.85, 0]);

	return (
		<div ref={ref} className={`${styles.divider} ${styles.fogReveal}`}>
			<motion.div className={styles.fogWide1} style={{ y: fog1Y, opacity: fogOpacity }} />
			<motion.div className={styles.fogWide2} style={{ y: fog2Y, opacity: fogOpacity }} />
			<motion.div className={styles.fogGoldMist} style={{ opacity: fogOpacity }} />
			{/* Horizontal divider lines */}
			<motion.div
				className={styles.fogLine}
				style={{ top: '30%' }}
				initial={{ scaleX: 0 }}
				animate={inView ? { scaleX: 1 } : {}}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
			/>
			<motion.div
				className={styles.fogLine}
				style={{ top: '70%' }}
				initial={{ scaleX: 0 }}
				animate={inView ? { scaleX: 1 } : {}}
				transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
			/>
			{text && <RevealText text={text} subtext={subtext} inView={inView} />}
		</div>
	);
}

/* ══════════════════════════════════════════════════════════
   3. Energy Line Sweep — About → Services
   Glowing gold line scans horizontally with trail
   ══════════════════════════════════════════════════════════ */
function EnergySweep({ text, subtext }: { text?: string; subtext?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const x = useTransform(scrollYProgress, [0.1, 0.9], ['-110%', '110%']);
	const lineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
	const trailWidth = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

	return (
		<div ref={ref} className={`${styles.divider} ${styles.energySweep}`}>
			{/* Trail that fills behind the line */}
			<motion.div className={styles.sweepTrail} style={{ width: trailWidth }} />
			{/* Main scanning line */}
			<motion.div className={styles.sweepBeam} style={{ x, opacity: lineOpacity }} />
			{/* Glow field */}
			<motion.div
				className={styles.sweepGlow}
				initial={{ opacity: 0 }}
				animate={inView ? { opacity: 1 } : {}}
				transition={{ duration: 0.8, delay: 0.3 }}
			/>
			{text && <RevealText text={text} subtext={subtext} inView={inView} accent />}
		</div>
	);
}

/* ══════════════════════════════════════════════════════════
   4. Morphing Shape — Services → Portfolio
   SVG blob morphs on scroll
   ══════════════════════════════════════════════════════════ */
function MorphShape({ text, subtext }: { text?: string; subtext?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const rotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.9]);
	const morphOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

	return (
		<div ref={ref} className={`${styles.divider} ${styles.morphShape}`}>
			<motion.svg
				viewBox="0 0 1440 200"
				preserveAspectRatio="none"
				className={styles.morphSvg}
				style={{ rotate, scale, opacity: morphOpacity }}
			>
				<defs>
					<linearGradient id="morphGradV2" x1="0" y1="0" x2="1" y2="0.5">
						<stop offset="0%" stopColor="rgba(234,193,23,0.12)" />
						<stop offset="40%" stopColor="rgba(59,130,246,0.08)" />
						<stop offset="100%" stopColor="rgba(234,193,23,0.1)" />
					</linearGradient>
					<linearGradient id="morphGrad2V2" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor="rgba(10,20,44,0.7)" />
						<stop offset="100%" stopColor="rgba(6,8,13,0.9)" />
					</linearGradient>
				</defs>
				<path
					d="M0,160 C120,60 300,180 500,100 C700,20 900,160 1100,80 C1200,40 1350,120 1440,70 L1440,200 L0,200Z"
					fill="url(#morphGradV2)"
				/>
				<path
					d="M0,170 C200,90 450,180 700,120 C950,60 1150,150 1440,90 L1440,200 L0,200Z"
					fill="url(#morphGrad2V2)"
				/>
			</motion.svg>
			{/* Gold accent line at center */}
			<motion.div
				className={styles.morphCenterLine}
				initial={{ scaleX: 0 }}
				animate={inView ? { scaleX: 1 } : {}}
				transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
			/>
			{text && <RevealText text={text} subtext={subtext} inView={inView} />}
		</div>
	);
}

/* ══════════════════════════════════════════════════════════
   5. Glass Panel — Portfolio → Testimonials
   Frosted glass panel with refraction shimmer
   ══════════════════════════════════════════════════════════ */
function GlassPanel({ text, subtext }: { text?: string; subtext?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });

	return (
		<div ref={ref} className={`${styles.divider} ${styles.glassPanel}`}>
			{/* Frosted panel */}
			<motion.div
				className={styles.glassBar}
				initial={{ opacity: 0, scaleX: 0.3 }}
				animate={inView ? { opacity: 1, scaleX: 1 } : {}}
				transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
			>
				{/* Shimmer refraction */}
				<div className={styles.glassShimmer} />
			</motion.div>
			{/* Top/bottom edge glows */}
			<motion.div
				className={styles.glassEdgeTop}
				initial={{ opacity: 0 }}
				animate={inView ? { opacity: 1 } : {}}
				transition={{ duration: 0.6, delay: 0.3 }}
			/>
			<motion.div
				className={styles.glassEdgeBottom}
				initial={{ opacity: 0 }}
				animate={inView ? { opacity: 1 } : {}}
				transition={{ duration: 0.6, delay: 0.4 }}
			/>
			{text && <RevealText text={text} subtext={subtext} inView={inView} />}
		</div>
	);
}

/* ══════════════════════════════════════════════════════════
   6. Split Panel — Testimonials → FAQ
   Screen splits L/R revealing gold center
   ══════════════════════════════════════════════════════════ */
function SplitPanel({ text, subtext }: { text?: string; subtext?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const leftX = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '-52%']);
	const rightX = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '52%']);
	const gapOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

	return (
		<div ref={ref} className={`${styles.divider} ${styles.splitPanel}`}>
			<motion.div className={styles.splitLeft} style={{ x: leftX }} />
			<motion.div className={styles.splitRight} style={{ x: rightX }} />
			{/* Revealed gold center strip */}
			<motion.div className={styles.splitCenterStrip} style={{ opacity: gapOpacity }}>
				<div className={styles.splitCenterGlow} />
			</motion.div>
			{text && <RevealText text={text} subtext={subtext} inView={inView} />}
		</div>
	);
}

/* ══════════════════════════════════════════════════════════
   7. Perspective Tilt — FAQ → Contact
   3D tilt transition with depth shadow
   ══════════════════════════════════════════════════════════ */
function PerspectiveTilt({ text, subtext }: { text?: string; subtext?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
	const shadowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);
	const planeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

	return (
		<div ref={ref} className={`${styles.divider} ${styles.perspectiveTilt}`}>
			<motion.div
				className={styles.tiltPlane}
				style={{
					rotateX,
					scale: planeScale,
				}}
			>
				<div className={styles.tiltSurface} />
				<motion.div className={styles.tiltShadow} style={{ opacity: shadowOpacity }} />
			</motion.div>
			{/* Floating gold edge */}
			<motion.div
				className={styles.tiltEdge}
				initial={{ scaleX: 0 }}
				animate={inView ? { scaleX: 1 } : {}}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
			/>
			{text && <RevealText text={text} subtext={subtext} inView={inView} />}
		</div>
	);
}

/* ── Main component ── */
const VARIANTS: Record<DividerVariant, React.FC<{ text?: string; subtext?: string }>> = {
	'cinematic-burst': CinematicBurst,
	'fog-reveal': FogReveal,
	'energy-sweep': EnergySweep,
	'morph-shape': MorphShape,
	'glass-panel': GlassPanel,
	'split-panel': SplitPanel,
	'perspective-tilt': PerspectiveTilt,
};

export default function SectionDivider({ variant, text, subtext }: Props) {
	const Component = VARIANTS[variant];
	return <Component text={text} subtext={subtext} />;
}
