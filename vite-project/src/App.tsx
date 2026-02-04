import { ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppContainer from "./components/AppContainer";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";

import { logout } from "./store/slices/authSlice";
import type { RootState } from "./store";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const cartCount = useSelector(
    (state: RootState) => state.user.cartCount
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppContainer
      cartCount={cartCount}
      user={user}
      onLogout={handleLogout}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContainer>
  );
}
