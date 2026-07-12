export type ServiceCategory =
	| 'Design Services'
	| 'Analysis Services'
	| 'Rapid Prototyping & Additive Manufacturing'
	| 'CAD Training';

export interface ServiceFaq {
	question: string;
	answer: string;
}

export interface ServiceDetail {
	slug: string;
	title: string;
	category: ServiceCategory;
	tagline: string;
	shortDescription: string;
	heroDescription: string;
	capabilities: string[];
	deliverables: string[];
	workflow: string[];
	idealFor: string[];
	tools: string[];
	faqs: ServiceFaq[];
}

export const serviceDetails: ServiceDetail[] = [
	{
		slug: 'product-development',
		title: 'Product Development',
		category: 'Design Services',
		tagline: 'Transform Ideas into Manufacturable Products',
		shortDescription:
			'Transform ideas into market-ready products with end-to-end engineering support.',
		heroDescription:
			'At MechCurve, we help businesses transform ideas into market-ready products through innovative product development and engineering excellence. From concept generation and industrial design to detailed engineering, prototyping, and manufacturing support, we provide end-to-end solutions that accelerate product development while reducing cost and risk. Leveraging advanced CAD technologies, engineering expertise, and industry best practices, we help businesses develop efficient, manufacturable, and high-performance products.',
		capabilities: [
			'Concept Development: understanding product requirements, functionality, and market expectations',
			'Design & Engineering: detailed CAD models and engineering solutions aligned with performance goals',
			'Design Validation: manufacturability, assembly feasibility, and design improvement reviews',
			'Prototype Development: rapid prototyping for testing and functional evaluation',
			'Production Documentation: drawings, BOMs, and technical documentation for manufacturing',
		],
		deliverables: [
			'3D CAD Models',
			'Assembly Designs',
			'Engineering Drawings',
			'Bill of Materials (BOM)',
			'DFM Recommendations',
			'Prototype Support',
		],
		workflow: [
			'Concept Development',
			'Design & Engineering',
			'Design Validation',
			'Prototype Development',
			'Production Documentation',
		],
		idealFor: [
			'Automotive',
			'Industrial Equipment',
			'Consumer Products',
			'Startups',
			'Manufacturing',
		],
		tools: ['SolidWorks', 'NX', 'Catia', 'AutoCAD', 'DFM workflow standards'],
		faqs: [
			{
				question: 'Can you develop products from scratch?',
				answer: 'Yes. We support projects from concept through production.',
			},
			{
				question: 'Do you provide prototype support?',
				answer: 'Yes. We assist with rapid prototyping and validation.',
			},
		],
	},
	{
		slug: 'reverse-engineering',
		title: 'Reverse Engineering',
		category: 'Design Services',
		tagline: 'Analyze, recover, and improve products through engineering evaluation',
		shortDescription:
			'Recover lost design data and convert physical components into production-ready engineering documentation.',
		heroDescription:
			'Reverse engineering is more than simply recreating an existing component—it is the process of understanding, analyzing, and improving products through detailed engineering evaluation. At MechCurve, we help businesses recover lost design data, modernize legacy equipment, optimize existing products, and create accurate digital models for manufacturing and development. Using advanced CAD tools, 3D scanning, measurement techniques, and engineering expertise, we convert physical components into precise 3D models, technical drawings, and manufacturing-ready documentation.',
		capabilities: [
			'Component geometry reconstruction from physical samples',
			'Legacy design modernization and obsolete part replacement',
			'Tolerance, fit, and interface interpretation',
			'Material and process upgrade recommendations',
		],
		deliverables: [
			'Parametric CAD models from samples',
			'2D drawings and tolerance callouts',
			'Comparison notes and geometry deviation logs',
			'Redesign suggestions for manufacturability',
		],
		workflow: [
			'Sample inspection and data capture',
			'CAD recreation and feature mapping',
			'Interface validation and update proposals',
			'Final model and drawing release',
		],
		idealFor: [
			'Industrial Machinery and Heavy Equipment',
			'Maintenance and spare-part teams',
			'Product redesign and benchmarking projects',
		],
		tools: ['SolidWorks', '3D scanning workflows', 'Measurement-driven CAD recreation'],
		faqs: [
			{
				question: 'Can you improve the part while recreating it?',
				answer:
					'Yes. We can preserve critical interfaces and suggest practical improvements for cost, reliability, and manufacturability.',
			},
			{
				question: 'Do you provide full drawings?',
				answer:
					'Yes. Deliverables include production drawings with dimensions, notes, and BOM-level clarity where required.',
			},
		],
	},
	{
		slug: '3d-cad-modeling',
		title: '3D CAD Modeling',
		category: 'Design Services',
		tagline: 'Accurate and intelligent CAD models for development and manufacturing',
		shortDescription:
			'Transform concepts, sketches, and requirements into manufacturing-ready 3D models.',
		heroDescription:
			'At MechCurve, we transform engineering concepts, sketches, and technical requirements into accurate and intelligent 3D CAD models that serve as the foundation for product development and manufacturing. Using industry-leading CAD software, we develop detailed part models, assemblies, sheet metal components, weldments, machinery layouts, and production-ready designs. Every model is created with a focus on accuracy, design intent, manufacturability, and future modifications.',
		capabilities: [
			'Part and assembly modeling',
			'Surface, weldment, and sheet metal design',
			'Machinery layouts and configuration control',
			'Manufacturing-ready model cleanup',
		],
		deliverables: [
			'Editable parametric CAD files',
			'Assembly structures with references',
			'Interference and fit snapshots',
			'Export files (STEP/IGES/STL)',
		],
		workflow: [
			'Scope and model standards setup',
			'Core CAD build and internal checks',
			'Review and revision integration',
			'Release package handover',
		],
		idealFor: [
			'Engineering teams needing fast CAD throughput',
			'Manufacturers requiring accurate part data',
			'Product companies preparing documentation',
		],
		tools: ['SolidWorks', 'NX', 'Catia', 'STEP/IGES exchange'],
		faqs: [
			{
				question: 'Do you model from 2D drawings?',
				answer:
					'Yes. We can convert 2D drawings or hand-marked dimensions into parametric 3D CAD models.',
			},
			{
				question: 'Can you align with our naming standards?',
				answer:
					'Absolutely. We can follow your part naming, assembly structure, and revision control conventions.',
			},
		],
	},
	{
		slug: 'sheet-metal-design',
		title: 'Sheet-Metal Design',
		category: 'Design Services',
		tagline: 'Fabrication-ready sheet metal from bracket to assembly',
		shortDescription:
			'Manufacturable sheet metal models optimized for laser cutting, punching, bending, and welding.',
		heroDescription:
			'At MechCurve, we provide comprehensive sheet metal design services focused on manufacturability, cost efficiency, and production readiness. From simple brackets and enclosures to complex industrial assemblies, we develop accurate sheet metal models optimized for fabrication processes such as laser cutting, punching, bending, and welding. Our approach emphasizes material utilization, bend optimization, assembly efficiency, and manufacturing feasibility to reduce production costs and improve product quality.',
		capabilities: [
			'Bracket, enclosure, and assembly modeling',
			'Bend optimization and material utilization',
			'Flat pattern and fabrication-ready detailing',
			'Weldment and assembly efficiency planning',
		],
		deliverables: [
			'3D sheet metal models',
			'Flat patterns for fabrication',
			'Fabrication drawings with bend details',
			'Production documentation package',
		],
		workflow: [
			'Requirement and material selection review',
			'Sheet metal modeling and bend planning',
			'Flat pattern and drawing preparation',
			'Production documentation handover',
		],
		idealFor: [
			'Industrial equipment and machine guards',
			'Electrical enclosures and control panels',
			'Custom fabricated sheet metal products',
		],
		tools: ['SolidWorks Sheet Metal', 'Flat pattern workflows', 'Fabrication drawing standards'],
		faqs: [
			{
				question: 'Do you provide flat patterns for fabrication?',
				answer:
					'Yes. Deliverables include flat patterns, bend details, and fabrication drawings ready for laser cutting, punching, and bending.',
			},
			{
				question: 'Can you optimize designs for lower production cost?',
				answer:
					'Yes. We focus on material utilization, bend optimization, and assembly efficiency to reduce fabrication cost and improve product quality.',
			},
		],
	},
	{
		slug: 'drafting-documentation',
		title: '2D Drafting & Documentation',
		category: 'Design Services',
		tagline: 'Accurate documentation for engineering and manufacturing execution',
		shortDescription:
			'Convert concepts and CAD data into precise, industry-compliant drawings and documentation.',
		heroDescription:
			'Accurate documentation is the foundation of every successful engineering and manufacturing project. At MechCurve, we provide professional 2D drafting and technical documentation services that convert concepts, CAD models, and engineering data into clear, precise, and industry-compliant drawings. Our expertise includes manufacturing drawings, fabrication drawings, assembly drawings, detail drawings, shop-floor documentation, BOM preparation, and engineering documentation packages.',
		capabilities: [
			'Manufacturing, fabrication, and assembly drawings',
			'GD&T, tolerance, and material specification callouts',
			'Welding details and shop-floor documentation',
			'BOM preparation and revision-controlled updates',
		],
		deliverables: [
			'Fabrication and machining drawings',
			'Assembly drawings with exploded views',
			'Drawing release pack (PDF/DWG)',
			'Change and revision summary sheets',
		],
		workflow: [
			'Drawing standard and template alignment',
			'Dimensioning and annotation pass',
			'Quality check and revision update',
			'Final issue and release support',
		],
		idealFor: [
			'Production teams needing clean documentation',
			'Vendors requiring unambiguous drawings',
			'Fabrication and plant engineering projects',
		],
		tools: ['AutoCAD', 'SolidWorks Drawings', 'GD&T drafting standards'],
		faqs: [
			{
				question: 'Can you rework legacy drawings?',
				answer:
					'Yes. We can modernize old drawing sets with updated standards and clearer manufacturing communication.',
			},
			{
				question: 'Do you include BOM formatting?',
				answer:
					'Yes. BOM and callout structures can be customized to your procurement and production process.',
			},
		],
	},
	{
		slug: 'industrial-design',
		title: 'Industrial Design',
		category: 'Design Services',
		tagline: 'Functional form with engineering feasibility',
		shortDescription:
			'Create product forms that balance usability, manufacturability, and brand value.',
		heroDescription:
			'Our industrial design service focuses on practical product aesthetics and ergonomic usability while staying grounded in tooling, material, and process realities. We shape products that look refined, feel intuitive, and remain efficient to manufacture.',
		capabilities: [
			'Concept styling and product form direction',
			'Ergonomic and interaction-aware geometry',
			'CMF (color, material, finish) aligned proposals',
			'Production-feasible shape refinement',
		],
		deliverables: [
			'Concept variants and selection matrix',
			'Detailed CAD-ready surface directions',
			'Presentation visuals for stakeholder decisions',
			'Design intent notes for engineering transfer',
		],
		workflow: [
			'Use-case and user context discovery',
			'Concept development and direction locking',
			'Engineering alignment with process limits',
			'Final form handoff for CAD detailing',
		],
		idealFor: [
			'Consumer product teams',
			'Hardware startups preparing launch designs',
			'Industrial products needing usability upgrades',
		],
		tools: ['SolidWorks surfacing', 'Fusion 360', 'Rendering pipelines'],
		faqs: [
			{
				question: 'Do you only focus on looks?',
				answer:
					'No. We prioritize functional aesthetics, ergonomics, and manufacturing feasibility together.',
			},
			{
				question: 'Can you work with our existing brand language?',
				answer:
					'Yes. We can align form language and product detailing with your existing brand identity.',
			},
		],
	},
	{
		slug: 'electro-mechanical-integration',
		title: 'Electro-Mechanical Integration',
		category: 'Design Services',
		tagline: 'Mechanical design aligned with electronics packaging',
		shortDescription:
			'Integrate PCB, wiring, enclosures, and mechanical structure smoothly.',
		heroDescription:
			'We design electro-mechanical assemblies that reduce integration risk by coordinating mechanical envelopes, thermal paths, mounting, and serviceability from early design phases.',
		capabilities: [
			'Enclosure and PCB packaging strategy',
			'Mounting architecture and cable routing',
			'Service access and assembly sequencing',
			'Thermal and structural fit coordination',
		],
		deliverables: [
			'Integrated CAD assembly with keep-out zones',
			'Mounting and fastener documentation',
			'Cable and harness path guidelines',
			'Integration review checklists',
		],
		workflow: [
			'Envelope and constraints definition',
			'Packaging concept and risk mapping',
			'Detailed integration design',
			'Build-readiness validation support',
		],
		idealFor: [
			'Embedded hardware teams',
			'Automation and controls products',
			'Field devices and industrial electronics',
		],
		tools: ['SolidWorks', 'Creo exchange formats', 'STEP-based collaboration'],
		faqs: [
			{
				question: 'Can you collaborate with our electronics vendors?',
				answer:
					'Yes. We can coordinate directly on dimensions, keep-out zones, connector orientation, and assembly constraints.',
			},
			{
				question: 'Do you account for serviceability?',
				answer:
					'Yes. Service and maintenance access is considered in enclosure and internal layout planning.',
			},
		],
	},
	{
		slug: 'embedded-systems',
		title: 'Embedded Systems',
		category: 'Design Services',
		tagline: 'Design support for embedded hardware products',
		shortDescription:
			'Mechanical and integration support for embedded product deployment.',
		heroDescription:
			'MechCurve supports embedded-system hardware teams with mechanical packaging, reliability-focused structure planning, and production documentation for deployment-ready products.',
		capabilities: [
			'Embedded hardware packaging support',
			'Mechanical reliability planning',
			'Connector and I/O access design',
			'Prototype-to-production transition support',
		],
		deliverables: [
			'Embedded product enclosure CAD',
			'Assembly access and service documentation',
			'Drawing set for fabrication and assembly',
			'Build feedback integration updates',
		],
		workflow: [
			'Requirement and environmental input collection',
			'Packaging architecture proposal',
			'Iterative detailing and fit checks',
			'Release-ready documentation handoff',
		],
		idealFor: [
			'IoT product teams',
			'Automation and monitoring devices',
			'Edge hardware startups',
		],
		tools: ['SolidWorks', 'Tolerance stack planning', 'Fabrication drawing standards'],
		faqs: [
			{
				question: 'Is firmware support included?',
				answer:
					'Our core focus is mechanical and integration support. We can collaborate with your embedded software team for complete product alignment.',
			},
			{
				question: 'Can you optimize for harsh environments?',
				answer:
					'Yes. We can design considering ingress, mounting stability, thermal exposure, and handling requirements.',
			},
		],
	},
	{
		slug: 'product-analysis',
		title: 'Product Analysis',
		category: 'Analysis Services',
		tagline: 'Engineering insight before production decisions',
		shortDescription:
			'Assess product performance, risks, and optimization opportunities.',
		heroDescription:
			'MechCurve provides practical product analysis support to identify structural, thermal, and manufacturability risks before expensive downstream changes.',
		capabilities: [
			'Performance-oriented design reviews',
			'Failure-risk identification',
			'Material and process suitability checks',
			'Cost and complexity optimization suggestions',
		],
		deliverables: [
			'Analysis summary report',
			'Issue-priority matrix',
			'Improvement recommendations',
			'Validation plan inputs',
		],
		workflow: [
			'Scope and objective definition',
			'Data review and baseline analysis',
			'Risk and optimization mapping',
			'Reporting and action handover',
		],
		idealFor: [
			'Pre-production gate reviews',
			'Cost-down engineering initiatives',
			'Redesign and upgrade programs',
		],
		tools: ['Design review frameworks', 'CAD/CAE input workflows'],
		faqs: [
			{
				question: 'Is this only simulation?',
				answer:
					'No. Product analysis includes design, process, cost, and practical implementation perspectives in addition to simulation inputs.',
			},
			{
				question: 'Can analysis be done on partial data?',
				answer:
					'Yes. Preliminary analysis can still highlight major risk areas and recommend the next validation steps.',
			},
		],
	},
	{
		slug: 'design-validation',
		title: 'Design Validation',
		category: 'Analysis Services',
		tagline: 'Verify design readiness with confidence',
		shortDescription:
			'Validate design intent before tooling, fabrication, or release.',
		heroDescription:
			'We help teams validate dimensions, fit, functional assumptions, and process compatibility so final engineering releases are reliable and production-safe.',
		capabilities: [
			'Tolerance and fit verification',
			'Assembly logic and interference checks',
			'Process compatibility validation',
			'Validation checklist preparation',
		],
		deliverables: [
			'Validation checkpoint document',
			'Issue log with corrective recommendations',
			'Go / no-go readiness notes',
			'Revision support guidance',
		],
		workflow: [
			'Validation criteria setup',
			'Geometry and assembly verification',
			'Risk review and closure actions',
			'Final validation summary',
		],
		idealFor: [
			'Tooling release preparation',
			'Pilot build readiness checks',
			'Quality and process review teams',
		],
		tools: ['CAD interference checks', 'Tolerance analysis methods'],
		faqs: [
			{
				question: 'Can you validate supplier-ready drawings?',
				answer:
					'Yes. We can review drawings for clarity, tolerance intent, and production compatibility before vendor handoff.',
			},
			{
				question: 'Do you support iterative validation?',
				answer:
					'Yes. Validation can run in iterative loops with progressive closure of design risks.',
			},
		],
	},
	{
		slug: 'cae-cfd',
		title: 'CAE / CFD',
		category: 'Analysis Services',
		tagline: 'Simulation-backed engineering decisions',
		shortDescription:
			'Use CAE and CFD workflows to guide design confidence and optimization.',
		heroDescription:
			'Our CAE/CFD support helps engineering teams evaluate load response, stress distribution, flow behavior, and design performance through simulation-informed decision making.',
		capabilities: [
			'Simulation setup guidance',
			'Boundary and load-case planning',
			'Result interpretation and design implication mapping',
			'Optimization-direction recommendations',
		],
		deliverables: [
			'Simulation summary snapshots',
			'Load-case interpretation notes',
			'Design action recommendations',
			'Validation correlation pointers',
		],
		workflow: [
			'Objective and scenario definition',
			'Simulation input preparation',
			'Result review and engineering interpretation',
			'Improvement roadmap creation',
		],
		idealFor: [
			'Performance-critical products',
			'Structural and mechanism verification teams',
			'Teams reducing physical trial cycles',
		],
		tools: ['SolidWorks Simulation', 'CAE / CFD review workflows'],
		faqs: [
			{
				question: 'Do you replace physical testing?',
				answer:
					'No. CAE/CFD accelerates decisions and reduces trial loops, while physical validation remains important for final confirmation.',
			},
			{
				question: 'Can you support custom load cases?',
				answer:
					'Yes. We can model practical load and boundary scenarios based on your actual operating conditions.',
			},
		],
	},
	{
		slug: 'thermal-analysis',
		title: 'Thermal Analysis',
		category: 'Analysis Services',
		tagline: 'Thermal performance planning for reliability',
		shortDescription:
			'Assess thermal behavior early to improve reliability and lifespan.',
		heroDescription:
			'We provide thermal analysis support to help teams manage temperature-sensitive designs, improve heat dissipation paths, and reduce field reliability risks.',
		capabilities: [
			'Thermal path review and design checks',
			'Heat concentration risk identification',
			'Cooling strategy guidance',
			'Material and geometry recommendations',
		],
		deliverables: [
			'Thermal behavior assessment notes',
			'Critical-zone identification map',
			'Cooling and design adjustment suggestions',
			'Validation checkpoints',
		],
		workflow: [
			'Thermal requirement collection',
			'Model preparation and scenario setup',
			'Result interpretation and recommendations',
			'Design update support',
		],
		idealFor: [
			'Embedded and electronics-heavy products',
			'High-duty-cycle mechanical systems',
			'Teams reducing overheating risk before release',
		],
		tools: ['Thermal simulation workflows', 'CAD-based thermal planning'],
		faqs: [
			{
				question: 'Can thermal analysis be done before prototype?',
				answer:
					'Yes. Early thermal analysis is useful to detect high-risk zones and improve cooling architecture before physical builds.',
			},
			{
				question: 'Do you suggest mechanical changes too?',
				answer:
					'Yes. Recommendations can include geometry, material, venting, and mounting changes that improve thermal behavior.',
			},
		],
	},
	{
		slug: 'fdm',
		title: 'FDM 3D Printing',
		category: 'Rapid Prototyping & Additive Manufacturing',
		tagline: 'Fused Deposition Modeling for fast, cost-effective prototyping',
		shortDescription:
			'Durable, dimensionally accurate parts for rapid prototyping, functional testing, and low-volume production.',
		heroDescription:
			'At MechCurve, we provide high-quality FDM (Fused Deposition Modeling) 3D printing services for rapid prototyping, functional testing, product development, and low-volume manufacturing. Using a wide range of engineering-grade thermoplastics, we manufacture durable and dimensionally accurate components suitable for concept validation, design verification, assembly testing, and end-use applications. FDM technology offers an ideal balance of speed, affordability, and flexibility for engineers, startups, manufacturers, and product developers.',
		capabilities: [
			'Rapid prototyping and concept validation',
			'Functional testing with engineering-grade thermoplastics',
			'Assembly and fit verification builds',
			'Low-volume and end-use part production',
		],
		deliverables: [
			'Print-ready geometry and orientation inputs',
			'FDM printed parts in selected material',
			'Prototype validation checklist',
			'Iteration and design update recommendations',
		],
		workflow: [
			'Design review and material selection',
			'Print preparation and orientation optimization',
			'FDM printing and quality check',
			'Prototype feedback and next-iteration planning',
		],
		idealFor: [
			'Industrial Machinery, Automotive, and Agriculture',
			'Consumer Products, Robotics, and Electronics',
			'Startups and educational research teams',
		],
		tools: ['FDM printers', 'Engineering-grade thermoplastics', 'Slicing and print-prep workflows'],
		faqs: [
			{
				question: 'Which materials can you print?',
				answer:
					'We work with a wide range of engineering-grade thermoplastics selected to match your durability, temperature, and accuracy requirements.',
			},
			{
				question: 'Is FDM suitable for functional parts?',
				answer:
					'Yes. FDM parts are durable and dimensionally accurate, making them suitable for functional testing, assembly checks, and end-use applications.',
			},
		],
	},
	{
		slug: 'sla',
		title: 'SLA 3D Printing',
		category: 'Rapid Prototyping & Additive Manufacturing',
		tagline: 'Stereolithography for high-detail, smooth-finish prototypes',
		shortDescription:
			'Highly detailed prototypes and functional components with smooth finishes and excellent dimensional accuracy.',
		heroDescription:
			'Achieve exceptional precision and superior surface quality with MechCurve SLA 3D printing services. Using advanced stereolithography technology, we manufacture highly detailed prototypes and functional components with smooth finishes, fine features, and excellent dimensional accuracy. SLA printing is particularly suited for applications where appearance, precision, and intricate detail are critical—from product design validation and presentation models to engineering prototypes and custom components.',
		capabilities: [
			'High-detail prototyping with fine features',
			'Smooth surface finish for presentation models',
			'Precision components with tight dimensional accuracy',
			'Design validation and appearance evaluation',
		],
		deliverables: [
			'Print-ready high-resolution geometry',
			'SLA printed parts with smooth finish',
			'Design validation feedback',
			'Iteration recommendations',
		],
		workflow: [
			'Design review and detail requirement mapping',
			'Print preparation and resolution setup',
			'SLA printing and post-processing',
			'Validation review and next steps',
		],
		idealFor: [
			'Medical Devices and Consumer Products',
			'Electronics, Automotive, and Industrial Equipment',
			'Architecture and R&D presentation models',
		],
		tools: ['SLA printers', 'Stereolithography resins', 'Post-processing and finishing'],
		faqs: [
			{
				question: 'When should we choose SLA over FDM?',
				answer:
					'Choose SLA when appearance, fine detail, smooth surface finish, and high dimensional accuracy are critical to your prototype.',
			},
			{
				question: 'What is the turnaround?',
				answer:
					'We focus on quality, reliability, and quick turnaround so you can evaluate designs faster and reduce development time.',
			},
		],
	},
	{
		slug: 'slm',
		title: 'SLM Metal 3D Printing',
		category: 'Rapid Prototyping & Additive Manufacturing',
		tagline: 'Selective Laser Melting for high-strength metal components',
		shortDescription:
			'Precision-engineered metal parts with outstanding mechanical properties and dimensional accuracy.',
		heroDescription:
			'Transform complex designs into high-strength metal components with MechCurve SLM (Selective Laser Melting) 3D printing services. By selectively fusing fine metal powder layer by layer using advanced laser technology, we manufacture precision-engineered parts with outstanding mechanical properties and exceptional dimensional accuracy. SLM enables lightweight structures, intricate internal channels, and optimized geometries that enhance product performance while reducing material waste and manufacturing constraints.',
		capabilities: [
			'High-strength metal part production',
			'Lightweight and topology-optimized structures',
			'Intricate internal channels and complex geometries',
			'Functional prototypes, tooling, and low-volume production',
		],
		deliverables: [
			'Print-ready metal build geometry',
			'SLM printed metal components',
			'Dimensional and performance notes',
			'Production transition recommendations',
		],
		workflow: [
			'Design review and metal feasibility check',
			'Build preparation and support strategy',
			'SLM printing and post-processing',
			'Inspection and production-readiness handover',
		],
		idealFor: [
			'Aerospace and Automotive',
			'Medical and Energy',
			'Industrial and advanced engineering applications',
		],
		tools: ['SLM metal printers', 'Fine metal powders', 'Post-processing and inspection'],
		faqs: [
			{
				question: 'What can SLM produce?',
				answer:
					'SLM is ideal for functional prototypes, customized components, tooling, and low-volume production where precision and mechanical performance are critical.',
			},
			{
				question: 'Does SLM reduce lead times?',
				answer:
					'Yes. Metal additive manufacturing helps reduce lead times, improve design freedom, and accelerate innovation from concept validation to production-ready parts.',
			},
		],
	},
];

export const serviceDetailsBySlug: Record<string, ServiceDetail> =
	Object.fromEntries(serviceDetails.map((service) => [service.slug, service]));

export const serviceNavItems = serviceDetails.map((service) => ({
	slug: service.slug,
	title: service.title,
	category: service.category,
	shortDescription: service.shortDescription,
}));

// Full Homepage "Section 3: Services" structure. Items that have a detailed
// write-up in the content link to their /services/<slug> page; the rest (which
// the content lists but does not detail) link to the Services overview page,
// and CAD Training items link to the Career page.
export const servicesByCategory: Array<{
	title: ServiceCategory;
	description: string;
	items: Array<{ slug: string; title: string; href?: string }>;
}> = [
	{
		title: 'Design Services',
		description: 'Mechanical and product design services from concept to release.',
		items: [
			{ slug: 'product-development', title: 'Product Development' },
			{ slug: 'industrial-design', title: 'Industrial Design' },
			{
				slug: 'electro-mechanical-integration',
				title: 'Electro-Mechanical Integration',
			},
			{ slug: 'embedded-systems', title: 'Embedded Systems' },
			{ slug: 'reverse-engineering', title: 'Reverse Engineering' },
			{ slug: '3d-cad-modeling', title: '3D CAD Modeling' },
			{ slug: 'sheet-metal-design', title: 'Sheet-Metal Design' },
			{ slug: 'drafting-documentation', title: '2D Drafting & Documentation' },
		],
	},
	{
		title: 'Analysis Services',
		description: 'Validation-focused engineering analysis to reduce downstream risk.',
		items: [
			{ slug: 'product-analysis', title: 'Product Analysis' },
			{ slug: 'design-validation', title: 'Design Validation' },
			{ slug: 'cae-cfd', title: 'CAE/CFD' },
			{ slug: 'thermal-analysis', title: 'Thermal Analysis' },
		],
	},
	{
		title: 'Rapid Prototyping & Additive Manufacturing',
		description: 'Prototype faster and validate concepts efficiently.',
		items: [
			{ slug: 'fdm', title: 'FDM' },
			{ slug: 'sla', title: 'SLA' },
			{ slug: 'slm', title: 'SLM' },
		],
	},
	{
		title: 'CAD Training',
		description:
			'Industry-oriented training for students and professionals with international certification.',
		items: [
			{ slug: 'training-cad', title: 'CAD', href: '/career' },
			{ slug: 'training-gdt', title: 'GD&T', href: '/career' },
			{ slug: 'training-cae', title: 'CAE', href: '/career' },
			{ slug: 'training-cfd', title: 'CFD', href: '/career' },
		],
	},
];
