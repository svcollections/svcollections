// Payment Gateway Integration Utilities
// This file contains helper functions for integrating with various payment gateways

// Razorpay Integration (Popular in India)
export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(window.Razorpay);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve(null);
    };
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (orderData) => {
  // This would typically make an API call to your backend
  // to create an order with Razorpay
  try {
    const response = await fetch('/api/create-razorpay-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const processRazorpayPayment = async (orderData, userDetails) => {
  const Razorpay = await initializeRazorpay();
  
  if (!Razorpay) {
    throw new Error('Razorpay not available');
  }

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay key
    amount: orderData.amount * 100, // Amount in paise
    currency: 'INR',
    name: 'Fashion Store',
    description: `Order for ${orderData.items.length} items`,
    order_id: orderData.razorpay_order_id,
    handler: function (response) {
      // Handle successful payment
      console.log('Payment successful:', response);
      return response;
    },
    prefill: {
      name: userDetails.firstName + ' ' + userDetails.lastName,
      email: userDetails.email,
      contact: userDetails.phone,
    },
    notes: {
      address: userDetails.address,
      city: userDetails.city,
      state: userDetails.state,
      pincode: userDetails.pincode,
    },
    theme: {
      color: '#3498db',
    },
  };

  const razorpayInstance = new Razorpay(options);
  razorpayInstance.open();
};

// PayPal Integration
export const initializePayPal = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=' + process.env.REACT_APP_PAYPAL_CLIENT_ID;
    script.onload = () => {
      resolve(window.paypal);
    };
    script.onerror = () => {
      console.error('Failed to load PayPal script');
      resolve(null);
    };
    document.body.appendChild(script);
  });
};

// Stripe Integration
export const initializeStripe = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = () => {
      resolve(window.Stripe);
    };
    script.onerror = () => {
      console.error('Failed to load Stripe script');
      resolve(null);
    };
    document.body.appendChild(script);
  });
};

export const redirectToStripeCheckout = async ({ lineItems, customerEmail, shipping, successUrl, cancelUrl, metadata }) => {
  // NOTE: This requires a backend endpoint to create a Checkout Session
  const response = await fetch('/api/create-stripe-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lineItems, customerEmail, shipping, successUrl, cancelUrl, metadata })
  });

  if (!response.ok) {
    throw new Error('Failed to create Stripe Checkout session');
  }

  const data = await response.json();
  const stripeJs = await initializeStripe();
  if (!stripeJs) throw new Error('Stripe.js failed to load');

  const publishableKey = data.publicKey || process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) throw new Error('Stripe publishable key missing');

  const stripe = stripeJs(publishableKey);
  const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
  if (error) throw error;
};

// Generic payment processing function
export const processPayment = async (paymentMethod, orderData, userDetails) => {
  switch (paymentMethod) {
    case 'razorpay':
      return await processRazorpayPayment(orderData, userDetails);
    case 'paypal':
      // Implement PayPal processing
      break;
    case 'stripe':
      // Implement Stripe processing
      break;
    case 'cod':
      // Cash on Delivery - no processing needed
      return { success: true, method: 'cod' };
    default:
      throw new Error('Unsupported payment method');
  }
};

// Utility function to format amount for different payment gateways
export const formatAmount = (amount, currency = 'INR') => {
  switch (currency) {
    case 'INR':
      return Math.round(amount * 100); // Convert to paise for Razorpay
    case 'USD':
      return Math.round(amount * 100); // Convert to cents for Stripe
    default:
      return amount;
  }
};

// Validate payment details
export const validatePaymentDetails = (paymentMethod, userDetails) => {
  const errors = {};
  
  if (paymentMethod === 'card' && !userDetails.cardNumber) {
    errors.cardNumber = 'Card number is required';
  }
  
  if (paymentMethod === 'upi' && !userDetails.upiId) {
    errors.upiId = 'UPI ID is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
