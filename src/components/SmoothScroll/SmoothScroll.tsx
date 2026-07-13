import { useEffect, useState, createContext, useContext } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
	return useContext(LenisContext);
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
		// Respect reduced-motion preference
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const instance = new Lenis({
			duration: 1.2,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			touchMultiplier: 2,
		});

		setLenis(instance);

		let frame = requestAnimationFrame(function raf(time: number) {
			instance.raf(time);
			frame = requestAnimationFrame(raf);
		});

		return () => {
			cancelAnimationFrame(frame);
			instance.destroy();
			setLenis(null);
		};
	}, []);

	return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
