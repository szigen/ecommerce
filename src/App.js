import React, { useState, useEffect, useCallback } from 'react';
import products from './products';
import ProductList from './ProductList';
import DropdownCart from './DropdownCart';
import './App.css';

function App() {
  const [category, setCategory] = useState('Tümü');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOrder, setSortOrder] = useState('asc'); // Sıralama durumu
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Tümü', 'Elektronik', 'Moda', 'Ev & Yaşam'];

  const filterProducts = useCallback(() => {
    let filtered = products;

    if (category !== 'Tümü') {
      filtered = filtered.filter((product) => product.category === category);
    }

    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    filtered = filtered.filter(
      (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sıralama işlemi
    filtered = filtered.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    return filtered;
  }, [category, priceRange, sortOrder, searchTerm]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    const range = event.target.value.split('-').map(Number);
    setPriceRange(range);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToCart = (event) => {
    const productId = event.currentTarget.getAttribute('data-id');
    const product = products.find((prod) => prod.id === parseInt(productId, 10));
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.id !== id);
      }

      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <h1>E-Ticaret Sitesi</h1>

      <div className="filters">
        <select value={category} onChange={handleCategoryChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select onChange={handlePriceChange}>
          <option value="0-500">Tümü</option>
          <option value="0-100">0 - 100 TL</option>
          <option value="100-200">100 - 200 TL</option>
          <option value="200-500">200 - 500 TL</option>
        </select>

        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Artan Fiyat</option>
          <option value="desc">Azalan Fiyat</option>
        </select>
        
        <input
          type="text"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <DropdownCart
          cart={cart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </div>

      <ProductList products={filterProducts()} addToCart={addToCart} />
    </div>
  );
}

export default App;