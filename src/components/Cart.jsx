import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { removeItem, repeatItem, updateCart } from "../features/cart/cartSlice";
import { IMG_CDN_URL } from "../constant";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./ui/Modal";
function Item(props) {
  const { itemName, quantity, price } = props;
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
    <div className="flex flex-row justify-evenly items-center mb-2 px-2">
      <p className="px-2 text-base w-1/2 capitalize">{itemName}</p>
      <div className=" px-2 mr-3 w-20 flex add-remove border-2 items-center justify-around">
        <button
          className=" text-red-500 text-3xl"
          onClick={() => removeItems(itemName, quantity)}
        >
          -
        </button>
        <p className="text-green-500 font-bold">{quantity}</p>
        <button
          className="text-green-500 text-2xl"
          onClick={() => repeatItems(itemName)}
        >
          +
        </button>
      </div>
      <p>₹ {price}</p>
    </div>
  );
}
function Cart() {
  const { user } = useFirebase();
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  // [
  //     {
  //         "dishName": "Butter Chicken Biryani",
  //         "dishPrice": "450",
  //         "quantity": 1
  //     },
  //     {
  //         "dishName": "Dum Pukht Bombay Mutton Biryani",
  //         "dishPrice": "450",
  //         "quantity": 1
  //     }
  // ]
  const currentRestaurant = useSelector(
    (state) => state?.restaurantInfo?.cartRestaurantInfo
  );
  const [showOrderConfirmationModal, setShowOrderConfirmationModal] =
    useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaymenetComplete, setIsPaymentComplete] = useState(false);

  let itemTotal = 0;

  if (cartItems.length > 0) {
    itemTotal = cartItems.reduce((total, item) => {
      return total + parseInt(item.dishPrice) * item.quantity;
    }, 0);
  }
  if (cartItems?.length === 0) {
    return (
      <div className="border-2 w-[300px] h-[300px] rounded-md shadow-md flex flex-col justify-evenly  items-center ">
        <img
          className="w-72 h-auto"
          src={
            IMG_CDN_URL +
            "v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png"
          }
          alt=""
        />
        <h2 className="text-lg font-semibold">Your cart is empty</h2>
        <NavLink to="/">
          <button className="border-2 bg-orange-400 p-2 rounded-md shadow-md font-semibold">
            Order Something
          </button>
        </NavLink>
      </div>
    );
  }
  return (
    <section className="h-fit my-12 w-11/12 border-2  capitalize min-h-96 md:w-[340px] p-2 md:flex md:flex-col ">
      <div className=" pb-3 flex   ">
        <NavLink to={`/restaurant/${currentRestaurant?.id}`}>
          <button className="pr-4 pl-1 text-2xl">
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </button>
        </NavLink>
        <div className="">
          <p className="font-medium">Restaurant Name</p>
          <div className="flex font-light justify-evenly">
            {/* check for item quantity for item / items */}
            <p>{cartItems.length} items</p>|<p>ETA</p>
          </div>
        </div>
      </div>
      <div className=" min-h-20  flex flex-col  ">
        {cartItems.map((item) => {
          return (
            <Item
              key={uuidv4()}
              itemName={item.dishName}
              quantity={item.quantity}
              price={item.dishPrice}
            />
          );
        })}
      </div>

      <div className="order text-xl flex items-center justify-center h-24">
        {showOrderConfirmationModal &&
          createPortal(
            <Modal
              isOpen={showOrderConfirmationModal}
              setIsOpen={setShowOrderConfirmationModal}
              customClass={"w-[280px] top-[calc(50%-120px)]  py-2 px-1 "}
            >
              <div className="px-2 pb-2 flex flex-col gap-2 ">
                <h3 className="font-semibold ">Order details</h3>
                <div className="max-h-[150px] overflow-y-scroll pr-2 menu">
                  {cartItems?.map((item, index) => {
                    return (
                      <div
                        className="flex  justify-between  gap-2 text-sm py-1 "
                        key={index}
                      >
                        <p>- {item?.dishName}</p>
                        <p>{item?.quantity}</p>
                      </div>
                    );
                  })}
                </div>
                <div className=" flex flex-col  my-2 mx-2 border-t-2">
                  <h1 className="font-bold px-1 py-1">Bill Details</h1>
                  <div className=" flex justify-between px-2 font-thin">
                    <div className="">
                      <p className="py-1 px-1">Item Total</p>
                      <p className="py-1 px-1">Delivery fee</p>
                      <p className="py-1 px-1">Tax</p>
                    </div>
                    <div className="  text-center w-16 font-thin">
                      <p className="py-1 px-1">
                        ₹ {itemTotal > 0 ? itemTotal : null}{" "}
                      </p>
                      <p className="py-1 px-1">
                        ₹ {itemTotal > 0 ? 19 : null}{" "}
                      </p>
                      <p className="py-1 px-1">
                        ₹ {itemTotal > 0 ? 20 : null}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center my-4 border-green-500 px-2 border-t-2 border-b-2">
                    <p className="font-medium py-1 px-1">To Pay</p>
                    <p className="py-1 px-1 text-center  w-16">
                      ₹ {itemTotal > 0 ? itemTotal + 19 + 20 : null}{" "}
                    </p>
                  </div>
                </div>
                {isPaymenetComplete && (
                  <div className="text-sm text-green-600 flex justify-center ">
                    <p>Payment Successfull</p>
                  </div>
                )}
                {isProcessingPayment ? (
                  <div className="text-sm text-sky-400 font-semibold flex justify-between px-2 items-center">
                    <p className="font-normal">Processing payment </p>
                    <div className="loader w-20 bg-slate-200 h-0.5 relative">
                      <div className="loader-line w-10 bg-sky-500 h-1 rounded-full "></div>
                    </div>
                  </div>
                ) : (
                  !isPaymenetComplete && (
                    <button
                      className="border-2 border-black self-center px-3  hover:bg-green-400  transition-colors rounded-full"
                      onClick={() => {
                        setIsProcessingPayment(true);
                        setTimeout(() => {
                          setIsProcessingPayment(false);
                          setIsPaymentComplete(true);
                        }, 5000);
                      }}
                    >
                      Pay
                    </button>
                  )
                )}
              </div>
            </Modal>,
            document.body
          )}
        <NavLink to={`${user ? "" : "/login"}`}>
          <button
            onClick={() => {
              document.getElementById("root").classList.add("blur-sm");
              setShowOrderConfirmationModal(true);
            }}
            className="px-4 py-1 border-2 border-red-300 cursor-pointer hover:text-white hover:bg-red-500 hover:border-none transition-colors ease-in duration-300 rounded-full"
          >
            Place Order
          </button>
        </NavLink>
      </div>
    </section>
  );
}
export default Cart;
