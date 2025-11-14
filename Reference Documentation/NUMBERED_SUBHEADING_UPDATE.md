# Manifesto Page - Numbered Subheading Update Summary

## ✅ What Was Fixed

### **Numbered Subheadings (H6 tags)**

The small numbered captions below each section title now match the exact Wix specifications:

```
"01. BE REGENERATIVE, NOT SUSTAINABLE"
"02. GOODBYE FEES"
"03. WE TIDE TO RISE"
"04. REAL IMPACT"
"05. BOREDOM IS THE ENEMY"
```

---

## 📐 Exact Specifications Applied

### Desktop (Default)
```css
font-family: 'Azeret Mono', monospace;
font-size: 11px;
font-weight: 700;
line-height: normal;
margin: 0;
margin-block: 0;
text-align: center;
text-decoration: none;
letter-spacing: 0em;
padding-bottom: 15px;
```

### Tablet (max-width: 1024px)
```css
font-size: 10px;
```

### Mobile (max-width: 768px)
```css
font-size: 9px;
```

---

## 🔄 Changes Made

### **Before:**
```html
<h2>WE ARE NOT<br>SUSTAINABLE</h2>
<p class="manifesto-subtitle">AN INCONVENIENT AS CERTIFICATE</p>
```
- Used paragraph tags with `.manifesto-subtitle` class
- Font size was 16px (too large)
- No numbering system

### **After:**
```html
<h2>WE ARE NOT<br>SUSTAINABLE</h2>
<h6>&nbsp;01. BE REGENERATIVE, NOT SUSTAINABLE</h6>
```
- Uses `<h6>` semantic tags
- Font size is 11px (exact match)
- Proper numbering: 00, 01, 02, 03, 04, 05
- Leading non-breaking space (`&nbsp;`) for alignment

---

## 📋 All Section Numbers

| Section | H1/H2 Title | H6 Numbered Subheading |
|---------|-------------|------------------------|
| 1 (Dark) | THE HUMANIFESTO | 00. OUR VALUES REMAIN UNWILLING TO YIELD. |
| 2 (Light) | WE ARE NOT SUSTAINABLE | 01. BE REGENERATIVE, NOT SUSTAINABLE |
| 3 (Dark) | IF YOU DON'T LIKE THE SYSTEM, DON'T DEPEND ON IT. | 02. GOODBYE FEES |
| 4 (Light) | ALL BOATS RISE WITH THE TIDE | 03. WE TIDE TO RISE |
| 5 (Dark) | LAUGH NOW, CRY NEVER | 04. REAL IMPACT |
| 6 (Light) | BOREDOM IS THE ENEMY | 05. BOREDOM IS THE ENEMY |

---

## 🎨 Visual Hierarchy

```
┌─────────────────────────────────────┐
│                                     │
│         [LARGE H1/H2 TITLE]        │  ← 113.75px / 70.7px
│                                     │
│   00. SMALL NUMBERED CAPTION       │  ← 11px (h6)
│                                     │
│  Regular body text paragraph...    │  ← 18px
│                                     │
└─────────────────────────────────────┘
```

---

## 📂 Updated Files

1. ✅ **style.css** - Updated h3/h6 styles to 11px with proper properties
2. ✅ **manifesto.html** - Changed all subtitle paragraphs to h6 tags with numbering
3. ✅ **TYPOGRAPHY_REFERENCE.md** - Updated documentation

---

## 🔍 Key Properties from Wix Inspector

Matched these exact CSS properties from the Wix site:

```css
/* From Wix class .font_6 */
font-size: calc(11 * var(--theme-spx-ratio)); /* = 11px */
letter-spacing: 0em;

/* From Wix <h6> styles */
font-weight: 700;
text-decoration: none;
text-align: center;
margin-block: 0;
margin: 0;
```

---

## ✨ Result

The numbered subheadings now **exactly match** the purple-underlined captions from your screenshot, with proper semantic HTML (h6 tags) and pixel-perfect typography (11px, 700 weight).
