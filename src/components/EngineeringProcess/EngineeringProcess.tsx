import { Fragment, type ComponentType, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
	LuArrowDown,
	LuBox,
	LuLightbulb,
	LuPackageCheck,
	LuSearch,
	LuShieldCheck,
} from 'react-icons/lu';

const EASE = [0.22, 1, 0.36, 1] as const;

type IconType = ComponentType<{ size?: number; className?: string; style?: CSSProperties }>;

type Tone = { icon: string; from: string; to: string; l1: string; l2: string; ring: string; glow: string };

const TONES: Tone[] = [
	{ icon: '#d97706', from: '#fde68a', to: '#f59e0b', l1: '#fffbeb', l2: '#fef3c7', ring: 'rgba(245,158,11,0.55)', glow: 'rgba(245,158,11,0.35)' },
	{ icon: '#2563eb', from: '#bfdbfe', to: '#3b82f6', l1: '#eff6ff', l2: '#dbeafe', ring: 'rgba(59,130,246,0.55)', glow: 'rgba(59,130,246,0.32)' },
	{ icon: '#059669', from: '#a7f3d0', to: '#10b981', l1: '#ecfdf5', l2: '#d1fae5', ring: 'rgba(16,185,129,0.55)', glow: 'rgba(16,185,129,0.3)' },
	{ icon: '#7c3aed', from: '#ddd6fe', to: '#8b5cf6', l1: '#f5f3ff', l2: '#ede9fe', ring: 'rgba(139,92,246,0.55)', glow: 'rgba(139,92,246,0.3)' },
	{ icon: '#b45309', from: '#fcd34d', to: '#f59e0b', l1: '#fffbeb', l2: '#fde68a', ring: 'rgba(234,193,23,0.6)', glow: 'rgba(234,193,23,0.4)' },
];

const STEPS: Array<{ icon: IconType; title: string; description: string }> = [
	{ icon: LuSearch, title: 'Discover', description: 'User and Technology Research' },
	{ icon: LuLightbulb, title: 'Conceptualization', description: 'Detailed Engineering Design' },
	{ icon: LuBox, title: 'CAD Development', description: '3D CAD models, assemblies, and drawings' },
	{ icon: LuShieldCheck, title: 'Validation', description: 'Feasibility checks and design refinement' },
	{ icon: LuPackageCheck, title: 'Deliver', description: 'Production-ready handover' },
];

function Medallion({ Icon, tone, index }: { Icon: IconType; tone: Tone; index: number }) {
	return (
		<motion.div
			className="relative"
			whileHover={{ scale: 1.07 }}
			transition={{ type: 'spring', stiffness: 260, damping: 18 }}
		>
			{/* rotating dashed ring */}
			<div
				className="absolute -inset-2 rounded-full border-2 border-dashed animate-[spin_22s_linear_infinite]"
				style={{ borderColor: tone.ring, animationDirection: index % 2 ? 'reverse' : 'normal' }}
				aria-hidden="true"
			/>
			{/* soft glow */}
			<div
				className="absolute inset-0 rounded-full blur-xl"
				style={{ background: tone.glow }}
				aria-hidden="true"
			/>
			{/* gradient ring + inner */}
			<div
				className="relative rounded-full p-[3px]"
				style={{ background: `linear-gradient(135deg, ${tone.from}, ${tone.to})`, boxShadow: `0 18px 42px ${tone.glow}` }}
			>
				<div className="rounded-full bg-white p-1.5">
					<div
						className="flex h-24 w-24 items-center justify-center rounded-full sm:h-28 sm:w-28"
						style={{ background: `linear-gradient(135deg, ${tone.l1}, ${tone.l2})` }}
					>
						<motion.span
							animate={{ scale: [1, 1.1, 1] }}
							transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }}
							style={{ color: tone.icon }}
						>
							<Icon size={42} />
						</motion.span>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default function EngineeringProcess() {
	return (
		<section
			id="engineering-process"
			className="relative overflow-hidden bg-white py-16 md:py-20"
			aria-label="Engineering Process"
		>
			<div className="bg-grid-soft pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
			<div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(234,193,23,0.1),transparent_70%)] blur-2xl" aria-hidden="true" />
			<div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08),transparent_70%)] blur-2xl" aria-hidden="true" />

			<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 md:px-12">
				<motion.div
					className="mx-auto mb-14 max-w-2xl text-center"
					initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
					whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
					viewport={{ once: true, margin: '-80px' }}
					transition={{ duration: 0.6, ease: EASE }}
				>
					<h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-[2.6rem]">Our Engineering Workflow</h2>
					<p className="mt-3 text-[15px] leading-8 text-slate-600">
						A simplified flowchart from research to production-ready delivery, built for faster engineering execution.
					</p>
				</motion.div>

				<div className="relative">
					{/* animated connector (desktop) */}
					<div className="pointer-events-none absolute left-[9%] right-[9%] top-[74px] hidden h-[3px] lg:block">
						<div className="absolute inset-0 rounded-full bg-slate-200" />
						<motion.div
							className="absolute inset-y-0 left-0 right-0 rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-violet-400"
							style={{ transformOrigin: 'left' }}
							initial={{ scaleX: 0 }}
							whileInView={{ scaleX: 1 }}
							viewport={{ once: true, margin: '-90px' }}
							transition={{ duration: 1.7, ease: EASE, delay: 0.15 }}
						/>
					</div>

					<div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-3">
						{STEPS.map((step, index) => {
							const tone = TONES[index % TONES.length];
							return (
								<Fragment key={step.title}>
									<motion.div
										className="relative z-10 flex w-full max-w-[240px] flex-col items-center text-center lg:flex-1"
										initial={{ opacity: 0, y: 26, scale: 0.9, filter: 'blur(6px)' }}
										whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
										viewport={{ once: true, margin: '-70px' }}
										transition={{ duration: 0.6, delay: 0.2 + index * 0.22, ease: EASE }}
									>
										<div className="relative">
											<Medallion Icon={step.icon} tone={tone} index={index} />
											<span className="absolute -bottom-1 -right-1 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#EAC117] to-[#F59E0B] text-sm font-extrabold text-[#06080D] shadow-[0_8px_18px_rgba(234,193,23,0.4)] ring-4 ring-white">
												{index + 1}
											</span>
										</div>

										<div
											className="mt-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
											style={{ borderColor: tone.ring, color: tone.icon, background: tone.l1 }}
										>
											Step {index + 1}
										</div>
										<h3 className="mt-2 text-lg font-bold text-slate-900">{step.title}</h3>
										<p className="mt-1 max-w-[15rem] text-[13.5px] leading-6 text-slate-600">{step.description}</p>
									</motion.div>

									{index < STEPS.length - 1 && (
										<motion.div
											className="text-slate-300 lg:hidden"
											aria-hidden="true"
											initial={{ opacity: 0 }}
											whileInView={{ opacity: 1 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, delay: 0.3 + index * 0.22 }}
										>
											<LuArrowDown size={20} />
										</motion.div>
									)}
								</Fragment>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
