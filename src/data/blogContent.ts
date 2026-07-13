/**
 * Blog content source-of-truth.
 *
 * To publish a new post:
 *   1. Append an object to `blogPosts` below (newest first — the listing and the
 *      "related posts" rail both read this array in order).
 *   2. Drop a cover image at /public/blog_images/<slug>.webp. Optional: a
 *      placeholder renders until the file exists.
 *   3. Add `/blog/<slug>` to src/prerenderRoutes.ts, scripts/write-prerender-routes.mjs,
 *      and public/sitemap.xml so the post is prerendered and indexed.
 *
 * The body is a block list rather than raw HTML so posts stay safe to render and
 * pick up the site's typography automatically.
 */

export type BlogBlock =
	| { type: 'heading'; text: string }
	| { type: 'paragraph'; text: string }
	| { type: 'list'; items: string[] }
	| { type: 'quote'; text: string };

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	category: string;
	author: string;
	/** ISO date (YYYY-MM-DD) — used for display and for the article schema. */
	date: string;
	readTime: string;
	tags: string[];
	/**
	 * Ready-to-post caption used when the post is shared to social media. Written
	 * as a hook so the user can post it without editing. Falls back to `excerpt`
	 * when omitted.
	 */
	socialCaption?: string;
	content: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
	{
		slug: 'design-for-manufacturing-checklist',
		title: 'Design for Manufacturing: A Practical Checklist Before You Release a Part',
		excerpt:
			'Most cost overruns are locked in long before a part reaches the shop floor. Here is the DFM review we run on every model before it leaves our desk.',
		category: 'Design Engineering',
		author: 'MechCurve Engineering Team',
		date: '2026-06-24',
		readTime: '6 min read',
		tags: ['DFM', 'CAD', 'Manufacturing'],
		socialCaption:
			'Roughly 70% of a part\'s final cost is locked in at the design stage — long before it reaches the shop floor.\n\nWe wrote up the Design for Manufacturing review we run on every model before release: questioning tight tolerances, cutting machine setups, designing around standard tooling, and keeping walls uniform.\n\nIt is deliberately boring, because most manufacturing problems are not exotic — they are the same handful of oversights repeating across projects.',
		content: [
			{
				type: 'paragraph',
				text: 'A part can be geometrically perfect and still be expensive to make. By the time a model reaches production, roughly 70% of its final cost is already committed by design decisions — material, tolerances, feature geometry, and the number of setups a machinist needs. Design for Manufacturing (DFM) is the discipline of making those decisions deliberately rather than discovering them in a quotation.',
			},
			{
				type: 'paragraph',
				text: 'The checklist below is the review we run on every model before it leaves our desk. It is deliberately boring: most manufacturing problems are not exotic, they are the same handful of oversights repeating across projects.',
			},
			{ type: 'heading', text: '1. Question every tight tolerance' },
			{
				type: 'paragraph',
				text: 'Tolerance is the single most expensive line item a designer controls. Tightening a dimension from ±0.1 mm to ±0.01 mm can multiply the cost of a feature several times over, because it changes the process, the tooling, and the inspection required. Every tight tolerance on a drawing should be traceable to a functional requirement — a bearing fit, a seal, a mating interface. If nobody can name the requirement, it does not belong there.',
			},
			{ type: 'heading', text: '2. Reduce the number of setups' },
			{
				type: 'paragraph',
				text: 'Each time a part must be unclamped, rotated, and re-fixtured, you pay for machine time and you introduce a new stack of positional error. Features that can be reached from a single direction are cheaper and more accurate than features scattered across five faces. When you place a hole on the far side of a part, ask whether it has earned the extra setup.',
			},
			{ type: 'heading', text: '3. Design around standard tooling' },
			{
				type: 'paragraph',
				text: 'Internal corners must have a radius, because the end mill cutting them is round. Specifying a sharp internal corner forces either EDM or a custom tool, both of which are avoidable costs. As a rule of thumb, use the largest corner radius the design will tolerate, and keep pocket depths within about four times the tool diameter so a standard-length cutter can reach the floor without chatter.',
			},
			{ type: 'heading', text: '4. Keep wall thickness uniform' },
			{
				type: 'paragraph',
				text: 'This matters most in moulding and casting, where thick sections cool more slowly than thin ones. The result is sink marks, internal voids, and warping. Where a thick section is structurally necessary, core it out and add ribs rather than leaving a solid mass of material.',
			},
			{ type: 'heading', text: '5. Confirm the part can actually be assembled' },
			{
				type: 'paragraph',
				text: 'A model that mates perfectly in CAD can be impossible to build by hand. Check that a fastener has clearance for a driver, that a technician can physically reach a screw, and that the sequence of assembly does not require a part to pass through another one.',
			},
			{ type: 'heading', text: 'The review, in short' },
			{
				type: 'list',
				items: [
					'Every tight tolerance maps to a stated functional requirement',
					'Features are grouped to minimise machine setups',
					'Internal corners carry a radius suited to standard tooling',
					'Pocket depth stays within roughly 4× the tool diameter',
					'Wall thickness is uniform; thick sections are cored and ribbed',
					'Fasteners have tool clearance and a viable assembly sequence',
					'Material and finish are specified, not assumed',
					'Drawings carry GD&T where fit and function depend on it',
				],
			},
			{
				type: 'quote',
				text: 'The cheapest design change is the one made in CAD. The most expensive is the one made after the tool is cut.',
			},
			{
				type: 'paragraph',
				text: 'None of this requires exotic software. It requires a designer who has spoken to a machinist. If you are unsure whether a design is production-ready, a DFM review before release is a fraction of the cost of a tooling revision after it.',
			},
		],
	},
	{
		slug: 'fdm-sla-slm-choosing-3d-printing-process',
		title: 'FDM, SLA, or SLM: Choosing the Right 3D Printing Process',
		excerpt:
			'Three processes, three very different jobs. A straightforward guide to picking the one that matches your prototype — and knowing when printing is the wrong answer entirely.',
		category: 'Rapid Prototyping',
		author: 'MechCurve Engineering Team',
		date: '2026-05-18',
		readTime: '7 min read',
		tags: ['3D Printing', 'Prototyping', 'Additive Manufacturing'],
		socialCaption:
			'"Can you 3D print it?" is the easy question. The useful one is: which process?\n\nFDM, SLA, and SLM are not three grades of the same thing. They use different physics, produce parts with different properties, and cost amounts that differ by an order of magnitude.\n\nOur guide to picking the right one — and to knowing when 3D printing is the wrong answer entirely.',
		content: [
			{
				type: 'paragraph',
				text: '"Can you 3D print it?" is the easy question. The useful one is which process, because FDM, SLA, and SLM are not three grades of the same thing. They use different physics, produce parts with different properties, and cost amounts that differ by an order of magnitude. Choosing badly means either paying for precision you do not need or building a prototype that cannot survive the test you intended for it.',
			},
			{ type: 'heading', text: 'FDM — the workhorse' },
			{
				type: 'paragraph',
				text: 'Fused Deposition Modelling extrudes a thermoplastic filament layer by layer. It is the cheapest and fastest of the three, it runs in engineering-grade materials such as ABS, PETG, and nylon, and it is entirely adequate for the job most prototypes actually do: checking that a shape is the right shape.',
			},
			{
				type: 'paragraph',
				text: 'Its weakness is anisotropy. An FDM part is strong within a layer and comparatively weak between layers, so it can fail along the build direction under a load it would otherwise carry easily. Surface finish shows visible layer lines, and fine features tend to blur at the scale of the nozzle.',
			},
			{
				type: 'paragraph',
				text: 'Use FDM for form and fit checks, ergonomic mock-ups, jigs and fixtures, and any iteration where you expect to reprint tomorrow.',
			},
			{ type: 'heading', text: 'SLA — the detail specialist' },
			{
				type: 'paragraph',
				text: 'Stereolithography cures liquid photopolymer resin with a laser. The resolution is dramatically finer than FDM, the surface comes off the printer smooth enough to paint with minimal preparation, and the part is isotropic — it has no weak layer axis.',
			},
			{
				type: 'paragraph',
				text: 'The trade-off is the material itself. Standard resins are brittle relative to thermoplastics, and most degrade under sustained UV exposure, which makes them a poor choice for a part that must live outdoors or take repeated impact. Printing is also messier: parts need washing and post-cure.',
			},
			{
				type: 'paragraph',
				text: 'Use SLA when appearance or fine detail is the point — presentation models, housings with crisp features, master patterns for casting, and small intricate geometry that FDM would smear.',
			},
			{ type: 'heading', text: 'SLM — the production-grade option' },
			{
				type: 'paragraph',
				text: 'Selective Laser Melting fully melts fine metal powder — titanium, aluminium, stainless, Inconel — into a dense metal part. The output is not a prototype pretending to be metal; it is metal, with mechanical properties approaching wrought material.',
			},
			{
				type: 'paragraph',
				text: 'It is also the most expensive and the slowest, it demands careful support strategy and stress relief, and the parts usually need machining on critical faces. That cost only makes sense when the geometry could not be manufactured any other way, or when the part must genuinely perform.',
			},
			{
				type: 'paragraph',
				text: 'Use SLM for functional metal prototypes, lightweight lattice or topology-optimised structures, conformal cooling channels, and low-volume end-use parts in aerospace, medical, and motorsport.',
			},
			{ type: 'heading', text: 'Picking, in one pass' },
			{
				type: 'list',
				items: [
					'Checking that a shape fits and feels right → FDM',
					'Iterating daily on a design that is still moving → FDM',
					'Showing a client something that looks like the product → SLA',
					'Fine features, smooth surfaces, casting masters → SLA',
					'A part that must carry real load, in real metal → SLM',
					'Geometry that is impossible to machine or mould → SLM',
				],
			},
			{ type: 'heading', text: 'When printing is the wrong answer' },
			{
				type: 'paragraph',
				text: 'Additive manufacturing stops being the economical choice once volume rises. If you need a few hundred identical plastic parts, injection moulding will almost certainly beat printing on unit cost, even after tooling. If you need a simple metal bracket in quantity, laser cutting and bending is faster and cheaper than melting powder. Printing wins on complexity and on low volume — not on repetition.',
			},
			{
				type: 'quote',
				text: 'Print the part you need to learn from. Manufacture the part you need to sell.',
			},
		],
	},
	{
		slug: 'reverse-engineering-legacy-parts',
		title: 'Reverse Engineering a Legacy Part When the Drawings Are Gone',
		excerpt:
			'A supplier disappears, the original drawings never existed, and the machine is still running. Here is how a physical component becomes a manufacturable CAD model.',
		category: 'Reverse Engineering',
		author: 'MechCurve Engineering Team',
		date: '2026-04-09',
		readTime: '6 min read',
		tags: ['Reverse Engineering', '3D Scanning', 'Legacy Parts'],
		socialCaption:
			'The supplier has closed, the drawings never existed, and the machine is still running. The part must be reproduced from the only reference available: the part itself.\n\nThe hard step is not scanning it. It is telling engineering intent apart from thirty years of wear — recognising that a measured 24.94 mm was always meant to be 25 mm.\n\nHow a legacy component becomes a clean, manufacturable CAD model.',
		content: [
			{
				type: 'paragraph',
				text: 'It is a common situation in plants that have been running for decades. A component fails, the supplier who made it has closed or moved on, and nobody can find a drawing — often because one was never produced. The machine is still in service, and the part must be reproduced from the only reference that exists: the part itself.',
			},
			{
				type: 'paragraph',
				text: 'Reverse engineering is the process of turning that physical object back into engineering intent. Done carelessly it produces a model that copies the wear on a worn part. Done properly it produces something better than the original: a parametric model you can manufacture, modify, and improve.',
			},
			{ type: 'heading', text: 'Step 1 — Capture the geometry' },
			{
				type: 'paragraph',
				text: 'For a simple prismatic part, calipers, micrometers, and a height gauge are entirely sufficient, and often more accurate than a scan. For organic or freeform surfaces — a turbine blade, a cast housing, an ergonomic handle — 3D scanning is the practical route. The scan produces a point cloud, which becomes a mesh: a dense, accurate record of the surface as it exists today.',
			},
			{ type: 'heading', text: 'Step 2 — Separate intent from artefact' },
			{
				type: 'paragraph',
				text: 'This is the step that separates a good reverse engineering job from a bad one, and it cannot be automated. A scanned mesh faithfully records everything about the part, including things that were never intended: wear on a bearing surface, a burr, a casting defect, corrosion, a repair somebody made with a file fifteen years ago.',
			},
			{
				type: 'paragraph',
				text: 'The engineer\'s job is to look at a measured diameter of 24.94 mm and recognise the designer meant 25 mm. A hole that scans at 6.05 mm was drilled with a 6 mm bit. A face that scans slightly convex was meant to be flat. Copying the mesh exactly reproduces the defects; interpreting it recovers the design.',
			},
			{
				type: 'quote',
				text: 'A scan tells you what the part became. Engineering judgement tells you what it was meant to be.',
			},
			{ type: 'heading', text: 'Step 3 — Rebuild it parametrically' },
			{
				type: 'paragraph',
				text: 'The mesh is then used as a reference to build a clean, feature-based CAD model — sketches, extrusions, revolves, fillets, with a proper feature tree. The result is a model that can be edited. If a boss needs to move 2 mm, you change a dimension rather than re-sculpting a mesh. This is what makes the deliverable an asset rather than a snapshot.',
			},
			{ type: 'heading', text: 'Step 4 — Validate against the original' },
			{
				type: 'paragraph',
				text: 'The rebuilt model is compared back against the scan data as a deviation map, which shows where the clean model departs from the physical part and by how much. Small, deliberate deviations are expected — you have removed wear and restored nominal dimensions. Large or unexplained ones mean a feature has been misread and must be revisited.',
			},
			{ type: 'heading', text: 'Step 5 — Document it properly' },
			{
				type: 'paragraph',
				text: 'Finally the part gets what it never had: a full drawing with dimensions, tolerances, GD&T where fit matters, material specification, and surface finish. Where the original material is unknown, it is either tested or inferred from the application. The output is a package any competent shop can quote from and manufacture.',
			},
			{ type: 'heading', text: 'What you should expect to receive' },
			{
				type: 'list',
				items: [
					'A clean, parametric 3D CAD model with an editable feature tree',
					'Manufacturing drawings with tolerances and GD&T',
					'A deviation report comparing the model to the scanned part',
					'Material and surface finish specification',
					'Neutral exchange formats (STEP / IGES) for any downstream vendor',
				],
			},
			{
				type: 'paragraph',
				text: 'The point of the exercise is not merely to replace one broken component. It is to stop being dependent on a part nobody has the drawings for — so that the next time it fails, it is a purchase order rather than a project.',
			},
		],
	},
];

export const blogPostsBySlug: Record<string, BlogPost> = Object.fromEntries(
	blogPosts.map((post) => [post.slug, post]),
);

/** "#DesignForManufacturing #CAD" — tags as postable hashtags. */
export function blogHashtags(post: BlogPost) {
	return post.tags
		.map((tag) => `#${tag.replace(/[^a-zA-Z0-9]/g, '')}`)
		.join(' ');
}

/**
 * The full caption a user posts to WhatsApp / Telegram / LinkedIn / Instagram:
 * headline, summary, link, hashtags. Written so it can be posted as-is.
 */
export function buildBlogShareMessage(post: BlogPost, url: string) {
	const summary = post.socialCaption ?? post.excerpt;
	return `${post.title}\n\n${summary}\n\nRead the full article: ${url}\n\n${blogHashtags(post)}`;
}

/**
 * X caps posts at 280 characters and counts every URL as 23, so the long caption
 * will not fit. Trim the summary to whatever budget is left after the title,
 * link, and hashtags — rather than letting X truncate mid-word.
 */
export function buildBlogTweet(post: BlogPost, url: string) {
	const LIMIT = 280;
	const URL_COST = 23;
	const hashtags = blogHashtags(post);
	const fixed = `${post.title}\n\n\n\n${url}\n\n${hashtags}`;
	const budget = LIMIT - (fixed.length - url.length + URL_COST);

	const summary = (post.socialCaption ?? post.excerpt).split('\n')[0];
	let trimmed = summary;
	if (budget < 20) {
		return `${post.title}\n\n${url}\n\n${hashtags}`;
	}
	if (summary.length > budget) {
		trimmed = `${summary.slice(0, budget - 1).replace(/[\s,;:.]+\S*$/, '')}…`;
	}

	return `${post.title}\n\n${trimmed}\n\n${url}\n\n${hashtags}`;
}

export function formatBlogDate(iso: string) {
	const date = new Date(`${iso}T00:00:00`);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
