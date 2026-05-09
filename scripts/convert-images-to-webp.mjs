import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

const exts = new Set(['.png', '.jpg', '.jpeg', '.gif']);

async function convertFile(absPath) {
	const ext = path.extname(absPath).toLowerCase();
	if (!exts.has(ext)) return;

	const outPath = absPath.slice(0, -ext.length) + '.webp';
	await sharp(absPath).webp({ quality: 86, effort: 4 }).toFile(outPath);
	fs.unlinkSync(absPath);
	console.log('webp:', path.relative(publicDir, outPath));
}

async function walk(dir) {
	const names = fs.readdirSync(dir, { withFileTypes: true });
	for (const ent of names) {
		const full = path.join(dir, ent.name);
		if (ent.isDirectory()) {
			await walk(full);
		} else if (ent.isFile()) {
			const ext = path.extname(ent.name).toLowerCase();
			if (exts.has(ext)) {
				await convertFile(full);
			}
		}
	}
}

async function main() {
	if (!fs.existsSync(publicDir)) {
		console.error('public/ not found');
		process.exit(1);
	}
	await walk(publicDir);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
