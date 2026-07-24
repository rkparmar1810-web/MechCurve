import { useRef, useState, type FormEvent } from 'react';
import {
	LuMail,
	LuMapPin,
	LuPhone,
	LuClock3,
	LuArrowRight,
	LuSend,
	LuUser,
	LuBriefcase,
	LuMessageSquare,
	LuCircleCheck,
	LuCircleAlert,
	LuLoader,
} from 'react-icons/lu';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './Contact.module.scss';

const EASE = [0.22, 1, 0.36, 1] as const;

// Same-origin proxy (api/contact.ts) — forwards to Google Apps Script
// server-side so the form still works on networks that block script.google.com.
const CONTACT_ENDPOINT = '/api/contact';

const SERVICE_OPTIONS = [
	'CAD Design & 3D Modelling',
	'Product Design & Development',
	'Reverse Engineering',
	'Manufacturing Support',
	'Career Program Inquiry',
	'Other',
] as const;

interface FormData {
	name: string;
	email: string;
	phone: string;
	service: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	service?: string;
	message?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const contactItems = [
	{
		icon: LuMail,
		label: 'Email',
		value: 'admin@mechcurve.com',
		href: 'mailto:admin@mechcurve.com',
	},
	{
		icon: LuPhone,
		label: 'Phone',
		value: '+91 91062 97853',
		href: 'tel:+919106297853',
	},
	{
		icon: LuMapPin,
		label: 'Locations',
		value: 'Surat, Ahmedabad & Vadodara, Gujarat',
		href: undefined,
	},
	{
		icon: LuClock3,
		label: 'Working Hours',
		value: 'Mon – Sat, 9:00 AM – 7:00 PM',
		href: undefined,
	},
];

export default function Contact() {
	const sectionRef = useRef<HTMLElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const headerInView = useInView(headerRef, { once: true, margin: '-80px 0px' });
	const cardsInView = useInView(sectionRef, { once: true, margin: '-60px 0px' });

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});
	const contourY = useTransform(scrollYProgress, [0, 1], [0, -30]);

	// ── Form state ──
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		service: '',
		message: '',
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [status, setStatus] = useState<SubmitStatus>('idle');

	const validate = (): boolean => {
		const newErrors: FormErrors = {};
		if (!formData.name.trim()) newErrors.name = 'Name is required';
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Enter a valid email address';
		}
		if (!formData.service) newErrors.service = 'Please select a service';
		if (!formData.message.trim()) {
			newErrors.message = 'Message is required';
		} else if (formData.message.trim().length < 10) {
			newErrors.message = 'Message should be at least 10 characters';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		setStatus('submitting');
		try {
			const res = await fetch(CONTACT_ENDPOINT, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: { 'Content-Type': 'application/json' },
			});
			const json = await res.json().catch(() => null);

			if (res.ok && json?.success === true) {
				setStatus('success');
				setFormData({ name: '', email: '', phone: '', service: '', message: '' });
			} else {
				setStatus('error');
			}
		} catch {
			setStatus('error');
		}
	};

	const resetForm = () => {
		setStatus('idle');
		setErrors({});
	};

	return (
		<section
			ref={sectionRef}
			id="contact"
			className={styles.section}
			style={{ scrollMarginTop: 120 }}
			aria-label="Contact"
		>
			{/* ── Topographic contour lines (unique to Contact) ── */}
			<motion.div
				className={styles.contours}
				style={{ y: contourY }}
				aria-hidden="true"
			>
				<svg
					viewBox="0 0 800 600"
					fill="none"
					className={styles.contourSvg}
					preserveAspectRatio="xMidYMid slice"
				>
					{[120, 180, 240, 310, 380, 440].map((cy, i) => (
						<path
							key={i}
							d={`M-40,${cy} C160,${cy - 40 + i * 8} 360,${cy + 30 - i * 6} 520,${cy - 10 + i * 5} C680,${cy + 20 - i * 4} 780,${cy - 20} 840,${cy + 10}`}
							stroke="#EAC117"
							strokeWidth="0.5"
							opacity={0.04 + i * 0.012}
							fill="none"
						/>
					))}
					{/* Center focal ellipse */}
					<ellipse
						cx="400"
						cy="300"
						rx="180"
						ry="100"
						stroke="#EAC117"
						strokeWidth="0.4"
						opacity="0.06"
						fill="none"
					/>
					<ellipse
						cx="400"
						cy="300"
						rx="100"
						ry="55"
						stroke="#EAC117"
						strokeWidth="0.3"
						opacity="0.04"
						fill="none"
					/>
				</svg>
			</motion.div>

			{/* Ambient glow */}
			<div className={styles.ambientGlow} aria-hidden="true" />

			<div className={styles.inner}>
				{/* ── Header ── */}
				<div ref={headerRef} className={styles.header}>
					<motion.span
						className={styles.badge}
						initial={{ opacity: 0, scale: 0.92 }}
						animate={headerInView ? { opacity: 1, scale: 1 } : {}}
						transition={{ duration: 0.5, ease: EASE }}
					>
						<LuSend size={11} />
						Get In Touch
					</motion.span>

					<motion.h2
						className={styles.heading}
						initial={{ opacity: 0, y: 24 }}
						animate={headerInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
					>
						Start a Project or Discuss Career Programs
					</motion.h2>

					<motion.p
						className={styles.subtext}
						initial={{ opacity: 0 }}
						animate={headerInView ? { opacity: 1 } : {}}
						transition={{ duration: 0.6, delay: 0.25 }}
					>
						Fill out the form below and we'll get back to you within 24 hours.
					</motion.p>
				</div>

				{/* ── Two-column layout: Form + Info ── */}
				<div className={styles.twoCol}>
					{/* ── Contact Form ── */}
					<motion.div
						className={styles.formWrapper}
						initial={{ opacity: 0, y: 30 }}
						animate={cardsInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
					>
						<AnimatePresence mode="wait">
							{status === 'success' ? (
								<motion.div
									key="success"
									className={styles.successState}
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.4 }}
								>
									<div className={styles.successIcon}>
										<LuCircleCheck size={40} />
									</div>
									<h3>Thank You!</h3>
									<p>
										Your enquiry has been submitted successfully.
									</p>
									<button
										type="button"
										onClick={resetForm}
										className={styles.ctaBtn}
									>
										Send Another Enquiry
									</button>
								</motion.div>
							) : (
								<motion.form
									key="form"
									onSubmit={handleSubmit}
									className={styles.form}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									noValidate
								>
									{/* Name */}
									<div className={styles.fieldGroup}>
										<label htmlFor="contact-name" className={styles.label}>
											<LuUser size={14} />
											Full Name <span className={styles.required}>*</span>
										</label>
										<input
											id="contact-name"
											type="text"
											name="name"
											value={formData.name}
											onChange={handleChange}
											placeholder="Your full name"
											className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
											autoComplete="name"
										/>
										{errors.name && (
											<span className={styles.errorMsg}>
												<LuCircleAlert size={12} /> {errors.name}
											</span>
										)}
									</div>

									{/* Email */}
									<div className={styles.fieldGroup}>
										<label htmlFor="contact-email" className={styles.label}>
											<LuMail size={14} />
											Email Address <span className={styles.required}>*</span>
										</label>
										<input
											id="contact-email"
											type="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											placeholder="you@example.com"
											className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
											autoComplete="email"
										/>
										{errors.email && (
											<span className={styles.errorMsg}>
												<LuCircleAlert size={12} /> {errors.email}
											</span>
										)}
									</div>

									{/* Phone */}
									<div className={styles.fieldGroup}>
										<label htmlFor="contact-phone" className={styles.label}>
											<LuPhone size={14} />
											Phone Number
										</label>
										<input
											id="contact-phone"
											type="tel"
											name="phone"
											value={formData.phone}
											onChange={handleChange}
											placeholder="+91 98765 43210"
											className={styles.input}
											autoComplete="tel"
										/>
									</div>

									{/* Service */}
									<div className={styles.fieldGroup}>
										<label htmlFor="contact-service" className={styles.label}>
											<LuBriefcase size={14} />
											Service Required <span className={styles.required}>*</span>
										</label>
										<select
											id="contact-service"
											name="service"
											value={formData.service}
											onChange={handleChange}
											className={`${styles.input} ${styles.select} ${errors.service ? styles.inputError : ''}`}
										>
											<option value="" disabled>
												Select a service…
											</option>
											{SERVICE_OPTIONS.map((opt) => (
												<option key={opt} value={opt}>
													{opt}
												</option>
											))}
										</select>
										{errors.service && (
											<span className={styles.errorMsg}>
												<LuCircleAlert size={12} /> {errors.service}
											</span>
										)}
									</div>

									{/* Message */}
									<div className={styles.fieldGroup}>
										<label htmlFor="contact-message" className={styles.label}>
											<LuMessageSquare size={14} />
											Your Message <span className={styles.required}>*</span>
										</label>
										<textarea
											id="contact-message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											placeholder="Describe your project or career-program needs…"
											rows={5}
											className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
										/>
										{errors.message && (
											<span className={styles.errorMsg}>
												<LuCircleAlert size={12} /> {errors.message}
											</span>
										)}
									</div>

									{/* Error banner */}
									{status === 'error' && (
										<div className={styles.errorBanner}>
											<LuCircleAlert size={16} />
											Something went wrong. Please try again or email us directly.
										</div>
									)}

									{/* Submit */}
									<button
										type="submit"
										className={styles.ctaBtn}
										disabled={status === 'submitting'}
									>
										<span className={styles.ctaPulse} aria-hidden="true" />
										{status === 'submitting' ? (
											<>
												<LuLoader size={16} className={styles.spinner} />
												Sending…
											</>
										) : (
											<>
												Send Enquiry
												<LuArrowRight size={16} />
											</>
										)}
									</button>
								</motion.form>
							)}
						</AnimatePresence>
					</motion.div>

					{/* ── Contact Info Sidebar ── */}
					<div className={styles.sidebar}>
						{contactItems.map((item, i) => {
							const Tag = item.href ? 'a' : 'div';
							return (
								<motion.div
									key={item.label}
									className={styles.cardOuter}
									initial={{ opacity: 0, y: 28, rotateY: -4 }}
									animate={
										cardsInView
											? { opacity: 1, y: 0, rotateY: 0 }
											: {}
									}
									transition={{
										duration: 0.5,
										ease: EASE,
										delay: 0.15 + i * 0.08,
									}}
									style={{ perspective: 800 }}
								>
									<Tag
										{...(item.href ? { href: item.href } : {})}
										className={styles.card}
									>
										<div className={styles.cardAccent} aria-hidden="true" />
										<div className={styles.iconWrap}>
											<item.icon size={20} />
										</div>
										<div className={styles.cardContent}>
											<span className={styles.cardLabel}>
												{item.label}
											</span>
											<span className={styles.cardValue}>
												{item.value}
											</span>
										</div>
									</Tag>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
