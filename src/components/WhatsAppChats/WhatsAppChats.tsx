import { useMemo, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { LuArrowRight } from 'react-icons/lu';
import FadeIn from '../FadeIn/FadeIn';
import {
	buildWhatsAppUrl,
	faqCategoryOrder,
	whatsappQuickOptions,
} from '../../data/faqContent';
import styles from './WhatsAppChats.module.scss';

export default function WhatsAppChats() {
	const [activeCategory, setActiveCategory] = useState('All');
	const [activeOptionId, setActiveOptionId] = useState(
		whatsappQuickOptions[0]?.id ?? '',
	);

	const categories = useMemo(() => ['All', ...faqCategoryOrder], []);

	const filteredOptions = useMemo(() => {
		return activeCategory === 'All'
			? whatsappQuickOptions
			: whatsappQuickOptions.filter(
					(option) => option.category === activeCategory,
				);
	}, [activeCategory]);

	const activeOption =
		whatsappQuickOptions.find((option) => option.id === activeOptionId) ??
		filteredOptions[0] ??
		whatsappQuickOptions[0];

	return (
		<section
			id="whatsapp-chat"
			className={`section ${styles.section}`}
		>
			<div className="section-container">
				<FadeIn>
					<div className={styles.header}>
						<span className="card-tag">WhatsApp Support</span>
						<h2 className="heading-xl mt-5 mb-4">
							Choose a topic and continue on WhatsApp
						</h2>
						<p className="text-muted max-w-3xl">
							Instead of a fake chat preview, users can select what they want to
							talk about and jump into WhatsApp with a ready message that feels
							faster and more natural.
						</p>
					</div>
				</FadeIn>

				<FadeIn delay={0.06}>
					<div className={styles.layout}>
						<div className={styles.optionPanel}>
							<div className={styles.optionHeader}>
								<div>
									<span className={styles.optionEyebrow}>Quick topics</span>
									<h3>Select what you want to discuss</h3>
								</div>
								<div className={styles.liveBadge}>
									<FaWhatsapp size={16} /> Ready for WhatsApp
								</div>
							</div>

							<div className={styles.categoryRow}>
								{categories.map((category) => (
									<button
										key={category}
										type="button"
										className={`${styles.categoryChip} ${activeCategory === category ? styles.categoryChipActive : ''}`}
										onClick={() => setActiveCategory(category)}
									>
										{category}
									</button>
								))}
							</div>

							<div className={styles.optionGrid}>
								{filteredOptions.map((option) => (
									<a
										key={option.id}
										href={buildWhatsAppUrl(option.message)}
										target="_blank"
										rel="noopener noreferrer"
										className={`${styles.optionCard} ${activeOption?.id === option.id ? styles.optionCardActive : ''}`}
										onMouseEnter={() => setActiveOptionId(option.id)}
										onFocus={() => setActiveOptionId(option.id)}
									>
										<div className={styles.optionMeta}>{option.category}</div>
										<h4>{option.title}</h4>
										<p>{option.description}</p>
										<span className={styles.optionLink}>
											Open in WhatsApp <LuArrowRight size={15} />
										</span>
									</a>
								))}
							</div>
						</div>

						<div className={styles.sidePanel}>
							<div className={styles.infoCard}>
								<span className={styles.infoTag}>Selected prompt</span>
								<h3>{activeOption?.title ?? 'Choose an option'}</h3>
								<p>
									{activeOption?.message ??
										'Select a topic to prepare the opening WhatsApp message.'}
								</p>
								<div className={styles.pills}>
									<span>Prefilled message</span>
									<span>Faster inquiry</span>
									<span>Clear intent</span>
									<span>Better response flow</span>
								</div>
							</div>

							<div className={styles.stepCard}>
								<div className={styles.step}>1. Choose a topic</div>
								<div className={styles.step}>
									2. WhatsApp opens with the right starter message
								</div>
								<div className={styles.step}>
									3. Continue chatting normally with the team
								</div>
							</div>

							<a
								href={buildWhatsAppUrl(
									activeOption?.message ??
										'Hi MechCurve! I want to discuss your services.',
								)}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.chatCta}
							>
								<FaWhatsapp size={18} /> Continue with selected topic
							</a>
						</div>
					</div>
				</FadeIn>
			</div>
		</section>
	);
}
