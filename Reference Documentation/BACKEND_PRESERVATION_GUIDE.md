# Backend Preservation Guide

> **Critical reference for frontend redesign. DO NOT modify files listed in the "PRESERVE" sections.**

---

## Quick Reference

### Files to PRESERVE (Do Not Modify)

```
/lib/
├── supabase/
│   ├── client.ts          # Browser Supabase client
│   ├── server.ts          # Server Supabase client
│   └── middleware.ts      # Session management
├── auth/
│   ├── client.ts          # Client auth functions
│   ├── server.ts          # Server auth functions
│   └── types.ts           # Auth type definitions
├── storage/
│   └── index.ts           # File upload handling
└── validations/
    └── form-schemas.ts    # Zod validation schemas

/app/
├── api/
│   └── auth/login/route.ts  # Login API endpoint
├── actions/
│   ├── auth-redirect.ts     # Auth redirect logic
│   ├── form-submissions.ts  # Form submission handlers
│   └── ... (all action files)
└── dashboard/
    ├── layout.tsx           # Auth protection logic
    ├── admin/actions.ts     # Admin data fetching
    └── profile/actions.ts   # Profile management

/supabase/
└── migrations/              # All SQL migrations

middleware.ts                # Route protection (currently bypassed)
.env.example                 # Required env vars reference
```

### Files SAFE to Redesign

```
/app/
├── page.tsx                 # Homepage
├── manifesto/page.tsx       # Manifesto page
├── work/page.tsx            # Work/portfolio page
├── enquire/page.tsx         # Contact page (keep form logic)
├── impact/page.tsx          # Impact page
└── shop/                    # Shop pages

/components/
├── ui/                      # All UI components
├── layout/                  # Header, Footer, Nav
└── sections/                # Page sections
```

---

## Database Schema

### Tables

| Table | Purpose | RLS |
|-------|---------|-----|
| `profiles` | User profile data (95+ fields) | Yes |
| `private_freelancer_details` | Sensitive PII (emergency contacts, DOB) | Yes |
| `partnerships` | Member benefits/discounts | Yes |
| `form_submissions` | All form data (contact, onboarding, special rates) | Yes |

### Key Relationships

```
auth.users (Supabase Auth)
    │
    ├── profiles (1:1, auto-created via trigger)
    │
    └── private_freelancer_details (1:1, optional)
```

---

## Authentication Flow

### User Roles

| Role | Access |
|------|--------|
| `freelancer` | Own profile, benefits, dashboard |
| `agency_admin` | + View all freelancers, submissions |
| `super_admin` | + CRUD partnerships, all data |

### Protected Routes

| Route | Protection |
|-------|------------|
| `/dashboard/*` | Requires auth |
| `/dashboard/admin/*` | Requires admin role |
| `/onboarding` | Requires auth, incomplete onboarding |

### Auth Functions to Use

```typescript
// Client-side (components)
import { signIn, signUp, signOut } from '@/lib/auth/client'

// Server-side (pages, actions)
import { getUser, requireAuth, requireRole } from '@/lib/auth/server'
```

---

## Form Submission Pattern

When redesigning forms, maintain this pattern:

```tsx
// 1. Import the server action
import { submitClientContactForm } from '@/app/actions/form-submissions'

// 2. Use in form submission
const handleSubmit = async (data: FormData) => {
  const result = await submitClientContactForm({
    name: data.name,
    email: data.email,
    // ... other fields
  })

  if (result.success) {
    // Handle success
  } else {
    // Handle error: result.error
  }
}
```

### Available Form Actions

| Action | Form |
|--------|------|
| `submitClientContactForm()` | Client contact/enquiry |
| `submitSpecialRatesForm()` | Special rates request |
| `submitClientOnboardingForm()` | Client onboarding |
| `submitForm(formName, data)` | Generic form submission |

---

## File Upload Pattern

```typescript
import { uploadFile, deleteFile, getPublicUrl } from '@/lib/storage'

// Upload avatar
const result = await uploadFile({
  bucket: 'avatars',
  file: selectedFile,
  userId: user.id,
})

// Upload document (private)
const result = await uploadFile({
  bucket: 'documents',
  file: passportScan,
  userId: user.id,
  path: 'passport'
})
```

### Storage Buckets

| Bucket | Visibility | Use For |
|--------|------------|---------|
| `avatars` | Public | Profile photos, headshots |
| `documents` | Private | Passports, licenses, contracts |

---

## Environment Variables

Required in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...  # Server-only, never expose
```

---

## Migration Checklist

Before deploying redesigned pages:

- [ ] Middleware re-enabled (`middleware.ts`)
- [ ] Auth flow works (login → dashboard)
- [ ] Form submissions save to database
- [ ] File uploads work (avatars, documents)
- [ ] Admin pages restricted to admin roles
- [ ] Profile data persists correctly
- [ ] RLS policies not bypassed

---

## Page-by-Page Backend Dependencies

### Pages with NO backend (Pure UI - Safe to Replace)

| Page | Notes |
|------|-------|
| `/` (Homepage) | Static content |
| `/manifesto` | Static content |
| `/work` | Static content (unless CMS added) |
| `/impact` | Static content |

### Pages WITH backend (Preserve Logic)

| Page | Backend Dependency |
|------|-------------------|
| `/enquire` | `submitClientContactForm()` |
| `/login` | `signIn()`, redirect logic |
| `/signup` | `signUp()` |
| `/onboarding` | `submitForm()`, profile creation |
| `/dashboard/*` | `getUser()`, profile data |
| `/dashboard/admin/*` | Admin actions, role checks |

### Shop Pages (TBD)

Shop backend integration not yet implemented. Define requirements:
- Product catalog (database or CMS?)
- Cart functionality
- Payment processing (Stripe?)

---

## Contact

For questions about backend architecture, refer to:
- `/lib/auth/server.ts` - Auth implementation
- `/app/actions/` - Server action patterns
- `/supabase/migrations/` - Database schema
