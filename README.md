# TELUS Plan Selection Demo

This project demonstrates a plan selection interface for TELUS mobile plans, featuring multi-line discounts, subscriber management, and a checkout process.

## Project Structure

```
.
├── README.md
├── constants.js         # Shared constants (plan IDs, prices, etc.)
├── styles.js           # Shared style constants
├── index.html          # Plan selection interface
├── checkout.html       # Checkout process
├── checkout_data_flow.js
├── data_flow.html
├── localStorage_simulation.json
├── prism.yml
├── simulate_checkout.js
├── simulate_plan_selection.js
└── test_subscriber_details.js
```

## Key Features

- Plan selection with real-time pricing
- Multi-line discount calculations
- Subscriber management (add, edit, delete)
- Plan comparison
- Checkout process
- Local storage integration

## Constants and Styling

The project uses two main files for managing constants and styles:

### constants.js
Contains shared constants used throughout the application:
- Plan IDs and names
- Plan details (data amounts, prices)
- Default configuration values
- Color constants

### styles.js
Contains shared style constants:
- Layout measurements
- Spacing values
- Typography settings
- Border radius values
- Transition timings
- Box shadows
- Z-index values

## Plan Types

The application offers three main plan types:

1. **5G+ Complete**
   - 100GB data
   - $85/month
   - Nationwide coverage

2. **5G+ Complete Canada-US**
   - 175GB data
   - $95/month
   - Canada and US coverage

3. **5G+ Complete Explore**
   - 250GB data
   - $115/month
   - International coverage
   - Not eligible for multi-line discount

## Multi-line Discounts

The application implements a tiered discount system:
- 2 lines: $5 off per line
- 3 lines: $7.50 off per line
- 4+ lines: $10 off per line

## Development

To run the project locally:

1. Clone the repository
2. Open index.html in a web browser
3. No build process required - pure HTML, CSS, and JavaScript

## Browser Support

The application uses modern JavaScript features and CSS properties. Tested on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
