import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<motion.div
			style={{ scaleX, transformOrigin: '0%' }}
			className="fixed top-0 left-0 right-0 h-[2px] z-[9999]"
			aria-hidden="true"
		>
			<div className="h-full w-full bg-gradient-to-r from-[#EAC117] via-[#F59E0B] to-[#D97706] shadow-[0_0_12px_rgba(234,193,23,0.4)]" />
		</motion.div>
	);
}
