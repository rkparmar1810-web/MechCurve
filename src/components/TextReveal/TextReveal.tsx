import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
	children: string;
	className?: string;
	delay?: number;
	as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
	once?: boolean;
	staggerChildren?: number;
}

export default function TextReveal({
	children,
	className = '',
	delay = 0,
	as: Tag = 'h1',
	once = true,
	staggerChildren = 0.03,
}: TextRevealProps) {
	const ref = useRef(null);
	const inView = useInView(ref, { once, margin: '-80px 0px' });

	const words = children.split(' ');

	const container = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren,
				delayChildren: delay,
			},
		},
	};

	const word = {
		hidden: {
			y: '100%',
			opacity: 0,
		},
		visible: {
			y: '0%',
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: [0.33, 1, 0.68, 1] as const,
			},
		},
	};

	const MotionTag = motion[Tag] as typeof motion.h1;

	return (
		<MotionTag
			ref={ref}
			className={className}
			variants={container}
			initial="hidden"
			animate={inView ? 'visible' : 'hidden'}
			aria-label={children}
		>
			{words.map((w, i) => (
				<span
					key={i}
					className="inline-block overflow-hidden align-bottom mr-[0.25em]"
				>
					<motion.span
						className="inline-block"
						variants={word}
					>
						{w}
					</motion.span>
				</span>
			))}
		</MotionTag>
	);
}
