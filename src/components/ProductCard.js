import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, selectedSize: controlledSelectedSize, onSelectSize }) => {
  const [localSelectedSize, setLocalSelectedSize] = useState('');
  const [showSizeError, setShowSizeError] = useState(false);
  const { addToCart } = useCart();

  // Reset selected size when product changes
  useEffect(() => {
    if (controlledSelectedSize === undefined) {
      setLocalSelectedSize('');
      setShowSizeError(false);
    } else {
      setShowSizeError(false);
    }
  }, [product.id]);

  const selectedSize = controlledSelectedSize !== undefined ? controlledSelectedSize : localSelectedSize;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    
    addToCart(product, selectedSize);
    setShowSizeError(false);
    if (controlledSelectedSize === undefined) {
      setLocalSelectedSize('');
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <Link to={`/product/${product.id}`} className="view-details-btn">
            View Details
          </Link>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-pricing">
          <p className="product-mrp">₹{product.mrp}</p>
          <p className="product-price">₹{product.price}</p>
          <span className="discount-badge">{product.discount}% OFF</span>
        </div>
        
        <div className="size-selection">
          <label>Size:</label>
          <div className="size-options">
            {product.sizes.map(size => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => {
                  if (onSelectSize) {
                    onSelectSize(size);
                  } else {
                    setLocalSelectedSize(size);
                  }
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
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
