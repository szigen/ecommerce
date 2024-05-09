import React from 'react';
import Product from './Product';
import './ProductList.css';

function ProductList({ products, addToCart }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </ul>
  );
}

export default ProductList;
