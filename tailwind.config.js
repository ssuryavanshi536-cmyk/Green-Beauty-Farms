/** @type {import('tailwindcss').Config} */
// Palette lifted from the reference site (swizzislandfarms.com):
//   lime      #a2cd15   dark-green-1 #4a821e   dark-green-2 #214b0a
//   dark bg   #2b2b2b   header black #0a0a0a   footer black #1a1a1a
//   text dark #333333   text light   #666666   border light #e0e0e0
// The old token NAMES are kept (moss / ochre / ink / sand) so no class in the
// app has to change — only the hex values behind them.
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Greens
        moss: {
          500: '#4a821e', // dark-green-1
          600: '#3d6d19',
          700: '#316014',
          800: '#214b0a', // dark-green-2
          900: '#14300a', // deepest green, used for overlays
        },
        // Lime accent (was ochre)
        ochre: {
          400: '#b5da3f',
          500: '#a2cd15', // primary-lime
          600: '#8ebd12',
        },
        // Blacks — deliberately not pure #000
        night: {
          700: '#2b2b2b', // section dark bg
          800: '#1a1a1a', // footer bar
          900: '#0a0a0a', // header bar
        },
        // Neutrals
        sand: {
          50: '#ffffff',
          100: '#f6f8f1',
          200: '#e0e0e0',
        },
        ink: {
          400: '#666666',
          600: '#4f4f4f',
          900: '#333333',
        },
        danger: '#d93025',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-worksans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 5px 25px rgba(0,0,0,0.08)',
        deep: '0 15px 40px rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
}