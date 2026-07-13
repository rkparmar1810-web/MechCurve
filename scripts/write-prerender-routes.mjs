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
	'/services/product-development',
	'/services/industrial-design',
	'/services/electro-mechanical-integration',
	'/services/embedded-systems',
	'/services/reverse-engineering',
	'/services/3d-cad-modeling',
	'/services/sheet-metal-design',
	'/services/drafting-documentation',
	'/services/product-analysis',
	'/services/design-validation',
	'/services/cae-cfd',
	'/services/thermal-analysis',
	'/services/fdm',
	'/services/sla',
	'/services/slm',
	'/career',
	'/contact',
	'/blog',
	'/blog/design-for-manufacturing-checklist',
	'/blog/fdm-sla-slm-choosing-3d-printing-process',
	'/blog/reverse-engineering-legacy-parts',
	'/faq',
	'/terms-of-service',
	'/privacy-policy',
];

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(
	path.resolve(distDir, 'prerender-routes.json'),
	JSON.stringify(ROUTES, null, 2),
	'utf8',
);

