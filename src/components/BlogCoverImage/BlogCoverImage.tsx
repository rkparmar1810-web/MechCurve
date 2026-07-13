import { useState } from 'react';
import { LuNewspaper } from 'react-icons/lu';

type Props = {
	slug: string;
	title: string;
	/**
	 * 'card'  — listing grid thumbnail.
	 * 'hero'  — rounded, contained article header.
	 * 'full'  — full-bleed banner: no rounding or border, spans the viewport.
	 */
	variant?: 'card' | 'hero' | 'full';
};

const SHAPES: Record<NonNullable<Props['variant']>, string> = {
	card: 'aspect-[16/10] border-b border-slate-100',
	hero: 'aspect-[16/7] rounded-3xl border border-slate-200',
	full: 'aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3/1]',
};

/**
 * Loads /public/blog_images/<slug>.webp. Until that file exists it renders a
 * branded placeholder — drop the image in and it appears automatically, with no
 * code change.
 */
export default function BlogCoverImage({ slug, title, variant = 'card' }: Props) {
	const [ok, setOk] = useState(true);
	const shape = SHAPES[variant];
	const big = variant !== 'card';

	if (ok) {
		return (
			<div className={`relative overflow-hidden bg-slate-100 ${shape}`}>
				<img
					src={`/blog_images/${slug}.webp`}
					alt={title}
					className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
					loading="lazy"
					onError={() => setOk(false)}
				/>
				<div
					className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-transparent"
					aria-hidden="true"
				/>
			</div>
		);
	}

	return (
		<div
			className={`relative overflow-hidden bg-gradient-to-br from-amber-50/70 via-slate-50 to-white ${shape}`}
		>
			<div className="bg-grid-soft absolute inset-0 opacity-50" aria-hidden="true" />
			<div
				className="pointer-events-none absolute -right-10 -top-12 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(234,193,23,0.22),transparent_70%)] blur-2xl"
				aria-hidden="true"
			/>
			<div className="absolute inset-0 flex items-center justify-center">
				<span
					className={`inline-flex items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-600 shadow-sm ${
						big ? 'h-16 w-16' : 'h-12 w-12'
					}`}
				>
					<LuNewspaper size={big ? 28 : 20} />
				</span>
			</div>
		</div>
	);
}
