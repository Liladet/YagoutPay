// components/ProductList.tsx
import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList: React.FC = () => {
  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h2>Our Products</h2>
        <p>Discover amazing products at great prices</p>
      </div>
      
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;