import { useEffect, useState, createContext, useContext } from 'react';
import { frame, cancelFrame } from 'framer-motion';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
	return useContext(LenisContext);
}

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Module-level handle so call sites outside the provider can scroll *through*
// Lenis. Native `window.scrollTo({ behavior: 'smooth' })` runs its own
// animation and fights Lenis for the scroll position mid-flight, which reads as
// a stutter or a snap.
let activeLenis: Lenis | null = null;

export function scrollToY(target: number | HTMLElement, offset = 0) {
	if (activeLenis) {
		activeLenis.scrollTo(target, { offset });
		return;
	}
	const top =
		typeof target === 'number'
			? target + offset
			: target.getBoundingClientRect().top + window.scrollY + offset;
	window.scrollTo({
		top,
		behavior: prefersReducedMotion() ? 'auto' : 'smooth',
	});
}

export default function SmoothScroll({
	children,
}: {
	children: React.ReactNode;
}) {
	// State, not a ref: the instance is created in an effect, and a ref mutation
	// does not re-render — so consumers of the context would have kept reading the
	// initial `null` forever and never got hold of the Lenis instance.
	const [lenis, setLenis] = useState<Lenis | null>(null);

	useEffect(() => {
		if (prefersReducedMotion()) return;

		const instance = new Lenis({
			// lerp rather than a fixed `duration`: it is frame-rate independent and
			// settles without the long glide tail, so the page stops when the wheel
			// stops instead of coasting past the target.
			lerp: 0.1,
			wheelMultiplier: 1,
			touchMultiplier: 1.5,
			autoRaf: false,
		});

		activeLenis = instance;
		setLenis(instance);

		// Tick Lenis from Framer Motion's frame loop instead of a standalone rAF.
		// On its own rAF, Lenis commits the new scroll position *after* Framer has
		// already sampled `useScroll` for that frame, so every scroll-linked
		// animation renders one frame stale — the lag you feel on the progress bar
		// and parallax. Sharing one loop puts the read and the write in the same
		// frame. The `true` keeps the callback subscribed across frames.
		const update = ({ timestamp }: { timestamp: number }) => {
			instance.raf(timestamp);
		};
		frame.update(update, true);

		return () => {
			cancelFrame(update);
			instance.destroy();
			activeLenis = null;
			setLenis(null);
		};
	}, []);

	return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
