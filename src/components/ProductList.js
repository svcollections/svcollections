import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { products, categories } from '../data/products';
import './ProductList.css';

const ProductList = ({ selectedCategory = 'All', onCategoryChange }) => {
  const [sortBy, setSortBy] = useState('name');
  const [baseProducts, setBaseProducts] = useState(products);

  const handleSort = (sortType) => {
    setSortBy(sortType);
    const sorted = [...filteredAndSortedProducts].sort((a, b) => {
      switch (sortType) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    setBaseProducts(sorted);
  };

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = baseProducts.filter(product => 
      selectedCategory === 'All' || product.category === selectedCategory
    );
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    return sorted;
  }, [baseProducts, selectedCategory, sortBy]);

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Our Products</h2>
        <div className="product-controls">
          <div className="category-filter">
            <label>Category:</label>
            <select 
              value={selectedCategory}
              onChange={(e) => onCategoryChange ? onCategoryChange(e.target.value) : undefined}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="sort-options">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="product-grid">
        {filteredAndSortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredAndSortedProducts.length === 0 && (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
