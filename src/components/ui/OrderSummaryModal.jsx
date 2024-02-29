import { useDispatch } from "react-redux";
import { addOrderDetails } from "../../features/order/orderSlice";

function OrderSummaryModal({
  cartItems,
  isPaymenetComplete,
  isProcessingPayment,
  setIsPaymentComplete,
  setIsProcessingPayment,
  itemTotal,
  restaurantInfo,
}) {
  const dispatch = useDispatch();
  return (
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
            <p className="py-1 px-1">₹ {itemTotal > 0 ? itemTotal : null} </p>
            <p className="py-1 px-1">₹ {itemTotal > 0 ? 19 : null} </p>
            <p className="py-1 px-1">₹ {itemTotal > 0 ? 20 : null} </p>
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
                dispatch(
                  addOrderDetails({
                    restaurantInfo,
                    cartItems,
                    itemTotal,
                    time: Date.now(),
                  })
                );

                // do it seperately showing tick mark then payment complete <something>order Confirmed</something>
                // dispatch(clearCart());
                // document
                //   .getElementById("root")
                //   .classList.remove("blur-sm");
              }, 5000);
            }}
          >
            Pay
          </button>
        )
      )}
    </div>
  );
}

export default OrderSummaryModal;
