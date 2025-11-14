# HANDOFF PACKAGE: HUMAN. Website → Claude Code Migration

## 📦 Quick Start Checklist

Before opening in Claude Code, ensure you have:
- [ ] All files from this handoff package
- [ ] A Supabase account (free tier is fine)
- [ ] Node.js v18+ installed
- [ ] Git initialized in your project directory

---

## 🗂️ Complete File Structure

```
human-creative/
├── README.md                          # Project overview & setup instructions
├── HANDOFF_INSTRUCTIONS.md           # This file - migration guide
├── package.json                      # Dependencies list
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
│
├── docs/
│   ├── PROJECT_PLAN.md               # Complete technical specification
│   ├── TYPOGRAPHY_REFERENCE.md       # Design system specs
│   ├── NUMBERED_SUBHEADING_UPDATE.md # Manifesto page typography details
│   └── DATABASE_SCHEMA.sql           # Complete Supabase setup
│
├── design-reference/
│   ├── Home.html                     # Reference homepage
│   ├── manifesto.html                # Reference manifesto page
│   ├── style.css                     # Complete CSS (ready for Tailwind migration)
│   ├── manifesto.png                 # Design screenshot
│   └── tailwind.config.js            # Pre-configured Tailwind setup
│
└── supabase/
    ├── schema.sql                    # Database tables & types
    ├── policies.sql                  # Row Level Security policies
    └── storage-buckets.sql           # File storage configuration
```

---

## 🚀 Phase 1: Initial Setup (Give to Claude Code First)

### Step 1: Create Project Structure

```bash
# Claude Code should execute these commands:
npx create-next-app@latest human-creative --typescript --app --tailwind --eslint
cd human-creative

# Install Supabase client
npm install @supabase/supabase-js @supabase/ssr

# Install additional dependencies
npm install react-hook-form zod date-fns
```

### Step 2: Environment Setup

**Provide Claude Code with this instruction:**

> "Create a `.env.local` file with these variables. I'll fill in the actual values after setting up Supabase:
> ```
> NEXT_PUBLIC_SUPABASE_URL=
> NEXT_PUBLIC_SUPABASE_ANON_KEY=
> SUPABASE_SERVICE_ROLE_KEY=
> ```"

### Step 3: Supabase Database Setup

**You (human) must do this manually:**

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Navigate to SQL Editor
3. Run the SQL from `supabase/schema.sql`
4. Run the SQL from `supabase/policies.sql`
5. Run the SQL from `supabase/storage-buckets.sql`
6. Copy your Project URL and keys to `.env.local`

**Then tell Claude Code:**
> "I've set up Supabase. The credentials are in `.env.local`. Please create the Supabase client configuration."

---

## 📋 Phase 2: Core Infrastructure (Claude Code Tasks)

### Task 2.1: Configure Tailwind

**Prompt:**
> "Set up Tailwind CSS using the design tokens from `design-reference/tailwind.config.js`. Include all colors, fonts, animations from the reference CSS."

**Files Claude Code should create:**
- `tailwind.config.ts` (with all design tokens)
- `app/globals.css` (with Tailwind imports + global styles)

### Task 2.2: Create Supabase Utilities

**Prompt:**
> "Create Supabase client utilities for both client-side and server-side usage, following Next.js 14 App Router best practices with TypeScript."

**Files Claude Code should create:**
- `lib/supabase/client.ts` (browser client)
- `lib/supabase/server.ts` (server client with cookies)
- `lib/supabase/middleware.ts` (auth middleware)

### Task 2.3: Build Component Library

**Prompt:**
> "Build the core component library based on `design-reference/style.css` and `design-reference/Home.html`. Start with:
> 1. Layout components (Header, Footer, Marquee)
> 2. UI components (Button with variants, Input)
> 
> Use TypeScript and make them fully responsive."

**Files Claude Code should create:**
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/layout/Marquee.tsx`
- `components/ui/Button.tsx`
- `components/ui/Input.tsx`

---

## 📋 Phase 3: Public Pages (Claude Code Tasks)

### Task 3.1: Homepage

**Prompt:**
> "Create the homepage at `app/page.tsx` based on `design-reference/Home.html`. Include:
> - Video background with overlay
> - Hero content with H1 and CTA button
> - Full viewport height layout
> - All styling from the reference"

### Task 3.2: Manifesto Page

**Prompt:**
> "Create the manifesto page at `app/manifesto/page.tsx` based on `design-reference/manifesto.html` and `docs/TYPOGRAPHY_REFERENCE.md`. Key requirements:
> - Alternating dark/light sections
> - Exact typography specifications (113.75px H1, 70.7px H2, 11px H6, 18px body)
> - Numbered subheadings below each section title
> - Scrollable content (not fixed viewport like homepage)
> - Signature section in first section"

**Reference files to provide:**
- `design-reference/manifesto.html`
- `docs/TYPOGRAPHY_REFERENCE.md`
- `docs/NUMBERED_SUBHEADING_UPDATE.md`

### Task 3.3: Other Static Pages

**Prompt for each page:**
> "Create a placeholder page for [PAGE_NAME] at `app/[route]/page.tsx` with the standard layout (header, footer, marquee). We'll add content later."

Pages to create:
- `app/work/page.tsx`
- `app/enquire/page.tsx`
- `app/impact/page.tsx`
- `app/shop/page.tsx`

---

## 📋 Phase 4: Authentication System (Claude Code Tasks)

### Task 4.1: Auth Pages

**Prompt:**
> "Create authentication pages with Supabase Auth:
> 1. Login page at `app/login/page.tsx`
> 2. Signup page at `app/signup/page.tsx`
> 3. Password reset at `app/reset-password/page.tsx`
> 
> Use the design system (lime green buttons, Azeret Mono font). Forms should use react-hook-form with zod validation."

### Task 4.2: Protected Route Middleware

**Prompt:**
> "Create middleware to protect routes under `/dashboard` and `/profile`. Redirect unauthenticated users to `/login`. Use the Supabase middleware utility we created earlier."

**File Claude Code should create:**
- `middleware.ts` (in root directory)

---

## 📋 Phase 5: Freelancer Onboarding Form (Claude Code Tasks)

### Task 5.1: Multi-Step Form Component

**Prompt:**
> "Create a multi-step freelancer onboarding form at `app/freelancer-onboarding/page.tsx`. This is the most complex part of the build.
> 
> **Requirements:**
> - Multi-step form with progress indicator
> - Steps: Personal Info → Professional Profile → Kit → Editing Skills → Sensitive Info → Review
> - File uploads for: profile picture, headshot, BTS photos, passport scan, driving license
> - Form state management with react-hook-form
> - Validation with zod (based on database schema)
> - Server Action to submit data
> 
> **Database tables to populate:**
> - `profiles` table (public/professional data)
> - `private_freelancer_details` table (sensitive data)
> 
> **File uploads:**
> - Public files (profile pic, headshot, BTS photos) → 'freelancer-public-assets' bucket
> - Private files (passport, license) → 'freelancer-private-docs' bucket
> 
> Reference the database schema from `docs/PROJECT_PLAN.md` section 1.3"

**Files Claude Code should create:**
- `app/freelancer-onboarding/page.tsx`
- `app/freelancer-onboarding/components/StepIndicator.tsx`
- `app/freelancer-onboarding/components/PersonalInfoStep.tsx`
- `app/freelancer-onboarding/components/ProfessionalStep.tsx`
- `app/freelancer-onboarding/components/KitStep.tsx`
- `app/freelancer-onboarding/components/EditingStep.tsx`
- `app/freelancer-onboarding/components/SensitiveStep.tsx`
- `app/freelancer-onboarding/components/ReviewStep.tsx`
- `app/freelancer-onboarding/actions.ts` (Server Action)
- `lib/validations/freelancer-schema.ts` (Zod schemas)

### Task 5.2: File Upload Utility

**Prompt:**
> "Create a reusable file upload utility that:
> - Handles uploads to Supabase Storage
> - Supports both public and private buckets
> - Returns public URLs for public files
> - Returns storage paths for private files (we'll generate signed URLs on-demand)
> - Includes error handling and progress tracking
> - Validates file types and sizes"

**File Claude Code should create:**
- `lib/utils/file-upload.ts`

---

## 📋 Phase 6: User Dashboard (Claude Code Tasks)

### Task 6.1: Dashboard Layout

**Prompt:**
> "Create a user dashboard at `app/dashboard/page.tsx` showing:
> - Welcome message with user's name
> - Profile completion status
> - Quick stats (projects, skills, etc.)
> - Navigation to profile sections
> 
> Must be behind authentication (protected route)."

### Task 6.2: Profile View & Edit

**Prompt:**
> "Create profile pages:
> 1. `app/profile/view/page.tsx` - Read-only view of user's profile data
> 2. `app/profile/edit/page.tsx` - Editable version of onboarding form (pre-filled with existing data)
> 
> Both should fetch data from `profiles` table. Edit page should NOT show sensitive data from `private_freelancer_details`."

---

## 📋 Phase 7: Agency Portfolio (Dynamic Routes)

### Task 7.1: Work Index Page

**Prompt:**
> "Create `/work` page that:
> - Fetches all projects from `agency_projects` table
> - Displays in a grid layout
> - Each project shows cover image, title, and links to detail page
> - Uses Next.js Image optimization"

**File Claude Code should create:**
- `app/work/page.tsx`

### Task 7.2: Dynamic Project Pages

**Prompt:**
> "Create dynamic route for individual projects at `app/work/[slug]/page.tsx`.
> 
> **Requirements:**
> - Fetch project data by slug from `agency_projects` table
> - Display video player (if video_url exists)
> - Show full description
> - Use Next.js generateStaticParams for SSG
> - 404 page if slug doesn't exist"

**Files Claude Code should create:**
- `app/work/[slug]/page.tsx`
- `app/work/[slug]/not-found.tsx`

---

## 📋 Phase 8: Form Submissions (Claude Code Tasks)

### Task 8.1: Utility Forms

**Prompt:**
> "Create utility forms with Server Actions that write to `form_submissions` table:
> 
> 1. `/client-contact` - Client inquiry form
> 2. `/client-onboarding` - New client onboarding
> 3. `/special-rates` - Special rates request
> 
> Each form should:
> - Use react-hook-form + zod
> - Submit via Server Action
> - Store in `form_submissions` table with `form_name` identifier
> - Show success message after submission"

**Files Claude Code should create:**
- `app/client-contact/page.tsx`
- `app/client-onboarding/page.tsx`
- `app/special-rates/page.tsx`
- `app/actions/form-submissions.ts`

---

## 📋 Phase 9: SEO & Performance (Claude Code Tasks)

### Task 9.1: Metadata

**Prompt:**
> "Add static and dynamic metadata to all pages:
> - Root layout metadata (site title, description)
> - Individual page metadata
> - Open Graph images
> - Twitter cards
> 
> Use Next.js 14 Metadata API."

### Task 9.2: Sitemap & Robots

**Prompt:**
> "Generate `sitemap.xml` and `robots.txt`:
> - Sitemap should include all static pages
> - Dynamic routes from `agency_projects` table
> - Proper priority and change frequency"

**Files Claude Code should create:**
- `app/sitemap.ts`
- `app/robots.ts`

---

## 📋 Phase 10: Testing & Deployment (Final Steps)

### Task 10.1: Testing Checklist

**Tell Claude Code:**
> "Create a testing checklist document covering:
> - All authentication flows
> - Form submissions (onboarding, utility forms)
> - File uploads (public and private)
> - RLS policies (users can only see their own data)
> - Responsive design on mobile/tablet/desktop
> - Video playback
> - Dynamic routes"

### Task 10.2: Deployment Setup

**Prompt:**
> "Create deployment documentation for Vercel:
> - Environment variables needed
> - Build configuration
> - Domain setup steps
> - Supabase production configuration"

**You (human) will then:**
1. Connect GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy to production
4. Connect custom domain

---

## 🎯 Optimal Workflow with Claude Code

### **Best Practice: Iterative Approach**

Don't try to do everything at once. Use this sequence:

```
Session 1: Setup & Core Infrastructure
├─ Task: "Set up Next.js project with Tailwind and Supabase client"
└─ Deliverable: Working dev server with configuration

Session 2: Component Library
├─ Task: "Build Header, Footer, Marquee components"
└─ Deliverable: Reusable layout components

Session 3: Homepage
├─ Task: "Create homepage with video hero"
└─ Deliverable: Working homepage matching design

Session 4: Manifesto Page
├─ Task: "Create manifesto page with exact typography"
└─ Deliverable: Pixel-perfect manifesto page

Session 5: Authentication
├─ Task: "Set up auth pages and protected routes"
└─ Deliverable: Working login/signup/middleware

Session 6: Onboarding Form (Part 1)
├─ Task: "Create form structure and first 3 steps"
└─ Deliverable: Multi-step form UI

Session 7: Onboarding Form (Part 2)
├─ Task: "Add remaining steps and Server Action"
└─ Deliverable: Complete working onboarding

Session 8: Profile & Dashboard
├─ Task: "Create dashboard and profile pages"
└─ Deliverable: User can view/edit their data

Session 9: Agency Portfolio
├─ Task: "Create work pages with dynamic routes"
└─ Deliverable: Working portfolio section

Session 10: Utility Forms & Polish
├─ Task: "Create remaining forms, add SEO, test everything"
└─ Deliverable: Production-ready application
```

---

## 📤 What to Upload to Claude Code

### **Initial Upload (First Session):**
```
Required Files:
✅ docs/PROJECT_PLAN.md
✅ design-reference/tailwind.config.js
✅ design-reference/style.css
✅ .env.example
✅ This handoff document
```

### **As You Progress (Upload When Needed):**
```
For Homepage:
✅ design-reference/Home.html

For Manifesto:
✅ design-reference/manifesto.html
✅ docs/TYPOGRAPHY_REFERENCE.md

For Onboarding Form:
✅ supabase/schema.sql (reference for field names/types)

For Dynamic Routes:
✅ docs/PROJECT_PLAN.md (agency_projects table structure)
```

---

## 💡 Pro Tips for Working with Claude Code

### **1. Be Specific with File Paths**
❌ "Create a button component"
✅ "Create a button component at `components/ui/Button.tsx` with these props..."

### **2. Reference Design Files**
❌ "Make it look nice"
✅ "Match the styling from `design-reference/style.css` for the .cta-button class"

### **3. Break Down Complex Tasks**
❌ "Build the entire onboarding form"
✅ "Build the PersonalInfoStep component first, then we'll tackle the others"

### **4. Test Incrementally**
After each session, test the features Claude Code built before moving on.

### **5. Keep Context Relevant**
Don't upload all files at once. Upload only what's needed for the current task.

---

## 🚨 Common Pitfalls to Avoid

### **1. Database Schema Mismatch**
- **Problem:** Form fields don't match database columns
- **Solution:** Always reference `docs/PROJECT_PLAN.md` section 1.3 for exact schema

### **2. RLS Policy Errors**
- **Problem:** Users can't access their own data or can see others' data
- **Solution:** Test RLS policies in Supabase dashboard before building forms

### **3. File Upload Bucket Confusion**
- **Problem:** Uploading private files to public bucket (security issue!)
- **Solution:**
  - Profile pics, headshots, BTS photos → `freelancer-public-assets` (public)
  - Passport, license scans → `freelancer-private-docs` (private, signed URLs only)

### **4. Missing Environment Variables**
- **Problem:** Supabase calls fail in development
- **Solution:** Double-check `.env.local` has all three keys from Supabase dashboard

### **5. Typography Not Matching**
- **Problem:** Manifesto page looks different from design
- **Solution:** Use exact pixel values from `docs/TYPOGRAPHY_REFERENCE.md`, not rem units

---

## ✅ Definition of Done

Your project is ready to deploy when:

- [ ] All pages render without errors
- [ ] Authentication flow works (signup → login → protected routes)
- [ ] Freelancer can complete onboarding form
- [ ] Files upload to correct buckets
- [ ] User can view/edit their profile
- [ ] Dynamic portfolio pages work
- [ ] All forms submit to database
- [ ] Mobile responsive design works
- [ ] SEO metadata is present
- [ ] No TypeScript errors
- [ ] RLS policies tested and working
- [ ] Environment variables documented

---

## 📞 Support Resources

**When Claude Code Gets Stuck:**

1. **Supabase Issues:**
   - Check: [Supabase Docs](https://supabase.com/docs)
   - Common: Auth, Storage, RLS policy syntax

2. **Next.js 14 App Router:**
   - Check: [Next.js Docs](https://nextjs.org/docs)
   - Common: Server Actions, metadata, dynamic routes

3. **Tailwind CSS:**
   - Check: [Tailwind Docs](https://tailwindcss.com/docs)
   - Common: Custom colors, fonts, animations

4. **TypeScript Errors:**
   - Most common: Supabase type generation
   - Solution: Run `npx supabase gen types typescript`

---

## 🎯 Final Notes

**Estimated Timeline:**
- **With Claude Code:** 3-5 days (working 2-3 hours/day in focused sessions)
- **Manual coding:** 2-3 weeks

**Complexity Ranking:**
1. **Easy:** Static pages, component library, homepage
2. **Medium:** Auth, dashboard, profile pages, portfolio
3. **Hard:** Multi-step onboarding form with file uploads

**Start with the easy tasks** to build momentum, then tackle the onboarding form last when you're comfortable with the codebase.

Good luck! 🚀
