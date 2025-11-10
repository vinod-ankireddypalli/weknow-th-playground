const fs = require('fs');

function loadCheckoutData() {
    try {
        // Read the simulated localStorage data
        const storedData = fs.readFileSync('telus-plan-selection/localStorage_simulation.json', 'utf8');
        console.log('Raw stored data:', storedData);
        
        const currentOutput = JSON.parse(storedData);
        console.log('\nParsed currentOutput:', currentOutput);

        if (!currentOutput || !currentOutput.uiSubscribers || !currentOutput.uiSubscribers.length) {
            console.error('No plan data found');
            return;
        }

        // Map and sort the subscriber data (similar to checkout.html)
        const lineData = currentOutput.uiSubscribers
            .map(sub => ({
                // System-generated fields (not entered by user)
                subscriberSequenceNumber: parseInt(sub.subscriberSequenceNumber),
                subscriberBusinessGroupId: sub.subscriberBusinessGroupId,
                planName: getPlanName(sub.ratePlanProductOfferingId),
                ratePlanProductOfferingId: sub.ratePlanProductOfferingId,
                ratePlanQuoteItemId: sub.ratePlanQuoteItemId,

                // Fields that require user input in checkout
                firstName: sub.firstName || '[USER INPUT REQUIRED]',
                lastName: sub.lastName || '[USER INPUT REQUIRED]',
                keepNumber: sub.keepNumber || '[USER SELECTION REQUIRED]',
                simType: sub.simType || '[USER SELECTION REQUIRED]',
                phoneNumber: sub.phoneNumber || '[USER INPUT REQUIRED]'
            }))
            .sort((a, b) => a.subscriberSequenceNumber - b.subscriberSequenceNumber);

        console.log('\nProcessed lineData:', lineData);
        
        // Verify the data structure matches what checkout.html expects
        console.log('\nVerification Results:');
        console.log('- Number of subscribers:', lineData.length);
        console.log('- Sequence numbers are sequential:', verifySequentialNumbers(lineData));
        console.log('- All required fields present:', verifyRequiredFields(lineData));
        
        // Display user input requirements
        console.log('\nUser Input Requirements per Subscriber:');
        console.log('1. First Name (text input)');
        console.log('2. Last Name (text input)');
        console.log('3. Keep Number Selection (radio buttons: yes/no)');
        console.log('4. SIM Type Selection (options: eSIM/pSIM)');
        console.log('5. Phone Number (text input)');
        
        return lineData;
    } catch (error) {
        console.error('Error loading checkout data:', error);
    }
}

function getPlanName(planId) {
    const planMap = {
        '20gb-plan-id': '5G+ Complete',
        '5g-complete-plan-id': '5G+ Complete Canada-US',
        'unlimited-plan-id': '5G+ Complete Explore'
    };
    return planMap[planId] || 'Unknown Plan';
}

function verifySequentialNumbers(lineData) {
    return lineData.every((line, index) => line.subscriberSequenceNumber === index + 1);
}

function verifyRequiredFields(lineData) {
    const requiredFields = [
        'subscriberSequenceNumber',
        'subscriberBusinessGroupId',
        'planName',
        'ratePlanProductOfferingId',
        'ratePlanQuoteItemId'
    ];
    
    return lineData.every(line => 
        requiredFields.every(field => line.hasOwnProperty(field))
    );
}

// Run the simulation
loadCheckoutData();
