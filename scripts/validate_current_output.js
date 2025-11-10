const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'localStorage_simulation.json');

function error(msg) { console.error('ERROR:', msg); }
function ok(msg) { console.log('OK:', msg); }

try {
  const raw = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(raw);

  if (!data.uiSubscribers || !Array.isArray(data.uiSubscribers)) {
    error('uiSubscribers missing or not an array');
    process.exit(2);
  }

  let failed = false;
  data.uiSubscribers.forEach((s, i) => {
    const idx = i + 1;
    if (typeof s.subscriberSequenceNumber !== 'number') {
      error(`subscriber #${idx} missing numeric subscriberSequenceNumber`);
      failed = true;
    }
    if (!s.subscriberBusinessGroupId) {
      error(`subscriber #${idx} missing subscriberBusinessGroupId`);
      failed = true;
    }
    if (!s.ratePlanProductOfferingId) {
      error(`subscriber #${idx} missing ratePlanProductOfferingId`);
      failed = true;
    }
    if (!s.ratePlanQuoteItemId) {
      error(`subscriber #${idx} missing ratePlanQuoteItemId`);
      failed = true;
    }
    if (!('currentActiveSubscriberInd' in s)) {
      console.warn(`subscriber #${idx} missing currentActiveSubscriberInd (will default to false)`);
    }

    // Price fields are optional in this sample; warn if absent
    if (typeof s.originalPrice !== 'number') {
      console.warn(`subscriber #${idx} missing originalPrice (may be set at selection time)`);
    }
  });

  if (failed) {
    error('Validation failed');
    process.exit(3);
  }

  if (!data.mobilityTransactionInfo || typeof data.mobilityTransactionInfo.defaultNumberOfPeople !== 'number') {
    console.warn('mobilityTransactionInfo.defaultNumberOfPeople missing or not a number');
  }

  ok('Validation completed (no critical failures)');
  process.exit(0);
} catch (err) {
  error('Could not read or parse localStorage_simulation.json: ' + err.message);
  process.exit(1);
}
