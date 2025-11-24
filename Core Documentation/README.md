# HUMAN. Website Rebuild - Handoff Package

This package contains everything needed to migrate the HUMAN. website from Wix to Next.js 14 + Supabase using Claude Code.

---

## 📦 What's In This Package

```
handoff-package/
├── HANDOFF_INSTRUCTIONS.md          ⭐ START HERE - Complete migration guide
├── package.json                      Dependencies list
├── .gitignore                        Git ignore rules
├── .env.example                      Environment variables template
├── tailwind.config.js                Pre-configured Tailwind with design tokens
│
├── Design Reference/
│   ├── Home.html                     Reference homepage
│   ├── manifesto.html                Reference manifesto page
│   ├── style.css                     Complete CSS (for Tailwind migration)
│   └── manifesto.png                 Design screenshot
│
├── Documentation/
│   ├── Human_Creative_-_Project_Plan.txt    Complete technical specification
│   ├── TYPOGRAPHY_REFERENCE.md              Design system specs
│   └── NUMBERED_SUBHEADING_UPDATE.md        Manifesto typography details
│
└── Supabase Setup/
    ├── supabase-schema.sql           Database tables & custom types
    ├── supabase-policies.sql         Row Level Security policies
    └── supabase-storage.sql          File storage buckets configuration
```

---

## 🚀 Quick Start (5 Minutes)

### 1. Set Up Supabase (Manual - You Do This)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (choose a region close to you)
3. Wait 2 minutes for project to initialize
4. Go to **SQL Editor** → **New Query**
5. Copy and paste contents of `supabase-schema.sql` → Run
6. Copy and paste contents of `supabase-policies.sql` → Run
7. Copy and paste contents of `supabase-storage.sql` → Run
8. Go to **Project Settings** → **API** → Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

### 2. Prepare Environment File

1. Copy `.env.example` to `.env.local`
2. Paste your Supabase credentials from step 1

### 3. Open in Claude Code

1. Upload these files to Claude Code:
   - `HANDOFF_INSTRUCTIONS.md` ⭐
   - `package.json`
   - `tailwind.config.js`
   - `Design Reference/style.css`
   - `.env.example`

2. Start with this prompt:

```
I'm migrating the HUMAN. website from Wix to Next.js 14 + Supabase.

Please read HANDOFF_INSTRUCTIONS.md and start with Session 1:
"Set up Next.js project with Tailwind and Supabase client"

Use the tailwind.config.js and style.css files as reference for the design system.
```

---

## 📋 Build Sequence (Recommended)

Follow this order for best results:

### ✅ Phase 1: Foundation (Day 1)
- [ ] Initialize Next.js 14 project
- [ ] Configure Tailwind CSS with design tokens
- [ ] Set up Supabase client utilities
- [ ] Create basic folder structure

### ✅ Phase 2: Components (Day 1-2)
- [ ] Build Header component
- [ ] Build Footer component
- [ ] Build Marquee component
- [ ] Build Button component (with variants)
- [ ] Build Input component

### ✅ Phase 3: Public Pages (Day 2-3)
- [ ] Create Homepage with video hero
- [ ] Create Manifesto page (complex typography)
- [ ] Create placeholder pages (Work, Enquire, Impact, Shop)

### ✅ Phase 4: Authentication (Day 3)
- [ ] Create Login page
- [ ] Create Signup page
- [ ] Create Password Reset page
- [ ] Set up protected route middleware

### ✅ Phase 5: Onboarding Form (Day 4)
- [ ] Build multi-step form structure
- [ ] Create all form steps (6 steps total)
- [ ] Implement file upload utility
- [ ] Create Server Action for submission
- [ ] Test form submission to database

### ✅ Phase 6: User Dashboard (Day 4-5)
- [ ] Create Dashboard page
- [ ] Create Profile View page
- [ ] Create Profile Edit page

### ✅ Phase 7: Agency Portfolio (Day 5)
- [ ] Create Work index page
- [ ] Create dynamic project pages (/work/[slug])
- [ ] Set up static generation

### ✅ Phase 8: Utility Forms (Day 5)
- [ ] Client contact form
- [ ] Client onboarding form
- [ ] Special rates form

### ✅ Phase 9: Polish (Day 5)
- [ ] Add SEO metadata
- [ ] Generate sitemap
- [ ] Test responsive design
- [ ] Test all authentication flows
- [ ] Test RLS policies

---

## 🎯 Key Files to Reference

### **When Building Components:**
- Use: `Design Reference/style.css` for styling patterns
- Use: `Design Reference/Home.html` for structure
- Use: `tailwind.config.js` for design tokens

### **When Building Manifesto Page:**
- Use: `Design Reference/manifesto.html` for structure
- Use: `Documentation/TYPOGRAPHY_REFERENCE.md` for exact typography specs
- Use: `Documentation/NUMBERED_SUBHEADING_UPDATE.md` for H6 subheading details

### **When Building Forms:**
- Use: `Documentation/Human_Creative_-_Project_Plan.txt` Section 1.3 for database schema
- Reference exact field names and types from schema
- Remember: `profiles` table for public data, `private_freelancer_details` for sensitive data

### **When Setting Up File Uploads:**
- Public files (profile pics, headshots, BTS photos) → `freelancer-public-assets` bucket
- Private files (passport, license) → `freelancer-private-docs` bucket (use signed URLs)
- Always organize files in folders: `{user_id}/filename.jpg`

---

## 💡 Pro Tips for Claude Code

### **1. Work Incrementally**
Don't try to build everything at once. Complete one component/page before moving to the next.

### **2. Test After Each Session**
Run `npm run dev` and test what Claude Code built before continuing.

### **3. Be Specific with Prompts**
❌ Bad: "Make a button"
✅ Good: "Create a Button component at `components/ui/Button.tsx` with outline and solid variants matching the design from `style.css` line 200-244"

### **4. Reference Files Explicitly**
Always tell Claude Code which reference file to use:
- "Match the styling from `Design Reference/style.css`"
- "Use the structure from `Design Reference/manifesto.html`"
- "Follow the specs in `Documentation/TYPOGRAPHY_REFERENCE.md`"

### **5. Upload Only What's Needed**
Don't upload all files at once. Upload files relevant to the current task:
- Building homepage? Upload `Home.html`
- Building manifesto? Upload `manifesto.html` + typography docs
- Building forms? Upload project plan with schema

---

## 🚨 Common Issues & Solutions

### **Issue: "Supabase connection error"**
**Solution:** Check `.env.local` has all three keys (URL, anon key, service role key)

### **Issue: "User can't see their profile data"**
**Solution:** RLS policies not applied. Run `supabase-policies.sql` again

### **Issue: "File upload fails"**
**Solution:** 
- Check bucket exists in Supabase dashboard
- Verify file path includes user ID: `{user_id}/file.jpg`
- Check storage policies allow user to upload

### **Issue: "Typography doesn't match design"**
**Solution:** Use exact pixel values from `TYPOGRAPHY_REFERENCE.md`, not rem/em units

### **Issue: "TypeScript errors for Supabase"**
**Solution:** Generate types: `npx supabase gen types typescript --project-id YOUR_PROJECT_ID`

---

## 📐 Design System Summary

### **Colors**
```
Lime Green:  #DAFA92
Dark Grey:   #1a1a1a
Light Text:  #ffffff
Dark Text:   #000000
```

### **Typography**
```
Font:        Azeret Mono
Weights:     400 (body), 700 (bold), 800 (heavy), 900 (black)

Homepage H1: 80px / 900 weight
Manifesto H1: 113.75px / 900 weight / 91px line-height
Manifesto H2: 70.7px / 800 weight
Manifesto H6: 11px / 700 weight (numbered subheadings)
Body Text:   18px / 400 weight / 28.8px line-height
```

### **Components**
```
CTA Button:  410.5px × 80px, 3px border, lime green
Marquee Bar: 75px height, 80s animation duration
Header:      Grid layout (logo | nav | account)
Footer:      Lime green background, 3-column layout
```

---

## 🔐 Security Checklist

Before deploying:

- [ ] RLS policies enabled on all tables
- [ ] Private files use signed URLs, not public URLs
- [ ] Environment variables never committed to Git
- [ ] Service role key only used on server (never in browser)
- [ ] Test: User A cannot see User B's private data
- [ ] Test: Unauthenticated users redirected from protected routes
- [ ] File uploads validate file types and sizes

---

## 📊 Database Schema Quick Reference

### **Tables:**
1. **profiles** - Public freelancer data (name, bio, kit, skills)
2. **private_freelancer_details** - Sensitive data (birthdate, passport, medical)
3. **agency_projects** - Portfolio projects (title, slug, video, images)
4. **form_submissions** - All form submissions (JSON storage)

### **Storage Buckets:**
1. **freelancer-public-assets** (public) - Profile pictures, headshots, BTS photos
2. **freelancer-private-docs** (private) - Passport scans, driving licenses
3. **agency-assets** (public) - Project cover images and videos

---

## 📞 Need Help?

### **Stuck on a specific task?**
- Consult `HANDOFF_INSTRUCTIONS.md` for detailed step-by-step guidance
- Reference the "Common Pitfalls" section for known issues

### **Claude Code not understanding?**
- Be more specific with file paths and requirements
- Upload the relevant reference files
- Break down complex tasks into smaller steps

### **Database/Supabase issues?**
- Check: [Supabase Documentation](https://supabase.com/docs)
- SQL Editor in Supabase dashboard shows helpful error messages

---

## ✅ Definition of Done

Your project is ready when:

- [ ] `npm run dev` runs without errors
- [ ] All pages load correctly
- [ ] User can sign up and log in
- [ ] User can complete onboarding form
- [ ] Files upload to correct buckets
- [ ] User can view/edit their profile
- [ ] Portfolio pages display projects
- [ ] Forms submit to database
- [ ] Mobile responsive design works
- [ ] No TypeScript errors
- [ ] SEO metadata present on all pages

---

## 🚀 Deployment (After Build Complete)

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!
5. Connect custom domain

---

## 📈 Estimated Timeline

**Working 2-3 hours per day with Claude Code:**
- Days 1-2: Foundation, components, static pages
- Days 3-4: Auth, onboarding form, dashboard
- Day 5: Portfolio, forms, polish, deployment

**Total: ~5 days** (vs. 2-3 weeks manual coding)

---

## 🎉 Ready to Start?

Open `HANDOFF_INSTRUCTIONS.md` and begin with **Session 1: Setup & Core Infrastructure**

Good luck! 🚀
