import Contact from '../components/Contact/Contact';
import useSeo from '../hooks/useSeo';

export default function ContactPage() {
	useSeo({
		title: 'Contact MechCurve | Project Consultation and Career Inquiry',
		description:
			'Get in touch with MechCurve for CAD projects, manufacturing-focused engineering support, and career program inquiries.',
		path: '/contact',
	});

	return (
		<div className="site-light-content pt-16 sm:pt-20">
			<Contact />
		</div>
	);
}
