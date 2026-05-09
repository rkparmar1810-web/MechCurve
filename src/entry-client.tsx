import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (!container) {
	throw new Error('Root container not found');
}

const app = (
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);

// If prerendered, hydrate; otherwise, do a client render.
if (container.hasChildNodes()) {
	hydrateRoot(container, app);
} else {
	createRoot(container).render(app);
}

