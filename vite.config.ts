import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ ssrBuild }) => ({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	build: {
		rollupOptions: ssrBuild
			? undefined
			: {
					output: {
						manualChunks: {
							'framer-motion': ['framer-motion'],
						},
					},
				},
	},
}));
