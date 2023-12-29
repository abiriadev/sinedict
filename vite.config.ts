import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePluginRadar } from 'vite-plugin-radar'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [
			react(),
			VitePluginRadar({
				enableDev: true,
				analytics: {
					id: env.GA_MEASUREMENT_ID,
				},
			}),
		],
	}
})
