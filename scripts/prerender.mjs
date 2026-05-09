import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');

function ensureDir(dirPath) {
	fs.mkdirSync(dirPath, { recursive: true });
}

function upsertMetaByName(html, name, content) {
	const re = new RegExp(
		`<meta\\s+name=[\"']${name}[\"']\\s+content=[\"'][^\"']*[\"']\\s*/?>`,
		'i',
	);
	const tag = `<meta name="${name}" content="${content}" />`;
	if (re.test(html)) return html.replace(re, tag);

	return html.replace('</head>', `\n\t\t${tag}\n\t</head>`);
}

function upsertMetaByProperty(html, property, content) {
	const re = new RegExp(
		`<meta\\s+property=[\"']${property}[\"']\\s+content=[\"'][^\"']*[\"']\\s*/?>`,
		'i',
	);
	const tag = `<meta property="${property}" content="${content}" />`;
	if (re.test(html)) return html.replace(re, tag);

	return html.replace('</head>', `\n\t\t${tag}\n\t</head>`);
}

function upsertCanonical(html, href) {
	const re = /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i;
	const tag = `<link rel="canonical" href="${href}" />`;
	if (re.test(html)) return html.replace(re, tag);
	return html.replace('</head>', `\n\t\t${tag}\n\t</head>`);
}

function setTitle(html, title) {
	const re = /<title>[\s\S]*?<\/title>/i;
	const tag = `<title>${title}</title>`;
	if (re.test(html)) return html.replace(re, tag);
	return html.replace('</head>', `\n\t\t${tag}\n\t</head>`);
}

function injectHead(html, head) {
	let out = html;
	out = setTitle(out, head.title);
	out = upsertMetaByName(out, 'description', head.description);
	out = upsertMetaByName(out, 'robots', head.robots);
	out = upsertCanonical(out, head.canonicalUrl);

	out = upsertMetaByProperty(out, 'og:title', head.title);
	out = upsertMetaByProperty(out, 'og:description', head.description);
	out = upsertMetaByProperty(out, 'og:type', 'website');
	out = upsertMetaByProperty(out, 'og:url', head.ogUrl);
	out = upsertMetaByProperty(out, 'og:image', head.ogImageUrl);

	out = upsertMetaByName(out, 'twitter:card', 'summary_large_image');
	out = upsertMetaByName(out, 'twitter:title', head.title);
	out = upsertMetaByName(out, 'twitter:description', head.description);
	out = upsertMetaByName(out, 'twitter:image', head.ogImageUrl);
	return out;
}

function routeToFilePath(route) {
	if (route === '/') return path.resolve(distDir, 'index.html');
	const clean = route.replace(/^\//, '').replace(/\/$/, '');
	return path.resolve(distDir, clean, 'index.html');
}

function loadRoutesFromManifest() {
	const manifestPath = path.resolve(distDir, 'prerender-routes.json');
	const raw = fs.readFileSync(manifestPath, 'utf8');
	const routes = JSON.parse(raw);
	if (!Array.isArray(routes)) throw new Error('prerender-routes.json must be an array');
	return routes;
}

async function main() {
	if (!fs.existsSync(templatePath)) {
		throw new Error('dist/index.html not found. Run the Vite build first.');
	}

	const serverEntry = path.resolve(distDir, 'server', 'entry-server.js');
	if (!fs.existsSync(serverEntry)) {
		throw new Error('dist/server/entry-server.js not found. Run the SSR build first.');
	}

	const { render } = await import(pathToFileURL(serverEntry));
	if (typeof render !== 'function') throw new Error('SSR bundle does not export render(url)');

	const routes = loadRoutesFromManifest();
	const template = fs.readFileSync(templatePath, 'utf8');

	for (const route of routes) {
		const { appHtml, head } = render(route);

		let html = template.replace(
			'<div id="root"></div>',
			`<div id="root">${appHtml}</div>`,
		);

		html = injectHead(html, head);

		const outPath = routeToFilePath(route);
		ensureDir(path.dirname(outPath));
		fs.writeFileSync(outPath, html, 'utf8');
	}

	// Keep SPA fallback for non-prerendered paths by restoring the original dist/index.html template.
	fs.writeFileSync(templatePath, template, 'utf8');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

