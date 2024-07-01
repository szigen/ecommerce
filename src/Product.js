import React from "react";
import Button from "./components/Button";

function Product({ product, addToCart }) {
  return (
    <li className={`border border-gray-300 bg-neutral-300 p-4 text-left rounded-lg flex flex-col items-center transition-colors duration-300 hover:bg-neutral-600 ${product.stock === 0 ? 'opacity-50' : ''}`}>
      <img
        src={product.image}
        alt={product.name}
        className="max-w-full rounded mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-black-900">Kategori: {product.category}</p>
      <p className="text-black-900 mb-4">Fiyat: {product.price} TL</p>
      <p className="text-black-900 mb-4">Stok: {product.stock}</p>
      <Button
        data-id={product.id}
        onClick={addToCart}
        success
        rounded
        disabled={product.stock === 0}
      >
        Sepete Ekle
      </Button>
    </li>
  );
}

export default Product;