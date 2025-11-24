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
        'lime-green': '#DAFA92',
        'dark-grey': '#1a1a1a',
        'light-text': '#ffffff',
        'dark-text': '#000000',
      },
      fontFamily: {
        // Azeret Mono font
        'mono': ['Azeret Mono', 'monospace'],
      },
      fontSize: {
        // Hero & Headers (rem-based, 8px grid aligned)
        'hero': ['5rem', { lineHeight: '1.1' }],              // 80px - Homepage H1
        'manifesto-h1': ['7.125rem', { lineHeight: '0.8' }],  // 114px (was 113.75px, rounded to 8px grid)
        'manifesto-h2': ['4.5rem', { lineHeight: '0.95' }],   // 72px (was 70.7px, rounded to 8px grid)
        'manifesto-h6': ['0.6875rem', { lineHeight: '1.45' }], // 11px
        'manifesto-body': ['1.125rem', { lineHeight: '1.6' }], // 18px with 1.6 ratio (was 28.8px)
        'manifesto-subtitle': ['1rem', { lineHeight: '1.4' }], // 16px with 1.4 ratio (was 22.4px)

        // Navigation
        'nav': ['1.375rem', { lineHeight: '1.2' }],           // 22px

        // Responsive Headers
        'heading-xl': ['5rem', { lineHeight: '1.1' }],        // 80px - Desktop large
        'heading-lg': ['3.5rem', { lineHeight: '1.15' }],     // 56px - Tablet
        'heading-md': ['2.5rem', { lineHeight: '1.2' }],      // 40px - Mobile

        // Marquee
        'marquee': ['1.125rem', { lineHeight: '1.4' }],       // 18px
      },
      lineHeight: {
        // Unitless line-heights for flexibility
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.4',
        'relaxed': '1.6',
        'loose': '1.8',
      },
      fontWeight: {
        'light': 200,
        'regular': 400,
        'bold': 700,
        'heavy': 800,
        'black': 900,
      },
      height: {
        // 8px grid aligned heights
        'marquee': '80px',           // Was 75px → 80px (10 × 8px)
        'cta-button': '80px',        // Already aligned
        'cta-button-mobile': '72px', // Was 70px → 72px (9 × 8px)
      },
      width: {
        // 8px grid aligned widths
        'cta-button': '408px',       // Was 410.5px → 408px (51 × 8px)
      },
      maxWidth: {
        // Readability constraints (ch units)
        'readable': '75ch',          // Optimal line length for body text
        'readable-sm': '65ch',       // Slightly narrower
        'readable-xs': '50ch',       // Very narrow (mobile)
      },
      spacing: {
        // 8px grid system (Tailwind already has 0-96 in increments of 4)
        // Adding specific named spacings for common use cases
        '18': '72px',   // 18 × 4px (for large sections)
        '20': '80px',   // 20 × 4px
        '22': '88px',   // 22 × 4px
        '24': '96px',   // 24 × 4px
        '28': '112px',  // 28 × 4px
        '32': '128px',  // 32 × 4px
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
