import { useEffect, useRef } from 'react';
import {
	LuArrowRight,
	LuBookOpen,
	LuBoxes,
	LuFactory,
	LuGraduationCap,
	LuRuler,
	LuSettings,
	LuShieldCheck,
	LuSpline,
	LuWrench,
} from 'react-icons/lu';
import FadeIn from '../FadeIn/FadeIn';

type ServiceBlock = {
	id:
		| 'cad-design-services'
		| 'product-development'
		| 'manufacturing'
		| 'training-and-placements';
	num: string;
	title: string;
	icon: JSX.Element;
	points: string[];
};

const SERVICE_BLOCKS: ServiceBlock[] = [
	{
		id: 'cad-design-services',
		num: '01',
		title: '3D CAD Modeling',
		icon: <LuRuler size={20} />,
		points: [
			'Part and assembly modeling in SolidWorks',
			'Surface modeling and complex geometry',
			'Sheet metal and weldment design',
			'Parametric and feature-based modeling',
			'2D drafting and drawing documentation',
		],
	},
	{
		id: 'product-development',
		num: '02',
		title: 'Product Development',
		icon: <LuSettings size={20} />,
		points: [
			'Concept design to production-ready models',
			'Design for manufacturing (DFM) analysis',
			'Rapid prototyping with 3D printing',
			'Reverse engineering of existing parts',
			'Tolerance analysis and design validation',
		],
	},
	{
		id: 'manufacturing',
		num: '03',
		title: 'Manufacturing Support',
		icon: <LuFactory size={20} />,
		points: [
			'Manufacturing-ready drawings and BOMs',
			'CNC/VMC machining coordination',
			'EDM wire cut and spark erosion',
			'Heat treatment and surface finishing',
			'CMM inspection and quality control',
		],
	},
	{
		id: 'training-and-placements',
		num: '04',
		title: 'SolidWorks Training',
		icon: <LuGraduationCap size={20} />,
		points: [
			'CSWA and CSWP certification prep',
			'GD&T and advanced drafting',
			'Specialisations: Weldments, Sheet Metal, Surfacing, Mold',
			'Hands-on project-based learning',
			'Placement assistance and career support',
		],
	},
];

const PILL_ICON_MAP = [
	LuSpline,
	LuWrench,
	LuBookOpen,
	LuSettings,
	LuBoxes,
	LuShieldCheck,
];

function ServiceModel({ type }: { type: ServiceBlock['id'] }) {
	if (type === 'cad-design-services') {
		return (
			<svg
				viewBox="0 0 520 240"
				className="h-full w-full"
				fill="none"
				aria-hidden="true"
			>
				<ellipse
					cx="260"
					cy="198"
					rx="178"
					ry="24"
					className="service-holo-shadow"
				/>
				<circle
					cx="180"
					cy="138"
					r="64"
					className="service-holo-line-soft"
				/>
				<circle
					cx="180"
					cy="138"
					r="32"
					className="service-holo-line"
				/>
				<circle
					cx="322"
					cy="128"
					r="70"
					className="service-holo-line-soft"
				/>
				<circle
					cx="322"
					cy="128"
					r="34"
					className="service-holo-line"
				/>
				<path
					d="M116 138H244"
					className="service-holo-line-soft"
				/>
				<path
					d="M256 126H390"
					className="service-holo-line-soft"
				/>
				<rect
					x="228"
					y="104"
					width="44"
					height="52"
					rx="10"
					className="service-holo-solid"
				/>
				<path
					d="M376 88L466 66"
					className="service-holo-callout"
				/>
				<path
					d="M320 178L404 188"
					className="service-holo-callout"
				/>
			</svg>
		);
	}

	if (type === 'product-development') {
		return (
			<svg
				viewBox="0 0 520 240"
				className="h-full w-full"
				fill="none"
				aria-hidden="true"
			>
				<ellipse
					cx="262"
					cy="200"
					rx="180"
					ry="22"
					className="service-holo-shadow"
				/>
				<path
					d="M130 182L192 104L260 90L334 106L392 180Z"
					className="service-holo-line-soft"
				/>
				<path
					d="M192 104L212 182M260 90V182M334 106L308 182"
					className="service-holo-line"
				/>
				<path
					d="M160 160H362M184 138H336"
					className="service-holo-line-soft"
				/>
				<path
					d="M246 54H286L274 84H258Z"
					className="service-holo-solid"
				/>
				<circle
					cx="268"
					cy="96"
					r="5"
					className="service-holo-solid-warm"
				/>
				<path
					d="M268 102V142"
					className="service-holo-callout"
				/>
			</svg>
		);
	}

	if (type === 'training-and-placements') {
		return (
			<svg
				viewBox="0 0 520 240"
				className="h-full w-full"
				fill="none"
				aria-hidden="true"
			>
				<ellipse
					cx="276"
					cy="196"
					rx="164"
					ry="22"
					className="service-holo-shadow"
				/>
				<rect
					x="164"
					y="116"
					width="64"
					height="38"
					rx="10"
					className="service-holo-solid"
				/>
				<rect
					x="240"
					y="94"
					width="76"
					height="44"
					rx="10"
					className="service-holo-solid-warm"
				/>
				<rect
					x="326"
					y="114"
					width="66"
					height="40"
					rx="10"
					className="service-holo-solid"
				/>
				<path
					d="M194 116L272 94L358 114"
					className="service-holo-line"
				/>
				<circle
					cx="150"
					cy="114"
					r="14"
					className="service-holo-line-soft"
				/>
				<circle
					cx="406"
					cy="110"
					r="14"
					className="service-holo-line-soft"
				/>
				<path
					d="M136 114H164M150 100V128"
					className="service-holo-line"
				/>
				<path
					d="M392 110H420M406 96V124"
					className="service-holo-line"
				/>
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 520 240"
			className="h-full w-full"
			fill="none"
			aria-hidden="true"
		>
			<ellipse
				cx="260"
				cy="202"
				rx="184"
				ry="22"
				className="service-holo-shadow"
			/>
			<rect
				x="118"
				y="118"
				width="96"
				height="56"
				rx="10"
				className="service-holo-line-soft"
			/>
			<rect
				x="234"
				y="102"
				width="102"
				height="70"
				rx="10"
				className="service-holo-line"
			/>
			<rect
				x="354"
				y="122"
				width="62"
				height="44"
				rx="10"
				className="service-holo-line-soft"
			/>
			<path
				d="M166 118V82M286 102V72M386 122V84"
				className="service-holo-callout"
			/>
			<circle
				cx="166"
				cy="78"
				r="4"
				className="service-holo-solid"
			/>
			<circle
				cx="286"
				cy="68"
				r="4"
				className="service-holo-solid"
			/>
			<circle
				cx="386"
				cy="80"
				r="4"
				className="service-holo-solid"
			/>
		</svg>
	);
}

export default function Services() {
	const stackRef = useRef<HTMLUListElement | null>(null);
	const cardRefs = useRef<Array<HTMLElement | null>>([]);

	useEffect(() => {
		const stack = stackRef.current;
		const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
		if (!stack || cards.length === 0) return;

		const stickyTop = 120;
		const marginY = 84;
		const scaleStep = 0.05;
		let cardHeight = cards[0].offsetHeight;
		let ticking = false;

		const update = () => {
			const stackTop = stack.getBoundingClientRect().top;
			cardHeight = cards[0].offsetHeight;

			cards.forEach((card, index) => {
				const scrolling = stickyTop - stackTop - index * marginY;
				const scale =
					scrolling > 0
						? Math.max(0.91, (cardHeight - scrolling * scaleStep) / cardHeight)
						: 1;
				const opacity =
					scrolling > 0 ? Math.max(0.82, 1 - scrolling * 0.0012) : 1;
				card.style.transform = `translateY(${marginY * index}px) scale(${scale})`;
				card.style.opacity = `${opacity}`;
			});

			ticking = false;
		};

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			window.requestAnimationFrame(update);
		};

		const onResize = () => {
			cardHeight = cards[0].offsetHeight;
			update();
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return (
		<section
			id="services"
			className="services-stack relative"
		>
			<div
				className="services-bg-gradient pointer-events-none absolute inset-0"
				aria-hidden="true"
			/>
			<div
				className="services-bg-blobs pointer-events-none absolute inset-0"
				aria-hidden="true"
			/>

			<div className="services-stack-container relative z-10">
				<FadeIn>
					<div className="mx-auto max-w-3xl text-center">
						<span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
							Engineering Services
						</span>
						<h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
							Engineering capabilities under one roof
						</h2>
						<p className="mt-3 text-base leading-7 text-slate-600">
							CAD, training, additive manufacturing and shop-floor capabilities
							under one roof.
						</p>
					</div>
				</FadeIn>

				<ul
					ref={stackRef}
					className="services-stack-track mt-12"
				>
					{SERVICE_BLOCKS.map((service, index) => (
						<li
							key={service.id}
							className="services-stack-item"
							style={{ zIndex: index + 1 }}
						>
							<article
								ref={(node) => {
									cardRefs.current[index] = node;
								}}
								className="service-glass-card service-stack-card group relative flex h-full flex-col rounded-3xl p-6 md:p-7"
							>
								<div className="relative z-10 mb-5 flex items-center gap-3">
									<div className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-bold tracking-[0.1em] text-primary">
										{service.num}
									</div>
									<div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-primary">
										{service.icon}
									</div>
									<h3 className="text-2xl font-bold tracking-tight text-slate-900">
										{service.title}
									</h3>
								</div>

								<div className="relative z-10 mb-6 flex min-h-[72px] flex-wrap content-start gap-2.5 overflow-hidden">
									{service.points.slice(0, 6).map((point, i) => {
										const PillIcon = PILL_ICON_MAP[i % PILL_ICON_MAP.length];
										return (
											<span
												key={point}
												className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-700"
											>
												<PillIcon
													size={13}
													className="text-primary"
												/>
												{point}
											</span>
										);
									})}
								</div>

								<div className="service-visual-stage relative z-10 h-[230px] md:h-[250px]">
									<div
										className="service-platform"
										aria-hidden="true"
									/>
									<div className="service-model-float h-full w-full origin-bottom transition-transform duration-500 group-hover:[transform:translateY(-4px)_scale(1.03)]">
										<ServiceModel type={service.id} />
									</div>
								</div>
							</article>
						</li>
					))}
				</ul>

				<FadeIn delay={0.25}>
					<div className="services-stack-cta mt-14 flex justify-center">
						<button
							className="service-cta-btn"
							type="button"
							onClick={() => {
								const el = document.getElementById('contact');
								if (el) {
									const navbarHeight = 120;
									const y =
										el.getBoundingClientRect().top +
										window.scrollY -
										navbarHeight;
									window.scrollTo({ top: y, behavior: 'auto' });
									window.history.replaceState(
										null,
										'',
										window.location.pathname,
									);
								}
							}}
						>
							Request Consultation <LuArrowRight size={18} />
						</button>
					</div>
				</FadeIn>
			</div>
		</section>
	);
}
