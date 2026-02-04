import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // [{ id, meal, price, img, qty }]
  cartCount: 0,  
};

function calcCartCount(items) {
  return (items ?? []).reduce((sum, it) => sum + Number(it.qty || 0), 0);
}

function normalizeQty(qty) {
  const n = Number(qty);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    addToCart(state, action) {
      const item = action.payload?.item;
      if (!item) return;

      const qty = normalizeQty(action.payload?.qty ?? 1);
      const id = item.id;

      const existing = state.cartItems.find((x) => x.id === id);

      if (existing) {
        existing.qty += qty;
      } else {
        state.cartItems.push({
          id: item.id,
          meal: item.meal,
          price: item.price,
          img: item.img,
          qty,
        });
      }

      state.cartCount = calcCartCount(state.cartItems);
    },

    removeFromCart(state, action) {
      const id = action.payload?.id ?? action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== id);
      state.cartCount = calcCartCount(state.cartItems);
    },

    changeQty(state, action) {
      const id = action.payload?.id;
      const qty = normalizeQty(action.payload?.qty);

      const existing = state.cartItems.find((x) => x.id === id);
      if (!existing) return;

      existing.qty = qty;
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

export const {
  addToCart,
  removeFromCart,
  changeQty,
  clearCart,
  resetCart,
} = userSlice.actions;

export default userSlice.reducer;
