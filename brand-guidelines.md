# RubixKube Brand Guidelines

## 🎨 Design System

Based on the RubixKube brand guidelines for consistent visual identity across all digital touchpoints.

### Brand Colors

#### Primary Palette
- **Primary**: `#0E3A8A` (Deep blue) - Trust, stability, professional authority
- **Accent**: `#2F5BFF` (Bright blue) - Innovation, technology, forward-thinking
- **CTA Green**: `#00C853` (Success green) - Action, growth, positive outcomes

#### Background Colors
- **Background Light**: `#F8FAFC` (Light gray) - Clean, minimal, professional
- **Background Dark**: `#0B1220` (Dark navy) - Premium, sophisticated, depth

### Typography

#### Font Families
- **Headings**: Space Grotesk (Google Fonts)
  - Modern, geometric sans-serif
  - Use for headlines, section titles, and emphasis
  - Weights: 400 (Regular), 600 (Semi-bold), 700 (Bold)

- **Body Text**: Inter (Google Fonts)
  - Optimized for readability
  - Use for paragraphs, UI text, and descriptions
  - Weights: 400 (Regular), 500 (Medium), 600 (Semi-bold)

#### Responsive Typography
- Fluid typography using `clamp()` functions
- Mobile-first approach with progressive enhancement
- Maintains readability across all device sizes

### Component Guidelines

#### Spacing System
- Consistent spacing using Tailwind's 8px base unit
- Rhythm maintained through systematic spacing scales
- Generous whitespace for premium feel

#### Interactive Elements
- Subtle hover states and micro-interactions
- Accessibility-first approach (WCAG compliant)
- Clear visual hierarchy and focus states

#### Cards and Containers
- Subtle shadows and rounded corners
- Consistent padding and margin patterns
- Hover animations for engagement

### Brand Voice and Tone

#### Voice Characteristics
- **Professional yet approachable**
- **Clear and direct communication**
- **Innovation-focused**
- **Results-oriented**

#### Tone Guidelines
- Confident without being arrogant
- Technical accuracy with business clarity
- Solution-focused messaging
- Trust-building language

### Visual Hierarchy

#### Information Architecture
1. **Primary Headlines** - Space Grotesk Bold, Primary color
2. **Section Headers** - Space Grotesk Semi-bold, Accent color
3. **Body Text** - Inter Regular, balanced contrast
4. **Calls-to-Action** - Prominent placement, CTA Green accents

### Logo Usage

#### Primary Logo
- **File**: `logo-text.svg` - Full RubixKube wordmark
- **Usage**: Main brand representation, headers, official documents

#### Icon Logo
- **File**: `logo-icon.png` - RubixKube symbol only
- **Usage**: Favicons, social media profiles, compact spaces

#### Guidelines
- Maintain adequate clear space around logos
- Never modify, stretch, or alter logo proportions
- Use approved color variations only
- Ensure sufficient contrast for accessibility

### Implementation Notes

#### CSS Custom Properties
All brand colors and typography are implemented as CSS custom properties in `globals.css` for consistency and easy maintenance.

#### Component Library
Reusable UI components in `/src/components/ui/` maintain brand consistency across all interface elements.

#### Animation Principles
- Subtle, purposeful animations using Framer Motion
- Performance-optimized with `will-change` properties
- Respectful of user motion preferences

---

*These guidelines ensure consistent brand representation across all RubixKube digital properties.*
