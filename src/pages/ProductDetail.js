import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeError, setShowSizeError] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    
    addToCart(product, selectedSize);
    setShowSizeError(false);
    setSelectedSize('');
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} className="product-image" />
          </div>
          
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-pricing">
              <p className="product-mrp">₹{product.mrp}</p>
              <p className="product-price">₹{product.price}</p>
              <span className="discount-badge">{product.discount}% OFF</span>
            </div>
            <p className="product-category">{product.category}</p>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="size-selection">
              <h3>Size</h3>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowSizeError(false);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {showSizeError && (
                <p className="size-error">Please select a size</p>
              )}
            </div>
            
            <div className="product-actions">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button 
                className="back-btn"
                onClick={() => navigate('/products')}
              >
                Back to Products
              </button>
            </div>
            
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>Premium quality materials</li>
                <li>Comfortable fit</li>
                <li>Machine washable</li>
                <li>Available in multiple sizes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
