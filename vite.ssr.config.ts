import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Separate config for SSR/prerender builds.
// Avoids client-only chunk splitting that breaks SSR bundling on some deps.
export default defineConfig({
	plugins: [react()],
});

