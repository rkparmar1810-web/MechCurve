import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function ScrollIndicator() {
	const [visible, setVisible] = useState(true);
	const { pathname } = useLocation();
	const hideOnThisPage = pathname === '/career';

	useEffect(() => {
		if (hideOnThisPage) {
			setVisible(false);
			return;
		}

		const onScroll = () => {
			const eng = document.getElementById('engineering');
			if (eng) {
				const rect = eng.getBoundingClientRect();
				// Hide once the engineering section top reaches viewport
				setVisible(rect.top > window.innerHeight * 0.5);
			}
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [hideOnThisPage]);

	if (hideOnThisPage) return null;

	const scrollToEngineering = () => {
		const el = document.getElementById('engineering');
		if (el) {
			const navH = 80;
			const y = el.getBoundingClientRect().top + window.scrollY - navH;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					className="fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-0 p-0"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10 }}
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					onClick={scrollToEngineering}
					aria-label="Scroll to next section"
				>
					<span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded">
						Scroll
					</span>
					<motion.div
						className="h-7 w-[2px] rounded-full bg-gradient-to-b from-amber-400 to-transparent"
						animate={{ scaleY: [0, 1, 0] }}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
						style={{ transformOrigin: 'top' }}
					/>
				</motion.button>
			)}
		</AnimatePresence>
	);
}
