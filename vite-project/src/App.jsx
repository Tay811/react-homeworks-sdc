import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  const handleAddToCart = (_item, qty = 1) =>
    setCartCount((n) => n + Number(qty || 1));
  

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AppContainer cartCount={cartCount} user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage onAdd={handleAddToCart} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute user={user}>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContainer>
  );
}

