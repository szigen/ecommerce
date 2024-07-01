import React, { useState, useEffect, useMemo } from "react";
import ProductList from "./ProductList";
import DropdownCart from "./DropdownCart";
import Dropdown from "./components/Dropdown";
import { database } from "./Firebase/firebase";
import { onValue, ref, update } from "firebase/database";

function App() {
  const [category, setCategory] = useState("Tümü");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOrder, setSortOrder] = useState("unsorted");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { value: "Tümü", label: "Tümü" },
    { value: "Elektronik", label: "Elektronik" },
    { value: "Moda", label: "Moda" },
    { value: "Ev & Yaşam", label: "Ev & Yaşam" },
  ];

  const priceOptions = [
    { value: "0-500", label: "Tümü" },
    { value: "0-100", label: "0 - 100 TL" },
    { value: "100-200", label: "100 - 200 TL" },
    { value: "200-500", label: "200 - 500 TL" },
  ];

  const sortOrderOptions = [
    { value: "unsorted", label: "Sıralama" },
    { value: "asc", label: "Artan Fiyat" },
    { value: "desc", label: "Azalan Fiyat" },
  ];

  useEffect(() => {
    const query = ref(database, "products");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      //convert data to array

      console.log(data);
      if (snapshot.exists()) {
        setProducts(Object.values(data));
        setIsLoading(false);
      }
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (category !== "Tümü") {
      filtered = filtered.filter((product) => product.category === category);
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder !== "unsorted") {
      filtered = filtered.sort((a, b) => {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    return filtered;
  }, [category, priceRange, sortOrder, searchTerm, products]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    const range = event.target.value.split("-").map(Number);
    setPriceRange(range);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToCart = (event) => {
    const productId = event.currentTarget.getAttribute("data-id");
    const product = products.find(
      (prod) => prod.id === parseInt(productId, 10)
    );
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          alert("Bu üründen daha fazla stokta yok!");
          return prevCart;
        }
      } else {
        if (product.stock > 0) {
          return [...prevCart, { ...product, quantity: 1 }];
        } else {
          alert("Bu ürün stokta yok!");
          return prevCart;
        }
      }
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      const product = products.find((prod) => prod.id === id);

      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.id !== id);
      }

      if (newQuantity > product.stock) {
        alert("Bu üründen daha fazla stokta yok!");
        return prevCart;
      }

      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      alert("Satın alma işlemi başarılı!");

      const updates = {};
      setProducts((prevProducts) => {
        return prevProducts.map((prod) => {
          const cartItem = cart.find((item) => item.id === prod.id);
          if (cartItem) {
            const newStock = prod.stock - cartItem.quantity;
            console.log("newStock", newStock);
            updates[`products/${prod.id}/stock`] = newStock; // Prepare update for Firebase
            return { ...prod, stock: newStock };
          }
          return prod;
        });
      });

      // Update Firebase database with new stock values
      await update(ref(database), updates);
      console.log("updates", updates);

      setCart([]); // Clear cart
    } catch (error) {
      console.error("Satın alma işlemi başarısız:", error);
      alert("Satın alma işlemi başarısız. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="App p-4">
      <h1 className="text-3xl font-bold mb-4">E-Ticaret Sitesi</h1>

      <div className="filters flex flex-wrap gap-4 mb-4 items-center">
        <div className="flex-grow">
          <Dropdown
            options={categories}
            value={category}
            onChange={handleCategoryChange}
            className="mr-2"
          />
          <Dropdown
            options={priceOptions}
            onChange={handlePriceChange}
            className="ml-2"
          />
          <Dropdown
            options={sortOrderOptions}
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="ml-2"
          />
          <input
            type="text"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border rounded ml-2"
          />
        </div>
        <DropdownCart
          cart={cart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          handleCheckout={handleCheckout} // Pass handleCheckout to DropdownCart
        />
      </div>

      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList products={filteredProducts} addToCart={addToCart} />
      )}
    </div>
  );
}

export default App;
