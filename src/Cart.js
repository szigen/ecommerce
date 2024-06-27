import React from 'react';

function Cart({ cart }) {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sepet</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Sepetiniz boş</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="border-b pb-2">
              <h4 className="text-xl font-semibold">{item.name}</h4>
              <p className="text-gray-600">Adet: {item.quantity}</p>
              <p className="text-gray-600">Fiyat: {item.price * item.quantity} TL</p>
            </li>
          ))}
        </ul>
      )}
      <h3 className="text-xl font-semibold mt-4">Toplam Fiyat: {totalPrice} TL</h3>
    </div>
  );
}

export default Cart;