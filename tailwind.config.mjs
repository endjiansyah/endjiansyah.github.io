/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        background: '#FAFAFA',
        accent: '#8B5E3C',
        text: '#262626',
        'brand-dark': '#0B132B',
        'surface-dark': '#111C33',
        'brand-blue': '#2563EB',
        'brand-cyan': '#06B6D4',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      }
    },
	},
	plugins: [],
}
