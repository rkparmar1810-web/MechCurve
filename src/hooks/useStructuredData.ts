import { useEffect } from 'react';

type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

export default function useStructuredData(key: string, value: JsonLdValue) {
	useEffect(() => {
		const scriptId = `jsonld-${key}`;
		let el = document.getElementById(scriptId) as HTMLScriptElement | null;

		if (!el) {
			el = document.createElement('script');
			el.type = 'application/ld+json';
			el.id = scriptId;
			document.head.appendChild(el);
		}

		el.text = JSON.stringify(value);

		return () => {
			if (el && el.parentNode) {
				el.parentNode.removeChild(el);
			}
		};
	}, [key, value]);
}
