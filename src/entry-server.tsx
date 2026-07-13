import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { getSeoForPath } from './seo/getSeoForPath';

export type RenderResult = {
	appHtml: string;
	head: {
		title: string;
		description: string;
		canonicalUrl: string;
		robots: string;
		ogImageUrl: string;
		ogUrl: string;
		ogType: string;
	};
};

export function render(url: string): RenderResult {
	const seo = getSeoForPath(url);

	const appHtml = renderToString(
		<StaticRouter location={url}>
			<App />
		</StaticRouter>,
	);

	return {
		appHtml,
		head: {
			title: seo.title,
			description: seo.description,
			canonicalUrl: seo.canonicalUrl,
			robots: seo.robots,
			ogImageUrl: seo.imageUrl,
			ogUrl: seo.canonicalUrl,
			ogType: seo.ogType,
		},
	};
}

