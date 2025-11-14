# HUMAN. Creative - Development Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (get one at [supabase.com](https://supabase.com))

### Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Configure Supabase:**
   - Go to your Supabase project dashboard
   - Navigate to Settings > API
   - Copy your project URL and keys to `.env.local`

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
human-creative-handoff/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer, Marquee)
│   └── ui/               # UI components (Button, Input, etc.)
├── lib/                   # Utilities
│   ├── supabase/         # Supabase client configurations
│   ├── utils/            # Helper functions
│   └── validations/      # Zod schemas
├── Configuration/         # Reference files
├── Design Reference/      # HTML/CSS reference files
├── Supabase Setup/       # SQL scripts for database setup
└── Core Documentation/   # Build instructions
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🗄️ Database Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project > SQL Editor
3. Run these SQL files in order:
   - `Supabase Setup/supabase-schema.sql`
   - `Supabase Setup/supabase-policies.sql`
   - `Supabase Setup/supabase-storage.sql`

## 🎨 Design System

### Colors
- **Lime Green:** `#DAFA92` (Primary CTA)
- **Dark Grey:** `#1a1a1a` (Background)
- **Light Text:** `#ffffff`

### Typography
- **Font:** Azeret Mono (200, 400, 700, 800, 900)
- **Homepage H1:** 80px / 900 weight
- **Manifesto H1:** 113.75px / 900 weight
- **Body:** 18px / 400 weight

### Components
- Use Tailwind utility classes
- Reference `tailwind.config.js` for design tokens
- See `Design Reference/` for HTML/CSS examples

## 📋 Development Phases

Follow the build sequence in `Core Documentation/HANDOFF_INSTRUCTIONS.md`:

- ✅ **Phase 1:** Foundation (Complete)
- ⏳ **Phase 2:** Component Library (Next)
- ⏳ **Phase 3:** Public Pages
- ⏳ **Phase 4:** Authentication
- ⏳ **Phase 5:** Onboarding Form
- ⏳ **Phase 6:** Dashboard & Profile
- ⏳ **Phase 7:** Portfolio
- ⏳ **Phase 8:** Polish & Deploy

## 🔐 Security Notes

- Never commit `.env.local` to git
- `SUPABASE_SERVICE_ROLE_KEY` should ONLY be used server-side
- Test RLS policies before deploying
- Use signed URLs for private files

## 📚 Additional Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

## 🐛 Troubleshooting

### Build warnings about Edge Runtime
These warnings are expected with Supabase and can be safely ignored. The middleware will work correctly.

### "Cannot find module" errors
Run `npm install` to ensure all dependencies are installed.

### Supabase connection errors
Check that your `.env.local` file has valid credentials from your Supabase project.

---

**Current Status:** Foundation complete, ready for component library development.
