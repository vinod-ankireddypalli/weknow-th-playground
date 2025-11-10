const fs = require('fs');

const config = {
    uiSubscribers: [{
        selectedProvinceCode: "ON",
        selectedCity: "TORONTO",
        marketSegmentId: "bb08e53d-0f4c-4486-bd0d-5c039a1809ac",
        selectedProductTypeId: "qweqwrwr-0f4c-4486-bd0d-5c039a1809ac"
    }],
    mobilityTransactionInfo: {
        defaultNumberOfPeople: 4,
        mobilityAccount: { maxSubscriberAllowed: 6 }
    }
};

function selectPlan(planId, planName, planPrice) {
    const output = {
        uiSubscribers: [],
        mobilityTransactionInfo: {
            defaultNumberOfPeople: config.mobilityTransactionInfo.defaultNumberOfPeople,
            mobilityAccount: { maxSubscriberAllowed: config.mobilityTransactionInfo.mobilityAccount.maxSubscriberAllowed }
        }
    };

    for (let i = 1; i <= config.mobilityTransactionInfo.defaultNumberOfPeople; i++) {
        output.uiSubscribers.push({
            ...config.uiSubscribers[0],
            subscriberBusinessGroupId: `UUID-${i}`,
            subscriberSequenceNumber: i,
            ratePlanProductOfferingId: planId,
            ratePlanQuoteItemId: `quote-item-${i}`,
            currentActiveSubscriberInd: false,
            // Fields to be entered by user in checkout
            firstName: '',
            lastName: '',
            keepNumber: '',
            simType: '',
            phoneNumber: ''
        });
    }

    return output;
}

function setSubscriberDetails(subscriberSequenceNumber, subscriberDetails) {
    // Load current state
    let currentOutput;
    try {
        currentOutput = JSON.parse(fs.readFileSync('telus-plan-selection/localStorage_simulation.json', 'utf8'));
    } catch (error) {
        console.error('Error loading current state:', error);
        return;
    }

    // Find and update the subscriber
    const subscriberIndex = currentOutput.uiSubscribers.findIndex(
        sub => sub.subscriberSequenceNumber === subscriberSequenceNumber
    );

    if (subscriberIndex === -1) {
        console.error(`Subscriber with sequence number ${subscriberSequenceNumber} not found`);
        return;
    }

    // Update subscriber details
    currentOutput.uiSubscribers[subscriberIndex] = {
        ...currentOutput.uiSubscribers[subscriberIndex],
        subscriberFullName: subscriberDetails.subscriberFullName,
        subscriberPhoneNumber: subscriberDetails.subscriberPhoneNumber,
        subscriberSimType: subscriberDetails.subscriberSimType
    };

    // Save updated state
    fs.writeFileSync('telus-plan-selection/localStorage_simulation.json', JSON.stringify(currentOutput, null, 2));
    console.log(`Updated details for subscriber ${subscriberSequenceNumber}`);
    return currentOutput;
}

// Example usage:
const selectedPlanOutput = selectPlan('20gb-plan-id', '20GB', '$55');
console.log(JSON.stringify(selectedPlanOutput, null, 2));

// Save initial state
fs.writeFileSync('telus-plan-selection/localStorage_simulation.json', JSON.stringify(selectedPlanOutput, null, 2));

// Example of updating subscriber details
const subscriberDetails = {
    subscriberFullName: "John1 Doe",
    subscriberPhoneNumber: 111111111,
    subscriberSimType: "ESIM"
};
const updatedOutput = setSubscriberDetails(1, subscriberDetails);
console.log('Updated output:', JSON.stringify(updatedOutput, null, 2));

// Export functions for testing
module.exports = {
    selectPlan,
    setSubscriberDetails
};
