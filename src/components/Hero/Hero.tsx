import { useEffect, useRef, useState } from 'react';
import {
	motion,
	useScroll,
	useTransform,
	AnimatePresence,
	useMotionValue,
	useSpring,
} from 'framer-motion';
import type { IconType } from 'react-icons';
import {
	LuArrowRight,
	LuCog,
	LuGraduationCap,
	LuBox,
	LuFileText,
	LuUsers,
} from 'react-icons/lu';
import TextReveal from '../TextReveal/TextReveal';
import MagneticButton from '../MagneticButton/MagneticButton';
import styles from './Hero.module.scss';

type CardItem = { label: string; Icon: IconType };
const CARD_ITEMS: CardItem[] = [
	{ label: '3D CAD Modeling', Icon: LuBox },
	{ label: 'Product Development', Icon: LuGraduationCap },
	{ label: 'Manufacturing Support', Icon: LuFileText },
	{ label: 'SolidWorks Training', Icon: LuUsers },
];

const ROTATING_KEYWORDS = [
	'Design',
	'Simulation',
	'Manufacturing',
	'Prototyping',
	'Engineering',
];

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const getNavbarHeight = () => {
	const header = document.querySelector('header');
	return header?.clientHeight ?? 96;
};

const scrollToSection = (id: string) => {
	const el = document.getElementById(id);
	if (el) {
		const navH = getNavbarHeight();
		const y = el.getBoundingClientRect().top + window.scrollY - navH;
		window.scrollTo({ top: y, behavior: 'smooth' });
		window.history.replaceState(null, '', window.location.pathname);
	}
};

export default function Hero() {
	const sectionRef = useRef<HTMLElement>(null);
	const [keywordIndex, setKeywordIndex] = useState(0);
	const [videoLoaded, setVideoLoaded] = useState(false);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end start'],
	});

	const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
	const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
	const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

	// Mouse-reactive ambient glow
	const mouseX = useMotionValue(0.5);
	const mouseY = useMotionValue(0.5);
	const springX = useSpring(mouseX, { stiffness: 60, damping: 30 });
	const springY = useSpring(mouseY, { stiffness: 60, damping: 30 });

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			mouseX.set(e.clientX / window.innerWidth);
			mouseY.set(e.clientY / window.innerHeight);
		};
		window.addEventListener('mousemove', handler, { passive: true });
		return () => window.removeEventListener('mousemove', handler);
	}, [mouseX, mouseY]);

	useEffect(() => {
		const interval = setInterval(() => {
			setKeywordIndex((prev) => (prev + 1) % ROTATING_KEYWORDS.length);
		}, 2400);
		return () => clearInterval(interval);
	}, []);

	const glowLeft = useTransform(springX, (v) => `${v * 100}%`);
	const glowTop = useTransform(springY, (v) => `${v * 100}%`);

	return (
		<section
			ref={sectionRef}
			id="home"
			className="relative overflow-hidden min-h-[92vh] flex items-center"
			style={{ scrollMarginTop: 120 }}
		>
			{/* â”€â”€ Layer 0: Dark fallback (shown while video loads) â”€â”€ */}
			<div className="absolute inset-0 z-0 bg-[#06080D]" />

			{/* â”€â”€ Layer 1: Full-screen parallax video â”€â”€ */}
			<motion.div
				className="absolute inset-0 z-[1] overflow-hidden"
				style={{ scale: bgScale }}
			>
				<motion.div
					className="absolute inset-0"
					style={{ y: videoY }}
					initial={{ opacity: 0 }}
					animate={{ opacity: videoLoaded ? 1 : 0 }}
					transition={{ duration: 1.6, ease: 'easeOut' }}
				>
					<video
						src="/live_new.mp4"
						className="absolute inset-0 h-[130%] -top-[12%] w-full object-cover object-center"
						autoPlay
						muted
						loop
						playsInline
						preload="auto"
						onCanPlay={() => setVideoLoaded(true)}
					/>
					{/* Mask lower strip to hide baked-in video text/captions */}
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] sm:h-[22%]"
						style={{
							background:
								'linear-gradient(to top, rgba(6,8,13,0.96) 0%, rgba(6,8,13,0.82) 30%, rgba(6,8,13,0.45) 58%, transparent 100%)',
						}}
					/>
				</motion.div>
			</motion.div>

			{/* â”€â”€ Layer 2a: Left dark overlay â€” slides in from left on load â”€â”€ */}
			<motion.div
				className="absolute inset-0 z-[2] pointer-events-none"
				style={{
					background:
						'linear-gradient(95deg, rgba(6,8,13,0.94) 0%, rgba(6,8,13,0.88) 32%, rgba(6,8,13,0.52) 58%, transparent 100%)',
				}}
				initial={{ x: '-100%' }}
				animate={{ x: 0 }}
				transition={{ duration: 1.0, ease: SMOOTH_EASE }}
			/>

			{/* â”€â”€ Layer 2b: Right navy overlay â€” slides in from right on load â”€â”€ */}
			<motion.div
				className="absolute inset-0 z-[2] pointer-events-none"
				style={{
					background:
						'linear-gradient(265deg, rgba(10,24,54,0.75) 0%, rgba(10,24,54,0.44) 42%, transparent 70%)',
				}}
				initial={{ x: '100%' }}
				animate={{ x: 0 }}
				transition={{ duration: 1.0, ease: SMOOTH_EASE, delay: 0.08 }}
			/>

			{/* â”€â”€ Layer 3: Mouse-reactive ambient glow â”€â”€ */}
			<motion.div
				className="pointer-events-none absolute z-[3] w-[700px] h-[700px] rounded-full"
				style={{
					left: glowLeft,
					top: glowTop,
					x: '-50%',
					y: '-50%',
					background:
						'radial-gradient(circle, rgba(234,193,23,0.05) 0%, rgba(59,130,246,0.04) 45%, transparent 70%)',
					filter: 'blur(70px)',
				}}
			/>

			{/* â”€â”€ Two-column content â”€â”€ */}
			<motion.div
				className="relative z-[4] mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-12 xl:px-16 pt-28 pb-6 sm:pt-32 sm:pb-8"
				style={{ y: contentY }}
			>
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">

					{/* â”€â”€â”€ Left column: Text content â”€â”€â”€ */}
					<motion.div
						className="flex flex-col items-center text-center lg:items-start lg:text-left"
						initial={{ x: -56, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.8, ease: SMOOTH_EASE, delay: 0.55 }}
					>
						{/* Badge */}
						<motion.div
							initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
							animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
							transition={{ duration: 0.6, ease: SMOOTH_EASE, delay: 0.72 }}
						>
							<span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/10 backdrop-blur-md px-4 py-1.5 text-[12px] font-semibold tracking-wide text-amber-300">
								<LuCog
									size={13}
									className="animate-[spin_6s_linear_infinite]"
								/>
								Mechanical Design Engineer & SolidWorks Trainer
							</span>
						</motion.div>

						{/* Heading â€” staggered word reveal */}
						<div className="mt-5 sm:mt-6">
							<TextReveal
								as="h1"
								className="text-[clamp(2rem,4.6vw,3.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white font-heading"
								delay={0.78}
								staggerChildren={0.05}
							>
								Engineering Design Solutions That Drive Manufacturing
							</TextReveal>
						</div>

						{/* Rotating keyword â€” slide + blur transition */}
						<motion.div
							className="mt-4 mb-5 flex items-center justify-center lg:justify-start sm:mb-6"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.05, duration: 0.5 }}
						>
							<span className="text-[clamp(1rem,1.9vw,1.45rem)] leading-normal font-semibold text-slate-400 mr-2">
								Expertise in
							</span>
							<span className="relative inline-flex h-[1.4em] items-center overflow-hidden text-[clamp(1rem,1.9vw,1.45rem)]">
								<AnimatePresence mode="wait">
									<motion.span
										key={ROTATING_KEYWORDS[keywordIndex]}
										className="inline-block leading-normal font-bold bg-gradient-to-r from-[#EAC117] to-[#F59E0B] bg-clip-text text-transparent"
										initial={{ y: 22, opacity: 0, filter: 'blur(4px)' }}
										animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
										exit={{ y: -22, opacity: 0, filter: 'blur(4px)' }}
										transition={{ duration: 0.38, ease: SMOOTH_EASE }}
									>
										{ROTATING_KEYWORDS[keywordIndex]}
									</motion.span>
								</AnimatePresence>
							</span>
						</motion.div>

						{/* Paragraph */}
						<motion.p
							className="mb-7 max-w-[52ch] text-[clamp(0.93rem,1.05vw,1.08rem)] leading-[1.78] text-slate-300/85 sm:mb-8"
							initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
							animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
							transition={{ duration: 0.7, ease: SMOOTH_EASE, delay: 0.92 }}
						>
							Hands-on SolidWorks training, expert 3D modeling, and
							manufacturing-ready technical drawings for students,
							professionals, and teams seeking industry-grade CAD outcomes.
						</motion.p>

						{/* CTA Buttons */}
						<motion.div
							className="mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start sm:gap-4"
							initial={{ opacity: 0, y: 18 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.65, ease: SMOOTH_EASE, delay: 1.08 }}
						>
							<MagneticButton
								className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-4 text-[14px] sm:text-[15px] font-semibold text-[#06080D] rounded-xl shadow-[0_8px_28px_rgba(234,193,23,0.38)] hover:shadow-[0_18px_44px_rgba(234,193,23,0.55)] hover:-translate-y-1 transition-all duration-300"
								style={{
									background:
										'linear-gradient(135deg, #EAC117 0%, #D97706 100%)',
								}}
								onClick={() => scrollToSection('portfolio')}
							>
								View Projects
								<span className={styles.arrowBounce}>
									<LuArrowRight size={17} />
								</span>
							</MagneticButton>
							<MagneticButton
								className="inline-flex items-center justify-center px-6 sm:px-7 py-4 text-[14px] sm:text-[15px] font-semibold text-white rounded-xl hover:-translate-y-1 transition-all duration-300"
								style={{
									backdropFilter: 'blur(14px)',
									WebkitBackdropFilter: 'blur(14px)',
									background: 'rgba(255,255,255,0.07)',
									border: '1px solid rgba(255,255,255,0.14)',
									boxShadow:
										'0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
								}}
								onClick={() => scrollToSection('contact')}
							>
								Book a Consultation
							</MagneticButton>
						</motion.div>

					</motion.div>

					{/* â”€â”€â”€ Right column: Floating glass card (desktop only) â”€â”€â”€ */}
					<motion.div
						className="hidden lg:flex flex-col items-end justify-start lg:pt-8"
						initial={{ x: 60, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.88, ease: SMOOTH_EASE, delay: 0.65 }}
					>
						<motion.div
							className={`w-full max-w-[390px] ${styles.currentBorderWrap}`}
							whileHover={{ y: -6 }}
							transition={{ type: 'spring', stiffness: 200, damping: 22 }}
						>
							<div
								className={`${styles.currentBorderInner} p-7 relative overflow-hidden`}
								style={{
									backdropFilter: 'blur(28px)',
									WebkitBackdropFilter: 'blur(28px)',
									background: 'rgba(10,20,44,0.92)',
									boxShadow:
										'0 32px 80px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.07)',
								}}
							>

							<p className="mb-5 text-[10px] font-bold tracking-[0.28em] uppercase text-amber-400/60">
								What We Offer
							</p>

							<div className="space-y-1">
								{CARD_ITEMS.map(({ label, Icon }, i) => (
									<motion.div
										key={label}
										className="flex items-center gap-3.5 py-3 border-b border-white/[0.05] last:border-0 cursor-default"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.42,
											ease: SMOOTH_EASE,
											delay: 0.92 + i * 0.1,
										}}
										whileHover={{ x: 5 }}
									>
										<div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-[#EAC117]/10 border border-[#EAC117]/18">
											<Icon
												size={16}
												className="text-[#EAC117]"
											/>
										</div>
										<span className="text-[14px] font-medium text-white/85">
											{label}
										</span>
									</motion.div>
								))}
							</div>

							{/* Bottom ambient glow */}
							<div
								className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none"
								style={{
									background:
										'linear-gradient(to top, rgba(234,193,23,0.04), transparent)',
								}}
							/>
							</div>
						</motion.div>
					</motion.div>

				</div>
			</motion.div>
		</section>
	);
}
