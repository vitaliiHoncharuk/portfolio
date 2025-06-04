# Claude AI Assistant Configuration

## Project Overview
This is a personal portfolio website built with Next.js 15.3.3, showcasing development skills and projects.

## IMPORTANT: Git Workflow Instructions

### Branch Strategy
1. **NEVER push directly to main branch**
2. **Always start from latest main:**
   - Before creating any new branch, always:
     ```bash
     git checkout main
     git pull origin main
     ```
3. **Always ask before starting a new task:**
   - "Should I create a new branch for this task?"
   - Suggest a descriptive branch name (e.g., `feature/add-blog-section`, `fix/mobile-navigation`)
4. **For follow-up work on the same feature:**
   - Continue on the same branch
   - Create separate commits for each logical change
5. **When task is complete:**
   - Ask: "Should I create a PR to main?"
   - Provide a summary of changes for the PR description

### Commit Guidelines
1. **Commit frequently** - After each logical change
2. **Use conventional commits:**
   - `feat:` for new features
   - `fix:` for bug fixes
   - `perf:` for performance improvements
   - `refactor:` for code refactoring
   - `style:` for formatting changes
   - `docs:` for documentation updates
3. **Always include the Claude signature in commits**

### Example Workflow
```bash
# 1. User assigns task
# 2. Claude asks: "Should I create a new branch for [task description]?"
# 3. If yes, first ensure we're on latest main:
git checkout main
git pull origin main

# 4. Create new branch from updated main:
git checkout -b feature/branch-name

# 5. Make changes and commit
git add .
git commit -m "feat: Add new feature"

# 6. Push to remote
git push -u origin feature/branch-name

# 7. When complete, ask: "Should I create a PR to main?"
# 8. If yes:
gh pr create --title "Feature: Description" --body "..."
```

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

## Common Issues & Prevention

### "Uncaught SyntaxError: Invalid or unexpected token" Prevention

This recurring error has multiple root causes. Here's a comprehensive prevention guide:

#### 1. Template Literal Issues (HIGH PRIORITY)
**❌ AVOID:**
```typescript
// Nested template literals in CSS-in-JS
container.style.cssText = `
  background: url(\`/images/bg-${theme}.jpg\`);
  transform: \`rotate(\${angle}deg)\`;
`;

// Complex template literals in JSX
const html = `<div class="\${className}">Content</div>`;
```

**✅ CORRECT:**
```typescript
// Use individual style properties
container.style.position = 'fixed';
container.style.background = `url('/images/bg-${theme}.jpg')`;
container.style.transform = `rotate(${angle}deg)`;

// Use JSX directly
const element = <div className={className}>Content</div>;
```

#### 2. String Escaping & Character Encoding
**❌ AVOID:**
```typescript
// Unescaped quotes
const html = "<div class="container">Content</div>";

// Smart quotes from copy-paste (invisible Unicode)
const message = "Hello World"; // These aren't standard quotes

// HTML entities in TypeScript (use real characters)
const text = "What&apos;s your name?";
```

**✅ CORRECT:**
```typescript
// Proper quote usage
const html = '<div class="container">Content</div>';
const html2 = `<div class="${className}">Content</div>`;

// Standard ASCII quotes
const message = "Hello World";

// Real apostrophes in TypeScript
const text = "What's your name?";
```

#### 3. Import/Export Syntax
**❌ AVOID:**
```typescript
// Mixing module systems
import React from 'react';
const utils = require('./utils');

// Incorrect export syntax
export = MyComponent;
```

**✅ CORRECT:**
```typescript
// Consistent ES modules
import React from 'react';
import { utils } from './utils';

// Standard exports
export default MyComponent;
export { MyComponent, utils };
```

#### 4. JSX Syntax Issues
**❌ AVOID:**
```typescript
// Missing self-closing tags
<img src="test.jpg">

// TypeScript assertions in JSX
<div>{value as string}</div>

// Invalid attribute values
<div className={undefined}>Content</div>
```

**✅ CORRECT:**
```typescript
// Proper self-closing syntax
<img src="test.jpg" />

// Type assertions outside JSX
const stringValue = value as string;
<div>{stringValue}</div>

// Conditional class names
<div className={className || ''}>Content</div>
```

#### 5. Development Best Practices

**File Management:**
```bash
# Always clean build artifacts when errors persist
npm run clean  # Or: rm -rf .next node_modules/.cache

# Ensure proper file encoding (UTF-8 without BOM)
file -I src/**/*.{ts,tsx}  # Check encoding
```

**Editor Configuration (.editorconfig):**
```ini
root = true
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2
```

**TypeScript Configuration (tsconfig.json):**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "isolatedModules": true,
    "jsx": "preserve"
  }
}
```

#### 6. Error Recovery Workflow

**When Syntax Error Occurs:**
1. **Immediate Actions:**
   ```bash
   # Stop dev server
   Ctrl+C (or Cmd+C on Mac)
   
   # Clean build artifacts
   npm run clean
   
   # Restart dev server
   npm run dev
   ```

2. **Code Inspection:**
   - Check recent changes for template literals with CSS
   - Verify all quotes and escaping
   - Look for copy-pasted content with smart quotes
   - Validate all import/export statements

3. **Validation Steps:**
   ```bash
   # Run type checking
   npm run typecheck
   
   # Run linting
   npm run lint
   
   # Build to catch compilation errors
   npm run build
   ```

#### 7. Prevention Checklist

**Before Committing:**
- [ ] Run `npm run typecheck` to catch type errors
- [ ] Run `npm run lint` to catch syntax issues
- [ ] Test build with `npm run build`
- [ ] Verify no template literals with complex CSS
- [ ] Check for proper string escaping
- [ ] Ensure consistent import syntax

**Code Review Focus Areas:**
- Template literals (especially with CSS)
- String escaping and quotes
- Import/export statements
- JSX attribute syntax
- Character encoding issues

#### 8. Project-Specific Notes

**Known Issues in This Project:**
- `body` has `contain: layout style` in globals.css - this affects `position: fixed`
- Framer Motion components need careful prop handling
- 3D CSS effects require specific transform syntax
- Portal components need individual style property setting

**Safe Patterns for This Project:**
```typescript
// ✅ Safe CSS-in-JS pattern
element.style.position = 'fixed';
element.style.zIndex = '9999';

// ✅ Safe template literal usage (simple interpolation only)
const className = `bg-${color}-500 text-${textColor}`;

// ✅ Safe JSX patterns
const Component = ({ className = '', children }: Props) => (
  <div className={`base-class ${className}`}>
    {children}
  </div>
);
```

This comprehensive prevention guide should eliminate most syntax errors. Always follow these patterns and run the validation steps before committing changes.
   - Use ESLint auto-fix: `npm run lint -- --fix`
   - Test build before committing: `npm run build`
   - Implement error boundaries for graceful error handling
   - Keep browser DevTools open to catch errors early

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