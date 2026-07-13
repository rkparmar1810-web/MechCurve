import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Pauses CSS animations inside sections that are off-screen.
 *
 * The site runs ~30 `infinite` keyframe animations (drifting grids, orbiting
 * rings, pulsing nodes, blobs). The browser keeps ticking every one of them
 * regardless of whether it is in the viewport, so scrolling anywhere on the
 * page pays for the animations on every *other* section too. Toggling
 * `animation-play-state` off-screen hands those frames back to the scroll.
 *
 * Paired with the `.anim-paused` rule in index.css.
 */
export default function useOffscreenAnimationPause() {
	const { pathname } = useLocation();

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (!('IntersectionObserver' in window)) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					entry.target.classList.toggle('anim-paused', !entry.isIntersecting);
				}
			},
			// Resume a little before the section scrolls into view so nothing
			// visibly "starts" mid-motion at the edge of the viewport.
			{ rootMargin: '200px 0px' },
		);

		// Sections are swapped wholesale on navigation, so a per-route scan is
		// enough — a MutationObserver here would re-run on every React commit and
		// cost more than it saves.
		const targets = document.querySelectorAll('section, footer');
		targets.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, [pathname]);
}
