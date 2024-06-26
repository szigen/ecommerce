import React from "react";
import "./Product.css";

function Product({ product, addToCart }) {
  return (
    <li className="product-item">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>Kategori: {product.category}</p>
      <p>Fiyat: {product.price} TL</p>
      <button
        data-id={product.id}
        onClick={addToCart}
        className="add-to-cart-button"
      >
        Sepete Ekle
      </button>
    </li>
  );
}

export default Product;
