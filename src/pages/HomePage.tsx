import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import EngineeringOverview from '../components/EngineeringOverview/EngineeringOverview';
import About from '../components/About/About';
import ServicesStackSection from '../components/ServicesStack/ServicesStackSection';
import Portfolio from '../components/Portfolio/Portfolio';
import Testimonials from '../components/Testimonials/Testimonials';
import FaqSection from '../components/FaqSection/FaqSection';
import Contact from '../components/Contact/Contact.tsx';
import SectionDivider from '../components/SectionDivider/SectionDivider';
import { serviceCards } from '../data/detailContent';
import { faqItems } from '../data/faqContent';
import useSectionNavigation from '../hooks/useSectionNavigation';
import useSeo from '../hooks/useSeo';
import useStructuredData from '../hooks/useStructuredData';

// const SECTION_IDS = ['home', 'about', 'services', 'portfolio', 'contact']

export default function HomePage() {
	const { pathname } = useLocation();
	useSectionNavigation();
	const siteUrl = 'https://design-maniach-aiew.vercel.app';

	const seoByPath: Record<string, { title: string; description: string }> = {
		'/': {
			title:
				'MechCurve | Mechanical Design Engineering & SolidWorks Training',
			description:
				'MechCurve offers mechanical CAD engineering, SolidWorks training, manufacturing-ready deliverables, and mentorship for students and teams.',
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
	};

	const seo = seoByPath[pathname] ?? seoByPath['/'];
	useSeo({ title: seo.title, description: seo.description, path: pathname });

	const organizationJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'MechCurve',
		url: siteUrl,
		logo: `${siteUrl}/logo.png`,
		email: 'admin@mechcurve.com',
		sameAs: [
			'https://www.linkedin.com/company/design-maniach/',
			'https://www.instagram.com/design_maniach?igsh=MTBhODZ6Y2swcjdyYg==',
		],
	};

	const websiteJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'MechCurve',
		url: siteUrl,
	};

	const webPageJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: seo.title,
		description: seo.description,
		url: `${siteUrl}${pathname}`,
		isPartOf: {
			'@type': 'WebSite',
			name: 'MechCurve',
			url: siteUrl,
		},
	};

	const servicesItemListJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'MechCurve Services',
		itemListElement: serviceCards.map((service, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			url: `${siteUrl}/services/${service.id}`,
			name: service.title,
		})),
	};

	const localBusinessJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'MechCurve',
		url: siteUrl,
		logo: `${siteUrl}/logo.png`,
		image: `${siteUrl}/logo.png`,
		email: 'admin@mechcurve.com',
		telephone: '+91 91062 97853',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Surat',
			addressRegion: 'Gujarat',
			addressCountry: 'IN',
		},
		areaServed: {
			'@type': 'Country',
			name: 'India',
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: [
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
				],
				opens: '09:00',
				closes: '19:00',
			},
		],
		sameAs: [
			'https://www.linkedin.com/company/design-maniach/',
			'https://www.instagram.com/design_maniach?igsh=MTBhODZ6Y2swcjdyYg==',
		],
	};

	const faqJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};

	useStructuredData('organization', organizationJsonLd);
	useStructuredData('website', websiteJsonLd);
	useStructuredData('webpage', webPageJsonLd);
	useStructuredData('services-list', servicesItemListJsonLd);
	useStructuredData('local-business', localBusinessJsonLd);
	useStructuredData('faq', faqJsonLd);

	return (
		<>
			<Hero />
			<SectionDivider variant="cinematic-burst" text="Engineering Excellence" />
			<EngineeringOverview />
			<SectionDivider variant="fog-reveal" text="Our Story" />
			<About />
			<SectionDivider variant="energy-sweep" text="What We Offer" />
			<ServicesStackSection />
			<SectionDivider variant="morph-shape" text="Our Work" />
			<Portfolio />
			<SectionDivider variant="glass-panel" text="Client Voices" />
			<Testimonials />
			<SectionDivider variant="split-panel" text="Got Questions?" />
			<FaqSection />
			<SectionDivider variant="perspective-tilt" text="Let's Connect" />
			<Contact />
		</>
	);
}
