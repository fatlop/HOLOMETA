# GitHub Copilot Instructions for HoloMeta

## Project Overview

**HoloMeta** is an immersive project within the "Multiverso Cheperiano" designed to create interactive, educational, and emotional experiences. The project integrates digital worlds with symbiotic and sensory experiences, featuring meditation components (Ho'oponopono), peace-sharing systems, and real-time metrics.

### Core Principle (Non-Negotiable)
> "Nothing in this system can grow if it does not regenerate something: a person, a community, or the environment."

## Technology Stack

- **React 18.2** - UI library
- **TypeScript 5.2** - Static typing with strict mode enabled
- **Vite 5.4** - Build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **shadcn/ui** - Accessible UI components
- **Radix UI** - Primitive UI components (@radix-ui/react-dialog, @radix-ui/react-slider, @radix-ui/react-slot)
- **Lucide React** - Modern icon library
- **ESLint** - Code linting with TypeScript support

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components (button, dialog, slider)
│   │   └── MomentoDePaz.tsx # Main component
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── scripts/                 # Utility scripts
├── .env.example             # Environment variable template
└── index.html               # Main HTML file
```

## Available Commands

### Development
```bash
npm install              # Install dependencies
npm run dev              # Start dev server (Vite) at http://localhost:5173
```

### Production
```bash
npm run build            # Build for production (TypeScript + Vite)
npm run preview          # Preview production build
```

### Quality Assurance
```bash
npm run lint             # Run ESLint on all files
```

### Utilities
```bash
npm run check:deploy     # Validate deployment configuration
npm run mock:server      # Run mock backend server
```

## Coding Standards and Conventions

### TypeScript
- **Always use TypeScript** for all React components and utilities
- Use strict mode (enabled in tsconfig.json)
- Avoid `any` types; use proper type definitions
- Use path aliases: `@/*` maps to `./src/*`
- Follow TypeScript naming conventions:
  - Interfaces and types: PascalCase
  - Variables and functions: camelCase
  - Constants: UPPER_SNAKE_CASE

### React Components
- Use functional components with hooks
- Use `.tsx` extension for components with JSX
- Component files should use PascalCase naming
- Export components as default when they are the primary export
- Use React 18 features (concurrent rendering, automatic batching)
- Prefer `react-jsx` transform (no need to import React in every file)

### Styling
- Use Tailwind CSS utility classes for styling
- Follow mobile-first responsive design
- Use `clsx` or `tailwind-merge` for conditional class names
- Maintain consistency with existing UI components in `src/components/ui/`
- Use `tailwindcss-animate` for animations

### Code Organization
- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks
- Place utility functions in `src/lib/utils.ts`
- Use the existing UI component library (shadcn/ui pattern)
- Follow the established folder structure

### ESLint Rules
- Unused variables starting with `_` are allowed
- React hooks rules are enforced
- TypeScript recommended rules are enabled
- React refresh is configured but only-export-components is disabled

## Environment Variables

- Use `VITE_` prefix for all environment variables that need to be exposed to the client
- Document all environment variables in `.env.example`
- Never commit `.env` files with actual values
- Key variables:
  - `VITE_PUBLIC_MODE`: Controls authentication requirement
  - `VITE_ACCESS_CODE`: Access code for authentication

## Testing

**Note:** This project currently has no test infrastructure. Do not add testing frameworks or write tests unless explicitly requested.

## Boundaries and Restrictions

### Files and Directories to Never Modify
- `/dist/` - Build output directory
- `/node_modules/` - Dependencies
- `/.git/` - Git repository data
- `/.env` - Local environment configuration (if it exists)
- `/.env.production` - Production environment configuration
- `/package-lock.json` - Only modify indirectly via npm commands

### License Considerations
- This project is licensed under **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**
- Attribution must be maintained: **Fatima López (fatlop)**
- No commercial use is permitted
- Any generated code must respect these license terms

### Security Guidelines
- Never commit secrets or API keys
- Use environment variables for sensitive configuration
- The current authentication is frontend-only and meant for basic access control
- For production security, recommend proper backend authentication

## Contribution Guidelines

### When Making Changes
1. Run `npm run lint` before committing
2. Ensure `npm run build` completes successfully
3. Test changes locally with `npm run dev`
4. Maintain the existing code style and structure
5. Keep changes minimal and focused
6. Respect the project's core principle of regeneration

### Pull Request Requirements
- Clear description of changes
- No breaking changes to existing functionality
- Consistent with established patterns
- Passes linting checks

## Project Philosophy

When contributing to HoloMeta, keep in mind:
- The project focuses on peace, meditation, and collective consciousness
- Features should enhance user well-being and connection
- Design should be immersive yet accessible
- The "Multiverso Cheperiano" is an interconnected universe of experiences

## Related Projects

HoloMeta serves as a bridge between:
- **HoloMundo** - Main world
- **LUUMI** - Symbiotic light entity
- **Júpiter** - Knowledge platform
- **Vox Lux** - Communication system

## Language and Localization

- Primary language: Spanish (documentation, comments, UI text)
- Code and variable names: English (following standard programming conventions)
- Comments: Spanish is preferred but English is acceptable

## Additional Notes

- Port 5173 is the default for local development
- Hot reload is enabled via Vite
- The project uses ES modules (`"type": "module"` in package.json)
- Node.js 18 or higher is required
