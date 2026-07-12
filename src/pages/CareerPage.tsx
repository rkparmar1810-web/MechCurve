import Career from '../components/Career/Career';
import useSeo from '../hooks/useSeo';

export default function CareerPage() {
	useSeo({
		title: 'Career | Training and Mentorship at MechCurve',
		description:
			'Explore student training, mentorship, placement preparation, and certification guidance in one dedicated career section.',
		path: '/career',
	});

	return (
		<div className="site-light-content">
			<Career />
		</div>
	);
}