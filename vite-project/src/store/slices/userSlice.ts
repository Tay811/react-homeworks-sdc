import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AddToCartItem = {
  id: string;
  meal?: unknown;
  price?: number;
  img?: string;
};

export type CartItem = AddToCartItem & {
  qty: number;
};

export interface UserState {
  cartItems: CartItem[];
  cartCount: number;
}

const initialState: UserState = {
  cartItems: [],
  cartCount: 0,
};

function calcCartCount(items: CartItem[]) {
  return (items ?? []).reduce((sum, it) => sum + Number(it.qty || 0), 0);
}

function normalizeQty(qty: unknown) {
  const n = Number(qty);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{ item: AddToCartItem; qty?: number }>
    ) {
      const { item, qty = 1 } = action.payload;
      const q = normalizeQty(qty);

      const existing = state.cartItems.find((x) => x.id === item.id);

      if (existing) {
        existing.qty += q;
      } else {
        state.cartItems.push({ ...item, qty: q });
      }

      state.cartCount = calcCartCount(state.cartItems);
    },

    removeFromCart(state, action: PayloadAction<string | { id: string }>) {
      const id =
        typeof action.payload === "string" ? action.payload : action.payload.id;

      state.cartItems = state.cartItems.filter((x) => x.id !== id);
      state.cartCount = calcCartCount(state.cartItems);
    },

    changeQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const { id, qty } = action.payload;

      const existing = state.cartItems.find((x) => x.id === id);
      if (!existing) return;

      existing.qty = normalizeQty(qty);
      state.cartCount = calcCartCount(state.cartItems);
    },

    clearCart(state) {
      state.cartItems = [];
      state.cartCount = 0;
    },

    resetCart(state) {
      state.cartItems = [];
      state.cartCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, changeQty, clearCart, resetCart } =
  userSlice.actions;

export default userSlice.reducer;
