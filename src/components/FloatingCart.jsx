import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, repeatItem, updateCart } from "../features/cart/cartSlice";
import { NavLink } from "react-router-dom";

function FloatingCart(props) {
  const { cartError } = props;
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`  fixed bottom-24 left-0 right-0  bg-gray-50  w-80 max-h-[200px] overflow-y-scroll px-2 py-1 mx-auto  rounded-xl shadow-md border-2  border-red-200   
               transition-all ease-in-out duration-500 ${
                 showCart
                   ? "translate-y-0"
                   : "translate-y-full opacity-0  border-none "
               }`}
      >
        <div className="px-2 flex flex-col gap-2">
          <h1 className="font-semibold">Cart Items</h1>

          {cartItems.map((item, index) => (
            <div key={index}>
              <ul className="flex flex-row justify-between items-center gap-4">
                <li className="text-sm underline">
                  {item.dishName?.substring(0, 25) + "..."}
                </li>
                <li className="font-semibold text-red-500 border-2 flex flex-row  items-center justify-between border-black w-16 px-2">
                  <button
                    className="font-semibold "
                    onClick={() => {
                      dispatch(removeItem(item.dishName));
                      if (item.quantity === 1) {
                        // if quantity was 1 then after removing it should be 0 so updating the cart
                        dispatch(updateCart());
                      }
                      if (item.quantity === 0) setShowCart(false);
                    }}
                  >
                    -
                  </button>
                  <p className="text-sm ">{item.quantity} </p>
                  <button
                    className="font-semibold"
                    onClick={() => {
                      dispatch(repeatItem(item.dishName));
                    }}
                  >
                    +
                  </button>
                </li>
              </ul>
            </div>
          ))}
          {cartError && (
            <p className="text-xs pt-2 text-red-500">
              Your cart contains items from other restaurant.
            </p>
          )}
          <NavLink
            to="/cart"
            state={{ previousLocationPathName: location?.pathname }}
            className="border-b-2 rounded-md my-2 py-1 text-orange-500 no-underline text-center"
          >
            Checkout
          </NavLink>
        </div>
      </div>
      <button
        className=" bg-gray-50  w-40 mx-auto fixed bottom-10 left-0 right-0 border-2 border-red-300 rounded-md px-1 py-2 "
        onClick={() => setShowCart(!showCart)}
      >
        Cart{" "}
        <span className="text-red-500 font-semibold">{cartItems.length}</span>
      </button>
    </>
  );
}

export default FloatingCart;
