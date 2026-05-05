import { useEffect } from 'react';

const SITE_URL = 'https://mechcurve.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

interface SeoOptions {
	title: string;
	description: string;
	path: string;
	robots?: string;
	image?: string;
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
		upsertMeta('property', 'og:type', 'website');
		upsertMeta('property', 'og:url', canonicalUrl);
		upsertMeta('property', 'og:image', imageUrl);

		upsertMeta('name', 'twitter:card', 'summary_large_image');
		upsertMeta('name', 'twitter:title', title);
		upsertMeta('name', 'twitter:description', description);
		upsertMeta('name', 'twitter:image', imageUrl);
	}, [title, description, path, robots, image]);
}
