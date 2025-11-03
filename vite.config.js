import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [react()],

	// 👇 base URL for production (important if hosted at domain root)
	base: '/',

	// 👇 dev server settings (only used in npm run dev)
	server: {
		host: '0.0.0.0',
		port: 3000,
		allowedHosts: ['iosas.online'], // fixes "Blocked request. This host is not allowed."
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3001',
				changeOrigin: true
				secure: false
			}
		}
	},

	// 👇 optional build output directory (Vite default is "dist")
	build: {
		outDir: 'dist',
	},
})
