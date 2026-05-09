import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Keep this list in sync with src/prerenderRoutes.ts (source-of-truth for app routes).
const ROUTES = [
	'/',
	'/about',
	'/services',
	'/portfolio',
	'/contact',
	'/testimonials',
	'/faq',
	'/terms-of-service',
	'/privacy-policy',
	'/projects/sheet-metal-housing-cover',
	'/projects/metro-electromagnetic-brake',
	'/projects/industrial-load-carrying-trolley',
	'/projects/parametric-combination-spanner',
];

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(
	path.resolve(distDir, 'prerender-routes.json'),
	JSON.stringify(ROUTES, null, 2),
	'utf8',
);

