import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import EngineeringOverview from '../components/EngineeringOverview/EngineeringOverview';
import ServicesStackSection from '../components/ServicesStack/ServicesStackSection';
import WhyChoose from '../components/WhyChoose/WhyChoose';
import EngineeringProcess from '../components/EngineeringProcess/EngineeringProcess';
import TrainingPrograms from '../components/TrainingPrograms/TrainingPrograms';
import FaqSection from '../components/FaqSection/FaqSection';
import SectionDivider from '../components/SectionDivider/SectionDivider';
import { serviceNavItems } from '../data/servicesContent';
import { faqItems, careerFaqItems } from '../data/faqContent';
import useSectionNavigation from '../hooks/useSectionNavigation';
import useSeo from '../hooks/useSeo';
import useStructuredData from '../hooks/useStructuredData';

// const SECTION_IDS = ['home', 'about', 'services', 'portfolio', 'contact']

export default function HomePage() {
	const { pathname } = useLocation();
	useSectionNavigation();
	const siteUrl = 'https://mechcurve.com';

	const seoByPath: Record<string, { title: string; description: string }> = {
		'/': {
			title:
				'MechCurve | Mechanical Design Engineering & SolidWorks Training',
			description:
				'MechCurve offers mechanical CAD engineering, manufacturing-ready deliverables, and dedicated career training guidance for students and teams.',
		},
		'/faq': {
			title: 'FAQ | MechCurve',
			description:
				'Answers to common questions about MechCurve services, industries served, CAD software, rapid prototyping, and CAD training.',
		},
	};

	const seo = seoByPath[pathname] ?? seoByPath['/'];
	useSeo({ title: seo.title, description: seo.description, path: pathname });

	const organizationJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'MechCurve',
		url: siteUrl,
		logo: `${siteUrl}/logo.webp`,
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
		itemListElement: serviceNavItems.map((service, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			url: `${siteUrl}/services/${service.slug}`,
			name: service.title,
		})),
	};

	const localBusinessJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'MechCurve',
		url: siteUrl,
		logo: `${siteUrl}/logo.webp`,
		image: `${siteUrl}/logo.webp`,
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
		mainEntity: [...faqItems, ...careerFaqItems].map((item) => ({
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
			<div className="site-light-content">
				<SectionDivider variant="cinematic-burst" text="Who We Help" />
				<EngineeringOverview />
				<SectionDivider variant="cinematic-burst" text="Services" />
				<ServicesStackSection />
				<SectionDivider variant="cinematic-burst" text="Why MechCurve" />
				<WhyChoose />
				<SectionDivider variant="cinematic-burst" text="Engineering Process" />
				<EngineeringProcess />
				<SectionDivider variant="cinematic-burst" text="CAD Training" />
				<TrainingPrograms />
				<SectionDivider variant="cinematic-burst" text="Got Questions?" />
				<FaqSection />
			</div>
		</>
	);
}
