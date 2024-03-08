import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { clearCart } from "../features/cart/cartSlice";
import { IMG_CDN_URL } from "../constant";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./ui/Modal";
import OrderSummaryModal from "./ui/OrderSummaryModal";
import CartActionBtn from "./ui/CartActionBtn";
function Item(props) {
  const { itemName, quantity, price } = props;
  return (
    <div className="flex flex-row justify-between items-center mb-2 w-full  gap-2">
      <p className="text-base capitalize ">
        {itemName?.length > 14 ? itemName.substring(0, 20) + "..." : itemName}
      </p>
      <div
        className={`flex  items-center justify-around  min-w-[160px] gap-2 `}
      >
        <CartActionBtn itemName={itemName} quantity={quantity} />
        <p className="min-w-[60px] text-left ">
          <span className="text-green-500 font-medium">₹</span> {price}
        </p>
      </div>
    </div>
  );
}
function Cart() {
  const { user } = useFirebase();
  const cartItems = useSelector((state) => state?.cart?.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartRestaurantInfo = useSelector(
    (state) => state?.restaurantInfo?.cartRestaurantInfo
  );
  const [showOrderConfirmationModal, setShowOrderConfirmationModal] =
    useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  let itemTotal = 0;
  // check for dependency array [LOGIC]
  useEffect(() => {
    if (isPaymentComplete && !showOrderConfirmationModal) {
      document.getElementById("root").classList.remove("blur-sm");
      dispatch(clearCart());
    }
  }, [isPaymentComplete, showOrderConfirmationModal]);

  if (cartItems.length > 0) {
    itemTotal = cartItems.reduce((total, item) => {
      return total + parseInt(item.dishPrice) * item.quantity;
    }, 0);
  }
  if (cartItems?.length === 0) {
    return (
      <div className="min-w-[300px] h-[300px] rounded-md shadow-md flex flex-col justify-evenly  items-center ">
        <img
          className="w-72 h-auto"
          src={
            IMG_CDN_URL +
            "v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png"
          }
          alt=""
        />
        <h2 className="text-lg font-semibold">Your cart is empty</h2>
        <div className="text-sm flex gap-2">
          <NavLink to="/">
            <button className="border-2  p-2 rounded-md shadow-md font-medium hover:bg-gray-100 transition-colors duration-500 border-red-400">
              Order Something
            </button>
          </NavLink>
          {user && (
            <NavLink to="/orders">
              <button className="border-2  p-2 rounded-md shadow-md font-medium hover:bg-gray-100 transition-colors duration-500 border-red-400">
                Your Orders
              </button>
            </NavLink>
          )}
        </div>
      </div>
    );
  }
  return (
    <section className="min-h-[250px] border-2 relative   capitalize min-w-[380px] p-2 flex flex-col justify-around   ">
      <NavLink
        to={`/restaurant/${cartRestaurantInfo?.id}`}
        className="top-0  absolute text-xl "
      >
        <button>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
      </NavLink>
      <div className="mt-5 mb-3 flex justify-between w-full">
        <div className="flex gap-2">
          <img
            className="w-15 h-10"
            src={IMG_CDN_URL + cartRestaurantInfo?.cloudinaryImageId}
            alt="restaurant image"
          />
          <p className="font-medium">{cartRestaurantInfo?.name}</p>
        </div>
        <p>
          {cartItems?.length}
          {cartItems?.length > 1 ? " items" : " item"}
        </p>
      </div>
      <div className="  flex flex-col justify-center w-full ">
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

      <div className=" text-xl flex items-center justify-center my-1 ">
        {showOrderConfirmationModal &&
          createPortal(
            <Modal
              isOpen={showOrderConfirmationModal}
              setIsOpen={setShowOrderConfirmationModal}
              customClass={"w-[280px] top-[calc(50%-120px)]  py-2 px-1 "}
            >
              <OrderSummaryModal
                restaurantInfo={cartRestaurantInfo}
                cartItems={cartItems}
                itemTotal={itemTotal}
                isPaymenetComplete={isPaymentComplete}
                isProcessingPayment={isProcessingPayment}
                setIsPaymentComplete={setIsPaymentComplete}
                setIsProcessingPayment={setIsProcessingPayment}
              />
            </Modal>,
            document.body
          )}
        <NavLink to={`${user ? "" : "/login"}`}>
          <button
            onClick={() => {
              if (user) {
                document.getElementById("root").classList.add("blur-sm");
                setShowOrderConfirmationModal(true);
              }
            }}
            className="px-4 py-1 my-1 border-2 border-red-300 cursor-pointer hover:text-white hover:bg-red-500  transition-colors ease-in duration-300 rounded-full"
          >
            Place Order
          </button>
        </NavLink>
      </div>
    </section>
  );
}
export default Cart;
