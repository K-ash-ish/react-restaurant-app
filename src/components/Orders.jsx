import { createPortal } from "react-dom";
import { IMG_CDN_URL } from "../constant";
import Modal from "./ui/Modal";
import OrderSummaryModal from "./ui/OrderSummaryModal";
import { useState } from "react";
import { useSelector } from "react-redux";

function Orders() {
  const orderDetails = useSelector((state) => state?.orderInfo?.orders);
  return (
    <div className="md:w-2/3  my-2 w-full h-full flex-grow">
      <h2 className="text-2xl font-medium md:ml-0  ml-2 my-2">Orders: </h2>
      {orderDetails?.map((order, index) => {
        const [showOrderDetails, setShowOrderDetails] = useState(false);

        return (
          <div
            className="my-4 shadow-md rounded-md flex justify-between items-center border-2  border-gray-100  px-2 w-[90%] mx-auto  md:w-[90%] md:min-h-[120px] min-h-[100px]  "
            key={index}
          >
            <div className=" flex items-center   gap-2 px-2 ">
              <div className=" w-20 h-auto    flex items-center">
                <img
                  className="rounded-xl "
                  src={IMG_CDN_URL + order?.restaurantInfo?.cloudinaryImageId}
                  alt="restaurant-image"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <p className="font-medium ">{order?.restaurantInfo?.name}</p>
                <time dateTime={"2008-02-14T20:00"} className="text-xs">
                  12/12/2024, 6:30 PM
                </time>
              </div>
            </div>
            {showOrderDetails &&
              createPortal(
                <Modal
                  isOpen={showOrderDetails}
                  setIsOpen={setShowOrderDetails}
                  customClass={"w-[280px] top-[calc(50%-120px)]  py-2 px-1 "}
                >
                  <OrderSummaryModal
                    cartItems={order?.cartItems}
                    itemTotal={order?.itemTotal}
                    isPaymenetComplete={true}
                    isProcessingPayment={false}
                  />
                </Modal>,
                document.body
              )}
            <button
              className="font-medium text-orange-500 "
              onClick={() => {
                setShowOrderDetails(true);
                document.getElementById("root").classList.add("blur-sm");
              }}
            >
              Order details
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
