import React, { useState } from "react";
import Button from "./components/Button";
import "./DropdownCart.css";

function DropdownCart({ cart, updateQuantity, removeItem, handleCheckout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      secondary
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      secondary
                    >
                      +
                    </Button>
                  </div>
                  <Button onClick={() => removeItem(item.id)} danger>
                    Kaldır
                  </Button>
                </li>
              ))
            )}
          </ul>
          <h3>Toplam Fiyat: {totalPrice} TL</h3>
          {cart.length > 0 && (
            <Button onClick={handleCheckout} success rounded>
              Satın Al
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownCart;
