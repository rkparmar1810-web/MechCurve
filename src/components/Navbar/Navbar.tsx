import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuMenu, LuX } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import useSectionNavigation from '../../hooks/useSectionNavigation';

const LINKS = [
	{ label: 'About', id: 'about' },
	{ label: 'Services', id: 'services' },
	{ label: 'Portfolio', id: 'portfolio' },
	{ label: 'Contact', id: 'contact' },
];

export default function Navbar() {
	const { navigateToSection } = useSectionNavigation();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string>('');
	const { pathname } = useLocation();
	const isDetailPage =
		pathname.startsWith('/projects/') || pathname.startsWith('/services/');
	const solid = scrolled || isDetailPage;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// Track active section via IntersectionObserver
	useEffect(() => {
		if (isDetailPage) return;
		const sectionIds = LINKS.map((l) => l.id);
		const elements = sectionIds
			.map((id) => document.getElementById(id))
			.filter(Boolean) as HTMLElement[];
		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible.length > 0) {
					setActiveSection(visible[0].target.id);
				} else {
					// No tracked section is visible — clear highlight
					setActiveSection('');
				}
			},
			{ rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [isDetailPage, pathname]);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
				solid
					? 'bg-[#06080D]/85 backdrop-blur-xl border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
					: 'bg-transparent border-transparent'
			}`}
		>
			<div className="max-w-[1440px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between gap-6">
				<Link
					to="/"
					className="flex items-center gap-3 hover:opacity-90 transition-opacity"
				>
					<img
						src="/logo.png"
						alt="MechCurve"
						className="h-10 sm:h-12 w-auto flex-shrink-0"
					/>
					<div className="hidden sm:block text-left">
						<span
							className="block font-extrabold leading-none tracking-tight text-lg transition-colors duration-500 text-white"
						>
							MechCurve
						</span>
						<span
							className="block text-[10px] font-semibold uppercase tracking-[0.2em] mt-0.5 transition-colors duration-500 text-slate-400"
						>
							Engineering Solutions
						</span>
					</div>
				</Link>

				<nav
					className={`hidden md:flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-500 ${solid ? 'border border-white/[0.08] bg-white/[0.04] backdrop-blur-md' : 'border border-white/[0.08] bg-white/[0.04] backdrop-blur-md'}`}
				>
					{LINKS.map((l) => (
						<button
							key={l.label}
							onClick={() => {
								navigateToSection(l.id);
							}}
							className={`rounded-lg px-4 py-2 transition-all duration-300 text-sm font-medium border-0 cursor-pointer ${
								activeSection === l.id
									? 'text-[#EAC117] bg-white/[0.08]'
									: 'text-slate-400 bg-transparent hover:text-[#EAC117] hover:bg-white/[0.06]'
							}`}
							type="button"
						>
							{l.label}
						</button>
					))}
				</nav>

				<div className="flex items-center gap-4">
					<a
						href="mailto:admin@mechcurve.com"
						className="hidden md:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-[#06080D] transition-all duration-300 bg-gradient-to-r from-[#EAC117] to-[#F59E0B] shadow-[0_4px_20px_rgba(234,193,23,0.25)] hover:shadow-[0_6px_28px_rgba(234,193,23,0.4)] hover:-translate-y-0.5"
					>
						Get in Touch
					</a>

					<button
						onClick={() => setOpen(!open)}
						className="md:hidden rounded-lg p-2.5 transition-colors border border-white/[0.1] bg-white/[0.05] text-slate-300 hover:text-[#EAC117] hover:bg-white/[0.08]"
						aria-label="Toggle menu"
					>
						{open ? <LuX size={24} /> : <LuMenu size={24} />}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{open && (
					<motion.nav
						className="md:hidden border-b border-white/[0.06] bg-[#06080D]/95 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
					>
						{' '}
						<div className="max-w-[1440px] mx-auto px-6 py-4 space-y-3">
							{LINKS.map((l) => (
								<button
									key={l.label}
									onClick={() => {
										navigateToSection(l.id);
										setOpen(false);
									}}
									className={`block rounded-xl border px-4 py-3 transition-colors duration-300 w-full text-left cursor-pointer ${
										activeSection === l.id
											? 'text-[#EAC117] border-[#EAC117]/25 bg-[#EAC117]/[0.08]'
											: 'text-slate-400 border-white/[0.06] bg-white/[0.03] hover:text-[#EAC117] hover:border-[#EAC117]/20'
									}`}
									type="button"
								>
									{l.label}
								</button>
							))}
							<a
								href="mailto:admin@mechcurve.com"
									className="block text-center mt-4 rounded-xl px-4 py-3 text-sm font-semibold text-[#06080D] bg-gradient-to-r from-[#EAC117] to-[#F59E0B] shadow-[0_4px_20px_rgba(234,193,23,0.25)]"
								onClick={() => setOpen(false)}
							>
								Get in Touch
							</a>
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
}
