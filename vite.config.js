import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		chunkSizeWarningLimit: 1000
	},
	server: {
		port: 3000,
		open: true
	}
});
