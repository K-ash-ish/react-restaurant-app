import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.cartItems.push(action.payload);
    },
    updateCart: (state) => {
      state.cartItems = state.cartItems.filter((item) => item.quantity !== 0);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    repeatItem: (state, action) => {
      state.cartItems.forEach((item, index) => {
        if (action.payload === item.dishName) {
          state.cartItems[index].quantity++;
        }
      });
    },
    removeItem: (state, action) => {
      state.cartItems.forEach((item, index) => {
        if (action.payload === item.dishName) {
          if (item.quantity > 0) state.cartItems[index].quantity--;
        }
      });
    },
  },
});
export default cartSlice.reducer;
export const { addItems, clearCart, repeatItem, removeItem, updateCart } =
  cartSlice.actions;
