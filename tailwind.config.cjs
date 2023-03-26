/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				ngsTheme: {
					primary: '#3CB1F5',

					secondary: '#6C757D',

					accent: '#F8F9FA',

					neutral: '#0C274B',

					'base-100': '#212529',

					info: '#4367E1',

					success: '#B1F53C',

					warning: '#EBAF3B',

					error: '#E14343'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
