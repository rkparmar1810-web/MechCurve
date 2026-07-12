import { LuCheck } from 'react-icons/lu';
import styles from './WhyChoose.module.scss';

const POINTS = [
	'Manufacturing-First Design Approach',
	'Industry-Standard CAD Practices',
	'Fast Turnaround and Technical Precision',
	'Real-World Engineering Experience',
	'End-to-End Project Support',
];

export default function WhyChoose() {
	return (
		<section id="why-choose" className={styles.section} aria-label="Why Choose MechCurve">
			<div className={styles.container}>
				<div className={styles.headingWrap}>
					<h2 className={styles.heading}>
						Why Manufacturers and Engineers Choose MechCurve
					</h2>
				</div>

				<ul className={styles.points}>
					{POINTS.map((point) => (
						<li key={point} className={styles.point}>
							<LuCheck size={18} className={styles.icon} aria-hidden="true" />
							<span>{point}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
