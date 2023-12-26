/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		colors: {
			primary: '#5CA0CE',
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
}
