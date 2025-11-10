// TELUS Plan Selection and Checkout Constants

// Colors
const TELUS_PURPLE = '#4B286D';
const TELUS_GREEN = '#66CC00';
const TELUS_DARK = '#2A2C2E';
const TELUS_LIGHT_GRAY = '#F7F7F7';
const TELUS_BORDER = '#E0E0E0';

// Plan IDs and Names
const PLAN_5G_COMPLETE = '20gb-plan-id';
const PLAN_5G_COMPLETE_CANADA_US = '5g-complete-plan-id';
const PLAN_5G_COMPLETE_EXPLORE = 'unlimited-plan-id';

const PLAN_NAMES = {
    [PLAN_5G_COMPLETE]: '5G+ Complete',
    [PLAN_5G_COMPLETE_CANADA_US]: '5G+ Complete Canada-US',
    [PLAN_5G_COMPLETE_EXPLORE]: '5G+ Complete Explore'
};

// Plan Details
const PLAN_DETAILS = {
    [PLAN_5G_COMPLETE]: { name: '100GB', price: 85, cardId: 'plan-5g-complete' },
    [PLAN_5G_COMPLETE_CANADA_US]: { name: '175GB', price: 95, cardId: 'plan-5g-complete-canada-us' },
    [PLAN_5G_COMPLETE_EXPLORE]: { name: '250GB', price: 115, cardId: 'plan-5g-complete-explore' }
};

// Other Constants
const MIN_LINES = 1;
const DEFAULT_MAX_LINES = 6;

// Export constants
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TELUS_PURPLE,
        TELUS_GREEN,
        TELUS_DARK,
        TELUS_LIGHT_GRAY,
        TELUS_BORDER,
        PLAN_5G_COMPLETE,
        PLAN_5G_COMPLETE_CANADA_US,
        PLAN_5G_COMPLETE_EXPLORE,
        PLAN_NAMES,
        PLAN_DETAILS,
        MIN_LINES,
        DEFAULT_MAX_LINES
    };
}
