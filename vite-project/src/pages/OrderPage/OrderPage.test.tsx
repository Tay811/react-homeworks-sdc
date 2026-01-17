import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import OrderPage from "./index";
import { renderWithStore } from "../../test/testUtils";

describe("OrderPage", () => {
  it("shows empty state when cart is empty", () => {
    renderWithStore(<OrderPage />, {
      preloadedState: {
        user: { cartItems: [], cartCount: 0 } as any,
        auth: { user: { id: "u1" }, isLoggedIn: true } as any,
      },
      route: "/order",
    });

    expect(screen.getByText("order.empty")).toBeInTheDocument();
  });

  it("renders items when cart has items", () => {
    renderWithStore(<OrderPage />, {
      preloadedState: {
        user: {
          cartItems: [{ id: "1", meal: "Pizza", price: 10, img: "x.png", qty: 2 }],
          cartCount: 2,
        } as any,
        auth: { user: { id: "u1" }, isLoggedIn: true } as any,
      },
      route: "/order",
    });

    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    expect(screen.getByText(/order\.total/i)).toBeInTheDocument();
  });

  it("removes item when remove button clicked", async () => {
    const user = userEvent.setup();

    renderWithStore(<OrderPage />, {
      preloadedState: {
        user: {
          cartItems: [{ id: "1", meal: "Pizza", price: 10, img: "x.png", qty: 2 }],
          cartCount: 2,
        } as any,
        auth: { user: { id: "u1" }, isLoggedIn: true } as any,
      },
      route: "/order",
    });

    await user.click(screen.getByRole("button", { name: "order.remove" }));
    expect(screen.getByText("order.empty")).toBeInTheDocument();
  });

  it("changes qty via input", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<OrderPage />, {
      preloadedState: {
        user: {
          cartItems: [{ id: "1", meal: "Pizza", price: 10, img: "x.png", qty: 2 }],
          cartCount: 2,
        } as any,
        auth: { user: { id: "u1" }, isLoggedIn: true } as any,
      },
      route: "/order",
    });

    const qtyInput = screen.getByDisplayValue("2");
    fireEvent.change(qtyInput, { target: { value: "5" } });

    const state = store.getState() as any;
    expect(state.user.cartItems[0].qty).toBe(5);
  });

  it("validates empty address and cart on submit", async () => {
    const user = userEvent.setup();

    renderWithStore(<OrderPage />, {
      preloadedState: {
        user: { cartItems: [], cartCount: 0 } as any,
        auth: { user: { id: "u1" }, isLoggedIn: true } as any,
      },
      route: "/order",
    });

    await user.click(screen.getByRole("button", { name: "order.submit" }));
    expect(screen.getByText("order.emptyHint")).toBeInTheDocument();
    expect(screen.getByText("order.addressHint")).toBeInTheDocument();
  });

  it("submits form and clears cart when valid", async () => {
    const user = userEvent.setup();
    const { store } = renderWithStore(<OrderPage />, {
      preloadedState: {
        user: {
          cartItems: [{ id: "1", meal: "Pizza", price: 10, img: "x.png", qty: 2 }],
          cartCount: 2,
        } as any,
        auth: { user: { id: "u1" }, isLoggedIn: true } as any,
      },
      route: "/order",
    });

    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "Main street");
    await user.type(inputs[1], "10");

    await user.click(screen.getByRole("button", { name: "order.submit" }));

    const state = store.getState() as any;
    expect(state.user.cartItems).toHaveLength(0);
    expect(state.user.cartCount).toBe(0);
  });
});
