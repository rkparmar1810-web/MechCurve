export type ItemType = 'service';

export interface ItemDetail {
	id: string;
	title: string;
	description: string;
	features: string[];
	tools: string[];
	metrics: string[];
}

export interface ServiceCard {
	tag: string;
	id: string;
	title: string;
	desc: string;
	meta: string[];
}

export const serviceCards: ServiceCard[] = [
	{
		tag: 'Design',
		id: '3d-cad',
		title: '3D CAD Modelling',
		desc: 'High-accuracy 3D models for industrial components, consumer products, and mechanical assemblies.',
		meta: ['SolidWorks', 'STEP/IGES'],
	},
	{
		tag: 'Product',
		id: 'product-design',
		title: 'Product Design Guidance',
		desc: 'End-to-end product development - from concept to DFM analysis and engineering documentation.',
		meta: ['DFM', 'BOM'],
	},
];

export const serviceDetails: Record<string, ItemDetail> = {
	'3d-cad': {
		id: '3d-cad',
		title: '3D CAD Modelling Service',
		description:
			'Precision CAD modeling service for production-ready components, assembly design, and technical documentation.',
		features: [
			'Parametric model architecture',
			'Revision-ready file structure',
			'Manufacturing-aligned output',
		],
		tools: ['SolidWorks', 'Fusion 360', 'STEP/IGES'],
		metrics: ['50+ designs delivered', '+30% drafting speed'],
	},
	'product-design': {
		id: 'product-design',
		title: 'Product Design Guidance',
		description:
			'From concept exploration to manufacturable geometry, focused on performance, cost, and assembly efficiency.',
		features: [
			'DFM-first workflow',
			'Material and process alignment',
			'BOM and tolerance support',
		],
		tools: ['SolidWorks', 'DFM', 'BOM'],
		metrics: [
			'18% cost reduction in case studies',
			'Faster prototyping cycles',
		],
	},
};
