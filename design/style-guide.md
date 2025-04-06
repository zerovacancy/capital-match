# Capital Match AI Platform Style Guide

## Brand Colors

### Primary Colors
* **Primary Blue** `#275E91` - Used for primary buttons, main navigation elements, and important headings
* **Secondary Green** `#7A8D79` - Used for secondary buttons, success indicators, and supporting elements
* **Section Highlight** `#C9D4DC` - Used for section backgrounds, card headers, and to visually separate content areas

### Text and Background Colors
* **Text** `#1C1C1C` - Used for all body text and important information
* **Background** `#ECEDE3` - Used as the main background color for the entire platform
* **Footer Background** `#F5F5EF` - Used for the footer area and secondary content sections

### Status/Indicator Colors
* **Strong/Success** `#2E7D32` - Used for positive indicators, high match percentages, and success messages
* **Moderate/Warning** `#F57C00` - Used for moderate indicators, medium match percentages, and warning messages
* **Weak/Error** `#C62828` - Used for negative indicators, low match percentages, and error messages

### Additional Colors
* **Accent Blue** `#5B7B9C` - Used for complementary elements and secondary accents

## Typography

### Font Family
* **Header Font:** Space Grotesk - Used for all headings and titles
* **Body/UI Font:** Inter - Used for body text and interface elements

### Font Sizes
* **Extra Large (H1):** 32px/2rem
* **Large (H2):** 24px/1.5rem
* **Medium (H3):** 20px/1.25rem
* **Regular (Body):** 16px/1rem
* **Small (Caption):** 14px/0.875rem
* **Extra Small (Fine Print):** 12px/0.75rem

### Font Weights
* **Bold:** 700 - Used for headings and important information
* **Semi-Bold:** 600 - Used for subheadings and emphasized text
* **Regular:** 400 - Used for body text and general content
* **Light:** 300 - Used sparingly for specific design elements

### Line Heights
* **Headings:** 1.2
* **Body Text:** 1.5
* **Small Text:** 1.4

## UI Components

### Buttons

#### Primary Button
* **Background:** `#275E91` (Primary Blue)
* **Text Color:** White
* **Border:** None
* **Border Radius:** 4px
* **Padding:** 12px 24px
* **Hover State:** 15% darker (`#1A4D80`)
* **Active State:** 25% darker
* **Disabled State:** 50% opacity

#### Secondary Button
* **Background:** `#7A8D79` (Secondary Green)
* **Text Color:** White
* **Border:** None
* **Border Radius:** 4px
* **Padding:** 12px 24px
* **Hover State:** 15% darker (`#697B68`)
* **Active State:** 25% darker
* **Disabled State:** 50% opacity

#### Tertiary Button
* **Background:** Transparent
* **Text Color:** `#275E91` (Primary Blue)
* **Border:** 1px solid `#275E91` (Primary Blue)
* **Border Radius:** 4px
* **Padding:** 12px 24px
* **Hover State:** `#C9D4DC` (Section Highlight) background
* **Active State:** 25% darker border
* **Disabled State:** 50% opacity

### Cards

#### Standard Card
* **Background:** White
* **Border:** 1px solid `#C9D4DC` (Section Highlight)
* **Border Radius:** 8px
* **Shadow:** Subtle drop shadow (0px 2px 4px rgba(0, 0, 0, 0.05))
* **Padding:** 24px
* **Hover State:** Enhanced shadow (0px 4px 8px rgba(0, 0, 0, 0.1))

#### Highlighted Card
* **Background:** White
* **Border:** 1px solid `#275E91` (Primary Blue)
* **Border Radius:** 8px
* **Shadow:** Subtle drop shadow (0px 2px 4px rgba(0, 0, 0, 0.05))
* **Padding:** 24px
* **Hover State:** Enhanced shadow (0px 4px 8px rgba(0, 0, 0, 0.1))

### Form Elements

#### Input Fields
* **Background:** White
* **Border:** 1px solid `#C9D4DC` (Section Highlight)
* **Border Radius:** 4px
* **Text Color:** `#1C1C1C` (Text)
* **Padding:** 12px 16px
* **Focus State:** Border color `#275E91` (Primary Blue)
* **Error State:** Border color `#C62828` (Weak/Error)
* **Success State:** Border color `#2E7D32` (Strong/Success)

#### Dropdowns
* **Background:** White
* **Border:** 1px solid `#C9D4DC` (Section Highlight)
* **Border Radius:** 4px
* **Text Color:** `#1C1C1C` (Text)
* **Padding:** 12px 16px
* **Focus State:** Border color `#275E91` (Primary Blue)
* **Dropdown Menu:** White background with `#C9D4DC` (Section Highlight) hover states

#### Checkboxes & Radio Buttons
* **Border:** 1px solid `#C9D4DC` (Section Highlight)
* **Selected Background:** `#275E91` (Primary Blue)
* **Focus State:** `#5B7B9C` (Accent Blue) outline

### Data Visualization

#### Progress Bars
* **Track:** `#C9D4DC` (Section Highlight)
* **Indicator (Success):** Gradient from `#7A8D79` (Secondary Green) to `#2E7D32` (Strong/Success)
* **Indicator (Warning):** `#F57C00` (Moderate/Warning)
* **Indicator (Error):** `#C62828` (Weak/Error)
* **Border Radius:** 4px

#### Charts
* **Primary Series:** `#275E91` (Primary Blue)
* **Secondary Series:** `#7A8D79` (Secondary Green)
* **Tertiary Series:** `#5B7B9C` (Accent Blue)
* **Success Indicators:** `#2E7D32` (Strong/Success)
* **Warning Indicators:** `#F57C00` (Moderate/Warning)
* **Error Indicators:** `#C62828` (Weak/Error)
* **Grid Lines:** `#C9D4DC` (Section Highlight)
* **Labels:** `#1C1C1C` (Text)

#### Score Indicators
* **High Score (90-100%):** `#2E7D32` (Strong/Success)
* **Medium Score (70-89%):** `#7A8D79` (Secondary Green)
* **Low-Medium Score (40-69%):** `#F57C00` (Moderate/Warning)
* **Low Score (0-39%):** `#C62828` (Weak/Error)

### Navigation

#### Main Navigation
* **Background:** White
* **Active Tab:** `#275E91` (Primary Blue) indicator with bold text
* **Inactive Tab:** `#1C1C1C` (Text) with regular weight
* **Hover State:** `#C9D4DC` (Section Highlight) background

#### Secondary Navigation
* **Background:** `#C9D4DC` (Section Highlight)
* **Active Tab:** `#275E91` (Primary Blue) text with indicator
* **Inactive Tab:** `#1C1C1C` (Text)
* **Hover State:** 15% darker background

#### Pagination
* **Active Page:** `#275E91` (Primary Blue) background with white text
* **Inactive Page:** `#C9D4DC` (Section Highlight) background with `#1C1C1C` (Text)
* **Hover State:** `#5B7B9C` (Accent Blue) background with white text

## Spacing System

### Base Units
* **Base Unit:** 8px
* **Tiny:** 4px (0.5x)
* **Small:** 8px (1x)
* **Medium:** 16px (2x)
* **Large:** 24px (3x)
* **Extra Large:** 32px (4x)
* **Huge:** 48px (6x)

### Margins and Padding
* **Card Padding:** 24px
* **Section Margins:** 32px
* **Content Group Spacing:** 16px
* **Form Element Spacing:** 16px
* **Button Padding:** 12px 24px

## Animation and Transitions

### Timing
* **Fast:** 150ms
* **Standard:** 250ms
* **Slow:** 400ms

### Easing
* **Standard:** ease-in-out
* **Entrance:** ease-out
* **Exit:** ease-in

### Animation Types
* **Hover States:** Color changes, slight scaling (1.02x)
* **Page Transitions:** Fade in (opacity 0 to 1)
* **Element Loading:** Fade in with slight Y-axis movement (-10px to 0)
* **Data Updates:** Subtle color pulse from `#C9D4DC` (Section Highlight) to original color

## Accessibility

### Color Contrast
* All text must maintain minimum 4.5:1 contrast ratio against its background
* Interactive elements must have clear visual states (hover, focus, active)
* Use of color alone should not convey meaning

### Focus States
* All interactive elements should have a visible focus state
* Focus indicator: 2px solid `#275E91` (Primary Blue) outline
* Focus should be visible in both keyboard and mouse navigation

### Text Sizes
* Minimum body text size: 16px
* Minimum button text size: 14px
* Minimum form label size: 14px

## Iconography

### Style
* Line icons with 2px stroke weight
* Rounded corners (2px radius)
* Consistent 24x24px viewbox
* Primary color: `#275E91` (Primary Blue)
* Secondary color: `#7A8D79` (Secondary Green)

### Common Icons
* Navigation: Home, Settings, Profile
* Actions: Add, Edit, Delete, Search
* Status: Success checkmark, Warning triangle, Error circle
* Communication: Email, Phone, Message
* Data: Chart, Document, Download

## Responsive Breakpoints

* **Mobile:** 320px - 767px
* **Tablet:** 768px - 1023px
* **Desktop:** 1024px - 1439px
* **Large Desktop:** 1440px and above

## Implementation Guidelines

### File Naming Conventions
* Use kebab-case for all file names
* Be descriptive and consistent
* Examples: primary-button.css, user-profile-card.js

### Code Organization
* Group related CSS properties
* Comment complex logic
* Follow component-based architecture
* Use consistent indentation (2 spaces)

### Performance Considerations
* Optimize images before implementation
* Minimize HTTP requests
* Use efficient CSS selectors
* Consider lazy loading for heavy content
* Implement caching strategies
