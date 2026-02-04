import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import userReducer from "./store/slices/userSlice";
import authReducer from "./store/slices/authSlice";


vi.mock("./components/AppContainer", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-container">{children}</div>
  ),
}));

vi.mock("./pages/LoginPage", () => ({
  default: () => <div>LOGIN_PAGE</div>,
}));

vi.mock("./pages/OrderPage", () => ({
  default: () => <div>ORDER_PAGE</div>,
}));

vi.mock("./pages/HomePage", () => ({
  default: () => <div>HOME_PAGE</div>,
}));

vi.mock("./pages/MenuPage", () => ({
  default: () => <div>MENU_PAGE</div>,
}));

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

type RenderOptions = {
  authenticated: boolean;
  initialPath?: string;
};

function renderApp({ authenticated, initialPath = "/order" }: RenderOptions) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      user: { cartItems: [], cartCount: 0 },
      auth: authenticated
        ? { user: { id: "u1" }, isLoggedIn: true }
        : { user: null, isLoggedIn: false },
    } as any,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialPath]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}

describe("App routing / ProtectedRoute", () => {
  it("redirects to /login when user is not authenticated", async () => {
    renderApp({ authenticated: false, initialPath: "/order" });

    expect(await screen.findByText("LOGIN_PAGE")).toBeInTheDocument();
  });

  it("allows access to /order when user is authenticated", async () => {
    renderApp({ authenticated: true, initialPath: "/order" });

    expect(await screen.findByText("ORDER_PAGE")).toBeInTheDocument();
  });
});
