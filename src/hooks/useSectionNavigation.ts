import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SECTION_PATHS = [
	{ id: 'home', path: '/' },
	{ id: 'about', path: '/about' },
	{ id: 'services', path: '/services' },
	{ id: 'portfolio', path: '/portfolio' },
	{ id: 'testimonials', path: '/testimonials' },
	{ id: 'faq', path: '/faq' },
	{ id: 'contact', path: '/contact' },
];

function getSectionIdFromPath(pathname: string) {
	const found = SECTION_PATHS.find((s) => s.path === pathname);
	return found ? found.id : 'home';
}

function getPathFromSectionId(id: string) {
	const found = SECTION_PATHS.find((s) => s.id === id);
	return found ? found.path : '/';
}

function getNavbarHeight() {
	const header = document.querySelector('header');
	return header?.clientHeight ?? 96;
}

export default function useSectionNavigation() {
	const location = useLocation();
	const navigate = useNavigate();

	// Scroll to section on path change
	useEffect(() => {
		const id = getSectionIdFromPath(location.pathname);
		if (!id) return;
		// Wait for DOM update
		setTimeout(() => {
			const el = document.getElementById(id);
			if (el) {
				const navbarHeight = getNavbarHeight();
				const y =
					el.getBoundingClientRect().top + window.scrollY - navbarHeight;
				window.scrollTo({ top: y, behavior: 'auto' });
			}
		}, 0);
	}, [location.pathname]);

	// Update URL on scroll using IntersectionObserver
	const lastSection = useRef<string>('home');
	useEffect(() => {
		const sectionIds = SECTION_PATHS.map((s) => s.id);
		const sections = sectionIds
			.map((id) => document.getElementById(id))
			.filter(Boolean) as HTMLElement[];
		if (sections.length === 0) return;

		let ticking = false;
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					let currentSection = sectionIds[0];
					for (let i = 0; i < sections.length; i++) {
						const rect = sections[i].getBoundingClientRect();
						if (rect.top <= 130 && rect.bottom > 130) {
							currentSection = sectionIds[i];
							break;
						}
					}
					if (lastSection.current !== currentSection) {
						lastSection.current = currentSection;
						const newPath = getPathFromSectionId(currentSection);
						if (location.pathname !== newPath) {
							window.history.replaceState(null, '', newPath);
						}
					}
					ticking = false;
				});
				ticking = true;
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [location.pathname]);

	// Helper for Navbar/Footer
	const navigateToSection = (id: string) => {
		const path = getPathFromSectionId(id);
		// Always update the URL, even if already on the same path
		navigate(path, { replace: true });
	};

	return { navigateToSection };
}
