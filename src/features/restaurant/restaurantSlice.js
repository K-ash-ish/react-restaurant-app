import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartRestaurantInfo: {
    name: "",
    city: "",
    id: "",
    locality: "",
    cloudinaryImageId: "",
  },
};

export const restaurantSlice = createSlice({
  name: "restaurantInfo",
  initialState,
  reducers: {
    addRestaurantInfo: (state, action) => {
      const { name, city, id, locality, cloudinaryImageId } = action.payload;
      state.cartRestaurantInfo = {
        name,
        city,
        id,
        locality,
        cloudinaryImageId,
      };
    },
  },
});
export default restaurantSlice.reducer;
export const { addRestaurantInfo } = restaurantSlice.actions;
