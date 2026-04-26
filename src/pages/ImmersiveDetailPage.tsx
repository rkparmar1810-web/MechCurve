import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
	getListPath,
	projectDetails,
	serviceDetails,
} from '../data/detailContent';
import useSeo from '../hooks/useSeo';
import useStructuredData from '../hooks/useStructuredData';
import styles from './ImmersiveDetailPage.module.scss';

const DynamicBackground = lazy(
	() => import('../components/DynamicBackground/DynamicBackground'),
);

interface Props {
	type: 'service' | 'project';
}

export default function ImmersiveDetailPage({ type }: Props) {
	const params = useParams();
	const slug = type === 'service' ? params.serviceId : params.projectId;

	const projectData =
		type === 'project' && slug ? projectDetails[slug] : undefined;
	const serviceData =
		type === 'service' && slug ? serviceDetails[slug] : undefined;
	const data = type === 'project' ? projectData : serviceData;

	const fallbackPath = type === 'service' ? '/services' : '/portfolio';

	useSeo({
		title: data
			? `${data.title} | MechCurve`
			: 'Detail Not Found | MechCurve',
		description: data
			? data.description
			: 'The requested page was not found. Explore MechCurve services and projects from the main pages.',
		path: slug
			? `/${type === 'service' ? 'services' : 'projects'}/${slug}`
			: fallbackPath,
		robots: data ? 'index, follow' : 'noindex, nofollow',
	});

	const siteUrl = 'https://design-maniach-aiew.vercel.app';
	const pagePath = slug
		? `/${type === 'service' ? 'services' : 'projects'}/${slug}`
		: fallbackPath;

	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: `${siteUrl}/`,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: type === 'service' ? 'Services' : 'Portfolio',
				item: `${siteUrl}${type === 'service' ? '/services' : '/portfolio'}`,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: data?.title ?? 'Detail not found',
				item: `${siteUrl}${pagePath}`,
			},
		],
	};

	const detailJsonLd = data
		? {
				'@context': 'https://schema.org',
				'@type': type === 'service' ? 'Service' : 'CreativeWork',
				name: data.title,
				description: data.description,
				url: `${siteUrl}${pagePath}`,
				image: projectData
					? [
							projectData.cardImage,
							projectData.heroImage,
							...projectData.gallery.map((item) => item.src),
						]
					: undefined,
				provider:
					type === 'service'
						? {
								'@type': 'Organization',
								name: 'MechCurve',
								url: siteUrl,
							}
						: undefined,
				keywords: [...data.tools, ...data.metrics].join(', '),
			}
		: {
				'@context': 'https://schema.org',
				'@type': 'WebPage',
				name: 'Detail Not Found',
				url: `${siteUrl}${pagePath}`,
			};

	useStructuredData('detail-breadcrumb', breadcrumbJsonLd);
	useStructuredData('detail-page', detailJsonLd);

	if (!data) {
		return (
			<section className={styles.notFoundPage}>
				<div className={styles.notFoundCard}>
					<h2>Detail not found</h2>
					<p>
						The requested page does not exist. Return to the homepage to browse
						the available sections.
					</p>
					<Link
						to="/"
						className={styles.notFoundBtn}
					>
						Back Home
					</Link>
				</div>
			</section>
		);
	}

	const backHref = getListPath(type);

	if (projectData) {
		return (
			<section className={styles.page}>
				{/* Blueprint grid SVG background (unique to detail page) */}
				<div className={styles.blueprintBg} aria-hidden="true">
					<svg width="100%" height="100%">
						<defs>
							<pattern
								id="bpGrid"
								x="0"
								y="0"
								width="60"
								height="60"
								patternUnits="userSpaceOnUse"
							>
								<path
									d="M60 0V60M0 60H60"
									stroke="#EAC117"
									strokeWidth="0.3"
									opacity="0.04"
								/>
								<path
									d="M30 0V60M0 30H60"
									stroke="#EAC117"
									strokeWidth="0.15"
									opacity="0.025"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#bpGrid)" />
					</svg>
				</div>

				{/* Ambient glow orbs */}
				<div className={styles.ambientOrbs} aria-hidden="true" />

				<div className={styles.shell}>
					{/* Hero panel */}
					<motion.div
						className={styles.heroPanel}
						initial={{ opacity: 0, y: 28 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.55,
							ease: [0.22, 1, 0.36, 1],
							delay: 0.05,
						}}
					>
						<div className={styles.heroGrid}>
							<div className={styles.heroCopy}>
								<span className={styles.categoryBadge}>
									{projectData.category}
								</span>
								<h1 className={styles.title}>
									{projectData.title}
								</h1>
								<p className={styles.tagline}>
									{projectData.tagline}
								</p>
								<p className={styles.description}>
									{projectData.description}
								</p>
								<div className={styles.highlights}>
									{projectData.highlights.map((item) => (
										<span
											key={item}
											className={styles.highlightPill}
										>
											{item}
										</span>
									))}
								</div>
							</div>

							<div className={styles.heroImageWrap}>
								<img
									src={projectData.heroImage}
									alt={projectData.title}
									className={styles.heroImage}
								/>
							</div>
						</div>
					</motion.div>

					{/* Metric strip */}
					<div className={styles.metricStrip}>
						{projectData.metrics.map((item, i) => (
							<motion.div
								key={item}
								className={styles.metricCard}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-30px 0px' }}
								transition={{
									duration: 0.45,
									ease: [0.22, 1, 0.36, 1],
									delay: i * 0.08,
								}}
							>
								<span>{item}</span>
							</motion.div>
						))}
					</div>

					{/* Content grid */}
					<div className={styles.contentGrid}>
						<div className={styles.mainCol}>
							{projectData.sections.map((section, i) => (
								<motion.article
									key={section.title}
									className={styles.storyCard}
									initial={{ opacity: 0, y: 22 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{
										once: true,
										margin: '-40px 0px',
									}}
									transition={{
										duration: 0.5,
										ease: [0.22, 1, 0.36, 1],
										delay: i * 0.06,
									}}
								>
									<h2>{section.title}</h2>
									<p>{section.body}</p>
									<ul>
										{section.bullets.map((bullet) => (
											<li key={bullet}>{bullet}</li>
										))}
									</ul>
								</motion.article>
							))}

							{/* Gallery */}
							<motion.section
								className={styles.gallerySection}
								initial={{ opacity: 0, y: 22 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-40px 0px' }}
								transition={{
									duration: 0.5,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								<div className={styles.sectionLabel}>
									<span>Project Visuals</span>
									<h2>
										Supporting images for this project
									</h2>
								</div>

								<div className={styles.galleryGrid}>
									{projectData.gallery.map((image) => (
										<figure
											key={image.src}
											className={styles.galleryCard}
										>
											<div
												className={
													styles.galleryImgWrap
												}
											>
												<img
													src={image.src}
													alt={image.alt}
												/>
											</div>
											<figcaption>
												{image.caption}
											</figcaption>
										</figure>
									))}
								</div>
							</motion.section>
						</div>

						<aside className={styles.sidebar}>
							<motion.div
								className={styles.sideCard}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.45,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								<img
									src={projectData.cardImage}
									alt={`${projectData.title} portfolio sheet`}
									className={styles.posterImage}
								/>
							</motion.div>

							<motion.div
								className={styles.sideCard}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.45,
									ease: [0.22, 1, 0.36, 1],
									delay: 0.06,
								}}
							>
								<div className={styles.sectionLabel}>
									<span>Key Features</span>
									<h2>Engineering focus</h2>
								</div>
								<ul className={styles.featureList}>
									{projectData.features.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
							</motion.div>

							<motion.div
								className={styles.sideCard}
								initial={{ opacity: 0, y: 18 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.45,
									ease: [0.22, 1, 0.36, 1],
									delay: 0.12,
								}}
							>
								<div className={styles.sectionLabel}>
									<span>Tools</span>
									<h2>Software and methods</h2>
								</div>
								<div className={styles.toolPills}>
									{projectData.tools.map((item) => (
										<span
											key={item}
											className={styles.toolPill}
										>
											{item}
										</span>
									))}
								</div>
							</motion.div>
						</aside>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className={styles.page}>
			<Suspense fallback={null}>
				<DynamicBackground variant={type} />
			</Suspense>

			<div className={styles.serviceOverlay} />

			<div className={styles.serviceShell}>
				<motion.div
					className={styles.servicePanel}
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
				>
					<div className={styles.serviceTopBar}>
						<div className={styles.serviceEyebrow}>
							<span>Service Detail</span>
							<span className={styles.dot} />
							<span>
								{serviceData?.features.length ?? 0} Features
							</span>
						</div>
						<Link to={backHref} className={styles.backBtn}>
							Back to List
						</Link>
					</div>

					<h1 className={styles.serviceTitle}>
						{serviceData?.title}
					</h1>
					<p className={styles.serviceDesc}>
						{serviceData?.description}
					</p>

					<div className={styles.serviceGrid}>
						<div className={styles.serviceMain}>
							<div className={styles.serviceCard}>
								<h3>Key Features</h3>
								<ul>
									{serviceData?.features.map((item) => (
										<li key={item}>
											<span
												className={styles.bulletBar}
											/>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>

							<div className={styles.serviceCard}>
								<h3>Overview</h3>
								<p>
									This service is structured around practical
									execution, measurable outcomes, and
									production-aligned decision making.
								</p>
							</div>
						</div>

						<aside className={styles.serviceAside}>
							<div className={styles.serviceCard}>
								<h3>Tools &amp; Technologies</h3>
								<div className={styles.toolPills}>
									{serviceData?.tools.map((item) => (
										<span
											key={item}
											className={styles.toolPill}
										>
											{item}
										</span>
									))}
								</div>
							</div>

							<div className={styles.serviceCard}>
								<h3>Key Metrics</h3>
								<div className={styles.toolPills}>
									{serviceData?.metrics.map((item) => (
										<span
											key={item}
											className={styles.toolPill}
										>
											{item}
										</span>
									))}
								</div>
							</div>
						</aside>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
