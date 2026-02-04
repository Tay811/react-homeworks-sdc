import reducer, {
  addToCart,
  changeQty,
  removeFromCart,
  clearCart,
  type CartItem,
} from "./userSlice";

import type { Meal } from "../../types/meal";

const mockMeal = (overrides?: Partial<Meal>): Meal => ({
  id: "1",
  meal: "Pizza",
  price: 10,
  img: "pizza.png",
  ...overrides,
});

describe("userSlice – cart logic", () => {
  it("should add item to cart", () => {
    const meal = mockMeal();

    const state = reducer(undefined, addToCart({ item: meal, qty: 2 }));

    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0].qty).toBe(2);
    expect(state.cartCount).toBe(2);
  });

  it("should increase qty if item already exists", () => {
    const meal = mockMeal();

    const state1 = reducer(undefined, addToCart({ item: meal, qty: 1 }));
    const state2 = reducer(state1, addToCart({ item: meal, qty: 3 }));

    expect(state2.cartItems).toHaveLength(1);
    expect(state2.cartItems[0].qty).toBe(4);
    expect(state2.cartCount).toBe(4);
  });

  it("should normalize qty if invalid value provided", () => {
    const meal = mockMeal();

    const state = reducer(undefined, addToCart({ item: meal, qty: 0 }));

    expect(state.cartItems[0].qty).toBe(1);
    expect(state.cartCount).toBe(1);
  });

  it("should change item qty", () => {
    const meal = mockMeal();

    const state1 = reducer(undefined, addToCart({ item: meal, qty: 1 }));
    const state2 = reducer(
      state1,
      changeQty({ id: meal.id, qty: 5 })
    );

    expect(state2.cartItems[0].qty).toBe(5);
    expect(state2.cartCount).toBe(5);
  });

  it("should not allow qty less than 1", () => {
    const meal = mockMeal();

    const state1 = reducer(undefined, addToCart({ item: meal, qty: 3 }));
    const state2 = reducer(
      state1,
      changeQty({ id: meal.id, qty: -10 })
    );

    expect(state2.cartItems[0].qty).toBe(1);
    expect(state2.cartCount).toBe(1);
  });

  it("should remove item from cart", () => {
    const meal1 = mockMeal({ id: "1" });
    const meal2 = mockMeal({ id: "2", meal: "Burger" });

    const state1 = reducer(
      undefined,
      addToCart({ item: meal1, qty: 2 })
    );
    const state2 = reducer(
      state1,
      addToCart({ item: meal2, qty: 1 })
    );

    const state3 = reducer(
      state2,
      removeFromCart({ id: "1" })
    );

    expect(state3.cartItems).toHaveLength(1);
    expect(state3.cartItems[0].id).toBe("2");
    expect(state3.cartCount).toBe(1);
  });

  it("should clear cart", () => {
    const meal = mockMeal();

    const state1 = reducer(undefined, addToCart({ item: meal, qty: 3 }));
    const state2 = reducer(state1, clearCart());

    expect(state2.cartItems).toHaveLength(0);
    expect(state2.cartCount).toBe(0);
  });
});
