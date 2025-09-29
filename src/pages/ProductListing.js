import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import { categories } from '../data/products';
import './ProductListing.css';

const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="product-listing-page">
      <div className="container">
        <div className="page-header">
          <h1>All Products</h1>
          <p>Discover our complete collection of modern clothing</p>
        </div>

        <div className="listing-content">
          <div className="sidebar">
            <div className="category-filter">
              <h3>Categories</h3>
              <ul className="category-list">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="main-content">
            <ProductList 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
