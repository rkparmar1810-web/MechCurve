import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsAppUrl } from '../../data/faqContent';
import styles from './WhatsAppFab.module.scss';

const WHATSAPP_GREETING_MESSAGE =
	'Hi MechCurve Team! I would like to connect with you on WhatsApp.';

export default function WhatsAppFab() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), 1500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={`${styles.wrap} ${visible ? styles.visible : ''}`}>
			<a
				href={buildWhatsAppUrl(WHATSAPP_GREETING_MESSAGE)}
				target="_blank"
				rel="noopener noreferrer"
				className={styles.fab}
				aria-label="Chat with MechCurve on WhatsApp"
			>
				<FaWhatsapp size={28} />
				<span className={styles.pulse} />
			</a>
		</div>
	);
}
