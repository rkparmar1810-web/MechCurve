import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

function RevealText({
	text,
	subtext,
	inView,
}: {
	text: string;
	subtext?: string;
	inView: boolean;
}) {
	return (
		<div className={styles.textOnlyBlock}>
			<motion.span
				className={styles.dividerText}
				initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
				animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
				transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
			>
				{text}
			</motion.span>
			{subtext && (
				<motion.span
					className={styles.dividerSubtext}
					initial={{ opacity: 0, y: 12 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
				>
					{subtext}
				</motion.span>
			)}
		</div>
	);
}

export default function SectionDivider({ variant: _variant, text, subtext }: Props) {
	const showFlowchart = _variant === 'cinematic-burst';
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, margin: '-80px' });

	return (
		<div ref={ref} className={styles.sectionBridge}>
			{showFlowchart && (
				<div className={styles.flowchartWrap} aria-hidden="true">
					<div className={styles.flowMain} />
					<div className={styles.flowBranchLeft} />
					<div className={styles.flowBranchRight} />
					<div className={`${styles.flowNode} ${styles.nodeA}`} />
					<div className={`${styles.flowNode} ${styles.nodeB}`} />
					<div className={`${styles.flowNode} ${styles.nodeC}`} />
					<div className={`${styles.flowNode} ${styles.nodeD}`} />
					<div className={styles.flowPulse} />
				</div>
			)}
			{text ? <RevealText text={text} subtext={subtext} inView={inView} /> : null}
		</div>
	);
}
