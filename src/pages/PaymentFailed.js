import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentFailed.css';

const PaymentFailed = () => {
  return (
    <div className="payment-failed-page">
      <div className="container">
        <div className="failed-content">
          <div className="failed-icon">✖</div>
          <h1>Payment Failed</h1>
          <p>We couldn't complete your payment. You can try again or choose a different method.</p>
          <div className="failed-actions">
            <Link to="/checkout" className="btn btn-primary">Try Again</Link>
            <Link to="/cart" className="btn btn-secondary">Back to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;


