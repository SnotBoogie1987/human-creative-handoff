/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      /* ===================
         COLOR TOKENS
         =================== */
      colors: {
        // New Design System
        primary: "#D2F865",           // Acid Lime
        background: {
          light: "#F5F5F5",
          dark: "#000000",
        },
        surface: {
          dark: "#000000",
        },
        text: {
          light: "#000000",
          dark: "#FFFFFF",
          muted: "rgb(209, 213, 219)", // gray-300 equivalent
        },
      },

      /* ===================
         FONT FAMILIES
         =================== */
      fontFamily: {
        display: ["'Anton'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'Azeret Mono'", "'Space Mono'", "monospace"],
      },

      /* ===================
         OPTIMIZED FLUID FONT SIZES
         =================== */
      fontSize: {
        // DISPLAY (Anton) - Tight leading (0.9)
        "display-lg": ["var(--fs-display-lg)", { lineHeight: "0.9", letterSpacing: "0.02em" }], // H1
        "display-md": ["var(--fs-display-md)", { lineHeight: "0.9", letterSpacing: "0.02em" }], // H2
        "display-sm": ["var(--fs-display-sm)", { lineHeight: "0.9", letterSpacing: "0.02em" }], // H3

        // HEADINGS (Inter) - Standard leading (1.1-1.2)
        "h4": ["var(--fs-h4)", { lineHeight: "1.1", fontWeight: "700" }],
        "h5": ["var(--fs-h5)", { lineHeight: "1.1", fontWeight: "600" }],
        "h6": ["var(--fs-h6)", { lineHeight: "1.2", fontWeight: "600" }],

        // BODY (Azeret Mono) - Relaxed leading (1.6)
        "body": ["var(--fs-body)", { lineHeight: "1.6", fontWeight: "400" }],

        // UTILITY - Tighter leading for small text
        "sm": ["var(--fs-sm)", { lineHeight: "1.4", fontWeight: "500" }],

        // Legacy sizes (kept for backwards compatibility)
        'hero': ['5rem', { lineHeight: '1.1' }],
        'manifesto-h1': ['7.125rem', { lineHeight: '0.95' }],
        'manifesto-h2': ['5.5rem', { lineHeight: '0.95' }],
        'manifesto-h6': ['0.875rem', { lineHeight: '1.45' }],
        'manifesto-body': ['1.125rem', { lineHeight: '1.6' }],
        'manifesto-subtitle': ['1rem', { lineHeight: '1.4' }],
        'nav': ['1.375rem', { lineHeight: '1.2' }],
        'heading-xl': ['5rem', { lineHeight: '1.1' }],
        'heading-lg': ['3.5rem', { lineHeight: '1.15' }],
        'heading-md': ['2.5rem', { lineHeight: '1.2' }],
        'marquee': ['1.125rem', { lineHeight: '1.4' }],
      },

      /* ===================
         FLUID SPACING TOKENS
         =================== */
      spacing: {
        // New fluid spacing
        "nav-height": "130px",
        "logo-width": "271px",
        "nav-gap": "243px",
        "nav-padding": "75px",
        "marquee-pt": "50px",
        "marquee-pb": "25px",
        "section-y": "clamp(4rem, 2rem + 5vw, 6rem)",
        "section-x": "clamp(1rem, 0.5rem + 2.5vw, 1.5rem)",
        128: "32rem",
        // Legacy spacing (8px grid)
        '18': '72px',
        '20': '80px',
        '22': '88px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
      },

      /* ===================
         LINE HEIGHT
         =================== */
      lineHeight: {
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.4',
        'relaxed': '1.6',
        'loose': '1.8',
      },

      /* ===================
         FONT WEIGHT
         =================== */
      fontWeight: {
        'light': 200,
        'regular': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'heavy': 800,
        'black': 900,
      },

      /* ===================
         MAX-WIDTH TOKENS
         =================== */
      maxWidth: {
        // New content widths
        content: "56rem",             // max-w-4xl (896px)
        "content-narrow": "42rem",    // max-w-2xl (672px)
        "content-wide": "48rem",      // max-w-3xl (768px)
        // Legacy widths
        'readable': '75ch',
        'readable-sm': '65ch',
        'readable-xs': '50ch',
      },

      /* ===================
         HEIGHT & WIDTH
         =================== */
      height: {
        'marquee': '80px',
        'cta-button': '80px',
        'cta-button-mobile': '72px',
      },
      width: {
        'cta-button': '408px',
      },

      /* ===================
         ANIMATIONS
         =================== */
      animation: {
        "marquee": "marquee 64s linear infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-20%)" },
        },
      },

      /* ===================
         BORDER WIDTH
         =================== */
      borderWidth: {
        stroke: "1px",
        '3': '3px', // Legacy
      },

      /* ===================
         TEXT DECORATION
         =================== */
      textUnderlineOffset: {
        link: "4px",
      },
      textDecorationThickness: {
        link: "1px",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),

    // Custom utilities plugin
    function ({ addUtilities, addComponents, theme }) {
      /* ===================
         TEXT STROKE UTILITIES
         =================== */
      addUtilities({
        ".text-stroke-primary": {
          "-webkit-text-stroke": `1px ${theme("colors.primary")}`,
          color: "transparent",
        },
        ".text-stroke-black": {
          "-webkit-text-stroke": "1px #000000",
          color: "transparent",
        },
      });

      /* ===================
         COMPONENT CLASSES
         =================== */
      addComponents({
        // Navigation link style
        ".nav-link": {
          fontFamily: Array.isArray(theme("fontFamily.mono")) ? theme("fontFamily.mono").join(", ") : theme("fontFamily.mono"),
          fontSize: "17px",
          lineHeight: "1.2",
          fontWeight: "400",
        },

        // Marquee text style
        ".marquee-text": {
          fontFamily: Array.isArray(theme("fontFamily.mono")) ? theme("fontFamily.mono").join(", ") : theme("fontFamily.mono"),
          fontSize: "17px",
          lineHeight: "1.2",
          fontWeight: "400",
        },

        // Content paragraph style (Uses fluid body var)
        ".prose-body": {
          fontFamily: Array.isArray(theme("fontFamily.mono")) ? theme("fontFamily.mono").join(", ") : theme("fontFamily.mono"),
          fontSize: theme("fontSize.body")[0],
          lineHeight: theme("fontSize.body")[1].lineHeight,
          fontWeight: "400",
        },

        // Content link style
        ".content-link": {
          textDecoration: "underline",
          textDecorationThickness: "1px",
          textUnderlineOffset: "4px",
        },

        // Display heading style (Structure only, size handled by utilities)
        ".heading-display": {
          fontFamily: Array.isArray(theme("fontFamily.display")) ? theme("fontFamily.display").join(", ") : theme("fontFamily.display"),
          textTransform: "uppercase",
        },
      });
    },
  ],
}
