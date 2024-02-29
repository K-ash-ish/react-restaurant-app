import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "orderInfo",
  initialState,
  reducers: {
    addOrderDetails: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export default orderSlice.reducer;
export const { addOrderDetails } = orderSlice.actions;
