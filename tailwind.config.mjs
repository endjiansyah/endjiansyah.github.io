/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        background: '#FAFAFA',
        accent: '#8B5E3C',
        text: '#262626',
        'brand-dark': '#121E2D',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
	},
	plugins: [],
}
