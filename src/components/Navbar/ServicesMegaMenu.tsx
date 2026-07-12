import {
	useState,
	type CSSProperties,
	type MouseEvent as ReactMouseEvent,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu';
import { servicesByCategory } from '../../data/servicesContent';
import {
	CAD_BADGES,
	CATEGORY_META,
	MENU_TONES,
	SERVICE_META,
} from '../../data/serviceMenuMeta';
import './ServicesMegaMenu.scss';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServicesMegaMenu({
	onNavigate,
}: {
	onNavigate: (to: string) => void;
}) {
	const [active, setActive] = useState(0);
	const category = servicesByCategory[active];
	const tone = MENU_TONES[active];

	const toneVars = {
		'--tone-accent': tone.accent,
		'--tone-glow': tone.glow,
		'--tone-chip': tone.chip,
		'--tone-ring': tone.ring,
		'--tone-text': tone.text,
	} as CSSProperties;

	const handleLight = (e: ReactMouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
		e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
	};

	return (
		<div className="mm" style={toneVars} onMouseMove={handleLight}>
			<div className="mm__grid" aria-hidden="true" />
			<div className="mm__light" aria-hidden="true" />

			<div className="mm__body">
				{/* ── Categories ── */}
				<aside className="mm__cats">
					<div className="mm__cats-label">Capabilities</div>
					{servicesByCategory.map((cat, i) => {
						const CatIcon = CATEGORY_META[i].icon;
						const isActive = i === active;
						return (
							<button
								key={cat.title}
								type="button"
								className={`mm__cat${isActive ? ' mm__cat--active' : ''}`}
								onMouseEnter={() => setActive(i)}
								onFocus={() => setActive(i)}
								onClick={() => onNavigate('/services')}
							>
								{isActive && (
									<motion.span
										layoutId="mmCatHl"
										className="mm__cat-hl"
										transition={{ type: 'spring', stiffness: 400, damping: 34 }}
									/>
								)}
								<span className="mm__cat-ico">
									<CatIcon size={18} />
								</span>
								<span className="mm__cat-txt">
									<span className="mm__cat-name">{cat.title}</span>
									<span className="mm__cat-count">{cat.items.length} services</span>
								</span>
								<LuArrowRight size={15} className="mm__cat-arrow" />
							</button>
						);
					})}
				</aside>

				{/* ── Services ── */}
				<div className="mm__services">
					<div className="mm__services-head">
						<span className="mm__services-title">{category.title}</span>
						<span className="mm__services-tag">{category.items.length} services</span>
					</div>
					<AnimatePresence mode="wait">
						<motion.div
							key={active}
							className="mm__list"
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.22, ease: EASE }}
						>
							{category.items.map((item, idx) => {
								const sm = SERVICE_META[item.slug];
								const Icon = sm?.icon;
								return (
									<motion.button
										key={item.slug}
										type="button"
										className="mm__item"
										onClick={() => onNavigate(item.href ?? `/services/${item.slug}`)}
										initial={{ opacity: 0, x: 10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: idx * 0.035, duration: 0.3, ease: EASE }}
									>
										<span className="mm__item-ico">{Icon ? <Icon size={17} /> : null}</span>
										<span className="mm__item-txt">
											<span className="mm__item-name">
												{item.title}
												{sm?.popular && <span className="mm__badge">Popular</span>}
											</span>
											<span className="mm__item-desc">{sm?.blurb ?? 'Explore this service'}</span>
										</span>
										<LuArrowUpRight size={16} className="mm__item-arrow" />
									</motion.button>
								);
							})}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>

			{/* ── Footer ── */}
			<div className="mm__foot">
				<div className="mm__badges">
					<span className="mm__badges-label">Toolchain</span>
					{CAD_BADGES.map((b) => (
						<span key={b} className="mm__cad">
							{b}
						</span>
					))}
				</div>
				<div className="mm__foot-cta">
					<button type="button" className="mm__ghost" onClick={() => onNavigate('/contact')}>
						Talk to an Engineer
					</button>
					<button type="button" className="mm__solid" onClick={() => onNavigate('/services')}>
						Explore All Services
						<LuArrowRight size={15} />
					</button>
				</div>
			</div>
		</div>
	);
}
