import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsAppUrl } from '../../data/faqContent';
import styles from './WhatsAppFab.module.scss';

const WHATSAPP_GREETING_MESSAGE =
	'Hi MechCurve Team! I would like to connect with you on WhatsApp.';

export default function WhatsAppFab() {
	const [visible, setVisible] = useState(false);
	const [open, setOpen] = useState(false);
	const wrapRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), 1500);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!open) {
			return;
		}

		const handlePointerDown = (event: MouseEvent | TouchEvent) => {
			const target = event.target;

			if (!(target instanceof Node)) {
				return;
			}

			if (wrapRef.current?.contains(target)) {
				return;
			}

			setOpen(false);
		};

		document.addEventListener('mousedown', handlePointerDown);
		document.addEventListener('touchstart', handlePointerDown);

		return () => {
			document.removeEventListener('mousedown', handlePointerDown);
			document.removeEventListener('touchstart', handlePointerDown);
		};
	}, [open]);

	return (
		<div
			ref={wrapRef}
			className={`${styles.wrap} ${visible ? styles.visible : ''}`}
		>
			{open ? (
				<div className={styles.menu}>
					<div className={styles.greetingCard}>
						<div className={styles.greetingBadge}>
							<FaWhatsapp size={14} /> MechCurve Team
						</div>
						<p>
							Hello! Welcome to MechCurve. Click below to open WhatsApp and
							start chatting with our team.
						</p>
					</div>
					<a
						href={buildWhatsAppUrl(WHATSAPP_GREETING_MESSAGE)}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.popupCta}
					>
						<FaWhatsapp size={18} /> Open WhatsApp
					</a>
				</div>
			) : null}

			<button
				type="button"
				onClick={() => setOpen((current) => !current)}
				className={styles.fab}
				aria-label="Open WhatsApp popup"
			>
				<FaWhatsapp size={28} />
				<span className={styles.pulse} />
			</button>
		</div>
	);
}
