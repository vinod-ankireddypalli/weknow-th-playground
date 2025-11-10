// TELUS Styles and Theme Variables
const TELUS_STYLES = {
    // Colors
    '--telus-purple': '#4B286D',
    '--telus-green': '#66CC00',
    '--telus-dark': '#2A2C2E',
    '--telus-light-gray': '#F7F7F7',
    '--telus-border': '#E0E0E0',

    // Spacing
    '--spacing-xs': '0.25rem',
    '--spacing-sm': '0.5rem',
    '--spacing-md': '1rem',
    '--spacing-lg': '1.5rem',
    '--spacing-xl': '2rem',
    '--spacing-xxl': '2.5rem',

    // Border Radius
    '--border-radius-sm': '4px',
    '--border-radius-md': '6px',
    '--border-radius-lg': '8px',
    '--border-radius-xl': '12px'
};

// Apply styles to :root
document.addEventListener('DOMContentLoaded', () => {
    Object.entries(TELUS_STYLES).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
});
