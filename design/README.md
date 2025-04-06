# Capital Match AI Platform Design System

This directory contains the design system documentation and configuration files for the Capital Match AI Platform.

## Files

- **style-guide.md**: Comprehensive style guide detailing colors, typography, components, spacing, and other design specifications
- **tailwind.config.js**: Tailwind CSS configuration file with the design system's colors, fonts, and other values
- **variables.css**: CSS variables for non-Tailwind implementations

## Usage

### For Tailwind Projects

1. Import the `tailwind.config.js` file or copy its content into your project's Tailwind configuration
2. Use the defined color and style classes in your components

Example:
```jsx
<button className="bg-primary text-white px-6 py-3 rounded">
  Primary Button
</button>
```

### For Non-Tailwind Projects

1. Import the `variables.css` file into your project
2. Use the CSS variables in your stylesheets

Example:
```css
.button-primary {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-small) var(--spacing-medium);
  border-radius: var(--border-radius-default);
}
```

## Implementation Guidelines

When implementing components for the Capital Match AI Platform, refer to the style guide for specific design details. The guide includes specifications for:

- Color usage
- Typography and text hierarchy
- UI component styling (buttons, cards, forms)
- Data visualization guidelines
- Spacing and layout
- Animation and transitions
- Accessibility requirements

## Design Principles

1. **Consistency**: Maintain visual consistency by using the defined color palette, typography, and spacing
2. **Hierarchy**: Create clear visual hierarchy to guide users through the interface
3. **Accessibility**: Ensure all components meet WCAG AA standards for accessibility
4. **Efficiency**: Design for efficient user flows and clear data visualization
5. **Polish**: Add subtle animations and transitions to enhance the experience without distracting from content

## Fonts

The platform uses two primary fonts:
- **Space Grotesk** for headers and titles
- **Inter** for body text and UI elements

Make sure to include these fonts in your project either via Google Fonts or by hosting them locally.
