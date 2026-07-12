export interface FaqItem {
	id: string;
	category: string;
	question: string;
	answer: string;
}

export interface WhatsAppChatMessage {
	id: string;
	sender: 'user' | 'brand';
	text: string;
	timestamp: string;
}

export interface WhatsAppQuickOption {
	id: string;
	category: string;
	title: string;
	description: string;
	message: string;
}

export const WHATSAPP_NUMBER = '919106297853';

export function buildWhatsAppUrl(message: string) {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const faqItems: FaqItem[] = [
	{
		id: 'mechanical-services',
		category: 'General',
		question: 'What mechanical design services does MechCurve provide?',
		answer:
			'MechCurve offers product development, industrial design, embedded systems, reverse engineering, 3D CAD modeling, drafting and documentation, rapid prototyping, and CAD training services.',
	},
	{
		id: 'industries-served',
		category: 'General',
		question: 'Which industries do you serve?',
		answer:
			'We support manufacturers, startups, OEMs, industrial equipment companies, and engineering professionals.',
	},
	{
		id: 'software-stack',
		category: 'Technical',
		question: 'Which CAD software do you use?',
		answer:
			'We primarily work with SolidWorks, NX, CATIA, and other industry-standard engineering tools.',
	},
	{
		id: 'rapid-prototyping-support',
		category: 'Technical',
		question: 'Can you help with rapid prototyping?',
		answer:
			'Yes. We assist clients with additive manufacturing and prototype validation using FDM, SLA, and SLM.',
	},
	{
		id: 'cad-beginners',
		category: 'CAD Training',
		question: 'Do you provide CAD training for beginners?',
		answer:
			'Yes. Our programs are designed for students, graduates, and working professionals. They are aligned with industry requirements and are customizable.',
	},
];

export const careerFaqItems: FaqItem[] = [
	{
		id: 'courses-offer',
		category: 'Courses & Training',
		question: 'What courses do you offer?',
		answer:
			'We offer industry-focused training programs, including SolidWorks (CSWA + CSWP - 4 Modules), GD&T basics, and customized learning tracks.',
	},
	{
		id: 'course-duration',
		category: 'Courses & Training',
		question: 'What is the duration of the courses?',
		answer:
			'The standard course duration is approximately one month, depending on selected modules and customization level.',
	},
	{
		id: 'course-certificate',
		category: 'Courses & Training',
		question: 'Do you provide certification?',
		answer:
			'Yes, we provide a completion certificate after successful evaluation and project submission.',
	},
	{
		id: 'training-mode',
		category: 'Location & Training Mode',
		question: 'Do you offer online or offline classes?',
		answer:
			'We provide both online and offline training options, so students can pick the format that suits their schedule.',
	},
	{
		id: 'course-enrollment',
		category: 'Enrollment & Demo',
		question: 'How can I enroll in your courses?',
		answer:
			'Share your name, education background, and contact number. Our team will guide you through batch selection and enrollment.',
	},
	{
		id: 'demo-class',
		category: 'Enrollment & Demo',
		question: 'Do you offer demo classes?',
		answer:
			'Yes, demo sessions are available. Contact us to get available slots and session format details.',
	},
];

export const whatsappChatMessages: WhatsAppChatMessage[] = [
	{
		id: 'm1',
		sender: 'user',
		text: 'Hi, what services does MechCurve offer?',
		timestamp: '09:12',
	},
	{
		id: 'm2',
		sender: 'brand',
		text: 'We provide mechanical design solutions, SolidWorks training, 3D printing, and manufacturing support for students, startups, and small businesses.',
		timestamp: '09:13',
	},
	{
		id: 'm3',
		sender: 'user',
		text: 'What kind of training programs do you offer?',
		timestamp: '09:14',
	},
	{
		id: 'm4',
		sender: 'brand',
		text: 'We offer SolidWorks (CSWA + CSWP - 4 Modules), GD&T Basics, and customized courses tailored to individual or company needs.',
		timestamp: '09:15',
	},
	{
		id: 'm5',
		sender: 'user',
		text: 'How long is the course and do you provide certification?',
		timestamp: '09:16',
	},
	{
		id: 'm6',
		sender: 'brand',
		text: 'The standard duration is about one month, depending on the selected modules. Yes, we provide an internationally recognized certificate after successful completion.',
		timestamp: '09:17',
	},
	{
		id: 'm7',
		sender: 'user',
		text: 'Do you also handle client projects and product development?',
		timestamp: '09:18',
	},
	{
		id: 'm8',
		sender: 'brand',
		text: 'Yes. We handle 3D modeling, 2D drafting, sheet metal design, and full product development support with manufacturing-focused execution.',
		timestamp: '09:19',
	},
	{
		id: 'm9',
		sender: 'user',
		text: 'Where do you operate, and are classes online or offline?',
		timestamp: '09:20',
	},
	{
		id: 'm10',
		sender: 'brand',
		text: 'We operate in Vadodara, Ahmedabad, and Surat. We offer both online and offline training options.',
		timestamp: '09:21',
	},
	{
		id: 'm11',
		sender: 'user',
		text: 'How can I enroll or book a demo session?',
		timestamp: '09:22',
	},
	{
		id: 'm12',
		sender: 'brand',
		text: 'Share your name and contact number with us, and our team will guide you through enrollment. Demo sessions are also available on request.',
		timestamp: '09:23',
	},
];

export const faqCategoryOrder = [
	'General',
	'Technical',
	'CAD Training',
];

export const whatsappQuickOptions: WhatsAppQuickOption[] = [
	{
		id: 'training-course',
		category: 'Courses & Training',
		title: 'SolidWorks Course Details',
		description: 'Modules, batch structure, customization, and learning flow.',
		message:
			'Hi MechCurve! I want details about your SolidWorks course, modules, and batch structure.',
	},
	{
		id: 'training-duration',
		category: 'Courses & Training',
		title: 'Duration and Fees',
		description: 'Course duration, schedule, and training plan discussion.',
		message:
			'Hi MechCurve! Please share the course duration, timing, and fee details for training.',
	},
	{
		id: 'training-demo',
		category: 'Enrollment & Demo',
		title: 'Book Demo Session',
		description: 'Request a demo class before enrollment.',
		message:
			'Hi MechCurve! I would like to book a demo session. Please share the available slots.',
	},
	{
		id: 'training-enroll',
		category: 'Enrollment & Demo',
		title: 'Enroll in Course',
		description: 'Start enrollment with name and contact details.',
		message:
			'Hi MechCurve! I want to enroll in a course. Please guide me with the enrollment process.',
	},
	{
		id: 'design-project',
		category: 'Design Services',
		title: 'Design Project Inquiry',
		description: '3D modeling, drafting, sheet metal, and product development.',
		message:
			'Hi MechCurve! I have a design project requirement. I want to discuss 3D modeling / drafting / product development support.',
	},
	{
		id: 'design-manufacturing',
		category: 'Design Services',
		title: 'Manufacturing Support',
		description:
			'Fabrication-ready output, manufacturing support, and execution.',
		message:
			'Hi MechCurve! I want to discuss manufacturing support and fabrication-ready design deliverables.',
	},
	{
		id: 'company-services',
		category: 'About Our Company',
		title: 'Company Services',
		description: 'Understand everything MechCurve offers.',
		message:
			'Hi MechCurve! Please share the full list of services your company offers.',
	},
	{
		id: 'locations-mode',
		category: 'Location & Training Mode',
		title: 'Locations and Mode',
		description: 'Online, offline, and supported locations.',
		message:
			'Hi MechCurve! Please share your locations and whether classes are online or offline.',
	},
];
