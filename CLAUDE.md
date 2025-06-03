# Claude AI Assistant Configuration

## Project Overview
This is a personal portfolio website built with Next.js 15.3.3, showcasing development skills and projects.

## Tech Stack
- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Validation**: React Hook Form + Zod
- **3D/Visual Effects**: Custom CSS animations

## Key Commands
```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Build & Production
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking (if available)

# Git
git push            # Push to origin (already configured)
git status          # Check current changes
```

## Project Structure
```
portfolio/
├── app/
│   ├── layout.tsx      # Root layout with theme provider
│   ├── page.tsx        # Home page with all sections
│   └── globals.css     # Global styles and animations
├── components/
│   ├── sections/       # Page sections (hero, about, skills, etc.)
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── 3d/             # 3D effects and animations
│   └── layout/         # Header and footer components
├── lib/
│   └── utils.ts        # Utility functions
└── hooks/              # Custom React hooks
```

## Performance Guidelines
1. **Animations**: Always use GPU-accelerated properties (transform, opacity)
2. **Backdrop Blur**: Use sparingly - prefer `backdrop-blur-sm` over `backdrop-blur-xl`
3. **Particles/Effects**: Limit particle counts and use CSS animations over DOM manipulation
4. **Reduced Motion**: Always respect `prefers-reduced-motion` for accessibility
5. **Image Optimization**: Use Next.js Image component for all images

## Code Style Guidelines
- **Components**: Use functional components with TypeScript
- **Styling**: Tailwind CSS classes, avoid inline styles except for dynamic values
- **State Management**: Use React hooks (useState, useReducer)
- **Forms**: React Hook Form with Zod validation
- **Imports**: Organize imports (React, Next, third-party, local)

## Common Patterns
```typescript
// Animation with reduced motion support
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

// GPU-accelerated animations
style={{ transform: 'translateZ(0)' }}
className="will-change-transform"

// Responsive text sizes
className="text-base md:text-lg lg:text-xl"
```

## Current Section Status
- **Hero**: ✅ Complete with 3D effects
- **About**: ✅ Complete with stats
- **Skills**: ✅ Complete with animated cards
- **Experience**: ✅ Complete with timeline
- **Projects**: ✅ Complete with cards
- **Code Showcase**: ✅ Complete with syntax highlighting
- **Testimonials**: ✅ Complete with carousel
- **Contact**: ✅ Complete with optimized animations (100vh constraint)

## Recent Optimizations
- Replaced DOM-based particle system with CSS-only solution
- Optimized floating orbs with GPU acceleration
- Reduced backdrop blur usage for better performance
- Added reduced motion support throughout
- Contact section constrained to 100vh with glassmorphism effects

## Git Configuration
- **Remote**: https://github.com/vitaliiHoncharuk/portfolio.git
- **Branch**: main
- **Status**: Clean, all changes pushed

## Important Notes
1. Always run `npm run build` before committing to catch type errors
2. Test on mobile devices for performance
3. Check animations with Chrome DevTools Performance tab
4. Ensure all new components follow the established patterns
5. Keep accessibility in mind (ARIA labels, keyboard navigation)

## Environment Variables
Currently no environment variables are required. If added in the future:
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=
```

## Deployment
The project is configured for static export:
```bash
npm run build
# Output will be in /out directory
```

Ready for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- GitHub Pages
- Any static hosting service