import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '../SmoothScroll/SmoothScroll';

// Only /faq still renders the HomePage and relies on section-scrolling; every
// other route is a standalone page that should open at the top.
const SECTION_PATHS = ['/faq'];

// SSR-safe: useLayoutEffect warns during server render, where there is no layout.
const useIsomorphicLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ScrollToTop() {
	const { pathname, hash } = useLocation();
	const lenis = useLenis();

	useEffect(() => {
		// The browser defaults to scrollRestoration: 'auto', which restores the
		// previous scroll offset on back/forward *after* React has rendered — it
		// lands you mid-page and overwrites any scroll-to-top we do. Taking manual
		// control is what actually fixes back navigation.
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}
	}, []);

	useIsomorphicLayoutEffect(() => {
		if (SECTION_PATHS.includes(pathname)) return;
		// An in-page anchor (e.g. the blog table of contents) must be left alone.
		if (hash) return;

		const toTop = () => {
			if (lenis) {
				lenis.scrollTo(0, { immediate: true, force: true });
			}
			window.scrollTo(0, 0);
		};

		toTop();
		// Run again after paint: images and late-mounting content can shift layout
		// and nudge the scroll position back down on the first frame.
		const frame = requestAnimationFrame(toTop);
		return () => cancelAnimationFrame(frame);
	}, [pathname, hash, lenis]);

	return null;
}
