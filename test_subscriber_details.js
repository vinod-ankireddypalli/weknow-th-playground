// Test script for setSubscriberDetails functionality
const fs = require('fs');

// Import functions from simulate_plan_selection.js
const { selectPlan, setSubscriberDetails } = require('./simulate_plan_selection.js');

// Test case 1: Update subscriber details
console.log('Test Case 1: Update subscriber details');
console.log('----------------------------------------');

const subscriberDetails = {
    subscriberFullName: "John1 Doe",
    subscriberPhoneNumber: 111111111,
    subscriberSimType: "ESIM"
};

try {
    // First, ensure we have initial state
    const initialOutput = selectPlan('20gb-plan-id', '20GB', '$55');
    console.log('Initial state created');

    // Update subscriber details
    const updatedOutput = setSubscriberDetails(1, subscriberDetails);
    
    // Verify the update
    if (updatedOutput) {
        const subscriber = updatedOutput.uiSubscribers.find(sub => sub.subscriberSequenceNumber === 1);
        if (subscriber) {
            console.log('Verification:');
            console.log('- Full Name:', subscriber.subscriberFullName === subscriberDetails.subscriberFullName ? '✓' : '✗');
            console.log('- Phone Number:', subscriber.subscriberPhoneNumber === subscriberDetails.subscriberPhoneNumber ? '✓' : '✗');
            console.log('- SIM Type:', subscriber.subscriberSimType === subscriberDetails.subscriberSimType ? '✓' : '✗');
        } else {
            console.log('Error: Subscriber not found in updated output');
        }
    } else {
        console.log('Error: Failed to update subscriber details');
    }
} catch (error) {
    console.error('Test failed:', error);
}

console.log('\nTest completed.');
