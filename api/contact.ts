/**
 * Server-side proxy for the contact form.
 *
 * The browser posts here (same origin) instead of straight to
 * script.google.com, which is blocked on some national/corporate networks —
 * visitors there previously had their enquiry fail silently. Forwarding
 * server-side also keeps the Apps Script URL out of the client bundle.
 */

const APPS_SCRIPT_URL =
	process.env.APPS_SCRIPT_URL ??
	'https://script.google.com/macros/s/AKfycbx2Ha2VpdCafpVArHcwhUtsrq3uudi-iIrM6JguEGCXyF3pFexdfNyn73kwBBSCdFqd4Q/exec';

const TIMEOUT_MS = 15000;

interface Req {
	method?: string;
	body?: unknown;
}

interface Res {
	status: (code: number) => Res;
	json: (body: unknown) => void;
	setHeader: (key: string, value: string) => void;
}

interface Enquiry {
	name: string;
	email: string;
	phone: string;
	service: string;
	message: string;
}

const asString = (value: unknown): string =>
	typeof value === 'string' ? value.trim() : '';

/** Mirrors the client-side checks so a direct POST can't skip them. */
function parseEnquiry(raw: unknown): Enquiry | null {
	if (typeof raw !== 'object' || raw === null) return null;
	const input = raw as Record<string, unknown>;

	const enquiry: Enquiry = {
		name: asString(input.name),
		email: asString(input.email),
		phone: asString(input.phone),
		service: asString(input.service),
		message: asString(input.message),
	};

	if (!enquiry.name) return null;
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) return null;
	if (!enquiry.service) return null;
	if (enquiry.message.length < 10) return null;

	// Cap field sizes so an oversized payload can't be relayed onward.
	if (
		enquiry.name.length > 200 ||
		enquiry.email.length > 200 ||
		enquiry.phone.length > 50 ||
		enquiry.service.length > 200 ||
		enquiry.message.length > 5000
	) {
		return null;
	}

	return enquiry;
}

export default async function handler(req: Req, res: Res) {
	res.setHeader('Cache-Control', 'no-store');

	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST');
		res.status(405).json({ success: false, error: 'Method not allowed' });
		return;
	}

	// Vercel parses JSON bodies; tolerate a raw string just in case.
	let raw = req.body;
	if (typeof raw === 'string') {
		try {
			raw = JSON.parse(raw);
		} catch {
			res.status(400).json({ success: false, error: 'Invalid request' });
			return;
		}
	}

	const enquiry = parseEnquiry(raw);
	if (!enquiry) {
		res.status(400).json({ success: false, error: 'Invalid request' });
		return;
	}

	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

	try {
		const upstream = await fetch(APPS_SCRIPT_URL, {
			method: 'POST',
			body: JSON.stringify(enquiry),
			headers: { 'Content-Type': 'text/plain' },
			redirect: 'follow',
			signal: controller.signal,
		});

		if (!upstream.ok) {
			console.error('Apps Script responded %d', upstream.status);
			res.status(502).json({ success: false, error: 'Delivery failed' });
			return;
		}

		// Apps Script usually returns JSON, but can return HTML after a
		// redirect. A 2xx without an explicit failure flag counts as sent.
		const text = await upstream.text();
		try {
			const parsed = JSON.parse(text);
			if (parsed?.success === false) {
				console.error('Apps Script reported failure: %s', text.slice(0, 200));
				res.status(502).json({ success: false, error: 'Delivery failed' });
				return;
			}
		} catch {
			// Not JSON — treat the 2xx as success.
		}

		res.status(200).json({ success: true });
	} catch (err) {
		const aborted = err instanceof Error && err.name === 'AbortError';
		console.error('Contact proxy error:', err);
		res
			.status(aborted ? 504 : 502)
			.json({ success: false, error: 'Delivery failed' });
	} finally {
		clearTimeout(timer);
	}
}
