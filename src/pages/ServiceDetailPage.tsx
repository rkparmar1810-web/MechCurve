import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
	LuArrowRight,
	LuArrowUpRight,
	LuCheck,
	LuChevronRight,
	LuLayers,
	LuPackage,
	LuWrench,
} from 'react-icons/lu';
import useSeo from '../hooks/useSeo';
import FadeIn from '../components/FadeIn/FadeIn';
import { serviceDetailsBySlug, serviceNavItems } from '../data/servicesContent';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Loads /public/service_images/<slug>.webp. Until that file exists it shows a
 * premium placeholder — drop the image in and it appears automatically.
 */
/**
 * Slugs whose image is a transparent cut-out (floats on the page background).
 * Everything else is treated as a full-frame photo. Add a slug here when you
 * drop in a transparency-cleaned image.
 */
const CUTOUT_SLUGS = new Set(['product-development', 'electro-mechanical-integration']);

/**
 * Slugs whose image is a dark studio render. A light frame fights that kind of
 * image, so they get a dark frame and a navy-tinted shadow instead.
 */
const DARK_SLUGS = new Set(['3d-cad-modeling']);

function ServiceHeroImage({ slug, title }: { slug: string; title: string }) {
	const [ok, setOk] = useState(true);
	const alt = `${title} — MechCurve engineering service`;
	const src = `/service_images/${slug}.webp`;

	if (ok && CUTOUT_SLUGS.has(slug)) {
		// Transparent cut-out: float it on the hero's own light background so it
		// blends in, rather than sitting in a hard photo frame.
		return (
			<div className="relative aspect-[4/3]">
				<div className="bg-grid-soft absolute inset-0 rounded-3xl opacity-40" aria-hidden="true" />
				<div className="pointer-events-none absolute inset-x-6 bottom-6 h-10 rounded-[50%] bg-[radial-gradient(ellipse,rgba(15,23,42,0.14),transparent_70%)] blur-md" aria-hidden="true" />
				<img
					src={src}
					alt={alt}
					className="relative z-10 h-full w-full object-contain drop-shadow-[0_24px_44px_rgba(15,23,42,0.14)]"
					loading="lazy"
					onError={() => setOk(false)}
				/>
			</div>
		);
	}

	if (ok) {
		const dark = DARK_SLUGS.has(slug);
		// Full-frame photo inside a premium rounded card.
		return (
			<div
				className={`group relative aspect-[4/3] overflow-hidden rounded-3xl ${
					dark
						? 'border border-slate-800 bg-slate-950 shadow-[0_28px_70px_rgba(15,23,42,0.28)]'
						: 'border border-slate-200 bg-slate-100 shadow-[0_28px_70px_rgba(15,23,42,0.12)]'
				}`}
			>
				<img
					src={src}
					alt={alt}
					className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
					loading="lazy"
					onError={() => setOk(false)}
				/>
				{!dark && (
					<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-white/10" aria-hidden="true" />
				)}
				<div
					className={`pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ${
						dark ? 'ring-white/10' : 'ring-white/20'
					}`}
					aria-hidden="true"
				/>
			</div>
		);
	}

	return (
		<div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-[0_28px_70px_rgba(15,23,42,0.1)]">
			<div className="bg-grid-soft absolute inset-0 opacity-70" />
			<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
				<span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 shadow-sm">
					<LuLayers size={26} />
				</span>
				<p className="px-8 text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-400">
					Image Placeholder
				</p>
				<p className="max-w-[17rem] px-6 text-xs leading-6 text-slate-400">
					Add <span className="font-mono text-slate-500">{slug}.webp</span> to{' '}
					<span className="font-mono text-slate-500">/public/service_images/</span>
				</p>
			</div>
		</div>
	);
}

export default function ServiceDetailPage() {
	const { slug } = useParams();
	const service = slug ? serviceDetailsBySlug[slug] : undefined;

	if (!service) {
		useSeo({
			title: 'Service Not Found | MechCurve',
			description:
				'The requested service page was not found. Explore all mechanical engineering services from MechCurve.',
			path: '/services',
		});

		return (
			<section className="site-light-content px-5 pb-16 pt-32 sm:px-8 md:px-12">
				<div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
					<h1 className="text-3xl font-extrabold text-slate-900">Service Not Found</h1>
					<p className="mt-3 text-slate-600">
						This service page is unavailable. You can return to the services
						overview or open another service from the list.
					</p>
					<Link
						to="/services"
						className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-5 py-3 text-sm font-bold text-[#06080D] shadow-[0_10px_28px_rgba(234,193,23,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
					>
						Go To Services
						<LuArrowRight size={16} />
					</Link>
				</div>
			</section>
		);
	}

	useSeo({
		title: `${service.title} | MechCurve Services`,
		description: service.shortDescription,
		path: `/services/${service.slug}`,
	});

	const relatedServices = serviceNavItems
		.filter((item) => item.slug !== service.slug)
		.slice(0, 5);

	const quickLinks = [
		{ id: 'scope', label: 'Scope' },
		{ id: 'deliverables', label: 'Deliverables' },
		{ id: 'workflow', label: 'Workflow' },
		{ id: 'fit', label: 'Best Fit' },
		{ id: 'tools', label: 'Tools' },
	];

	const heroStats = [
		{ icon: LuLayers, label: 'Capabilities', value: service.capabilities.length },
		{ icon: LuPackage, label: 'Deliverables', value: service.deliverables.length },
		{ icon: LuWrench, label: 'Workflow Steps', value: service.workflow.length },
	];

	return (
		<div className="site-light-content">
			{/* ── Hero ── */}
			<section className="relative overflow-hidden px-5 pb-14 pt-28 sm:px-8 md:px-12 lg:pt-32">
				{/* decorative backdrop */}
				<div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
					<div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-white to-white" />
					<div className="bg-grid-soft absolute inset-0 opacity-40" />
					<div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(234,193,23,0.16),transparent_70%)] blur-2xl" />
					<div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)] blur-2xl" />
				</div>

				<div className="mx-auto max-w-[1180px]">
					{/* breadcrumb */}
					<motion.nav
						className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500"
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: EASE }}
						aria-label="Breadcrumb"
					>
						<Link to="/" className="transition-colors hover:text-amber-700">
							Home
						</Link>
						<LuChevronRight size={14} className="text-slate-400" />
						<Link to="/services" className="transition-colors hover:text-amber-700">
							Services
						</Link>
						<LuChevronRight size={14} className="text-slate-400" />
						<span className="text-slate-700">{service.title}</span>
					</motion.nav>

					<div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-center">
						<div>
							<motion.div
								className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700"
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
							>
								<span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
								{service.category}
							</motion.div>

							<motion.h1
								className="mt-4 max-w-2xl text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 md:text-4xl lg:text-[2.9rem]"
								initial={{ opacity: 0, y: 18 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
							>
								{service.title}
							</motion.h1>

							<motion.p
								className="mt-3 max-w-2xl text-base font-semibold text-amber-700 md:text-lg"
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
							>
								{service.tagline}
							</motion.p>

							<motion.p
								className="mt-5 max-w-2xl text-[15px] leading-8 text-slate-700 md:text-base"
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
							>
								{service.heroDescription}
							</motion.p>

							<motion.div
								className="mt-7 flex flex-wrap gap-3"
								initial={{ opacity: 0, y: 14 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
							>
								<a
									href="mailto:admin@mechcurve.com"
									className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-5 py-3 text-sm font-bold text-[#06080D] shadow-[0_10px_28px_rgba(234,193,23,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(234,193,23,0.4)]"
								>
									Request Consultation
									<LuArrowRight
										size={16}
										className="transition-transform duration-300 group-hover:translate-x-0.5"
									/>
								</a>
								<Link
									to="/services"
									className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 backdrop-blur transition-colors duration-300 hover:border-amber-300 hover:text-amber-700"
								>
									Back To Services
								</Link>
							</motion.div>
						</div>

						{/* hero visual placeholder */}
						<motion.div
							initial={{ opacity: 0, scale: 0.96, y: 16 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
							className="relative"
						>
							<ServiceHeroImage slug={service.slug} title={service.title} />
						</motion.div>
					</div>

					{/* hero stats */}
					<motion.div
						className="mt-10 grid grid-cols-3 gap-3 sm:max-w-lg"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
					>
						{heroStats.map((stat) => (
							<div
								key={stat.label}
								className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-center shadow-[0_10px_28px_rgba(15,23,42,0.05)] backdrop-blur"
							>
								<stat.icon size={18} className="mx-auto text-amber-600" />
								<div className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
									{stat.value}
								</div>
								<div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
									{stat.label}
								</div>
							</div>
						))}
					</motion.div>
				</div>
			</section>

			{/* ── Body ── */}
			<section className="px-5 pb-20 sm:px-8 md:px-12">
				<div className="mx-auto max-w-[1180px]">
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
						<article className="space-y-6">
							<FadeIn>
								<section id="scope" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] md:p-8">
									<h2 className="text-2xl font-bold text-slate-900">What This Service Covers</h2>
									<p className="mt-4 text-base leading-8 text-slate-700">
										This engagement is structured around practical milestones,
										documented outcomes, and engineering quality checks so your team
										can move from concept to execution with confidence.
									</p>
									<ul className="mt-5 grid gap-3 sm:grid-cols-2">
										{service.capabilities.map((point) => (
											<li
												key={point}
												className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-3 text-sm leading-7 text-slate-700 transition-colors hover:border-amber-200 hover:bg-amber-50/50"
											>
												<span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
													<LuCheck size={12} />
												</span>
												<span>{point}</span>
											</li>
										))}
									</ul>
								</section>
							</FadeIn>

							<FadeIn>
								<section id="deliverables" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] md:p-8">
									<h2 className="text-2xl font-bold text-slate-900">Deliverables You Receive</h2>
									<p className="mt-4 text-base leading-8 text-slate-700">
										Each engagement produces tangible outputs your team can directly
										use for review cycles, production planning, vendor communication,
										and handover.
									</p>
									<ul className="mt-5 grid gap-3 sm:grid-cols-2">
										{service.deliverables.map((point) => (
											<li
												key={point}
												className="flex items-start gap-2.5 text-sm leading-7 text-slate-700"
											>
												<span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
													<LuCheck size={12} />
												</span>
												<span>{point}</span>
											</li>
										))}
									</ul>
								</section>
							</FadeIn>

							<FadeIn>
								<section id="workflow" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] md:p-8">
									<h2 className="text-2xl font-bold text-slate-900">How The Engagement Works</h2>
									<ol className="mt-6 space-y-3">
										{service.workflow.map((step, index) => (
											<li
												key={step}
												className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4 transition-colors hover:border-amber-200 hover:bg-amber-50/50"
											>
												<span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white transition-colors group-hover:bg-amber-500 group-hover:text-[#06080D]">
													{String(index + 1).padStart(2, '0')}
												</span>
												<span className="pt-1 text-sm leading-7 text-slate-700">{step}</span>
											</li>
										))}
									</ol>
								</section>
							</FadeIn>

							<FadeIn>
								<section id="fit" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] md:p-8">
									<h2 className="text-2xl font-bold text-slate-900">Best Fit For</h2>
									<ul className="mt-5 grid gap-3 sm:grid-cols-2">
										{service.idealFor.map((point) => (
											<li
												key={point}
												className="flex items-start gap-2.5 text-sm leading-7 text-slate-700"
											>
												<span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
													<LuCheck size={12} />
												</span>
												<span>{point}</span>
											</li>
										))}
									</ul>
								</section>
							</FadeIn>

							<FadeIn>
								<section id="tools" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.06)] md:p-8">
									<h2 className="text-2xl font-bold text-slate-900">Tools & Platforms</h2>
									<p className="mt-4 text-base leading-8 text-slate-700">
										We align the toolchain with your engineering workflow to ensure
										clean collaboration, reliable data exchange, and production-focused
										output.
									</p>
									<div className="mt-5 flex flex-wrap gap-2.5">
										{service.tools.map((tool) => (
											<span
												key={tool}
												className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-700 transition-transform duration-300 hover:-translate-y-0.5"
											>
												<LuWrench size={12} />
												{tool}
											</span>
										))}
									</div>
								</section>
							</FadeIn>
						</article>

						<aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
							<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
								<h3 className="text-sm font-bold uppercase tracking-[0.14em] text-amber-700">On This Page</h3>
								<ul className="mt-3 space-y-1">
									{quickLinks.map((link) => (
										<li key={link.id}>
											<a
												href={`#${link.id}`}
												className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-amber-50 hover:text-amber-700"
											>
												{link.label}
											</a>
										</li>
									))}
								</ul>
							</div>

							<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
								<h3 className="text-sm font-bold uppercase tracking-[0.14em] text-amber-700">Explore More</h3>
								<ul className="mt-3 space-y-1">
									{relatedServices.map((item) => (
										<li key={item.slug}>
											<Link
												to={`/services/${item.slug}`}
												className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-amber-50 hover:text-amber-700"
											>
												<span>{item.title}</span>
												<LuArrowUpRight
													size={14}
													className="text-slate-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-600"
												/>
											</Link>
										</li>
									))}
								</ul>
							</div>

							<div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-5 text-white shadow-[0_18px_44px_rgba(15,23,42,0.2)]">
								<h3 className="text-base font-bold">Have a project in mind?</h3>
								<p className="mt-2 text-sm leading-6 text-slate-300">
									Tell us your requirements and we will map the right engineering
									approach for you.
								</p>
								<a
									href="mailto:admin@mechcurve.com"
									className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-4 py-2.5 text-sm font-bold text-[#06080D] transition-transform duration-300 hover:-translate-y-0.5"
								>
									Request Consultation
									<LuArrowRight size={15} />
								</a>
							</div>
						</aside>
					</div>
				</div>
			</section>
		</div>
	);
}
