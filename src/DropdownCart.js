import React, { useState } from 'react';
import './DropdownCart.css';

function DropdownCart({ cart, updateQuantity, removeItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="dropdown-cart">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Sepet ({cart.length})
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            {cart.length === 0 ? (
              <p>Sepetiniz boş</p>
            ) : (
              cart.map((item) => (
                <li key={item.id}>
                  <h4>{item.name}</h4>
                  <p>Fiyat: {item.price} TL</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => removeItem(item.id)}>
                    Kaldır
                  </button>
                </li>
              ))
            )}
          </ul>
          <h3>Toplam Fiyat: {totalPrice} TL</h3>
        </div>
      )}
    </div>
  );
}

export default DropdownCart;
