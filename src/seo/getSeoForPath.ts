import { projectDetails } from '../data/detailContent';
import { SITE_URL } from './site';

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
	'MechCurve offers mechanical CAD engineering, SolidWorks training, manufacturing-ready deliverables, and mentorship for students and teams.';
const DEFAULT_IMAGE_URL = `${SITE_URL}/logo.webp`;

function normalizePath(pathname: string) {
	if (!pathname.startsWith('/')) return `/${pathname}`;
	return pathname;
}

export function getSeoForPath(pathname: string): SeoDefinition {
	const path = normalizePath(pathname);

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

	// Project detail pages
	const projectMatch = path.match(/^\/projects\/([^/?#]+)/);
	if (projectMatch) {
		const slug = decodeURIComponent(projectMatch[1]);
		const project = projectDetails[slug];

		if (project) {
			return {
				title: `${project.title} | MechCurve`,
				description: project.description,
				canonicalUrl: `${SITE_URL}/projects/${project.id}`,
				robots: 'index, follow',
				imageUrl: DEFAULT_IMAGE_URL,
			};
		}

		return {
			title: 'Detail Not Found | MechCurve',
			description:
				'The requested page was not found. Explore MechCurve services and projects from the main pages.',
			canonicalUrl: `${SITE_URL}${path}`,
			robots: 'noindex, nofollow',
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
				'Learn about the MechCurve team, our engineering workflow, and our approach to practical CAD training and manufacturing-ready design delivery.',
		},
		'/services': {
			title: 'Services | CAD Design, SolidWorks Training, Mentorship',
			description:
				'Explore CAD modeling, product design guidance, SolidWorks training, and engineering mentorship services from MechCurve.',
		},
		'/portfolio': {
			title: 'Portfolio | Mechanical Design Projects by MechCurve',
			description:
				'View selected mechanical design and CAD projects, including fixtures, assemblies, product redesign, and rapid prototyping work.',
		},
		'/contact': {
			title: 'Contact MechCurve | Book Training or Project Consultation',
			description:
				'Get in touch with MechCurve for CAD projects, SolidWorks training, design mentorship, and manufacturing-focused engineering support.',
		},
		'/testimonials': {
			title: 'Testimonials | MechCurve',
			description:
				'See feedback from clients and students who worked with MechCurve for mechanical design projects and SolidWorks training.',
		},
		'/faq': {
			title: 'FAQ | MechCurve',
			description:
				'Answers to common questions about MechCurve services, SolidWorks training, mentorship, and project engagement.',
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

