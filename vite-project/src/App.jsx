import React, { useState } from "react";
import AppContainer from "./components/AppContainer/index.jsx";
import MenuPage from "./pages/MenuPage";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const handleAddToCart = (_item, qty = 1) =>
    setCartCount((n) => n + Number(qty || 1));

  return (
    <AppContainer cartCount={cartCount}>
      <MenuPage onAdd={handleAddToCart} />
    </AppContainer>
  );
}

