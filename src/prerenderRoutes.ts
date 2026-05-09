import { projectDetails } from './data/detailContent';

const projectRoutes = Object.keys(projectDetails).map(
	(id) => `/projects/${id}`,
);

export const PRERENDER_ROUTES = [
	'/',
	'/about',
	'/services',
	'/portfolio',
	'/contact',
	'/testimonials',
	'/faq',
	'/terms-of-service',
	'/privacy-policy',
	...projectRoutes,
];

