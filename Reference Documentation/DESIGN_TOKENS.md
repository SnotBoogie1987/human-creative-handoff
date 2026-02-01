# Human Creative - Design Tokens Reference (Fluid System)

> **Authoritative design system reference for Human Creative projects.**

---

## Quick Start

### Required Font Import
Add to your HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Azeret+Mono:wght@400&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### Required Dependencies
```bash
npm install @tailwindcss/forms @tailwindcss/typography
```

---

## 1. Typography (Fluid Scale)

Our type system is **fluid**. Text scales smoothly between Mobile (320px) and Desktop (1280px) using the Major Third (1.250) ratio.

| Token Class | Role | Font | Range (Mobile → Desktop) |
|-------------|------|------|--------------------------|
| `text-display-lg` | H1 Hero | Anton | 52px → 96px |
| `text-display-md` | H2 Section | Anton | 42px → 72px |
| `text-display-sm` | H3 Title | Anton | 32px → 48px |
| `text-h4` | H4 Heading | Inter (Bold) | 28px → 39px |
| `text-h5` | H5 Subhead | Inter (Semi) | 24px → 31px |
| `text-h6` | H6 Label | Inter (Semi) | 20px → 25px |
| `text-body` | Body | Azeret Mono | 16px → 18px |
| `text-sm` | Caption | Azeret Mono | 14px → 15px |

### Usage Example
No need for responsive prefixes (like `md:text-xl`). The classes adapt automatically.

```html
<h1 class="heading-display text-display-lg">Hero Title</h1>
<h2 class="heading-display text-display-md">Section Header</h2>
<p class="prose-body">Body text content...</p>
```

### Font Families
| Token | Class | Fonts |
|-------|-------|-------|
| Display | `font-display` | Anton, sans-serif |
| Sans | `font-sans` | Inter, sans-serif |
| Mono | `font-mono` | Azeret Mono, Space Mono, monospace |

### Line Heights
| Role | Value |
|------|-------|
| Display (Anton) | 0.9 |
| Headings (Inter) | 1.1 - 1.2 |
| Body | 1.6 |
| Small/Caption | 1.4 |
| Utility `.leading-display` | 0.85 |

---

## 2. Spacing

| Token | Class | Value | Note |
|-------|-------|-------|------|
| Section Vertical | `py-section-y` | 64px → 96px | Grows/shrinks with screen |
| Section Horizontal | `px-section-x` | 16px → 24px | Screen edge gutters |
| Nav Height | `h-nav-height` | 130px | Fixed |
| Logo Width | `w-logo-width` | 271px | Fixed |
| Nav Gap | `gap-nav-gap` | 243px | Fixed |
| Nav Padding | `p-nav-padding` | 75px | Fixed |
| Marquee Top | `pt-marquee-pt` | 50px | Fixed |
| Marquee Bottom | `pb-marquee-pb` | 25px | Fixed |

---

## 3. Colors

| Token | Class | Hex |
|-------|-------|-----|
| Primary (Acid Lime) | `bg-primary` / `text-primary` | #D2F865 |
| Background Dark | `bg-background-dark` | #000000 |
| Background Light | `bg-background-light` | #F5F5F5 |
| Text Light | `text-text-light` | #000000 |
| Text Dark | `text-text-dark` | #FFFFFF |
| Text Muted | `text-text-muted` | rgb(209, 213, 219) |

---

## 4. Max Widths

| Token | Class | Value |
|-------|-------|-------|
| Content | `max-w-content` | 56rem (896px) |
| Content Narrow | `max-w-content-narrow` | 42rem (672px) |
| Content Wide | `max-w-content-wide` | 48rem (768px) |

---

## 5. Component Patterns

### Standard Section (Dark)
```html
<section class="section-dark">
  <div class="content-wrapper">
    <h2 class="heading-display text-display-md text-primary mb-8">
      Services
    </h2>

    <div class="content-wrapper-narrow prose-body text-gray-300">
      <p>We create digital experiences...</p>
    </div>
  </div>
</section>
```

### Standard Section (Primary/Lime)
```html
<section class="section-primary">
  <div class="content-wrapper">
    <h2 class="heading-display text-display-md text-black mb-8">
      About Us
    </h2>

    <div class="content-wrapper-narrow prose-body">
      <p>Our story begins...</p>
    </div>
  </div>
</section>
```

### Navigation Link
```html
<a href="#" class="nav-link hover:text-primary transition-colors">
  Work
</a>
```

### Content Link
```html
<a href="#" class="content-link">Learn more</a>
```

---

## 6. Component Classes

| Class | Description |
|-------|-------------|
| `.section-dark` | Dark section container (black bg, white text, fluid padding) |
| `.section-primary` | Primary section container (lime bg, black text, fluid padding) |
| `.content-wrapper` | Centered content with max-w-content |
| `.content-wrapper-narrow` | Centered content with max-w-content-narrow |
| `.nav-link` | Navigation link style (17px, Azeret Mono) |
| `.marquee-text` | Marquee text style (17px, Azeret Mono) |
| `.prose-body` | Content paragraph style (fluid body size) |
| `.content-link` | Underlined link (1px thickness, 4px offset) |
| `.heading-display` | Display heading structure (Anton, uppercase) |
| `.estimate-text` | Timestamp/estimate text styling |
| `.logo-section` | Logo section with centered layout |

---

## 7. Animations

| Name | Class | Effect |
|------|-------|--------|
| Marquee | `animate-marquee` | Continuous left scroll (64s) |
| Spin Slow | `animate-spin-slow` | Rotating element (20s) |

---

## 8. Utilities

### Text Stroke
| Class | Effect |
|-------|--------|
| `.text-stroke-primary` | Lime green (#D2F865) outline text |
| `.text-stroke-black` | Black outline text |

### Line Height
| Class | Value |
|-------|-------|
| `.leading-display` | 0.85 (extra-tight for display text) |

---

## 9. Border & Decoration

| Token | Value |
|-------|-------|
| Border Stroke | 1px |
| Link Underline Offset | 4px |
| Link Underline Thickness | 1px |

---

## 10. CSS Custom Properties

These CSS variables power the fluid typography system:

```css
:root {
  /* DISPLAY HEADINGS (Anton) */
  --fs-display-lg: clamp(3.25rem, 2.3333rem + 4.5833vw, 6rem);    /* 52px → 96px */
  --fs-display-md: clamp(2.625rem, 2rem + 3.125vw, 4.5rem);       /* 42px → 72px */
  --fs-display-sm: clamp(2rem, 1.6667rem + 1.6667vw, 3rem);       /* 32px → 48px */

  /* STANDARD HEADINGS (Inter) - Major Third Scale */
  --fs-h4: clamp(1.75rem, 1.5208rem + 1.1458vw, 2.4414rem);       /* 28px → 39px */
  --fs-h5: clamp(1.5rem, 1.3542rem + 0.7292vw, 1.9531rem);        /* 24px → 31px */
  --fs-h6: clamp(1.25rem, 1.1458rem + 0.5208vw, 1.5625rem);       /* 20px → 25px */

  /* BODY & UTILITIES (Azeret Mono) */
  --fs-body: clamp(1rem, 0.9583rem + 0.2083vw, 1.125rem);         /* 16px → 18px */
  --fs-sm: clamp(0.875rem, 0.8542rem + 0.1042vw, 0.9375rem);      /* 14px → 15px */
}
```

---

## 11. Dark Mode

Dark mode is enabled via class-based switching:

```javascript
darkMode: "class"
```

Toggle by adding/removing the `dark` class on the `<html>` element.

---

## Migration Notes

### From Previous System
| Old | New |
|-----|-----|
| `#DAFA92` (lime-green) | `#D2F865` (primary) |
| `#1a1a1a` (dark-grey) | `#000000` (background-dark) |
| 3px borders | 1px borders (stroke) |
| Fixed breakpoint typography | Fluid clamp() typography |
| Single font (Azeret Mono) | Three fonts (Anton, Inter, Azeret Mono) |

### Font Weight Changes
- Azeret Mono now uses weight 400 only
- Bold/heavy text uses Inter (weights 300-700 available)
- Display headings use Anton (single weight)
