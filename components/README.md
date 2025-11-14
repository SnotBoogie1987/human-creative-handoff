# Component Library Documentation

## Overview

This directory contains all reusable React components for the HUMAN. Creative website, built with Next.js 14, TypeScript, and Tailwind CSS.

---

## Directory Structure

```
components/
├── layout/          # Page layout components
│   ├── Header.tsx   # Main navigation header
│   ├── Footer.tsx   # Site footer
│   ├── Marquee.tsx  # Scrolling marquee banner
│   └── index.ts     # Layout exports
└── ui/              # Reusable UI components
    ├── Button.tsx   # Button component (outline/solid)
    ├── Input.tsx    # Input and Textarea components
    └── index.ts     # UI exports
```

---

## Layout Components

### Header

**File:** `layout/Header.tsx`

3-column grid layout with main navigation, account link, and mobile menu.

**Features:**
- Logo (left)
- Main navigation (center): MANIFESTO, WORK, ENQUIRE, IMPACT, SHOP
- Account link (right)
- Mobile hamburger menu with full-screen overlay
- Responsive design

**Usage:**
```tsx
import { Header } from '@/components/layout'

<Header />
```

**Styling:**
- Desktop: 3-column grid
- Mobile: Hamburger menu with animated icon
- Green-to-white hover for main nav
- White-to-green hover for account link

---

### Footer

**File:** `layout/Footer.tsx`

Lime green footer with info icon, copyright, and social links.

**Features:**
- Info icon (left)
- Copyright with current year (center)
- Social media links (right): Instagram, TikTok
- Responsive layout (column on mobile, row on desktop)

**Usage:**
```tsx
import { Footer } from '@/components/layout'

<Footer />
```

**Styling:**
- Background: Lime green (#DAFA92)
- Text: Dark text (#000000)
- Hover: Opacity transition

---

### Marquee

**File:** `layout/Marquee.tsx`

Infinite scrolling marquee banner with partner/sponsor text.

**Features:**
- 80-second infinite scroll animation
- Customizable text content
- Lime green background
- Height: 75px

**Usage:**
```tsx
import { Marquee } from '@/components/layout'

// Default partners text
<Marquee />

// Custom text
<Marquee text="YOUR CUSTOM TEXT HERE |" />
```

**Props:**
- `text` (optional): Custom marquee text. Default shows partners list.

**Styling:**
- Background: Lime green
- Text: Dark text
- Animation: translateX 80s linear infinite

---

## UI Components

### Button

**File:** `ui/Button.tsx`

CTA button with outline and solid variants.

**Features:**
- Two variants: `outline` (default) and `solid`
- Works as button or link (Next.js Link)
- Disabled state
- Full-width option for mobile
- TypeScript props

**Usage:**
```tsx
import { Button } from '@/components/ui'

// Outline button (default)
<Button variant="outline">READ THE MANIFESTO</Button>

// Solid button
<Button variant="solid">JOIN NOW</Button>

// As link
<Button href="/manifesto">GO TO MANIFESTO</Button>

// Disabled
<Button disabled>COMING SOON</Button>

// Full width
<Button fullWidth>SUBMIT</Button>

// With onClick handler
<Button onClick={() => console.log('clicked')}>CLICK ME</Button>
```

**Props:**
```typescript
interface ButtonProps {
  children: React.ReactNode
  variant?: 'outline' | 'solid'
  href?: string              // Renders as Link if provided
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string         // Additional Tailwind classes
  fullWidth?: boolean        // Full width on mobile
}
```

**Dimensions:**
- Desktop: 410.5px × 80px
- Mobile: Full width × 70px

**Styling:**
- **Outline:** Transparent bg, lime green border/text → Hover: lime bg, dark text
- **Solid:** Lime bg, dark text → Hover: transparent bg, lime text
- Border: 3px solid
- Font: Azeret Mono, 18-20px

---

### Input

**File:** `ui/Input.tsx`

Text input component with label, error states, and helper text.

**Features:**
- Optional label
- Error state with custom message
- Helper text
- Disabled state
- Full TypeScript support
- ForwardRef for form libraries

**Usage:**
```tsx
import { Input } from '@/components/ui'

// Basic input
<Input placeholder="Enter your name" />

// With label
<Input label="Email Address" type="email" />

// With helper text
<Input
  label="Username"
  helperText="Must be at least 3 characters"
/>

// With error
<Input
  label="Password"
  type="password"
  error="Password is required"
/>

// Disabled
<Input label="Read Only" disabled value="Cannot edit" />

// With react-hook-form
const { register } = useForm()
<Input {...register('email')} label="Email" />
```

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string        // Input label
  error?: string        // Error message (changes border to red)
  helperText?: string   // Helper text below input
}
```

**Styling:**
- Border: 3px solid lime green (red when error)
- Background: Transparent
- Text: White (Azeret Mono)
- Focus: Ring effect
- Placeholder: Gray

---

### Textarea

**File:** `ui/Input.tsx`

Textarea component with same features as Input.

**Features:**
- Same as Input component
- Vertical resize only
- Default 4 rows (customizable)

**Usage:**
```tsx
import { Textarea } from '@/components/ui'

// Basic textarea
<Textarea placeholder="Enter your message" />

// With label and rows
<Textarea label="Bio" rows={6} />

// With error
<Textarea
  label="Message"
  error="Message is required"
/>

// With helper text
<Textarea
  label="Description"
  helperText="Maximum 500 characters"
/>
```

**Props:**
```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}
```

---

## Design Tokens

All components use Tailwind design tokens from `tailwind.config.js`:

### Colors
- `lime-green`: #DAFA92
- `dark-grey`: #1a1a1a
- `light-text`: #ffffff
- `dark-text`: #000000

### Typography
- Font: Azeret Mono (200, 400, 700, 800, 900)
- Hero H1: `text-hero` (80px / 900)
- Manifesto H1: `text-manifesto-h1` (113.75px / 900)
- Manifesto H2: `text-manifesto-h2` (70.7px / 800)
- Navigation: `text-nav` (22px / 400)
- Body: `text-manifesto-body` (18px / 400)

### Custom Sizes
- Button width: `w-cta-button` (410.5px)
- Button height: `h-cta-button` (80px desktop, 70px mobile)
- Marquee height: `h-marquee` (75px)
- Border: `border-3` (3px)

### Animations
- Marquee: `animate-marquee` (80s linear infinite)

---

## Testing Components

Visit `/components-showcase` in your browser to see all components in action with different states and variations.

**Development server:**
```bash
npm run dev
# Open http://localhost:3000/components-showcase
```

---

## Responsive Behavior

### Header
- **Desktop:** 3-column grid layout
- **Mobile:** Hamburger menu with full-screen overlay

### Footer
- **Desktop:** 3-column row layout
- **Mobile:** Stacked column layout

### Button
- **Desktop:** Fixed width (410.5px)
- **Mobile:** Full width or custom width

### Marquee
- Consistent across all breakpoints

---

## Best Practices

1. **Import from index files:**
   ```tsx
   import { Header, Footer } from '@/components/layout'
   import { Button, Input } from '@/components/ui'
   ```

2. **Use TypeScript props:**
   All components are fully typed with TypeScript interfaces.

3. **Leverage Tailwind utilities:**
   Add custom styles via `className` prop when needed.

4. **Form integration:**
   Input and Textarea use `forwardRef` for seamless integration with `react-hook-form`.

5. **Accessibility:**
   - All interactive elements have proper ARIA labels
   - Semantic HTML elements used throughout
   - Keyboard navigation supported

---

## Component Checklist

- ✅ Header (3-column grid, mobile menu)
- ✅ Footer (lime green, social links)
- ✅ Marquee (80s animation)
- ✅ Button (outline/solid variants)
- ✅ Input (error states, validation-ready)
- ✅ Textarea (error states, validation-ready)

---

## Next Steps

With the component library complete, you can now:
1. Build the homepage with video hero (Phase 3)
2. Create the manifesto page with complex typography (Phase 3)
3. Implement authentication pages using Input/Button (Phase 4)
4. Build forms with validation using react-hook-form + zod (Phase 5+)

---

**Last Updated:** Phase 2 Complete
