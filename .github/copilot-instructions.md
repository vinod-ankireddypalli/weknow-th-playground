<!-- Actionable, repo-specific instructions for AI coding agents -->
# Copilot instructions — weknow-th-playground

This repo is a small, static front-end demo of TELUS plan selection (no build system). The app is plain HTML + vanilla JS and is intended to be opened in a browser or served via the included simple HTTP server.

Keep guidance short and concrete. When making edits, prefer small, local changes and run the app in-browser to verify behavior (see run steps below).

Key files
- `index.html` — single-page plan selection UI and the main place where business logic lives (discounts, subscriber flows, UI wiring).
- `constants.js` — canonical plan IDs, plan details and other shared constants used by the UI.
- `styles.js` — shared style tokens; visual constants used across views.
- `simulate_plan_selection.js`, `simulate_checkout.js`, `test_subscriber_details.js` — helper scripts used to simulate flows and to exercise the UI logic.
- `checkout.html`, `checkout_data_flow.js` — checkout landing and data flow after selection; the UI stores a `currentOutput` object in `localStorage` before navigating to checkout.
- `serve.py` — tiny HTTP server (port 8000) provided for local testing.

Big-picture architecture & flow
- Static SPA (no framework). All UI logic is inline in `index.html` and reads `constants.js` for plan metadata.
- User picks number of lines → `selectPlan()` builds `currentOutput.uiSubscribers` → saved to `localStorage` → navigation to `checkout.html`.
- Discounts are computed in `calculateDiscount()` and applied with `updateMultiLineDiscount()`; note: the "Explore" plan is explicitly ineligible for multi-line discounts.
- Events: a custom DOM event `telus-plan-selection` is dispatched when subscriber details are updated (see `triggerSetMultipleSubscriberDetails`). Use this event when integrating or testing other components.

Project-specific conventions / gotchas
- No bundler or transpiler. Edit source files directly and test in a browser.
- Pricing logic and eligibility live in `index.html` (search `calculateDiscount`, `updateMultiLineDiscount`, `selectPlan`, `proceedToCheckout`, `setSubscriberDetails`). Keep changes localized to these functions.
- Persistent handoff to checkout uses `localStorage` key `currentOutput` (checkout reads that). Don't change the key without updating `checkout.html`/`checkout_data_flow.js`.
- UDS (TELUS) UI CSS/JS is loaded from CDN at top of `index.html`; removing it will affect styles and some components.

Developer workflows (quick)
- Open the demo directly: open `index.html` in a browser for quick edits that don't require HTTP.
- Serve locally (recommended for event origins and proper URL behavior):
  - From repo root in PowerShell: `python .\\serve.py` (serves at http://localhost:8000)
  - Or: `py -3 .\\serve.py` if multiple Python versions exist.

Debugging tips
- Inspect `window.currentOutput` in console after selecting plans and before checkout; the UI also shows JSON in the right-hand `#jsonPreview` and `#jsonView` elements.
- To simulate subscriber updates, use `simulate_plan_selection.js` or the UI controls under "Event Trigger" in the left config panel.
- To find where to change a behavior, search `index.html` for the function name(s) above. Important IDs: `jsonPreview`, `outputSection`, `subscriberDetailsForm`.

Tests / CI
- There are no automated tests or CI hooks in this repo. `package.json` has no meaningful scripts.

If you update behavior that affects persisted shape (the `currentOutput` JSON), update `checkout_data_flow.js` and `checkout.html` accordingly and leave a short note in the commit message describing the shape change.

When in doubt, ask for:
- Which UI state the change should preserve (example: keep `subscriberSequenceNumber` stable across edits).
- Whether `localStorage` schema changes are allowed (these affect checkout flow).

Examples
------

Event payload example (dispatched from `triggerSetMultipleSubscriberDetails`):

```js
const event = new CustomEvent('telus-plan-selection', {
  detail: {
    eventName: 'setSubscriberDetails',
    data: [
      { subscriberFullName: 'Alice Example', subscriberPhoneNumber: 4161230000, subscriberSimType: 'ESIM' },
      { subscriberFullName: 'Bob Example', subscriberPhoneNumber: 4164560000, subscriberSimType: 'PHYSICAL' }
    ]
  }
});
document.dispatchEvent(event);
```

`index.html` dispatches that event after successfully updating `currentOutput`.

currentOutput example (shape saved to `localStorage` under key `currentOutput`):

```json
{
  "uiSubscribers": [
    {
      "subscriberBusinessGroupId": "UUID-1",
      "subscriberSequenceNumber": 1,
      "ratePlanProductOfferingId": "20gb-plan-id",
      "ratePlanQuoteItemId": "quote-item-1",
      "currentActiveSubscriberInd": false,
      "originalPrice": 85,
      "discount": 5,
      "discountedPrice": 80,
      "subscriberFullName": "John Doe",
      "subscriberPhoneNumber": 4161112222,
      "subscriberSimType": "ESIM"
    }
  ],
  "mobilityTransactionInfo": { "defaultNumberOfPeople": 1, "mobilityAccount": { "maxSubscriberAllowed": 6 } }
}
```

Quick sanity checks
-------------------

1) Browser console (paste into DevTools while `index.html` is open):

```js
// Quick validator you can paste in the browser console
(() => {
  const out = window.currentOutput || JSON.parse(localStorage.getItem('currentOutput') || 'null');
  if (!out) return console.warn('No currentOutput found in memory or localStorage');
  if (!Array.isArray(out.uiSubscribers)) return console.error('currentOutput.uiSubscribers must be an array');
  out.uiSubscribers.forEach((s, i) => {
    console.log(i+1, s.subscriberSequenceNumber, s.subscriberBusinessGroupId, s.ratePlanProductOfferingId, s.discountedPrice || 'no-price');
  });
  console.log('mobilityTransactionInfo', out.mobilityTransactionInfo);
})();
```

2) Node script for offline validation using the included `localStorage_simulation.json`:

Create and run `node scripts/validate_current_output.js` (file added to repo). The script reads `localStorage_simulation.json` and reports missing/invalid fields.

End of file
