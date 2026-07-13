import { useEffect, useState } from 'react';
import {
	FaInstagram,
	FaLinkedinIn,
	FaTelegram,
	FaWhatsapp,
	FaXTwitter,
} from 'react-icons/fa6';
import { LuCheck, LuLink } from 'react-icons/lu';
import { SITE_URL } from '../../seo/site';
import {
	buildBlogShareMessage,
	buildBlogTweet,
	type BlogPost,
} from '../../data/blogContent';

type Props = {
	post: BlogPost;
	/** 'row' for the article footer, 'compact' for tight spaces. */
	variant?: 'row' | 'compact';
};

type ShareContext = {
	url: string;
	/** Headline + summary + link + hashtags — postable as-is. */
	message: string;
	/** Same, trimmed to fit X's 280-character limit. */
	tweet: string;
	post: BlogPost;
};

type ShareTarget = {
	id: string;
	label: string;
	icon: typeof FaWhatsapp;
	/** Brand colour, applied on hover. */
	color: string;
	href: (ctx: ShareContext) => string;
};

/**
 * Every target is prefilled with the post's headline and summary, not just the
 * link, so the user can publish without writing anything.
 *
 * Two networks cannot be prefilled through a plain URL:
 *   - LinkedIn's /sharing/share-offsite accepts a URL only and builds the card
 *     purely from the page's Open Graph tags. The feed composer below does accept
 *     text, and still attaches the article card from the link inside it.
 *   - Instagram has no web share endpoint at all → the caption is copied to the
 *     clipboard instead (handled separately below).
 */
const TARGETS: ShareTarget[] = [
	{
		id: 'whatsapp',
		label: 'Share on WhatsApp',
		icon: FaWhatsapp,
		color: '#25D366',
		href: ({ message }) => `https://wa.me/?text=${encodeURIComponent(message)}`,
	},
	{
		id: 'telegram',
		label: 'Share on Telegram',
		icon: FaTelegram,
		color: '#229ED9',
		// Telegram renders `url` as the preview card and `text` as the caption above
		// it, so the caption here deliberately omits the link.
		href: ({ url, post }) =>
			`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
				`${post.title}\n\n${post.socialCaption ?? post.excerpt}`,
			)}`,
	},
	{
		id: 'linkedin',
		label: 'Share on LinkedIn',
		icon: FaLinkedinIn,
		color: '#0A66C2',
		href: ({ message }) =>
			`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(message)}`,
	},
	{
		id: 'twitter',
		label: 'Share on X',
		icon: FaXTwitter,
		color: '#0f172a',
		href: ({ tweet }) => `https://x.com/intent/post?text=${encodeURIComponent(tweet)}`,
	},
];

export default function BlogShare({ post, variant = 'row' }: Props) {
	const [copied, setCopied] = useState<null | 'instagram' | 'link'>(null);

	const url = `${SITE_URL}/blog/${post.slug}`;
	const ctx: ShareContext = {
		url,
		post,
		message: buildBlogShareMessage(post, url),
		tweet: buildBlogTweet(post, url),
	};

	useEffect(() => {
		if (!copied) return;
		const timer = window.setTimeout(() => setCopied(null), 3200);
		return () => window.clearTimeout(timer);
	}, [copied]);

	const copy = async (source: 'instagram' | 'link') => {
		const payload = source === 'instagram' ? ctx.message : url;
		try {
			await navigator.clipboard.writeText(payload);
			setCopied(source);
		} catch {
			// Clipboard unavailable (insecure origin or permission denied) — open
			// Instagram anyway so the user can paste manually.
			if (source === 'instagram') {
				window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
			}
		}
	};

	const compact = variant === 'compact';
	const btn = `inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:text-white hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)] ${
		compact ? 'h-9 w-9' : 'h-11 w-11'
	}`;

	return (
		<div>
			<div className="flex flex-wrap items-center gap-3">
				{!compact && (
					<span className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-500">
						Share
					</span>
				)}

				<div className="flex flex-wrap items-center gap-2">
					{TARGETS.map((target) => {
						const Icon = target.icon;
						return (
							<a
								key={target.id}
								href={target.href(ctx)}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={target.label}
								title={target.label}
								className={btn}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = target.color;
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = '';
								}}
							>
								<Icon size={compact ? 15 : 17} />
							</a>
						);
					})}

					<button
						type="button"
						aria-label="Copy caption for Instagram"
						title="Copy caption for Instagram"
						className={btn}
						onClick={() => copy('instagram')}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = '#E1306C';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = '';
						}}
					>
						{copied === 'instagram' ? (
							<LuCheck size={compact ? 15 : 17} />
						) : (
							<FaInstagram size={compact ? 15 : 17} />
						)}
					</button>

					<button
						type="button"
						aria-label="Copy link"
						title="Copy link"
						className={btn}
						onClick={() => copy('link')}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = '#334155';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = '';
						}}
					>
						{copied === 'link' ? (
							<LuCheck size={compact ? 15 : 17} />
						) : (
							<LuLink size={compact ? 15 : 17} />
						)}
					</button>
				</div>
			</div>

			{copied && (
				<p role="status" className="mt-3 text-[13px] font-semibold text-emerald-700">
					{copied === 'instagram'
						? 'Caption copied — paste it straight into your Instagram post or story.'
						: 'Link copied.'}
				</p>
			)}
		</div>
	);
}
