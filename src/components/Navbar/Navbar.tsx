import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuArrowRight, LuChevronDown, LuMenu, LuX } from 'react-icons/lu';
import { AnimatePresence, motion } from 'framer-motion';
import { servicesByCategory } from '../../data/servicesContent';
import { CATEGORY_META, SERVICE_META } from '../../data/serviceMenuMeta';
import ServicesMegaMenu from './ServicesMegaMenu';

const LINKS = [
	{ label: 'About', id: 'about' },
	{ label: 'Services', id: 'services' },
	{ label: 'Career', id: 'career' },
	{ label: 'Contact', id: 'contact' },
	{ label: 'Blog', id: 'blog' },
];

function getActiveSectionId(pathname: string) {
	if (pathname.startsWith('/services/')) return 'services';
	if (pathname.startsWith('/blog/')) return 'blog';
	if (pathname === '/') return '';
	const matchedLink = LINKS.find((link) => `/${link.id}` === pathname);
	return matchedLink?.id ?? '';
}

export default function Navbar() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [servicesOpen, setServicesOpen] = useState(false);
	const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
	const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null);
	const activeSection = getActiveSectionId(pathname);

	// The homepage is the only route with a dark hero, so the navbar can be
	// transparent there (until scrolled). Every other page has a light hero,
	// so the navbar must be solid for the logo/links to stay visible.
	const solid = scrolled || pathname !== '/';

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		setOpen(false);
		setServicesOpen(false);
		setMobileServicesOpen(false);
		setMobileActiveCategory(null);
	}, [pathname]);

	const goto = (to: string) => {
		navigate(to);
		setServicesOpen(false);
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 border-b ${
				solid
					? 'bg-[#06080D]/85 backdrop-blur-md border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
					: 'bg-transparent border-transparent'
			}`}
		>
			<div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
				<Link
					to="/"
					className="flex items-center gap-2 min-w-0 hover:opacity-90 transition-opacity shrink-0"
				>
					<img
						src="/logo.webp"
						alt="MechCurve"
						className="h-9 sm:h-10 md:h-12 w-auto flex-shrink-0"
					/>
					<div className="flex flex-col text-left min-w-0">
						<span className="block font-extrabold leading-none tracking-tight text-sm sm:text-base md:text-lg transition-colors duration-500 text-white truncate max-w-[100px] xs:max-w-[140px] sm:max-w-[160px] md:max-w-none">
							MechCurve
						</span>
						<span className="hidden sm:block text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-0.5 transition-colors duration-500 text-slate-400">
							Engineering Solutions
						</span>
					</div>
				</Link>

				<div className="flex-1 hidden md:flex justify-center">
					<nav className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-500 border border-white/[0.08] bg-white/[0.04] backdrop-blur-md">
						{LINKS.map((l) => {
							if (l.id === 'services') {
								const isActive = activeSection === 'services';

								return (
									<div
										key={l.label}
										className="relative"
										onMouseEnter={() => setServicesOpen(true)}
										onMouseLeave={() => setServicesOpen(false)}
									>
										<button
											type="button"
											onClick={() => navigate('/services')}
											className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 transition-all duration-300 text-sm font-medium border-0 cursor-pointer ${
												isActive
													? 'text-[#EAC117] bg-white/[0.08]'
													: 'text-slate-400 bg-transparent hover:text-[#EAC117] hover:bg-white/[0.06]'
											}`}
										>
											<span>Services</span>
											<LuChevronDown
												size={14}
												className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
											/>
										</button>

										<AnimatePresence>
											{servicesOpen && (
												<motion.div
													className="absolute left-1/2 top-full z-50 pt-3"
													style={{ x: '-50%' }}
													initial={{ opacity: 0, y: 8, scale: 0.99 }}
													animate={{ opacity: 1, y: 0, scale: 1 }}
													exit={{ opacity: 0, y: 6, scale: 0.99 }}
													transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
												>
													<ServicesMegaMenu onNavigate={goto} />
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								);
							}

							return (
								<button
									key={l.label}
									type="button"
									onClick={() => navigate(`/${l.id}`)}
									className={`rounded-lg px-4 py-2 transition-all duration-300 text-sm font-medium border-0 cursor-pointer ${
										activeSection === l.id
											? 'text-[#EAC117] bg-white/[0.08]'
											: 'text-slate-400 bg-transparent hover:text-[#EAC117] hover:bg-white/[0.06]'
									}`}
								>
									{l.label}
								</button>
							);
						})}
					</nav>
				</div>

				<div className="flex items-center gap-3 sm:gap-4 shrink-0">
					<a
						href="mailto:admin@mechcurve.com"
						className="hidden md:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-[#06080D] transition-all duration-300 bg-gradient-to-r from-[#EAC117] to-[#F59E0B] shadow-[0_4px_20px_rgba(234,193,23,0.25)] hover:shadow-[0_6px_28px_rgba(234,193,23,0.4)] hover:-translate-y-0.5"
					>
						Get in Touch
					</a>

					<button
						type="button"
						onClick={() => {
							setOpen(!open);
							if (open) {
								setMobileServicesOpen(false);
								setMobileActiveCategory(null);
							}
						}}
						className="md:hidden rounded-lg p-2 sm:p-2.5 transition-colors border border-white/[0.1] bg-white/[0.05] text-slate-300 hover:text-[#EAC117] hover:bg-white/[0.08]"
						aria-label="Toggle menu"
					>
						{open ? <LuX size={22} /> : <LuMenu size={22} />}
					</button>
				</div>
			</div>

			{/* ── Mobile menu ── */}
			<AnimatePresence>
				{open && (
					<motion.nav
						className="md:hidden border-b border-white/[0.06] bg-[#06080D]/97 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
					>
						<div className="max-h-[calc(100vh-72px)] overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3">
							{LINKS.map((l) => {
								if (l.id === 'services') {
									const isActive = activeSection === 'services';
									return (
										<div key={l.label} className="space-y-2">
											<button
												type="button"
												onClick={() => {
													setMobileServicesOpen((prev) => !prev);
													if (mobileServicesOpen) setMobileActiveCategory(null);
												}}
												className={`flex w-full items-center justify-between rounded-xl border px-3 sm:px-4 py-3 transition-colors duration-300 text-left cursor-pointer text-sm sm:text-base font-medium ${
													isActive || mobileServicesOpen
														? 'text-[#EAC117] border-[#EAC117]/25 bg-[#EAC117]/[0.08]'
														: 'text-slate-300 border-white/[0.06] bg-white/[0.03] hover:text-[#EAC117] hover:border-[#EAC117]/20'
												}`}
											>
												<span>Services</span>
												<LuChevronDown
													size={16}
													className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`}
												/>
											</button>

											<AnimatePresence>
												{mobileServicesOpen && (
													<motion.div
														initial={{ opacity: 0, height: 0 }}
														animate={{ opacity: 1, height: 'auto' }}
														exit={{ opacity: 0, height: 0 }}
														transition={{ duration: 0.24 }}
														className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.015]"
													>
														<div className="space-y-2 p-2">
															{servicesByCategory.map((category, ci) => {
																const CatIcon = CATEGORY_META[ci].icon;
																const isCategoryOpen = mobileActiveCategory === category.title;
																return (
																	<div
																		key={category.title}
																		className="overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]"
																	>
																		<button
																			type="button"
																			onClick={() =>
																				setMobileActiveCategory((prev) =>
																					prev === category.title ? null : category.title,
																				)
																			}
																			className="flex w-full items-center gap-2.5 px-3 py-3 text-left"
																		>
																			<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-[#EAC117]/[0.1] text-[#EAC117]">
																				<CatIcon size={15} />
																			</span>
																			<span className="flex-1 min-w-0">
																				<span className="block text-sm font-semibold text-slate-100">
																					{category.title}
																				</span>
																				<span className="block text-[11px] text-slate-500">
																					{category.items.length} services
																				</span>
																			</span>
																			<LuChevronDown
																				size={15}
																				className={`shrink-0 text-slate-400 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}
																			/>
																		</button>

																		<AnimatePresence>
																			{isCategoryOpen && (
																				<motion.div
																					initial={{ opacity: 0, height: 0 }}
																					animate={{ opacity: 1, height: 'auto' }}
																					exit={{ opacity: 0, height: 0 }}
																					transition={{ duration: 0.2 }}
																					className="overflow-hidden border-t border-white/[0.06]"
																				>
																					<div className="space-y-1 p-2">
																						{category.items.map((service) => {
																							const sm = SERVICE_META[service.slug];
																							const Icon = sm?.icon;
																							return (
																								<button
																									key={service.slug}
																									type="button"
																									onClick={() => {
																										navigate(service.href ?? `/services/${service.slug}`);
																										setOpen(false);
																										setMobileServicesOpen(false);
																										setMobileActiveCategory(null);
																									}}
																									className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-white/[0.04]"
																								>
																									<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.04] text-[#EAC117]">
																										{Icon ? <Icon size={14} /> : null}
																									</span>
																									<span className="min-w-0 flex-1">
																										<span className="flex items-center gap-1.5">
																											<span className="text-sm font-semibold text-slate-200">
																												{service.title}
																											</span>
																											{sm?.popular && (
																												<span className="rounded-full bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-wide text-[#06080D]">
																													Popular
																												</span>
																											)}
																										</span>
																										{sm?.blurb && (
																											<span className="block truncate text-[11px] text-slate-500">
																												{sm.blurb}
																											</span>
																										)}
																									</span>
																								</button>
																							);
																						})}
																					</div>
																				</motion.div>
																			)}
																		</AnimatePresence>
																	</div>
																);
															})}

															<button
																type="button"
																onClick={() => {
																	navigate('/services');
																	setOpen(false);
																	setMobileServicesOpen(false);
																}}
																className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#EAC117]/25 bg-[#EAC117]/[0.08] px-3 py-2.5 text-sm font-bold text-[#EAC117]"
															>
																View All Services
																<LuArrowRight size={15} />
															</button>
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									);
								}

								return (
									<button
										key={l.label}
										type="button"
										onClick={() => {
											navigate(`/${l.id}`);
											setOpen(false);
										}}
										className={`block rounded-xl border px-3 sm:px-4 py-3 transition-colors duration-300 w-full text-left cursor-pointer text-sm sm:text-base font-medium ${
											activeSection === l.id
												? 'text-[#EAC117] border-[#EAC117]/25 bg-[#EAC117]/[0.08]'
												: 'text-slate-300 border-white/[0.06] bg-white/[0.03] hover:text-[#EAC117] hover:border-[#EAC117]/20'
										}`}
									>
										{l.label}
									</button>
								);
							})}
						</div>

						{/* sticky CTA */}
						<div className="sticky bottom-0 border-t border-white/[0.06] bg-[#06080D]/95 px-4 py-3 sm:px-6">
							<a
								href="mailto:admin@mechcurve.com"
								className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm sm:text-base font-semibold text-[#06080D] bg-gradient-to-r from-[#EAC117] to-[#F59E0B] shadow-[0_4px_20px_rgba(234,193,23,0.25)]"
								onClick={() => setOpen(false)}
							>
								Get in Touch
								<LuArrowRight size={16} />
							</a>
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
}
