import { useEffect } from 'react';

import { SITE_URL } from '../seo/site';

const DEFAULT_IMAGE = `${SITE_URL}/logo.webp`;

interface SeoOptions {
	title: string;
	description: string;
	path: string;
	robots?: string;
	image?: string;
	/** 'article' for blog posts so shares preview as a story card. */
	type?: 'website' | 'article';
}

function toAbsoluteUrl(path: string) {
	return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

function upsertMeta(
	attribute: 'name' | 'property',
	key: string,
	content: string,
) {
	let el = document.head.querySelector(
		`meta[${attribute}="${key}"]`,
	) as HTMLMetaElement | null;
	if (!el) {
		el = document.createElement('meta');
		el.setAttribute(attribute, key);
		document.head.appendChild(el);
	}
	el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
	let el = document.head.querySelector(
		'link[rel="canonical"]',
	) as HTMLLinkElement | null;
	if (!el) {
		el = document.createElement('link');
		el.setAttribute('rel', 'canonical');
		document.head.appendChild(el);
	}
	el.setAttribute('href', href);
}

export default function useSeo({
	title,
	description,
	path,
	robots = 'index, follow',
	image,
	type = 'website',
}: SeoOptions) {
	useEffect(() => {
		const canonicalUrl = toAbsoluteUrl(path);
		const imageUrl = toAbsoluteUrl(image ?? DEFAULT_IMAGE);

		document.title = title;
		upsertMeta('name', 'description', description);
		upsertMeta('name', 'robots', robots);
		upsertCanonical(canonicalUrl);

		upsertMeta('property', 'og:title', title);
		upsertMeta('property', 'og:description', description);
		upsertMeta('property', 'og:type', type);
		upsertMeta('property', 'og:url', canonicalUrl);
		upsertMeta('property', 'og:site_name', 'MechCurve');
		upsertMeta('property', 'og:image', imageUrl);
		upsertMeta('property', 'og:image:alt', title);
		upsertMeta('property', 'og:image:width', '1200');
		upsertMeta('property', 'og:image:height', '630');

		upsertMeta('name', 'twitter:card', 'summary_large_image');
		upsertMeta('name', 'twitter:title', title);
		upsertMeta('name', 'twitter:description', description);
		upsertMeta('name', 'twitter:image', imageUrl);
	}, [title, description, path, robots, image, type]);
}
