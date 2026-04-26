import { Link } from 'react-router-dom';
import useSeo from '../hooks/useSeo';
import styles from './LegalPage.module.scss';

type LegalPolicy = 'terms' | 'privacy';

type LegalSection = {
	title: string;
	points: string[];
};

const LAST_UPDATED = '15 April 2026';

const TERMS_SECTIONS: LegalSection[] = [
	{
		title: '1. Acceptance of Terms',
		points: [
			'By accessing or using MechCurve services, website, or related communication channels, you agree to these Terms of Service.',
			'If you do not agree with any part of these terms, please discontinue use of the website and services.',
		],
	},
	{
		title: '2. Services We Provide',
		points: [
			'MechCurve provides mechanical CAD design support, SolidWorks training, engineering consultation, and manufacturing guidance.',
			'Service scope, deliverables, and timelines are confirmed separately through proposals, agreements, or written communication.',
		],
	},
	{
		title: '3. User Responsibilities',
		points: [
			'You agree to provide complete and accurate information required for project execution, consultation, or training enrollment.',
			'You must not use this website in any way that disrupts operations, violates law, or infringes intellectual property rights.',
		],
	},
	{
		title: '4. Intellectual Property',
		points: [
			'Website content, branding, visual assets, and non-client-specific materials are owned by or licensed to MechCurve.',
			'Client deliverable ownership and usage rights are governed by the applicable project agreement.',
		],
	},
	{
		title: '5. Payments and Commercial Terms',
		points: [
			'Fees, milestone schedules, and revisions are determined as per confirmed quotation or contract terms.',
			'Late or incomplete payments may delay delivery timelines and service continuity.',
		],
	},
	{
		title: '6. Disclaimer and Limitation of Liability',
		points: [
			'Information published on this website is provided for general guidance and may be updated without prior notice.',
			'To the fullest extent permitted by law, MechCurve is not liable for indirect, incidental, or consequential damages arising from use of this website or services.',
		],
	},
	{
		title: '7. Governing Law',
		points: [
			'These terms are governed by the laws of India.',
			'Any dispute arising out of these terms is subject to the jurisdiction of courts in Surat, Gujarat.',
		],
	},
];

const PRIVACY_SECTIONS: LegalSection[] = [
	{
		title: '1. Information We Collect',
		points: [
			'We may collect personal information such as your name, email address, phone number, company name, and project inquiry details when you contact us.',
			'We may also collect technical usage data such as browser type, device information, and pages visited to improve website performance.',
		],
	},
	{
		title: '2. How We Use Information',
		points: [
			'To respond to inquiries, provide requested services, schedule consultations, and deliver training or project updates.',
			'To improve service quality, website usability, communication workflows, and security monitoring.',
		],
	},
	{
		title: '3. Cookies and Analytics',
		points: [
			'This website may use cookies or similar technologies to maintain session behavior and understand user interaction.',
			'You can control cookies through your browser settings, but disabling them may affect parts of site functionality.',
		],
	},
	{
		title: '4. Data Sharing',
		points: [
			'We do not sell your personal information.',
			'Information may be shared only with trusted service providers or legal authorities when required for operations, compliance, or lawful requests.',
		],
	},
	{
		title: '5. Data Retention and Security',
		points: [
			'We retain personal information only as long as reasonably required for service delivery, record keeping, and legal compliance.',
			'We apply reasonable administrative and technical safeguards; however, no internet transmission method can be guaranteed as fully secure.',
		],
	},
	{
		title: '6. Your Rights',
		points: [
			'You may request access, correction, or deletion of your personal information by contacting us.',
			'Where legally applicable, you may also object to specific processing activities or withdraw consent.',
		],
	},
	{
		title: '7. Policy Updates',
		points: [
			'We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory changes.',
			'The latest version with the revised effective date will always be published on this page.',
		],
	},
];

export default function LegalPage({ policy }: { policy: LegalPolicy }) {
	const isTerms = policy === 'terms';
	const title = isTerms ? 'Terms of Service' : 'Privacy Policy';
	const description = isTerms
		? 'Read the Terms of Service for using MechCurve website and services.'
		: 'Read the Privacy Policy for how MechCurve collects, uses, and protects your data.';
	const path = isTerms ? '/terms-of-service' : '/privacy-policy';
	const sections = isTerms ? TERMS_SECTIONS : PRIVACY_SECTIONS;

	useSeo({ title: `${title} | MechCurve`, description, path });

	return (
		<section className={styles.legalPage}>
			<div
				className={styles.bgGlow}
				aria-hidden="true"
			/>
			<div className={styles.container}>
				<Link
					to="/"
					className={styles.backLink}
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M10 12L6 8l4-4"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					Back to Home
				</Link>
				<header className={styles.headerCard}>
					<span className={styles.kicker}>Legal</span>
					<h1>{title}</h1>
					<p>
						Please review this document carefully. By using this website, you
						acknowledge the terms outlined below.
					</p>
					<p className={styles.updated}>Last updated: {LAST_UPDATED}</p>

					<div
						className={styles.toggle}
						role="tablist"
						aria-label="Legal pages"
					>
						<Link
							to="/terms-of-service"
							className={`${styles.toggleBtn} ${isTerms ? styles.active : ''}`}
							role="tab"
							aria-selected={isTerms}
						>
							Terms of Service
						</Link>
						<Link
							to="/privacy-policy"
							className={`${styles.toggleBtn} ${!isTerms ? styles.active : ''}`}
							role="tab"
							aria-selected={!isTerms}
						>
							Privacy Policy
						</Link>
					</div>
				</header>

				<div className={styles.sectionsWrap}>
					{sections.map((section) => (
						<article
							key={section.title}
							className={styles.sectionCard}
						>
							<h2>{section.title}</h2>
							<ul>
								{section.points.map((point) => (
									<li key={point}>{point}</li>
								))}
							</ul>
						</article>
					))}
				</div>

				<div className={styles.contactBox}>
					<p>
						Questions about this policy? Write to{' '}
						<a href="mailto:admin@mechcurve.com">admin@mechcurve.com</a>.
					</p>
				</div>
			</div>
		</section>
	);
}
