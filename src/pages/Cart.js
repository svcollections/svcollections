import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getShippingFee, getFinalTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
    } else {
      updateQuantity(productId, size, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button 
              className="shop-now-btn"
              onClick={() => navigate('/products')}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={`${item.id}-${item.size}-${index}`} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <div className="item-pricing">
                    <p className="item-mrp">₹{item.mrp}</p>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                </div>
                
                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="item-total">
                  <p>₹{(item.price * item.quantity).toFixed(0)}</p>
                </div>
                
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id, item.size)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{getTotalPrice().toFixed(0)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{getShippingFee() === 0 ? 'Free' : `₹${getShippingFee()}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{getFinalTotal().toFixed(0)}</span>
              </div>
            </div>
            
            <div className="cart-actions">
              <button 
                className="checkout-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
              <button 
                className="clear-cart-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button 
                className="continue-shopping-btn"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
