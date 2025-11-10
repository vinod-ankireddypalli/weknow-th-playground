// Input from Rate Plan Page (Left Side)
const inputFromRatePlanPage = {
    uiSubscribers: [{
        // System-provided data from rate plan selection
        selectedProvinceCode: "ON",
        selectedCity: "TORONTO",
        marketSegmentId: "bb08e53d-0f4c-4486-bd0d-5c039a1809ac",
        selectedProductTypeId: "qweqwrwr-0f4c-4486-bd0d-5c039a1809ac",
        subscriberBusinessGroupId: "UUID-1",
        subscriberSequenceNumber: 1,
        ratePlanProductOfferingId: "20gb-plan-id",
        ratePlanQuoteItemId: "quote-item-1",
        currentActiveSubscriberInd: false
    }],
    mobilityTransactionInfo: {
        defaultNumberOfPeople: 4,
        mobilityAccount: { maxSubscriberAllowed: 6 }
    }
};

// Output after User Input on Checkout Page (Right Side)
const outputAfterCheckout = {
    uiSubscribers: [{
        // Original data from rate plan page
        selectedProvinceCode: "ON",
        selectedCity: "TORONTO",
        marketSegmentId: "bb08e53d-0f4c-4486-bd0d-5c039a1809ac",
        selectedProductTypeId: "qweqwrwr-0f4c-4486-bd0d-5c039a1809ac",
        subscriberBusinessGroupId: "UUID-1",
        subscriberSequenceNumber: 1,
        ratePlanProductOfferingId: "20gb-plan-id",
        ratePlanQuoteItemId: "quote-item-1",
        currentActiveSubscriberInd: false,

        // New data added by user on checkout page
        firstName: "John",                    // <-- User Input
        lastName: "Doe",                      // <-- User Input
        keepNumber: "yes",                    // <-- User Selection
        simType: "eSIM",                      // <-- User Selection
        phoneNumber: "416-555-0123"           // <-- User Input
    }],
    mobilityTransactionInfo: {
        defaultNumberOfPeople: 4,
        mobilityAccount: { maxSubscriberAllowed: 6 }
    }
};

// Display the data flow
console.log('='.repeat(80));
console.log('CHECKOUT PAGE DATA FLOW');
console.log('='.repeat(80));

console.log('\nLEFT SIDE - Input from Rate Plan Page:');
console.log('-'.repeat(40));
console.log('System-provided fields:');
console.log('• Province Code:', inputFromRatePlanPage.uiSubscribers[0].selectedProvinceCode);
console.log('• City:', inputFromRatePlanPage.uiSubscribers[0].selectedCity);
console.log('• Subscriber ID:', inputFromRatePlanPage.uiSubscribers[0].subscriberBusinessGroupId);
console.log('• Sequence Number:', inputFromRatePlanPage.uiSubscribers[0].subscriberSequenceNumber);
console.log('• Rate Plan ID:', inputFromRatePlanPage.uiSubscribers[0].ratePlanProductOfferingId);
console.log('• Quote Item ID:', inputFromRatePlanPage.uiSubscribers[0].ratePlanQuoteItemId);

console.log('\nRIGHT SIDE - Output after User Input:');
console.log('-'.repeat(40));
console.log('All system-provided fields plus:');
console.log('• First Name:', outputAfterCheckout.uiSubscribers[0].firstName, '(User Input)');
console.log('• Last Name:', outputAfterCheckout.uiSubscribers[0].lastName, '(User Input)');
console.log('• Keep Number:', outputAfterCheckout.uiSubscribers[0].keepNumber, '(User Selection)');
console.log('• SIM Type:', outputAfterCheckout.uiSubscribers[0].simType, '(User Selection)');
console.log('• Phone Number:', outputAfterCheckout.uiSubscribers[0].phoneNumber, '(User Input)');

console.log('\nNOTE: This process repeats for each subscriber (defaultNumberOfPeople: 4)');
