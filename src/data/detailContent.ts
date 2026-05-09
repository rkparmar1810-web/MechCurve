export type ItemType = 'service' | 'project';

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

export interface ProjectCard {
	id: string;
	category:
		| 'Sheet Metal'
		| 'Assembly Design'
		| 'Weldment Design'
		| 'Parametric Design';
	title: string;
	desc: string;
	meta: string[];
	image: string;
	imageFit?: 'cover' | 'contain';
	imagePosition?: string;
}

export interface ProjectGalleryImage {
	src: string;
	alt: string;
	caption: string;
}

export interface ProjectNarrativeSection {
	title: string;
	body: string;
	bullets: string[];
}

export interface ProjectDetail extends ItemDetail {
	category: ProjectCard['category'];
	tagline: string;
	cardImage: string;
	heroImage: string;
	highlights: string[];
	gallery: ProjectGalleryImage[];
	sections: ProjectNarrativeSection[];
}

export const serviceCards: ServiceCard[] = [
	{
		tag: 'Training',
		id: 'solidworks-training',
		title: 'SolidWorks Training',
		desc: 'Structured, hands-on courses covering part modelling, assemblies, drawings, and simulation.',
		meta: ['Part Modeling', 'Assemblies'],
	},
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
	{
		tag: 'Mentorship',
		id: 'mentorship',
		title: 'Engineering Mentorship',
		desc: 'One-on-one mentorship for students preparing for internships, placements, and design roles.',
		meta: ['Reviews', 'Interview Prep'],
	},
];

export const serviceDetails: Record<string, ItemDetail> = {
	'solidworks-training': {
		id: 'solidworks-training',
		title: 'SolidWorks Training Program',
		description:
			'Structured learning flow for part modeling, assemblies, drawings, and design validation with real industrial use-cases.',
		features: [
			'Module-wise training map',
			'Assessment-driven progression',
			'Industry drawing standards',
		],
		tools: ['SolidWorks', 'AutoCAD', 'GD&T'],
		metrics: ['500+ students trained', '95% pass rate'],
	},
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
	mentorship: {
		id: 'mentorship',
		title: 'Engineering Mentorship',
		description:
			'One-on-one roadmap for students and junior engineers to prepare project portfolios and interview-ready technical depth.',
		features: [
			'Portfolio design reviews',
			'Mock interview drills',
			'Project architecture mentoring',
		],
		tools: ['CSWA/CSWP Tracks', 'Career Planning'],
		metrics: ['120+ mentees', 'High placement conversion'],
	},
};

export const projectCards: ProjectCard[] = [
	{
		id: 'sheet-metal-housing-cover',
		category: 'Sheet Metal',
		title: 'Sheet Metal Housing Cover',
		desc: 'Sheet metal CPU enclosure designed in SolidWorks with bend control, fabrication constraints, and manufacturing-ready detailing.',
		meta: ['SolidWorks', 'Sheet Metal', 'Manufacturing Drawing'],
		image: '/portfolio_images/Sheet_Metal_Housing_Cover_1.webp',
		imagePosition: 'center top',
	},
	{
		id: 'metro-electromagnetic-brake',
		category: 'Assembly Design',
		title: 'Parametric Modelling and Design - Metro Brake Assembly',
		desc: 'Reverse engineered metro electromagnetic brake assembly developed in SolidWorks with a fully parametric structure and production-focused detailing.',
		meta: ['SolidWorks Assembly', 'Reverse Engineering', 'CNC Ready'],
		image: '/portfolio_images/Metro_Electromagnetic_Brake_Assembly_1.webp',
		imagePosition: 'center top',
	},
	{
		id: 'industrial-load-carrying-trolley',
		category: 'Weldment Design',
		title: 'Industrial Load Carrying Trolley',
		desc: 'Heavy-duty industrial trolley developed in SolidWorks weldments for strength, stability, and ergonomic material handling.',
		meta: ['Weldments', 'Motion Analysis', 'Industrial Fabrication'],
		image: '/portfolio_images/Industrial_Load_Carrying_Trolley_1.webp',
		imagePosition: 'center top',
	},
	{
		id: 'parametric-combination-spanner',
		category: 'Parametric Design',
		title: 'Parametric Combination Spanner - SolidWorks',
		desc: 'Parameter-driven combination spanner for industrial and workshop use, built to adapt across multiple bolt sizes.',
		meta: ['Global Variables', 'Equations', 'Scalable Geometry'],
		image: '/portfolio_images/Parametric_Combination_Spanner_0.webp',
		imagePosition: 'center top',
	},
];

export const projectDetails: Record<string, ProjectDetail> = {
	'sheet-metal-housing-cover': {
		id: 'sheet-metal-housing-cover',
		category: 'Sheet Metal',
		tagline:
			'Sheet metal CPU enclosure designed for real-world fabrication and precise fitment.',
		title: 'Sheet Metal Housing Cover',
		description:
			'This project involves the design and detailing of a sheet metal housing cover for a computer CPU enclosure using SolidWorks sheet metal tools. The model incorporates proper bend parameters, thickness control, and manufacturing constraints to ensure real-world feasibility.',
		features: [
			'Complete manufacturing drawings with dimensions and bend details',
			'Ready for laser cutting, bending, and fabrication',
			'Includes SolidWorks cut list for flat pattern, material, and quantity',
		],
		tools: ['SolidWorks', 'Sheet Metal Tools', 'Manufacturing Drawing'],
		metrics: [
			'Structural strength and precise fitment',
			'Laser-cut and bend-ready output',
			'Flat-pattern fabrication workflow',
		],
		cardImage: '/portfolio_images/Sheet_Metal_Housing_Cover_1.webp',
		heroImage: '/portfolio_images/Sheet_Metal_Housing_Cover_1.webp',
		highlights: [
			'CPU enclosure cover',
			'Bend-controlled design',
			'Fabrication-ready documentation',
		],
		gallery: [
			{
				src: '/portfolio_images/Sheet_Metal_Housing_Cover_1.webp',
				alt: 'Sheet metal housing cover render',
				caption:
					'Primary SolidWorks model showing formed geometry and perforated center section.',
			},
			{
				src: '/portfolio_images/Sheet_Metal_Housing_Cover_2.webp',
				alt: 'Sheet metal housing cover drawing',
				caption:
					'Detailed manufacturing sheet with dimensions, feature callouts, and sectional details.',
			},
		],
		sections: [
			{
				title: 'Project Scope',
				body: 'The housing cover was developed as a production-conscious sheet metal part for a CPU enclosure. The design balances enclosure protection, bend feasibility, thickness control, and manufacturing constraints so the model can move cleanly into fabrication.',
				bullets: [
					'Built using SolidWorks sheet metal tools for controlled bends and profile accuracy.',
					'Designed with thickness control, bend parameters, and manufacturing feasibility in mind.',
					'Ensures structural strength and precise fitment for the CPU enclosure assembly.',
				],
			},
			{
				title: 'Manufacturing Output',
				body: 'The final output is organized for direct use in fabrication, with the required drawing information and flat-pattern references needed for production planning and shop-floor execution.',
				bullets: [
					'Manufacturing drawing includes dimensions, bend details, and hole references.',
					'Flat pattern and cut-list information support material planning and quantity control.',
					'Ready for laser cutting, bending, and full fabrication workflow.',
				],
			},
		],
	},
	'metro-electromagnetic-brake': {
		id: 'metro-electromagnetic-brake',
		category: 'Assembly Design',
		tagline:
			'Parametric metro brake assembly developed through reverse engineering and production-focused detailing.',
		title: 'Parametric Modelling and Design - Metro Brake Assembly',
		description:
			'This project focuses on the reverse engineering of a metro electromagnetic brake assembly, developed using SolidWorks with a fully parametric approach and accurate assembly structure. All components were designed with appropriate tolerances, material considerations, and detailed manufacturing drawings. The model ensures real-world applicability for metro and railway systems.',
		features: [
			'Fabrication-ready design suitable for CNC machining',
			'Accurate assembly alignment and functional clearances',
			'Industrial-grade modeling with production feasibility',
		],
		tools: ['SolidWorks', 'Assembly Modeling', 'Technical Drawing'],
		metrics: [
			'Reverse engineered assembly',
			'Metro and railway application',
			'Detailed manufacturing drawings',
		],
		cardImage: '/portfolio_images/Metro_Electromagnetic_Brake_Assembly_1.webp',
		heroImage: '/portfolio_images/Metro_Electromagnetic_Brake_Assembly_1.webp',
		highlights: [
			'Parametric assembly structure',
			'Functional clearances',
			'CNC-ready output',
		],
		gallery: [
			{
				src: '/portfolio_images/Metro_Electromagnetic_Brake_Assembly_1.webp',
				alt: 'Metro electromagnetic brake render',
				caption:
					'Finished assembly render showing the complete brake component stack.',
			},
			{
				src: '/portfolio_images/Metro_Electromagnetic_Brake_Assembly_2.webp',
				alt: 'Metro electromagnetic brake exploded drawing',
				caption:
					'Exploded drawing sheet with parts identification and assembly arrangement.',
			},
			{
				src: '/portfolio_images/Metro_Electromagnetic_Brake_Assembly_3.webp',
				alt: 'Metro electromagnetic brake orthographic views',
				caption:
					'Multi-view SolidWorks workspace used to confirm alignment and assembly structure.',
			},
		],
		sections: [
			{
				title: 'Modeling Approach',
				body: 'The brake assembly was rebuilt through a reverse engineering workflow using SolidWorks with a fully parametric structure. The goal was to create an accurate assembly model that captures the real component relationships, tolerances, and production intent of the system.',
				bullets: [
					'All components were designed with appropriate tolerances and material considerations.',
					'The assembly structure maintains correct alignment and functional clearances.',
					'Detailed drawings support manufacturing and assembly communication.',
				],
			},
			{
				title: 'Industrial Readiness',
				body: 'The completed model is intended for real-world metro and railway use, where dimensional accuracy alone is not enough. The project also addresses manufacturability, assembly feasibility, and documentation quality so it remains relevant for industrial production.',
				bullets: [
					'Suitable for CNC machining and fabrication-oriented review.',
					'Built with industrial-grade modeling standards and production feasibility in mind.',
					'Ensures real-world applicability for metro and railway systems.',
				],
			},
		],
	},
	'industrial-load-carrying-trolley': {
		id: 'industrial-load-carrying-trolley',
		category: 'Weldment Design',
		tagline:
			'Heavy-duty industrial trolley designed for strength, stability, and ergonomic handling.',
		title: 'Industrial Load Carrying Trolley',
		description:
			'This project includes the design and development of a heavy-duty industrial trolley using SolidWorks weldment tools. The trolley is designed for handling heavy machining components in industrial environments, with emphasis on strength, stability, and usability.',
		features: [
			'Weldment-based structural frame design',
			'Motion analysis performed for functional validation',
			'Optimized for load-bearing capacity and ergonomic handling',
		],
		tools: ['SolidWorks', 'Weldments', 'Motion Analysis'],
		metrics: [
			'Heavy-duty structural frame',
			'Manufacturing-ready for industrial fabrication',
			'Stable handling performance',
		],
		cardImage: '/portfolio_images/Industrial_Load_Carrying_Trolley_1.webp',
		heroImage: '/portfolio_images/Industrial_Load_Carrying_Trolley_1.webp',
		highlights: [
			'Load-bearing design',
			'Weldment frame',
			'Ergonomic usability',
		],
		gallery: [
			{
				src: '/portfolio_images/Industrial_Load_Carrying_Trolley_1.webp',
				alt: 'Industrial trolley render',
				caption:
					'Concept render of the welded trolley showing load platform, frame, and wheel placement.',
			},
			{
				src: '/portfolio_images/Industrial_Load_Carrying_Trolley_2.webp',
				alt: 'Industrial trolley CAD views',
				caption:
					'Front, side, top, and isometric views used to verify balance and motion behavior.',
			},
		],
		sections: [
			{
				title: 'Design Objective',
				body: 'The trolley was developed for industrial environments where heavy machining components must be moved safely and reliably. The design prioritizes structural strength, stable load handling, and usability during repeated shop-floor operation.',
				bullets: [
					'Uses a weldment-based structural frame for industrial durability.',
					'Optimized for load-bearing capacity and ergonomic handling.',
					'Designed to support strength, stability, and day-to-day usability.',
				],
			},
			{
				title: 'Validation',
				body: 'Functional validation was carried out through motion analysis so the trolley design could be checked for stable movement, practical geometry, and real industrial usability before fabrication.',
				bullets: [
					'Motion analysis was performed for functional validation.',
					'The frame supports reliable industrial load carrying and maneuverability.',
					'The design is manufacturing-ready for industrial fabrication.',
				],
			},
		],
	},
	'parametric-combination-spanner': {
		id: 'parametric-combination-spanner',
		category: 'Parametric Design',
		tagline:
			'Adaptive combination spanner driven by parameters, design intent, and scalable geometry.',
		title: 'Parametric Combination Spanner - SolidWorks',
		description:
			'This parametric combination spanner is designed for mechanical assembly and maintenance tasks. It is used for tightening and loosening hexagonal nuts and bolts across industrial, automotive, and workshop applications. The design supports multiple bolt sizes through parameter-driven modeling, making it highly adaptable.',
		features: [
			'Bolt size driven geometry updates',
			'Automatic model updates through parameters',
			'Design intent preserved across size variations',
		],
		tools: ['SolidWorks', 'Equations', 'Global Variables'],
		metrics: [
			'Industrial and workshop application',
			'Multiple bolt-size adaptability',
			'Advanced parametric modeling workflow',
		],
		cardImage: '/portfolio_images/Parametric Combination Spanner_2.webp',
		heroImage: '/portfolio_images/Parametric Combination Spanner_2.webp',
		highlights: [
			'Bolt-size adaptability',
			'Equation-driven updates',
			'Proportion-preserving design',
		],
		gallery: [
			{
				src: '/portfolio_images/Parametric Combination Spanner_2.webp',
				alt: 'Parametric spanner isometric model',
				caption:
					'Isometric SolidWorks model showing the completed combination spanner geometry.',
			},
			{
				src: '/portfolio_images/Parametric Combination Spanner_1.webp',
				alt: 'Parametric spanner front view',
				caption:
					'Front-view workspace with global variables visible in the feature tree.',
			},
		],
		sections: [
			{
				title: 'Application',
				body: 'This parametric combination spanner is intended for mechanical assembly and maintenance work where hexagonal nuts and bolts must be tightened or loosened reliably. It is suitable for industrial, automotive, and workshop applications, with a model structure that can adapt across multiple bolt sizes.',
				bullets: [
					'Supports multiple bolt sizes through parameter-driven modeling.',
					'Suitable for industrial, automotive, and workshop use cases.',
					'Built for mechanical assembly and maintenance tasks.',
				],
			},
			{
				title: 'Purpose of Design',
				body: 'The primary goal of this project is to demonstrate advanced parametric modeling capabilities in SolidWorks. The spanner is controlled through key variables so any dimensional change updates the entire model automatically while maintaining proportion and design intent.',
				bullets: [
					'Key parameters include bolt size, jaw opening, head diameter, overall length, and thickness.',
					'Any parameter change automatically updates the full model.',
					'The model preserves design intent and proportion across variations.',
				],
			},
		],
	},
};

export function getDetailPath(type: ItemType, id: string) {
	return type === 'service' ? `/services/${id}` : `/projects/${id}`;
}

export function getListPath(type: ItemType) {
	return type === 'service' ? '/#services' : '/#portfolio';
}
