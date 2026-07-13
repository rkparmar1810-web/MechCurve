/**
 * Generates the social share card (Open Graph image) for every blog post.
 *
 *   npm run blog:og
 *
 * Output: public/blog_og/<slug>.jpg at 1200x630 — the size WhatsApp, LinkedIn,
 * Telegram, and X expect. JPEG, not WebP: WhatsApp's link preview does not
 * reliably render WebP.
 *
 * If public/blog_images/<slug>.webp exists it is used as the card background
 * (darkened so the text stays legible). Otherwise the card falls back to the
 * brand gradient. Re-run this after adding or editing a post; commit the output.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const outDir = path.resolve(publicDir, 'blog_og');
const coversDir = path.resolve(publicDir, 'blog_images');

const WIDTH = 1200;
const HEIGHT = 630;

function escapeXml(value) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

/** Greedy wrap by character budget — good enough for a fixed-width card. */
function wrapTitle(title, maxChars, maxLines) {
	const words = title.split(/\s+/);
	const lines = [];
	let line = '';

	for (const word of words) {
		const candidate = line ? `${line} ${word}` : word;
		if (candidate.length > maxChars && line) {
			lines.push(line);
			line = word;
			if (lines.length === maxLines) break;
		} else {
			line = candidate;
		}
	}
	if (lines.length < maxLines && line) lines.push(line);

	if (lines.length === maxLines) {
		const consumed = lines.join(' ').split(/\s+/).length;
		if (consumed < words.length) {
			lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:]$/, '')}…`;
		}
	}
	return lines;
}

function formatDate(iso) {
	return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

function buildSvg(post, hasCover) {
	const titleLines = wrapTitle(post.title, 30, 3);
	const titleSize = titleLines.length >= 3 ? 62 : 70;
	const titleTop = 250;

	const meta = `${formatDate(post.date)}  ·  ${post.readTime}`;

	// With a photo behind it the card needs a heavier scrim; without one it uses
	// the brand gradient plus an amber glow.
	const backdrop = hasCover
		? `<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#scrim)" />`
		: `<rect width="${WIDTH}" height="${HEIGHT}" fill="#06080D" />
		   <circle cx="1090" cy="80" r="320" fill="url(#glow)" />
		   <circle cx="80" cy="600" r="260" fill="url(#glowBlue)" />`;

	return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="#06080D" stop-opacity="0.96" />
      <stop offset="55%" stop-color="#06080D" stop-opacity="0.86" />
      <stop offset="100%" stop-color="#06080D" stop-opacity="0.72" />
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0%" stop-color="#EAC117" stop-opacity="0.30" />
      <stop offset="100%" stop-color="#EAC117" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowBlue">
      <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.20" />
      <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EAC117" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
  </defs>

  ${backdrop}

  <!-- left accent bar -->
  <rect x="80" y="${titleTop - 118}" width="6" height="${titleLines.length * (titleSize + 14) + 84}" rx="3" fill="url(#accent)" />

  <!-- brand -->
  <text x="110" y="96" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="30" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">MechCurve</text>
  <text x="110" y="126" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="15" font-weight="700" fill="#94A3B8" letter-spacing="3">ENGINEERING SOLUTIONS</text>

  <!-- category -->
  <text x="110" y="${titleTop - 78}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#EAC117" letter-spacing="3">${escapeXml(post.category.toUpperCase())}</text>

  <!-- title -->
  ${titleLines
		.map(
			(line, i) =>
				`<text x="110" y="${titleTop + i * (titleSize + 14)}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="${titleSize}" font-weight="800" fill="#FFFFFF">${escapeXml(line)}</text>`,
		)
		.join('\n  ')}

  <!-- meta -->
  <text x="110" y="${titleTop + titleLines.length * (titleSize + 14) + 34}" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="#94A3B8">${escapeXml(meta)}</text>

  <!-- footer -->
  <rect x="110" y="540" width="${WIDTH - 220}" height="1" fill="#FFFFFF" opacity="0.12" />
  <text x="110" y="582" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#E2E8F0">mechcurve.com</text>
  <text x="${WIDTH - 110}" y="582" text-anchor="end" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#EAC117">Read the article →</text>
</svg>`);
}

async function main() {
	const server = await createServer({
		configFile: false,
		root: rootDir,
		logLevel: 'error',
		server: { middlewareMode: true },
		appType: 'custom',
	});

	let posts;
	try {
		const mod = await server.ssrLoadModule('/src/data/blogContent.ts');
		posts = mod.blogPosts;
	} finally {
		await server.close();
	}

	fs.mkdirSync(outDir, { recursive: true });

	for (const post of posts) {
		const coverPath = path.resolve(coversDir, `${post.slug}.webp`);
		const hasCover = fs.existsSync(coverPath);

		const base = hasCover
			? sharp(coverPath).resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
			: sharp({
					create: {
						width: WIDTH,
						height: HEIGHT,
						channels: 3,
						background: '#06080D',
					},
				});

		const outPath = path.resolve(outDir, `${post.slug}.jpg`);
		await base
			.composite([{ input: buildSvg(post, hasCover), top: 0, left: 0 }])
			.jpeg({ quality: 88, progressive: true })
			.toFile(outPath);

		console.log(
			`og: blog_og/${post.slug}.jpg${hasCover ? ' (from cover photo)' : ' (brand gradient)'}`,
		);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
