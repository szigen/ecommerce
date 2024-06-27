import React, { useState } from "react";
import Button from "./components/Button";

function DropdownCart({ cart, updateQuantity, removeItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="relative">
      <Button primary rounded onClick={toggleDropdown}>
        Sepet ({cart.length})
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4">
          <ul className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-500">Sepetiniz boş</p>
            ) : (
              cart.map((item) => (
                <li key={item.id} className="border-b pb-2">
                  <h4 className="text-xl font-semibold">{item.name}</h4>
                  <p className="text-gray-600">Fiyat: {item.price} TL</p>
                  <div className="flex items-center mt-2">
                    <Button
                      primary
                      rounded
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      primary
                      rounded
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                    onClick={() => removeItem(item.id)}
                  >
                    Kaldır
                  </Button>
                </li>
              ))
            )}
          </ul>
          <h3 className="text-lg font-semibold mt-4">
            Toplam Fiyat: {totalPrice} TL
          </h3>
        </div>
      )}
    </div>
  );
}

export default DropdownCart;
