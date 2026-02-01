# Design Specifications Comparison

## Current vs New Design System

This document compares the **existing design specifications** in the repository with the **new design specifications** provided.

---

## 1. FONTS

### Current System
| Role | Font | Weights |
|------|------|---------|
| All Text | Azeret Mono | 200, 400, 700, 800, 900 |

```css
@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@200;400;700;800;900&display=swap');
```

### New System
| Role | Font | Weights |
|------|------|---------|
| Display (H1-H3) | **Anton** | 400 (single weight) |
| Headings (H4-H6) | **Inter** | 300, 400, 500, 600, 700 |
| Body/Mono | Azeret Mono | 400 |
| Fallback Mono | Space Mono | 400, 700 |

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Azeret+Mono:wght@400&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### Key Difference
- **Current**: Single font family (Azeret Mono) for everything
- **New**: Three-font system with distinct roles (Anton for impact, Inter for readability, Azeret Mono for body/code)

---

## 2. COLORS

### Current System
| Token | Hex | Usage |
|-------|-----|-------|
| `lime-green` | `#DAFA92` | Primary brand color |
| `dark-grey` | `#1a1a1a` | Default background |
| `light-text` | `#ffffff` | Text on dark |
| `dark-text` | `#000000` | Text on light |

### New System
| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#D2F865` | Primary (Acid Lime) |
| `background-dark` | `#000000` | Dark background |
| `background-light` | `#F5F5F5` | Light background |
| `text-light` | `#000000` | Text on light bg |
| `text-dark` | `#FFFFFF` | Text on dark bg |
| `text-muted` | `rgb(209, 213, 219)` | Muted/gray text |

### Key Differences
| Property | Current | New |
|----------|---------|-----|
| Primary Color | `#DAFA92` | `#D2F865` (slightly more saturated) |
| Dark Background | `#1a1a1a` | `#000000` (pure black) |
| Light Background | N/A | `#F5F5F5` (off-white) |
| Muted Text | N/A | `rgb(209, 213, 219)` |

---

## 3. TYPOGRAPHY SCALE

### Current System (Fixed Breakpoints)
Uses fixed pixel/rem values with media query breakpoints.

| Element | Desktop | Tablet (1024px) | Mobile (768px) |
|---------|---------|-----------------|----------------|
| Hero H1 | 80px (5rem) | 56px (3.5rem) | 40px (2.5rem) |
| Manifesto H1 | 113.75px | 85px | 56px |
| Manifesto H2 | 70.7px | 53px | 35px |
| H3/H6 (Numbered) | 11px | 10px | 9px |
| Body | 18px | 17px | 16px |
| Subtitle | 16px | - | 14px |
| Navigation | 22px | - | - |

### New System (Fluid Typography)
Uses CSS `clamp()` for smooth scaling between 320px and 1280px viewport.

| Token | Role | Font | Mobile (320px) → Desktop (1280px) |
|-------|------|------|-----------------------------------|
| `display-lg` | H1 Hero | Anton | 52px → 96px |
| `display-md` | H2 Section | Anton | 42px → 72px |
| `display-sm` | H3 Title | Anton | 32px → 48px |
| `h4` | H4 Heading | Inter | 28px → 39px |
| `h5` | H5 Subhead | Inter | 24px → 31px |
| `h6` | H6 Label | Inter | 20px → 25px |
| `body` | Body Text | Azeret Mono | 16px → 18px |
| `sm` | Caption | Azeret Mono | 14px → 15px |

### CSS Variables (New)
```css
--fs-display-lg: clamp(3.25rem, 2.3333rem + 4.5833vw, 6rem);   /* 52px → 96px */
--fs-display-md: clamp(2.625rem, 2rem + 3.125vw, 4.5rem);      /* 42px → 72px */
--fs-display-sm: clamp(2rem, 1.6667rem + 1.6667vw, 3rem);      /* 32px → 48px */
--fs-h4: clamp(1.75rem, 1.5208rem + 1.1458vw, 2.4414rem);      /* 28px → 39px */
--fs-h5: clamp(1.5rem, 1.3542rem + 0.7292vw, 1.9531rem);       /* 24px → 31px */
--fs-h6: clamp(1.25rem, 1.1458rem + 0.5208vw, 1.5625rem);      /* 20px → 25px */
--fs-body: clamp(1rem, 0.9583rem + 0.2083vw, 1.125rem);        /* 16px → 18px */
--fs-sm: clamp(0.875rem, 0.8542rem + 0.1042vw, 0.9375rem);     /* 14px → 15px */
```

### Key Differences
| Aspect | Current | New |
|--------|---------|-----|
| Approach | Fixed breakpoints (1024px, 768px) | Fluid clamp() scaling |
| Responsiveness | Step changes at breakpoints | Smooth continuous scaling |
| Maintenance | Multiple media queries needed | Single declaration per size |
| Scale Ratio | Custom/irregular | Major Third (1.250) |

---

## 4. LINE HEIGHTS

### Current System
| Context | Value |
|---------|-------|
| Hero H1 | 1.1 |
| Manifesto H1 | 0.8 |
| Manifesto H2 | 0.95 / 1 |
| Body | 1.6 |
| Navigation | 1.2 |
| Named: tight | 1.1 |
| Named: snug | 1.2 |
| Named: normal | 1.4 |
| Named: relaxed | 1.6 |
| Named: loose | 1.8 |

### New System
| Context | Value |
|---------|-------|
| Display (Anton) | 0.9 |
| Headings (Inter H4) | 1.1 |
| Headings (Inter H5-H6) | 1.1-1.2 |
| Body | 1.6 |
| Small/Caption | 1.4 |
| Utility: `.leading-display` | 0.85 |

### Key Difference
- Display headings use consistent 0.9 (was variable 0.8-1.1)
- New utility class `.leading-display` for extra-tight (0.85)

---

## 5. SPACING

### Current System (8px Grid)
```javascript
spacing: {
  '18': '72px',   // 18 × 4px
  '20': '80px',   // 20 × 4px
  '22': '88px',   // 22 × 4px
  '24': '96px',   // 24 × 4px
  '28': '112px',  // 28 × 4px
  '32': '128px',  // 32 × 4px
}
```

Section padding: `100px 5%` (desktop), `80px 5%` (tablet), `60px 5%` (mobile)

### New System (Fluid Spacing)
```javascript
spacing: {
  "nav-height": "130px",
  "logo-width": "271px",
  "nav-gap": "243px",
  "nav-padding": "75px",
  "marquee-pt": "50px",
  "marquee-pb": "25px",
  "section-y": "clamp(4rem, 2rem + 5vw, 6rem)",   // 64px → 96px
  "section-x": "clamp(1rem, 0.5rem + 2.5vw, 1.5rem)", // 16px → 24px
  128: "32rem",
}
```

### Key Differences
| Aspect | Current | New |
|--------|---------|-----|
| Section Vertical | Fixed per breakpoint (60-100px) | Fluid 64px → 96px |
| Section Horizontal | Fixed 5% | Fluid 16px → 24px |
| Named Nav Tokens | None | nav-height, logo-width, nav-gap, nav-padding |
| Marquee Tokens | None | marquee-pt, marquee-pb |

---

## 6. MAX-WIDTH

### Current System
```javascript
maxWidth: {
  'readable': '75ch',
  'readable-sm': '65ch',
  'readable-xs': '50ch',
}
```

### New System
```javascript
maxWidth: {
  content: "56rem",         // 896px (max-w-4xl)
  "content-narrow": "42rem", // 672px (max-w-2xl)
  "content-wide": "48rem",   // 768px (max-w-3xl)
}
```

### Key Difference
- Current uses `ch` units (character-based)
- New uses `rem` units (fixed pixel equivalents)

---

## 7. ANIMATIONS

### Current System
```javascript
animation: {
  'marquee': 'marquee 80s linear infinite',
}
keyframes: {
  marquee: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
}
```

### New System
```javascript
animation: {
  "marquee": "marquee 64s linear infinite",
  "spin-slow": "spin 20s linear infinite",
}
keyframes: {
  marquee: {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-20%)" },
  },
}
```

### Key Differences
| Property | Current | New |
|----------|---------|-----|
| Marquee Duration | 80s | 64s (faster) |
| Marquee Distance | -50% | -20% (shorter loop) |
| Spin Animation | None | spin-slow (20s) |

---

## 8. COMPONENT CLASSES

### Current System
No defined component classes in Tailwind config. Styles defined directly in CSS.

### New System (Plugin-based)
```javascript
// Utilities
".text-stroke-primary"  // Lime outline text
".text-stroke-black"    // Black outline text

// Components
".nav-link"             // Navigation link style (17px, Azeret Mono)
".marquee-text"         // Marquee text style (17px, Azeret Mono)
".prose-body"           // Content paragraph style (fluid body)
".content-link"         // Underlined link (1px, 4px offset)
".heading-display"      // Display heading (Anton, uppercase)
```

### CSS Layer Components (New)
```css
.section-dark       // Dark section container
.section-primary    // Primary (lime) section container
.content-wrapper    // Centered content (max-w-content)
.content-wrapper-narrow  // Narrow content wrapper
.estimate-text      // Timestamp/estimate text
.logo-section       // Logo section spacing
```

---

## 9. BORDER & DECORATION

### Current System
```javascript
borderWidth: {
  '3': '3px',
}
```

### New System
```javascript
borderWidth: {
  stroke: "1px",
}
textUnderlineOffset: {
  link: "4px",
}
textDecorationThickness: {
  link: "1px",
}
```

### Key Difference
- Current uses 3px borders (thicker, bolder)
- New uses 1px stroke (thinner, more refined)

---

## 10. DARK MODE

### Current System
No dark mode configuration.

### New System
```javascript
darkMode: "class",  // Enables class-based dark mode switching
```

---

## 11. CONTENT PATHS

### Current System
```javascript
content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
]
```

### New System
```javascript
content: ["./index.html", "./**/*.{html,js}"]
```

### Key Difference
- Current: Next.js/React file structure
- New: Static HTML/JS structure

---

## 12. PLUGINS

### Current System
```javascript
plugins: []
```

### New System
```javascript
plugins: [
  require("@tailwindcss/forms"),
  require("@tailwindcss/typography"),
  // Custom utilities plugin for text-stroke and components
]
```

---

## SUMMARY OF MAJOR CHANGES

| Category | Current → New | Impact |
|----------|---------------|--------|
| **Fonts** | Azeret Mono only → Anton + Inter + Azeret Mono | Visual identity shift |
| **Primary Color** | #DAFA92 → #D2F865 | Slightly more vibrant |
| **Typography** | Fixed breakpoints → Fluid clamp() | Smoother responsiveness |
| **Dark BG** | #1a1a1a → #000000 | Higher contrast |
| **Borders** | 3px → 1px | More refined aesthetic |
| **Marquee** | 80s/-50% → 64s/-20% | Faster, shorter loop |
| **Component Classes** | CSS only → Tailwind plugin | Better reusability |
| **Dark Mode** | None → Class-based | Theme switching support |

---

## MIGRATION CONSIDERATIONS

1. **Font imports** need updating in HTML/layout files
2. **Color tokens** need renaming throughout codebase
3. **Typography classes** need updating to new fluid system
4. **Media queries** can be removed (fluid system handles responsiveness)
5. **Component classes** provide new abstraction layer
6. **Border widths** may need visual review (3px → 1px is significant)
7. **Content paths** may need adjustment based on project structure
