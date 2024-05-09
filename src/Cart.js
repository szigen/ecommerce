import React from 'react';
import './Cart.css';

function Cart({ cart }) {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Sepet</h2>
      {cart.length === 0 ? (
        <p>Sepetiniz boş</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <h4>{item.name}</h4>
              <p>Adet: {item.quantity}</p>
              <p>Fiyat: {item.price * item.quantity} TL</p>
            </li>
          ))}
        </ul>
      )}
      <h3>Toplam Fiyat: {totalPrice} TL</h3>
    </div>
  );
}

export default Cart;
