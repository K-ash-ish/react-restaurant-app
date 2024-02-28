import React from "react";
import { useDispatch } from "react-redux";
import {
  removeItem,
  repeatItem,
  updateCart,
} from "../../features/cart/cartSlice";

function CartActionBtn({ itemName, quantity }) {
  const dispatch = useDispatch();
  function repeatItems(dishName) {
    dispatch(repeatItem(dishName));
  }

  function removeItems(dishName, quantity) {
    dispatch(removeItem(dishName));
    if (quantity === 1) {
      // if quantity was 1 then after removing it should be 0 so updating the cart
      dispatch(updateCart());
    }
  }
  return (
    <div className="font-semibold  border-2 border-gray-200 rounded-md  flex flex-row  items-center justify-between  w-16 px-2">
      <button
        className=" text-red-500 "
        onClick={() => removeItems(itemName, quantity)}
      >
        -
      </button>

      <p className="text-sm">{quantity}</p>
      <button className="text-green-500 " onClick={() => repeatItems(itemName)}>
        +
      </button>
    </div>
  );
}

export default CartActionBtn;
