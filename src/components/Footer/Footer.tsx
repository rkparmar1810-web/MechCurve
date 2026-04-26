import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import useSectionNavigation from '../../hooks/useSectionNavigation';
import { LuLinkedin, LuMail, LuInstagram } from 'react-icons/lu';
import styles from './Footer.module.scss';

const EASE = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS = [
	{ label: 'About', id: 'about' },
	{ label: 'Services', id: 'services' },
	{ label: 'Portfolio', id: 'portfolio' },
	{ label: 'Testimonials', id: 'testimonials' },
	{ label: 'FAQ', id: 'faq' },
	{ label: 'Contact', id: 'contact' },
];

const SERVICE_ITEMS = [
	'CAD Design',
	'SolidWorks Training',
	'Product Design',
	'Engineering Mentorship',
];

const SOCIALS = [
	{
		href: 'mailto:admin@mechcurve.com',
		icon: LuMail,
		title: 'Email',
		external: false,
	},
	{
		href: 'https://www.linkedin.com/company/design-maniach/',
		icon: LuLinkedin,
		title: 'LinkedIn',
		external: true,
	},
	{
		href: 'https://www.instagram.com/design_maniach?igsh=MTBhODZ6Y2swcjdyYg==',
		icon: LuInstagram,
		title: 'Instagram',
		external: true,
	},
];

export default function Footer() {
	const { navigateToSection } = useSectionNavigation();
	const footerRef = useRef<HTMLElement>(null);
	const inView = useInView(footerRef, { once: true, margin: '-40px 0px' });

	return (
		<footer
			ref={footerRef}
			className={styles.footer}
		>
			{/* ── Horizon gold gradient line ── */}
			<div
				className={styles.horizonLine}
				aria-hidden="true"
			/>

			{/* ── Circuit-trace SVG decoration (unique to Footer) ── */}
			<div
				className={styles.circuitBg}
				aria-hidden="true"
			>
				<svg
					viewBox="0 0 1200 300"
					fill="none"
					className={styles.circuitSvg}
					preserveAspectRatio="xMidYMid slice"
				>
					{/* Trace paths — L-shaped technology lines */}
					<path
						d="M0,60 H120 V140 H280"
						stroke="#EAC117"
						strokeWidth="0.5"
						opacity="0.06"
					/>
					<path
						d="M1200,80 H1050 V180 H900"
						stroke="#EAC117"
						strokeWidth="0.5"
						opacity="0.05"
					/>
					<path
						d="M400,0 V50 H600 V120"
						stroke="#EAC117"
						strokeWidth="0.4"
						opacity="0.04"
					/>
					<path
						d="M800,300 V240 H950 V180"
						stroke="#EAC117"
						strokeWidth="0.4"
						opacity="0.04"
					/>
					{/* Junction dots */}
					<circle
						cx="120"
						cy="60"
						r="2"
						fill="#EAC117"
						opacity="0.08"
					/>
					<circle
						cx="280"
						cy="140"
						r="2"
						fill="#EAC117"
						opacity="0.06"
					/>
					<circle
						cx="1050"
						cy="80"
						r="2"
						fill="#EAC117"
						opacity="0.07"
					/>
					<circle
						cx="900"
						cy="180"
						r="2"
						fill="#EAC117"
						opacity="0.05"
					/>
					<circle
						cx="600"
						cy="50"
						r="1.5"
						fill="#EAC117"
						opacity="0.06"
					/>
				</svg>
			</div>

			<div className={styles.inner}>
				{/* ── Main grid ── */}
				<div className={styles.grid}>
					{/* Brand column */}
					<motion.div
						className={styles.brandCol}
						initial={{ opacity: 0, y: 18 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, ease: EASE }}
					>
						<div className={styles.logoRow}>
							<div className={styles.logoWrap}>
								<img
									src="/logo.png"
									alt="MechCurve"
									className={styles.logoImg}
								/>
							</div>
							<span className={styles.brandName}>MechCurve</span>
						</div>
						<p className={styles.tagline}>
							Mechanical Design Engineer &amp; SolidWorks Trainer. Empowering
							future engineers since 2022.
						</p>
					</motion.div>

					{/* Navigation column */}
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
					>
						<h4 className={styles.colHeading}>Quick Links</h4>
						<nav className={styles.navList}>
							{NAV_LINKS.map((l) => (
								<button
									key={l.label}
									type="button"
									onClick={() => navigateToSection(l.id)}
									className={styles.navLink}
								>
									{l.label}
								</button>
							))}
						</nav>
					</motion.div>

					{/* Services column */}
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
					>
						<h4 className={styles.colHeading}>Services</h4>
						<ul className={styles.serviceList}>
							{SERVICE_ITEMS.map((s) => (
								<li key={s}>{s}</li>
							))}
						</ul>
					</motion.div>

					{/* Social column */}
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						animate={inView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, ease: EASE, delay: 0.24 }}
					>
						<h4 className={styles.colHeading}>Connect</h4>
						<div className={styles.socialRow}>
							{SOCIALS.map((s) => (
								<a
									key={s.title}
									href={s.href}
									target={s.external ? '_blank' : undefined}
									rel={s.external ? 'noopener noreferrer' : undefined}
									className={styles.socialIcon}
									title={s.title}
								>
									<s.icon size={18} />
								</a>
							))}
						</div>
					</motion.div>
				</div>

				{/* ── Bottom bar ── */}
				<motion.div
					className={styles.bottom}
					initial={{ opacity: 0 }}
					animate={inView ? { opacity: 1 } : {}}
					transition={{ duration: 0.6, delay: 0.35 }}
				>
					<span>
						&copy; {new Date().getFullYear()} MechCurve. All rights
						reserved.
					</span>
					<div className={styles.legalLinks}>
						<Link
							to="/terms-of-service"
							className={styles.legalLink}
						>
							Terms of Service
						</Link>
						<Link
							to="/privacy-policy"
							className={styles.legalLink}
						>
							Privacy Policy
						</Link>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
