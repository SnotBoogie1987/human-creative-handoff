# HUMAN. Website Build - Progress Checklist

Use this checklist to track your progress through the build. Check off items as you complete them.

---

## 🏗️ Phase 1: Foundation & Setup

### 1.1 Supabase Setup (Manual)
- [ ] Created Supabase account
- [ ] Created new project
- [ ] Ran `supabase-schema.sql` in SQL Editor
- [ ] Ran `supabase-policies.sql` in SQL Editor
- [ ] Ran `supabase-storage.sql` in SQL Editor
- [ ] Copied Project URL to `.env.local`
- [ ] Copied Anon Key to `.env.local`
- [ ] Copied Service Role Key to `.env.local`
- [ ] Verified all 3 storage buckets created in dashboard

### 1.2 Project Initialization (Claude Code)
- [ ] Created Next.js 14 project with TypeScript
- [ ] Installed Supabase dependencies (@supabase/supabase-js, @supabase/ssr)
- [ ] Installed form dependencies (react-hook-form, zod)
- [ ] Configured Tailwind CSS with design tokens
- [ ] Created `.env.local` file
- [ ] Verified `npm run dev` works

### 1.3 Core Utilities (Claude Code)
- [ ] Created Supabase client utility (`lib/supabase/client.ts`)
- [ ] Created Supabase server utility (`lib/supabase/server.ts`)
- [ ] Created auth middleware (`lib/supabase/middleware.ts`)
- [ ] Created globals.css with Tailwind imports + global styles
- [ ] Verified Supabase connection works

---

## 🎨 Phase 2: Component Library

### 2.1 Layout Components (Claude Code)
- [ ] Created Header component (`components/layout/Header.tsx`)
  - [ ] Logo with link to home
  - [ ] Main navigation (MANIFESTO, WORK, ENQUIRE, IMPACT, SHOP)
  - [ ] Account navigation
  - [ ] Mobile menu toggle (responsive)
- [ ] Created Footer component (`components/layout/Footer.tsx`)
  - [ ] Left: Info icon
  - [ ] Center: Copyright
  - [ ] Right: Social links
  - [ ] Lime green background
- [ ] Created Marquee component (`components/layout/Marquee.tsx`)
  - [ ] 80s continuous scroll animation
  - [ ] Partners text
  - [ ] 75px height
- [ ] Tested all layout components render correctly

### 2.2 UI Components (Claude Code)
- [ ] Created Button component (`components/ui/Button.tsx`)
  - [ ] Outline variant (transparent bg, lime border)
  - [ ] Solid variant (lime bg, dark text)
  - [ ] Correct dimensions (410.5px × 80px)
  - [ ] Hover states
  - [ ] TypeScript props
- [ ] Created Input component (`components/ui/Input.tsx`)
  - [ ] Text input
  - [ ] Textarea variant
  - [ ] Error states
  - [ ] Accessible labels
- [ ] Tested all UI components with different props

---

## 📄 Phase 3: Public Pages

### 3.1 Homepage (Claude Code)
- [ ] Created page at `app/page.tsx`
- [ ] Added video background component
- [ ] Added dark overlay (60% opacity)
- [ ] Added hero content (H1 + CTA button)
- [ ] Verified 100vh layout works
- [ ] Tested video autoplay/loop
- [ ] Tested responsive design (mobile/tablet/desktop)

### 3.2 Manifesto Page (Claude Code)
- [ ] Created page at `app/manifesto/page.tsx`
- [ ] Section 1: THE HUMANIFESTO (dark)
  - [ ] H1: 113.75px / 900 weight / 91px line-height
  - [ ] H6 numbered subheading: 11px / 700 weight
  - [ ] Body text: 18px / 28.8px line-height
  - [ ] Signature section
- [ ] Section 2: WE ARE NOT SUSTAINABLE (light)
- [ ] Section 3: IF YOU DON'T LIKE THE SYSTEM (dark)
- [ ] Section 4: ALL BOATS RISE WITH THE TIDE (light)
- [ ] Section 5: LAUGH NOW, CRY NEVER (dark)
- [ ] Section 6: BOREDOM IS THE ENEMY (light)
- [ ] Verified exact typography matches specs
- [ ] Tested scrolling works (not fixed viewport)
- [ ] Tested alternating section colors
- [ ] Tested responsive typography scaling

### 3.3 Other Static Pages (Claude Code)
- [ ] Created `/work` page placeholder
- [ ] Created `/enquire` page placeholder
- [ ] Created `/impact` page placeholder
- [ ] Created `/shop` page placeholder
- [ ] All pages have Header, Footer, Marquee

---

## 🔐 Phase 4: Authentication

### 4.1 Auth Pages (Claude Code)
- [ ] Created `/login` page
  - [ ] Email input
  - [ ] Password input
  - [ ] Login button
  - [ ] Link to signup
  - [ ] Link to reset password
  - [ ] Form validation
- [ ] Created `/signup` page
  - [ ] Email input
  - [ ] Password input
  - [ ] Confirm password input
  - [ ] Signup button
  - [ ] Link to login
  - [ ] Form validation
- [ ] Created `/reset-password` page
  - [ ] Email input
  - [ ] Submit button
  - [ ] Success message

### 4.2 Auth Testing
- [ ] Tested signup flow (creates user in Supabase)
- [ ] Tested login flow (sets session)
- [ ] Tested logout flow (clears session)
- [ ] Tested password reset email received
- [ ] Verified protected routes redirect to login

### 4.3 Middleware (Claude Code)
- [ ] Created `middleware.ts` in root
- [ ] Protected `/dashboard` routes
- [ ] Protected `/profile` routes
- [ ] Tested unauthenticated access redirects to `/login`
- [ ] Tested authenticated access allows entry

---

## 📝 Phase 5: Freelancer Onboarding

### 5.1 Form Structure (Claude Code)
- [ ] Created `/freelancer-onboarding` page
- [ ] Created multi-step form component
- [ ] Created progress indicator
- [ ] Created navigation (Next/Previous buttons)
- [ ] Set up form state management (react-hook-form)
- [ ] Created Zod validation schemas

### 5.2 Form Steps (Claude Code)
- [ ] Step 1: Personal Info
  - [ ] First name, second name
  - [ ] Bio
  - [ ] Profile picture upload
  - [ ] Headshot upload
- [ ] Step 2: Professional Profile
  - [ ] Representation
  - [ ] Operating positions (multi-select)
  - [ ] Years of experience
  - [ ] Personal website
  - [ ] Social accounts
  - [ ] Show reels
  - [ ] Work links
  - [ ] BTS photos upload (multiple)
- [ ] Step 3: Kit
  - [ ] Has kit? (checkbox)
  - [ ] Kit value
  - [ ] Camera bodies, lenses, gimbal, etc.
- [ ] Step 4: Editing Skills
  - [ ] Premiere Pro level (None/Good/Very Good)
  - [ ] Final Cut Pro level
  - [ ] DaVinci Resolve level
  - [ ] Other editing software
- [ ] Step 5: Sensitive Info
  - [ ] Birthdate
  - [ ] Address
  - [ ] Phone number
  - [ ] Passport scan upload
  - [ ] Driving license info & upload
  - [ ] Medical info (dietary, allergies, emergency contact)
- [ ] Step 6: Review
  - [ ] Display all entered data
  - [ ] Allow editing (go back to steps)
  - [ ] Submit button

### 5.3 File Upload Utility (Claude Code)
- [ ] Created `lib/utils/file-upload.ts`
- [ ] Handles public bucket uploads
- [ ] Handles private bucket uploads
- [ ] Returns correct URL/path format
- [ ] Validates file types
- [ ] Validates file sizes
- [ ] Shows error messages

### 5.4 Server Action (Claude Code)
- [ ] Created `app/freelancer-onboarding/actions.ts`
- [ ] Uploads public files to `freelancer-public-assets`
- [ ] Uploads private files to `freelancer-private-docs`
- [ ] Inserts data into `profiles` table
- [ ] Inserts data into `private_freelancer_details` table
- [ ] Returns success/error response
- [ ] Handles errors gracefully

### 5.5 Onboarding Testing
- [ ] Tested complete form flow (all steps)
- [ ] Tested file uploads (public and private)
- [ ] Tested form validation (required fields)
- [ ] Tested data appears in Supabase tables
- [ ] Tested file URLs are correct
- [ ] Tested user can only submit once (or update existing)
- [ ] Tested RLS: user can only see their own data

---

## 👤 Phase 6: User Dashboard & Profile

### 6.1 Dashboard (Claude Code)
- [ ] Created `/dashboard` page
- [ ] Shows welcome message with user's name
- [ ] Shows profile completion status
- [ ] Links to profile view/edit
- [ ] Protected by middleware

### 6.2 Profile Pages (Claude Code)
- [ ] Created `/profile/view` page
  - [ ] Fetches data from `profiles` table
  - [ ] Displays all public/professional info
  - [ ] Shows profile picture and headshot
  - [ ] Does NOT show sensitive data
- [ ] Created `/profile/edit` page
  - [ ] Pre-fills form with existing data
  - [ ] Allows updates to all fields
  - [ ] Uses same validation as onboarding
  - [ ] Updates database on submit
  - [ ] Shows success message

### 6.3 Profile Testing
- [ ] Tested dashboard loads for logged-in user
- [ ] Tested profile view shows correct data
- [ ] Tested profile edit pre-fills correctly
- [ ] Tested profile updates save to database
- [ ] Tested RLS: can only edit own profile

---

## 🎬 Phase 7: Agency Portfolio

### 7.1 Work Index (Claude Code)
- [ ] Created `/work` page
- [ ] Fetches all projects from `agency_projects` table
- [ ] Displays in grid layout
- [ ] Shows cover images (Next.js Image optimization)
- [ ] Shows project titles
- [ ] Links to individual project pages
- [ ] Responsive grid (1 col mobile, 2 col tablet, 3+ col desktop)

### 7.2 Dynamic Project Pages (Claude Code)
- [ ] Created `/work/[slug]/page.tsx`
- [ ] Fetches project by slug
- [ ] Displays video player (if video_url exists)
- [ ] Shows full description
- [ ] Shows cover image
- [ ] Implements generateStaticParams for SSG
- [ ] Returns 404 if slug doesn't exist
- [ ] Created custom 404 page

### 7.3 Portfolio Testing
- [ ] Created test projects in `agency_projects` table
- [ ] Tested work index page loads
- [ ] Tested clicking project navigates to detail page
- [ ] Tested project detail page shows correct data
- [ ] Tested invalid slug returns 404
- [ ] Tested video playback (if applicable)

---

## 📋 Phase 8: Utility Forms

### 8.1 Form Pages (Claude Code)
- [ ] Created `/client-contact` page
  - [ ] Name, email, message fields
  - [ ] Submit button
  - [ ] Validation
- [ ] Created `/client-onboarding` page
  - [ ] Company details
  - [ ] Project information
  - [ ] Validation
- [ ] Created `/special-rates` page
  - [ ] Project details
  - [ ] Budget information
  - [ ] Validation

### 8.2 Form Submissions (Claude Code)
- [ ] Created `app/actions/form-submissions.ts`
- [ ] Saves to `form_submissions` table
- [ ] Sets correct `form_name` for each form
- [ ] Stores data as JSONB
- [ ] Returns success response
- [ ] Shows success message to user

### 8.3 Form Testing
- [ ] Tested client-contact form submits
- [ ] Tested client-onboarding form submits
- [ ] Tested special-rates form submits
- [ ] Verified data appears in Supabase table
- [ ] Tested form validation works
- [ ] Tested success messages display

---

## 🎯 Phase 9: SEO & Performance

### 9.1 Metadata (Claude Code)
- [ ] Added root layout metadata (`app/layout.tsx`)
- [ ] Added homepage metadata
- [ ] Added manifesto page metadata
- [ ] Added work page metadata
- [ ] Added dynamic project page metadata
- [ ] Added Open Graph images
- [ ] Added Twitter cards

### 9.2 Sitemap & Robots (Claude Code)
- [ ] Created `app/sitemap.ts`
  - [ ] Includes all static pages
  - [ ] Includes dynamic project pages
  - [ ] Correct priorities
  - [ ] Change frequencies
- [ ] Created `app/robots.ts`
  - [ ] Allows all pages
  - [ ] Links to sitemap

### 9.3 Performance (Testing)
- [ ] Ran Lighthouse audit
- [ ] Score > 90 on Performance
- [ ] Score > 90 on Accessibility
- [ ] Score > 90 on SEO
- [ ] Optimized images (Next.js Image)
- [ ] No console errors
- [ ] Fast page loads

---

## 🧪 Phase 10: Testing & QA

### 10.1 Authentication Testing
- [ ] Signup creates user successfully
- [ ] Login works with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Logout clears session
- [ ] Password reset email received
- [ ] Protected routes redirect when not logged in
- [ ] Protected routes accessible when logged in

### 10.2 Data Security Testing
- [ ] User A cannot see User B's private data
- [ ] User A cannot edit User B's profile
- [ ] Private documents require signed URLs
- [ ] Public documents have direct URLs
- [ ] RLS policies prevent unauthorized access
- [ ] No sensitive data exposed in client

### 10.3 Form Testing
- [ ] Onboarding form completes successfully
- [ ] File uploads work (public and private)
- [ ] Data saves to correct tables
- [ ] Validation catches errors
- [ ] Success messages display
- [ ] Utility forms submit correctly

### 10.4 Responsive Testing
- [ ] Mobile (320px-767px)
  - [ ] All pages display correctly
  - [ ] Navigation works (mobile menu)
  - [ ] Forms are usable
  - [ ] Images scale properly
  - [ ] Typography is readable
- [ ] Tablet (768px-1023px)
  - [ ] Layout adjusts appropriately
  - [ ] All features accessible
- [ ] Desktop (1024px+)
  - [ ] Full layout displays
  - [ ] All features work

### 10.5 Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🚀 Phase 11: Deployment

### 11.1 Pre-Deployment
- [ ] All tests passing
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Environment variables documented
- [ ] .gitignore configured correctly
- [ ] No sensitive data in code

### 11.2 Vercel Deployment
- [ ] Pushed code to GitHub
- [ ] Connected repo to Vercel
- [ ] Added environment variables in Vercel:
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] First deployment successful
- [ ] Tested live site works
- [ ] No build errors

### 11.3 Domain & Production
- [ ] Connected custom domain
- [ ] SSL certificate active
- [ ] DNS configured correctly
- [ ] Site accessible at custom domain
- [ ] Supabase production settings configured
- [ ] Email settings configured (for auth)

### 11.4 Post-Deployment Testing
- [ ] Tested all features on production
- [ ] Tested auth flows on production
- [ ] Tested form submissions on production
- [ ] Tested file uploads on production
- [ ] Verified analytics working (if applicable)
- [ ] No errors in production logs

---

## ✅ Project Complete!

Congratulations! 🎉 Your HUMAN. website is now live.

### Final Steps:
- [ ] Notify stakeholders
- [ ] Share production URL
- [ ] Document any known issues
- [ ] Plan for future features
- [ ] Set up monitoring/alerts

---

**Total Checklist Items:** 200+
**Estimated Completion Time:** 5-7 days with Claude Code
**Last Updated:** {{ DATE }}
