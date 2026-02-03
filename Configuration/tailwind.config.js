/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'primary': '#DAFA92',
        'background-dark': '#1a1a1a',
        'light-text': '#ffffff',
        'dark-text': '#000000',
      },
      fontFamily: {
        // Azeret Mono font
        'mono': ['Azeret Mono', 'monospace'],
      },
      fontSize: {
        // Hero & Headers
        'hero': '5rem',           // 80px - Homepage H1
        'manifesto-h1': '113.75px', // Manifesto main headers
        'manifesto-h2': '70.7px',   // Manifesto section headers
        'manifesto-h6': '11px',     // Manifesto numbered subheadings
        'manifesto-body': '18px',   // Manifesto body text
        'manifesto-subtitle': '16px', // Manifesto subtitle text
        
        // Navigation
        'nav': '22px',            // Navigation links
        
        // Responsive Headers
        'heading-xl': '5rem',     // Desktop large
        'heading-lg': '3.5rem',   // Tablet
        'heading-md': '2.5rem',   // Mobile
        
        // Marquee
        'marquee': '18px',
      },
      lineHeight: {
        'hero': '1.1',
        'manifesto-h1': '91px',
        'manifesto-body': '28.8px',
        'manifesto-subtitle': '22.4px',
      },
      fontWeight: {
        'light': 200,
        'regular': 400,
        'bold': 700,
        'heavy': 800,
        'black': 900,
      },
      height: {
        'marquee': '75px',
        'cta-button': '80px',
        'cta-button-mobile': '70px',
      },
      width: {
        'cta-button': '410.5px',
      },
      spacing: {
        'marquee-padding': '10px',
      },
      animation: {
        'marquee': 'marquee 80s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
