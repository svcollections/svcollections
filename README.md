# SV Collections - E-commerce Website

A modern, responsive e-commerce website built with React.js for selling clothing items. Features a clean, minimalist design with full cart functionality, payment processing, and mobile responsiveness.

## Features

- **Homepage** with hero banner and featured products
- **Product Listing** with category filtering and sorting
- **Product Detail** pages with size selection
- **Shopping Cart** with add/remove/update quantity functionality
- **Checkout Page** with payment gateway integration
- **Order Success** page with confirmation details
- **MRP & Discount Pricing** with discount badges
- **Shipping Calculation** (Free if order >₹1000, else ₹150)
- **Responsive Design** for mobile and desktop
- **Modern UI** with clean, minimalist styling

## Project Structure

```
clothing-ecommerce/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Navbar.css
│   │   ├── Footer.js
│   │   ├── Footer.css
│   │   ├── ProductCard.js
│   │   ├── ProductCard.css
│   │   ├── ProductList.js
│   │   └── ProductList.css
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── HomePage.css
│   │   ├── ProductListing.js
│   │   ├── ProductListing.css
│   │   ├── ProductDetail.js
│   │   ├── ProductDetail.css
│   │   ├── Cart.js
│   │   ├── Cart.css
│   │   ├── Checkout.js
│   │   ├── Checkout.css
│   │   ├── OrderSuccess.js
│   │   └── OrderSuccess.css
│   ├── context/
│   │   └── CartContext.js
│   ├── data/
│   │   └── products.js
│   ├── utils/
│   │   └── paymentGateway.js
│   ├── styles/
│   │   ├── index.css
│   │   └── App.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd clothing-ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000`

## Customizing Products

To add your own products, edit the `src/data/products.js` file:

```javascript
export const products = [
  {
    id: 1,
    name: "Your Product Name",
    mrp: 999,           // Maximum Retail Price
    price: 599,         // Selling Price
    discount: 40,       // Discount percentage
    image: "path/to/your/image.jpg",
    sizes: ["M", "L", "XL", "XXL"],
    category: "Your Category",
    description: "Your product description",
    inStock: true
  },
  // Add more products...
];
```

### Adding Product Images

1. Create an `images` folder in the `public` directory
2. Add your product images to this folder
3. Update the `image` property in your products to reference the image path:
   ```javascript
   image: "/images/your-product-image.jpg"
   ```

### Adding New Categories

To add new product categories, update the `categories` array in `src/data/products.js`:

```javascript
export const categories = [
   "All",
  "T-Shirts",
  "Jeans", 
  "3 & 2 Pcs Sets",
  "Cord & Anarkali Sets",
  "Kurtis",
  "Night Suits & Nighties"
];
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Context API** - State management for cart
- **CSS3** - Styling with modern features
- **HTML5** - Semantic markup

## Features Breakdown

### Pricing System
- **MRP Display**: Shows original price with strikethrough
- **Discount Pricing**: Displays discounted selling price
- **Discount Badges**: Visual discount percentage indicators
- **Indian Rupee Format**: All prices in ₹ (INR)

### Cart System
- Add products to cart with size selection
- Update quantities
- Remove items
- View total price with MRP and discount
- Shipping calculation (Free if >₹1000, else ₹150)
- Persistent cart state during session

### Checkout & Payment
- Complete checkout form with validation
- Multiple payment methods (Card, UPI, Net Banking, COD)
- Payment gateway integration ready
- Order confirmation and success page
- Customer information collection

### Shipping Logic
- Free shipping on orders above ₹1000
- ₹150 shipping fee for orders below ₹1000
- Automatic calculation in cart and checkout

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interface
- Optimized images and layouts

### Product Management
- Easy product addition through data file
- Category filtering
- Price sorting
- MRP and discount management
- Search functionality ready for implementation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Payment Gateway Integration

The website includes ready-to-use payment gateway integration utilities in `src/utils/paymentGateway.js`:

### Supported Payment Methods
- **Razorpay** (Popular in India)
- **PayPal** (International)
- **Stripe** (International) – implemented via Stripe Checkout
- **Cash on Delivery (COD)**

### Setting Up Payment Gateways

1. **Razorpay Setup**:
   ```bash
   # Add your Razorpay key to environment variables
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

2. **PayPal Setup**:
   ```bash
   # Add your PayPal client ID
   REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

3. **Stripe Setup**:
   ```bash
   # Add your Stripe publishable key
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   ```

### Backend Integration Required

For production use, you'll need to implement backend endpoints:
- `/api/create-razorpay-order` - Create Razorpay order
- `/api/verify-payment` - Verify payment status
- `/api/process-order` - Process completed orders
- `/api/create-stripe-session` - Create Stripe Checkout Session

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

### Stripe Backend Example (Node/Express)

```js
// server.js
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-stripe-session', async (req, res) => {
  try {
    const { lineItems, customerEmail, successUrl, cancelUrl, metadata } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: customerEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata
    });

    res.json({ sessionId: session.id, publicKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
```

## Support

For support or questions, please open an issue in the repository.
