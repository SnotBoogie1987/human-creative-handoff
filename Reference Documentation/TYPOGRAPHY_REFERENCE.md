# Manifesto Page - Typography Specifications

## ✅ Updated CSS Typography (Exact Match to Design)

### H1 - Main Section Headers
**Example:** "THE HUMANIFESTO"
```css
font-family: 'Azeret Mono', monospace;
font-size: 113.75px;
font-weight: 900;
line-height: 91px;
text-align: center;
letter-spacing: 0;
```

### H2 - Section Subheaders
**Example:** "LAUGH NOW, CRY NEVER"
```css
font-family: 'Azeret Mono', monospace;
font-size: 70.7px;
font-weight: 800;
line-height: 1;
text-align: center;
letter-spacing: 0;
```

### H3/H6 - Numbered Subheadings
**Example:** "01. BE REGENERATIVE, NOT SUSTAINABLE" or "02. GOODBYE FEES"
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
**Note:** These appear directly below the H1/H2 titles with a leading non-breaking space (&nbsp;)

### Body Text - Section Paragraphs
**Example:** Main content paragraphs
```css
font-family: 'Azeret Mono', monospace;
font-size: 18px;
font-weight: 400;
line-height: 28.8px;
text-align: center;
```

### Subtitle Text
**Example:** "OUR VALUES REMAIN UNWILLING TO YIELD."
```css
font-family: 'Azeret Mono', monospace;
font-size: 16px;
font-weight: 400;
line-height: 22.4px;
text-align: center;
font-style: italic;
opacity: 0.8;
```

---

## 📱 Responsive Breakpoints

### Tablet (max-width: 1024px)
```css
H1: 85px / 68px line-height
H2: 53px / line-height 1
H3/H6: 10px
Body: 17px / 27px line-height
```

### Mobile (max-width: 768px)
```css
H1: 56px / 45px line-height
H2: 35px / line-height 1
H3/H6: 9px
Body: 16px / 25.6px line-height
Subtitle: 14px / 20px line-height
```

---

## 🎨 Color System

### Dark Sections
```css
background: #000000
text-color: #ffffff
```

### Light Sections
```css
background: #DAFA92 (--lime-green)
text-color: #000000
```

---

## 📦 Font Weights Required

Make sure your @import includes all necessary weights:
```css
@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@200;400;700;800;900&display=swap');
```

**Weights Used:**
- 400: Body text, subtitles
- 700: H3 numbered headings
- 800: H2 section headers
- 900: H1 main headers

---

## ✨ Key Differences from Original

### What Was Changed:
❌ Old: Generic rem-based sizing (4rem, 3rem, 1.1rem)
✅ New: Exact pixel values (113.75px, 70.7px, 18px)

❌ Old: Generic line-heights (1.1, 1.8)
✅ New: Exact pixel line-heights (91px, 28.8px)

❌ Old: Missing H3 styles
✅ New: H3 styles for numbered subheadings (13.75px, 700 weight)

❌ Old: Only font-weight 400 and 900
✅ New: Added font-weights 700 and 800

❌ Old: Generic letter-spacing (1px)
✅ New: No letter-spacing (0) to match design

---

## 🎯 How to Use

### In HTML:
```html
<section class="manifesto-section manifesto-dark">
    <h1>THE<br>HUMANIFESTO</h1>
    <h6>&nbsp;00. OUR VALUES REMAIN UNWILLING TO YIELD.</h6>
    <p>Body text paragraph...</p>
</section>

<section class="manifesto-section manifesto-light">
    <h2>WE ARE NOT<br>SUSTAINABLE</h2>
    <h6>&nbsp;01. BE REGENERATIVE, NOT SUSTAINABLE</h6>
    <p>Body text paragraph...</p>
</section>
```

**Note:** The `&nbsp;` (non-breaking space) at the start of h6 tags is intentional and matches the original design.

### Section Alternation:
- Section 1: `manifesto-dark` (black background)
- Section 2: `manifesto-light` (lime green background)
- Section 3: `manifesto-dark` (black background)
- Section 4: `manifesto-light` (lime green background)
- ...and so on

---

## 📄 Files Updated
- ✅ `/mnt/user-data/outputs/style.css` - Complete CSS with exact typography
- ✅ `/mnt/user-data/outputs/manifesto.html` - Formatted HTML structure

All typography now matches the design specifications from manifesto.png exactly!
