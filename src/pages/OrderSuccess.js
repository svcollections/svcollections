import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <div className="checkmark">
              <div className="checkmark-circle">
                <div className="checkmark-stem"></div>
                <div className="checkmark-kick"></div>
              </div>
            </div>
          </div>
          
          <h1>Order Placed Successfully!</h1>
          <p className="success-message">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
          
          <div className="order-details">
            <h3>What's Next?</h3>
            <ul>
              <li>You will receive an order confirmation email shortly</li>
              <li>Your order will be processed within 1-2 business days</li>
              <li>You will receive tracking information once your order ships</li>
              <li>Expected delivery: 3-5 business days</li>
            </ul>
          </div>
          
          <div className="success-actions">
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
            <Link to="/" className="home-btn">
              Back to Home
            </Link>
          </div>
          
          <div className="support-info">
            <p>
              Need help? Contact our customer support at{' '}
              <a href="mailto:svcollections27@gmail.com">support@svcollections.com</a>
              {' '}or call us at{' '}
              <a href="tel:+91-9676433881">+91-9676433881</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
