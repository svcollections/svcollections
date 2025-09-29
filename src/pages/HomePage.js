import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import './HomePage.css';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="homepage">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Discover Your Style</h1>
          <p>Shop the latest trends in modern, minimalist fashion</p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <ProductList selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over ₹1000</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">↩️</div>
              <h3>No Returns</h3>
              <p>No Exchanges</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💎</div>
              <h3>Premium Quality</h3>
              <p>High-quality materials and craftsmanship</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
