import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuArrowRight, LuArrowUpRight, LuCheck, LuSparkles } from 'react-icons/lu';
import useSeo from '../hooks/useSeo';
import Stats from '../components/Stats/Stats';
import FadeIn from '../components/FadeIn/FadeIn';
import { servicesByCategory } from '../data/servicesContent';
import { CATEGORY_META, SERVICE_META } from '../data/serviceMenuMeta';
import { WHATSAPP_NUMBER } from '../data/faqContent';

const EASE = [0.22, 1, 0.36, 1] as const;

/* Light-theme tones, aligned to servicesByCategory order:
   Design, Analysis, Rapid Prototyping, CAD Training. */
type Tone = { icon: string; text: string; chip: string; ring: string; glow: string };

const TONES: Tone[] = [
	{ icon: '#f59e0b', text: '#b45309', chip: 'rgba(234,193,23,0.12)', ring: 'rgba(234,193,23,0.42)', glow: 'rgba(234,193,23,0.20)' },
	{ icon: '#3b82f6', text: '#1d4ed8', chip: 'rgba(59,130,246,0.10)', ring: 'rgba(59,130,246,0.42)', glow: 'rgba(59,130,246,0.18)' },
	{ icon: '#10b981', text: '#047857', chip: 'rgba(16,185,129,0.10)', ring: 'rgba(16,185,129,0.42)', glow: 'rgba(16,185,129,0.18)' },
	{ icon: '#8b5cf6', text: '#6d28d9', chip: 'rgba(139,92,246,0.10)', ring: 'rgba(139,92,246,0.42)', glow: 'rgba(139,92,246,0.18)' },
];

const WHY_POINTS = [
	'Engineering solutions built around manufacturability',
	'Industry-standard CAD workflows and documentation',
	'Practical expertise across design, analysis, and production',
	'Personalized guidance and responsive support',
	'Training programs aligned with current industry requirements',
	'Commitment to quality, accuracy, and measurable outcomes',
];

const totalServices = servicesByCategory.reduce((sum, c) => sum + c.items.length, 0);

function CategoryBlock({
	category,
	index,
}: {
	category: (typeof servicesByCategory)[number];
	index: number;
}) {
	const tone = TONES[index % TONES.length];
	const meta = CATEGORY_META[index % CATEGORY_META.length];
	const CategoryIcon = meta.icon;

	const toneVars = {
		'--tone-icon': tone.icon,
		'--tone-text': tone.text,
		'--tone-chip': tone.chip,
		'--tone-ring': tone.ring,
		'--tone-glow': tone.glow,
	} as CSSProperties;

	return (
		<FadeIn>
			<section
				id={`category-${index + 1}`}
				style={{ ...toneVars, scrollMarginTop: 120 }}
				className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] md:p-8"
			>
				<div
					className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl"
					style={{ background: `radial-gradient(circle, ${tone.glow}, transparent 70%)` }}
					aria-hidden="true"
				/>

				<div className="relative flex flex-wrap items-start justify-between gap-5">
					<div className="flex items-start gap-4">
						<span
							className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
							style={{
								background: tone.chip,
								border: `1px solid ${tone.ring}`,
								color: tone.icon,
							}}
						>
							<CategoryIcon size={22} />
						</span>
						<div>
							<span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
								{String(index + 1).padStart(2, '0')}
							</span>
							<h2 className="text-2xl font-bold text-slate-900 md:text-[1.75rem]">
								{category.title}
							</h2>
							<p
								className="mt-1 text-base font-semibold"
								style={{ color: tone.text }}
							>
								{meta.tagline}
							</p>
						</div>
					</div>

					<span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
						{category.items.length} services
					</span>
				</div>

				<p className="relative mt-4 max-w-3xl text-[15px] leading-8 text-slate-700">
					{category.description}
				</p>

				<div className="relative mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
					{category.items.map((item) => {
						const serviceMeta = SERVICE_META[item.slug];
						const ServiceIcon = serviceMeta?.icon;
						return (
							<Link
								key={item.slug}
								to={item.href ?? `/services/${item.slug}`}
								className="group relative flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]"
								onMouseEnter={(e) => {
									e.currentTarget.style.borderColor = tone.ring;
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.borderColor = '';
								}}
							>
								{ServiceIcon && (
									<span
										className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
										style={{
											background: tone.chip,
											border: `1px solid ${tone.ring}`,
											color: tone.icon,
										}}
									>
										<ServiceIcon size={17} />
									</span>
								)}
								<span className="min-w-0 flex-1">
									<span className="flex items-center gap-2">
										<span className="text-[15px] font-bold text-slate-900">
											{item.title}
										</span>
										{serviceMeta?.popular && (
											<span
												className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]"
												style={{
													background: tone.chip,
													color: tone.text,
												}}
											>
												<LuSparkles size={9} />
												Popular
											</span>
										)}
									</span>
									{serviceMeta?.blurb && (
										<span className="mt-1 block text-[13px] leading-6 text-slate-600">
											{serviceMeta.blurb}
										</span>
									)}
								</span>
								<LuArrowUpRight
									size={15}
									className="mt-1 shrink-0 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
								/>
							</Link>
						);
					})}
				</div>
			</section>
		</FadeIn>
	);
}

export default function ServicesPage() {
	useSeo({
		title: 'Services | CAD Design, Analysis, Prototyping & Manufacturing',
		description:
			'Explore MechCurve engineering services: product design, engineering analysis, rapid prototyping and additive manufacturing, and industry-focused CAD training.',
		path: '/services',
	});

	return (
		<div className="site-light-content">
			{/* ── Hero ── */}
			<section
				id="services"
				className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 md:px-12 lg:pt-32"
				aria-label="What We Offer"
			>
				<div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
					<div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-white to-white" />
					<div className="bg-grid-soft absolute inset-0 opacity-40" />
					<div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(234,193,23,0.16),transparent_70%)] blur-2xl" />
					<div className="absolute -right-16 top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)] blur-2xl" />
				</div>

				<div className="mx-auto max-w-[1180px]">
					<motion.div
						className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700"
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: EASE }}
					>
						<span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
						What We Offer
					</motion.div>
					<motion.h1
						className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-[2.9rem]"
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
					>
						Engineering Solutions Built for Innovation and Growth
					</motion.h1>
					<motion.p
						className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-700 md:text-base"
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
					>
						From product design and engineering analysis to rapid prototyping and
						industry-focused CAD training, MechCurve provides end-to-end engineering
						capabilities that help businesses accelerate development and engineers build
						industry-ready expertise.
					</motion.p>

					{/* Category quick-jump */}
					<motion.div
						className="mt-7 flex flex-wrap gap-2.5"
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
					>
						{servicesByCategory.map((category, index) => {
							const tone = TONES[index % TONES.length];
							const CategoryIcon = CATEGORY_META[index % CATEGORY_META.length].icon;
							return (
								<a
									key={category.title}
									href={`#category-${index + 1}`}
									className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3.5 py-1.5 text-[13px] font-semibold backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
									style={{
										borderColor: tone.ring,
										background: tone.chip,
										color: tone.text,
									}}
								>
									<span
										className="inline-flex"
										style={{ color: tone.icon }}
									>
										<CategoryIcon size={14} />
									</span>
									{category.title}
								</a>
							);
						})}
					</motion.div>

					<motion.div
						className="mt-7 flex flex-wrap gap-3"
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
					>
						<a
							href={`tel:+${WHATSAPP_NUMBER}`}
							className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-5 py-3 text-sm font-bold text-[#06080D] shadow-[0_10px_28px_rgba(234,193,23,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(234,193,23,0.4)]"
						>
							Request a Consultation
							<LuArrowRight
								size={16}
								className="transition-transform duration-300 group-hover:translate-x-0.5"
							/>
						</a>
						<Link
							to="/career"
							className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 backdrop-blur transition-colors duration-300 hover:border-amber-300 hover:text-amber-700"
						>
							Explore Training Programs
						</Link>
					</motion.div>
				</div>
			</section>

			{/* ── By The Numbers ── */}
			<Stats />

			{/* ── Capability tracks ── */}
			<section
				className="px-5 pb-16 pt-8 sm:px-8 md:px-12"
				aria-label="Service Offerings"
			>
				<div className="mx-auto max-w-[1180px]">
					<FadeIn>
						<p className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-500">
							{totalServices} services across {servicesByCategory.length} capability
							tracks
						</p>
					</FadeIn>
					<div className="mt-6 space-y-6">
						{servicesByCategory.map((category, index) => (
							<CategoryBlock
								key={category.title}
								category={category}
								index={index}
							/>
						))}
					</div>
				</div>
			</section>

			{/* ── Why Choose ── */}
			<section className="px-5 pb-16 sm:px-8 md:px-12" aria-label="Why Choose MechCurve">
				<FadeIn>
					<div className="mx-auto max-w-[1180px] rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] md:p-8">
						<h2 className="text-2xl font-bold text-slate-900">Why Choose MechCurve?</h2>
						<ul className="mt-5 grid gap-3 sm:grid-cols-2">
							{WHY_POINTS.map((point) => (
								<li
									key={point}
									className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-3 text-sm leading-7 text-slate-700"
								>
									<span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
										<LuCheck size={12} />
									</span>
									<span>{point}</span>
								</li>
							))}
						</ul>
					</div>
				</FadeIn>
			</section>

			{/* ── Closing CTA ── */}
			<section className="px-5 pb-20 sm:px-8 md:px-12" aria-label="Start Your Project">
				<FadeIn>
					<div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-8 text-center shadow-[0_28px_70px_rgba(15,23,42,0.2)] md:p-12">
						<div
							className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(234,193,23,0.22),transparent_70%)] blur-2xl"
							aria-hidden="true"
						/>
						<h2 className="relative text-2xl font-extrabold text-white md:text-3xl">
							Ready to Start Your Next Project?
						</h2>
						<p className="relative mx-auto mt-3 max-w-2xl text-[15px] leading-8 text-slate-300">
							Whether you need engineering support, rapid prototyping, or
							industry-focused CAD training, our team is ready to help you move forward
							with confidence.
						</p>
						<a
							href={`tel:+${WHATSAPP_NUMBER}`}
							className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-6 py-3 text-sm font-bold text-[#06080D] shadow-[0_12px_30px_rgba(234,193,23,0.3)] transition-transform duration-300 hover:-translate-y-0.5"
						>
							Request a Consultation
							<LuArrowRight size={16} />
						</a>
					</div>
				</FadeIn>
			</section>
		</div>
	);
}
