# Development Setup Guide

## 🛠 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Start development server**:
   ```bash
   yarn dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
yarn build

# Start production server
yarn start
```

## 🏗 Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Fonts**: Google Fonts (Space Grotesk, Inter)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── legal/               # Legal pages (privacy, terms)
│   ├── platform/            # Platform page
│   ├── resources/           # Resources page
│   └── solutions/           # Solutions page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx       # Button component with variants
│   │   ├── card.tsx         # Card component system
│   │   ├── input.tsx        # Form input components
│   │   └── ...              # Other UI components
│   ├── navbar.tsx           # Navigation component
│   ├── hero.tsx             # Hero section with animations
│   ├── why-section.tsx      # Why RubixKube section
│   ├── sri-flow.tsx         # SRI process flow
│   ├── features-grid.tsx    # Key features grid
│   ├── use-cases.tsx        # Use cases cards
│   ├── testimonials.tsx     # Customer testimonials
│   ├── closing-cta.tsx      # Final call-to-action
│   └── footer.tsx           # Site footer
├── hooks/
│   └── use-reduced-motion.ts # Accessibility hook for animations
├── lib/
│   ├── animations.ts        # Animation configurations
│   └── utils.ts             # Utility functions (cn, etc.)
└── context/
    ├── design.json          # Design system tokens
    ├── copy.json            # Website copy and content
    ├── components.json      # Component configurations
    └── pages-copy.json      # Page-specific content
```

## 🎯 Performance Features

- **Next.js 15**: Latest features and optimizations
- **Font Optimization**: Google Fonts with display:swap
- **Image Optimization**: Next.js automatic image optimization
- **CSS Optimization**: Tailwind CSS v4 with purging
- **Animation Performance**: Framer Motion with will-change optimizations
- **Bundle Splitting**: Automatic code splitting

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel --prod
```

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Customization

### Design Tokens
Update colors, fonts, and spacing in:
- `/src/app/globals.css` - CSS custom properties
- `/context/design.json` - Design system reference

### Content Management
Update copy and content in:
- `/context/copy.json` - All website copy
- `/context/pages-copy.json` - Page-specific content
- Individual component files for structure changes

### Components
- All components are in `/src/components/`
- UI components in `/src/components/ui/`
- Styled with Tailwind CSS classes
- Animated with Framer Motion

### Adding New Pages
1. Create new directory in `/src/app/`
2. Add `page.tsx` and `layout.tsx` files
3. Update navigation in navbar component
4. Add content to context files

## 📋 Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
```

## 🧪 Development Workflow

### Code Quality
- ESLint configuration for consistent code style
- TypeScript for type safety
- Automatic formatting and linting

### Testing
- Component testing with modern practices
- Performance monitoring
- Accessibility testing

### Git Workflow
1. Create feature branch from main
2. Make changes and test locally
3. Run linting and build checks
4. Submit pull request
5. Deploy after review

## 🔍 Troubleshooting

### Common Issues

**Development server won't start**:
- Check Node.js version (18+)
- Clear node_modules and reinstall: `rm -rf node_modules yarn.lock && yarn install`

**Build errors**:
- Check TypeScript errors: `yarn tsc --noEmit`
- Verify all imports and dependencies

**Styling issues**:
- Ensure Tailwind CSS classes are properly configured
- Check for conflicting CSS rules

### Performance Optimization

**Slow development server**:
- Restart development server
- Check for memory usage in large files

**Large bundle size**:
- Analyze bundle with `yarn build` and check console output
- Consider code splitting for large components

## 📞 Support

For technical issues or questions about the codebase:
1. Check existing issues and documentation
2. Create detailed issue reports with reproduction steps
3. Include environment information (Node.js version, OS, etc.)

---

*This setup guide covers all technical aspects of running and developing the RubixKube website.*
