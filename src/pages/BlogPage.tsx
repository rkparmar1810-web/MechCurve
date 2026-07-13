import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuArrowUpRight, LuCalendar, LuClock } from 'react-icons/lu';
import useSeo from '../hooks/useSeo';
import FadeIn from '../components/FadeIn/FadeIn';
import BlogCoverImage from '../components/BlogCoverImage/BlogCoverImage';
import { blogPosts, formatBlogDate } from '../data/blogContent';

const EASE = [0.22, 1, 0.36, 1] as const;
const ALL = 'All';

export default function BlogPage() {
	useSeo({
		title: 'Blog | Engineering Insights from MechCurve',
		description:
			'Practical articles on design for manufacturing, rapid prototyping, reverse engineering, and CAD workflows from the MechCurve engineering team.',
		path: '/blog',
	});

	const categories = useMemo(
		() => [ALL, ...Array.from(new Set(blogPosts.map((post) => post.category)))],
		[],
	);
	const [activeCategory, setActiveCategory] = useState(ALL);

	const visiblePosts =
		activeCategory === ALL
			? blogPosts
			: blogPosts.filter((post) => post.category === activeCategory);

	return (
		<div className="site-light-content">
			{/* ── Hero ── */}
			<section
				className="relative overflow-hidden px-5 pb-10 pt-28 sm:px-8 md:px-12 lg:pt-32"
				aria-label="Blog"
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
						Engineering Insights
					</motion.div>

					<motion.h1
						className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl lg:text-[2.9rem]"
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
					>
						Notes From the Design Desk
					</motion.h1>

					<motion.p
						className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-700 md:text-base"
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
					>
						Practical writing on design for manufacturing, prototyping, reverse
						engineering, and the CAD workflows we use day to day — written by the
						engineers doing the work, not a marketing team.
					</motion.p>

					{/* Category filter */}
					<motion.div
						className="mt-7 flex flex-wrap gap-2.5"
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
					>
						{categories.map((category) => {
							const active = category === activeCategory;
							return (
								<button
									key={category}
									type="button"
									onClick={() => setActiveCategory(category)}
									className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-300 ${
										active
											? 'border-amber-300 bg-amber-50 text-amber-700'
											: 'border-slate-200 bg-white/70 text-slate-600 backdrop-blur hover:border-amber-300 hover:text-amber-700'
									}`}
								>
									{category}
								</button>
							);
						})}
					</motion.div>
				</div>
			</section>

			{/* ── Post grid ── */}
			<section className="px-5 pb-20 pt-6 sm:px-8 md:px-12" aria-label="Articles">
				<div className="mx-auto max-w-[1180px]">
					<FadeIn>
						<p className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-500">
							{visiblePosts.length}{' '}
							{visiblePosts.length === 1 ? 'article' : 'articles'}
							{activeCategory !== ALL ? ` in ${activeCategory}` : ''}
						</p>
					</FadeIn>

					<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{visiblePosts.map((post, index) => (
							<FadeIn key={post.slug} delay={index * 0.08}>
								<article className="group h-full">
									<Link
										to={`/blog/${post.slug}`}
										className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_26px_60px_rgba(15,23,42,0.1)]"
									>
										<BlogCoverImage slug={post.slug} title={post.title} />

										<div className="flex flex-1 flex-col p-5 md:p-6">
											<span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700">
												{post.category}
											</span>

											<h2 className="mt-3 text-lg font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-amber-700">
												{post.title}
											</h2>

											<p className="mt-2.5 flex-1 text-[14px] leading-7 text-slate-600">
												{post.excerpt}
											</p>

											<div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
												<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium text-slate-500">
													<span className="inline-flex items-center gap-1.5">
														<LuCalendar size={13} />
														{formatBlogDate(post.date)}
													</span>
													<span className="inline-flex items-center gap-1.5">
														<LuClock size={13} />
														{post.readTime}
													</span>
												</div>
												<LuArrowUpRight
													size={17}
													className="shrink-0 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-600"
												/>
											</div>
										</div>
									</Link>
								</article>
							</FadeIn>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
