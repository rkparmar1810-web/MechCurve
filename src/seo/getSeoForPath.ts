import { SITE_URL } from './site';
import { serviceDetailsBySlug } from '../data/servicesContent';

export type SeoDefinition = {
	title: string;
	description: string;
	canonicalUrl: string;
	robots: string;
	imageUrl: string;
};

const DEFAULT_TITLE =
	'MechCurve | Mechanical Design Engineering & SolidWorks Training';
const DEFAULT_DESCRIPTION =
	'MechCurve offers mechanical CAD engineering, manufacturing-ready deliverables, and dedicated career training guidance for students and teams.';
const DEFAULT_IMAGE_URL = `${SITE_URL}/logo.webp`;

function normalizePath(pathname: string) {
	if (!pathname.startsWith('/')) return `/${pathname}`;
	return pathname;
}

export function getSeoForPath(pathname: string): SeoDefinition {
	const path = normalizePath(pathname);
	const serviceMatch = path.match(/^\/services\/([a-z0-9-]+)$/);

	if (serviceMatch) {
		const slug = serviceMatch[1];
		const service = serviceDetailsBySlug[slug];
		if (service) {
			return {
				title: `${service.title} | MechCurve Services`,
				description: service.shortDescription,
				canonicalUrl: `${SITE_URL}${path}`,
				robots: 'index, follow',
				imageUrl: DEFAULT_IMAGE_URL,
			};
		}
	}

	// Legal pages
	if (path === '/terms-of-service') {
		return {
			title: 'Terms of Service | MechCurve',
			description: 'Read the Terms of Service for using MechCurve website and services.',
			canonicalUrl: `${SITE_URL}${path}`,
			robots: 'index, follow',
			imageUrl: DEFAULT_IMAGE_URL,
		};
	}

	if (path === '/privacy-policy') {
		return {
			title: 'Privacy Policy | MechCurve',
			description: 'Read the Privacy Policy for how MechCurve collects, uses, and protects your data.',
			canonicalUrl: `${SITE_URL}${path}`,
			robots: 'index, follow',
			imageUrl: DEFAULT_IMAGE_URL,
		};
	}

	// Primary routes that render HomePage
	const byPath: Record<string, { title: string; description: string }> = {
		'/': {
			title: DEFAULT_TITLE,
			description: DEFAULT_DESCRIPTION,
		},
		'/about': {
			title: 'About MechCurve | Mechanical Design Team',
			description:
				'Learn about the MechCurve team, our engineering workflow, and our approach to manufacturing-ready design delivery.',
		},
		'/services': {
			title: 'Services | CAD Design, Product Development, Manufacturing',
			description:
				'Explore CAD modeling, product design guidance, and manufacturing support services from MechCurve.',
		},
		'/career': {
			title: 'Career | Training and Mentorship at MechCurve',
			description:
				'Explore student training, mentorship, certification preparation, and placement guidance in one dedicated career section.',
		},
		'/contact': {
			title: 'Contact MechCurve | Project Consultation and Career Inquiry',
			description:
				'Get in touch with MechCurve for CAD projects, manufacturing-focused engineering support, and career program inquiries.',
		},
		'/testimonials': {
			title: 'Testimonials | MechCurve',
			description:
				'See feedback from clients and teams who worked with MechCurve for mechanical design and manufacturing support.',
		},
		'/faq': {
			title: 'FAQ | MechCurve',
			description:
				'Answers to common questions about MechCurve services, project engagement, and delivery process.',
		},
	};

	const def = byPath[path] ?? byPath['/'];

	return {
		title: def.title,
		description: def.description,
		canonicalUrl: `${SITE_URL}${path === '/' ? '/' : path}`,
		robots: 'index, follow',
		imageUrl: DEFAULT_IMAGE_URL,
	};
}

