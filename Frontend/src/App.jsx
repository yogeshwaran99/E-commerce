import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContext } from "./Context/Context";


function App() {
  return (
    <AppProvider>
      <AppWithContext />
    </AppProvider>
  );
}

function AppWithContext() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = React.useContext(AppContext);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar onSelectCategory={handleCategorySelect} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              selectedCategory={selectedCategory}
            />
          }
        />
        {user?.role === "ROLE_VENDOR" && (
          <Route path="/add_product" element={<AddProduct />} />
        )}
        <Route path="/product" element={<Product />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        {user?.role === "ROLE_VENDOR" && (
          <Route path="/product/update/:id" element={<UpdateProduct />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
