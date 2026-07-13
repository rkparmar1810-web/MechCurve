import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { LuCalendar, LuChevronRight, LuClock, LuUser } from 'react-icons/lu';
import { formatBlogDate, type BlogPost } from '../../data/blogContent';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-bleed article header: the cover photo is the background and the title
 * sits on it, magazine style. The photo parallaxes gently behind the text.
 *
 * If /blog_images/<slug>.webp is missing the photo silently falls back to the
 * brand gradient — the headline stays legible either way, because the scrim is
 * painted regardless of whether an image loaded.
 */
export default function BlogHero({ post }: { post: BlogPost }) {
	const [hasImage, setHasImage] = useState(true);
	const ref = useRef<HTMLElement>(null);
	const reduceMotion = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	});
	const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
	const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
	const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '32%']);
	const copyFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

	return (
		<section
			ref={ref}
			className="relative flex min-h-[68vh] items-end overflow-hidden bg-[#06080D] pb-12 pt-32 sm:min-h-[74vh] sm:pb-16 lg:min-h-[82vh] lg:pb-20"
			aria-label={post.title}
		>
			{/* Background photo */}
			<motion.div
				className="absolute inset-0 will-change-transform"
				style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
				aria-hidden="true"
			>
				{hasImage ? (
					<img
						src={`/blog_images/${post.slug}.webp`}
						alt=""
						className="h-full w-full object-cover"
						onError={() => setHasImage(false)}
					/>
				) : (
					<div className="h-full w-full bg-gradient-to-br from-slate-900 via-[#06080D] to-slate-950" />
				)}
			</motion.div>

			{/* Scrim: dark enough at the foot to carry white text over any photo,
			    clear at the top so the image still reads. */}
			<div
				className="absolute inset-0 bg-gradient-to-t from-[#06080D] via-[#06080D]/75 to-[#06080D]/35"
				aria-hidden="true"
			/>
			<div
				className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(234,193,23,0.16),transparent_55%)]"
				aria-hidden="true"
			/>

			{/* Copy */}
			<motion.div
				className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-12"
				style={reduceMotion ? undefined : { y: copyY, opacity: copyFade }}
			>
				<motion.nav
					className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-slate-400"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: EASE }}
					aria-label="Breadcrumb"
				>
					<Link to="/" className="transition-colors hover:text-[#EAC117]">
						Home
					</Link>
					<LuChevronRight size={14} className="text-slate-600" />
					<Link to="/blog" className="transition-colors hover:text-[#EAC117]">
						Blog
					</Link>
					<LuChevronRight size={14} className="text-slate-600" />
					<span className="text-slate-300">{post.category}</span>
				</motion.nav>

				<motion.div
					className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#EAC117]/40 bg-[#EAC117]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#EAC117] backdrop-blur"
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
				>
					<span className="h-1.5 w-1.5 rounded-full bg-[#EAC117]" />
					{post.category}
				</motion.div>

				<motion.h1
					className="mt-5 text-[1.75rem] font-extrabold leading-[1.25] tracking-[-0.01em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] [text-wrap:pretty] sm:text-[2.1rem] md:text-[2.5rem] lg:text-[3.1rem] xl:text-[3.5rem]"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
				>
					{post.title}
				</motion.h1>

				<motion.p
					className="mt-5 max-w-[62ch] text-[15px] leading-8 text-slate-300 md:text-base"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
				>
					{post.excerpt}
				</motion.p>

				<motion.div
					className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-slate-400"
					initial={{ opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
				>
					<span className="inline-flex items-center gap-1.5">
						<LuUser size={14} className="text-[#EAC117]" />
						{post.author}
					</span>
					<span className="inline-flex items-center gap-1.5">
						<LuCalendar size={14} className="text-[#EAC117]" />
						<time dateTime={post.date}>{formatBlogDate(post.date)}</time>
					</span>
					<span className="inline-flex items-center gap-1.5">
						<LuClock size={14} className="text-[#EAC117]" />
						{post.readTime}
					</span>
				</motion.div>
			</motion.div>
		</section>
	);
}
