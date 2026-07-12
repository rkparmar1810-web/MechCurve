import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuArrowRight, LuAward, LuCheck, LuUsers } from 'react-icons/lu';

const EASE = [0.22, 1, 0.36, 1] as const;

const PROGRAMS = [
	{
		icon: LuUsers,
		badge: 'For Professionals',
		title: 'Professional Program',
		desc: 'Upskilling path for working professionals with customizable modules and mentoring support.',
		tags: ['Custom Modules', 'Mentoring', 'Project-Based'],
		featured: true,
	},
	{
		icon: LuAward,
		badge: 'Most Advanced',
		title: 'Expert Program',
		desc: 'Advanced industry projects and simulations across the full engineering toolset.',
		tags: ['CAD', 'GD&T', 'CAE', 'CFD'],
		featured: false,
	},
];

export default function TrainingPrograms() {
	return (
		<section
			id="training"
			className="relative overflow-hidden bg-white py-16 md:py-20"
			aria-label="CAD Training Programs"
		>
			<div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(234,193,23,0.08),transparent_70%)] blur-2xl" aria-hidden="true" />

			<div className="section-container relative">
				<motion.div
					className="mx-auto mb-12 max-w-2xl text-center"
					initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
					whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
					viewport={{ once: true, margin: '-80px' }}
					transition={{ duration: 0.6, ease: EASE }}
				>
					<h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
						Build Skills That Industry Demands
					</h2>
					<p className="mt-3 text-[15px] leading-8 text-slate-600">
						Structured CAD, GD&amp;T, CAE, and CFD programs for students and professionals.
						Explore the full curriculum and enrollment details on our career page.
					</p>
				</motion.div>

				<div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
					{PROGRAMS.map((p, i) => (
						<motion.article
							key={p.title}
							className={`group relative overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1.5 ${
								p.featured
									? 'border-amber-300/60 bg-gradient-to-b from-amber-50/70 to-white shadow-[0_24px_56px_rgba(234,193,23,0.16)]'
									: 'border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)] hover:border-amber-300/50 hover:shadow-[0_26px_56px_rgba(15,23,42,0.1)]'
							}`}
							initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
							whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
							viewport={{ once: true, margin: '-70px' }}
							transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
						>
							<div className="flex items-center justify-between">
								<span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
									<p.icon size={22} />
								</span>
								<span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">
									{p.badge}
								</span>
							</div>

							<h3 className="mt-5 text-xl font-bold text-slate-900">{p.title}</h3>
							<p className="mt-2 text-[14px] leading-7 text-slate-600">{p.desc}</p>

							<div className="mt-5 flex flex-wrap gap-2">
								{p.tags.map((t) => (
									<span
										key={t}
										className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[12px] font-semibold text-slate-700"
									>
										<LuCheck size={11} className="text-amber-600" />
										{t}
									</span>
								))}
							</div>
						</motion.article>
					))}
				</div>

				<div className="mt-10 flex justify-center">
					<Link
						to="/career"
						className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EAC117] to-[#F59E0B] px-6 py-3.5 text-sm font-bold text-[#06080D] shadow-[0_4px_20px_rgba(234,193,23,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(234,193,23,0.4)]"
					>
						Explore Training Programs
						<LuArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</section>
	);
}
