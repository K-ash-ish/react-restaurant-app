import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartRestaurantInfo: {
    name: "",
    city: "",
    id: "",
  },
};

export const restaurantSlice = createSlice({
  name: "restaurantInfo",
  initialState,
  reducers: {
    addRestaurantInfo: (state, action) => {
      const { name, city, id } = action.payload;
      state.cartRestaurantInfo = { name, city, id };
    },
  },
});
export default restaurantSlice.reducer;
export const { addRestaurantInfo } = restaurantSlice.actions;
