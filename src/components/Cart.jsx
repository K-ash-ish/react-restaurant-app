import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
function Item() {
  return (
    <div className="flex justify-between items- mb-2 px-2">
      <p className="px-2 capitalize">itemname</p>
      <div className="px-2 mr-3 w-24 flex add-remove border-2 items-center justify-around">
        <button className="text-red-500 text-3xl">-</button>
        <p className="text-green-500 font-bold">1</p>
        <button className="text-green-500 text-2xl">+</button>
      </div>
    </div>
  );
}
function Cart() {
  return (
    <section className=" my-12 w-11/12 cart capitalize min-h-96 md:w-1/2">
      <div className=" pb-3 flex   ">
        <button className="pr-4 pl-1 text-2xl">
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <div className="">
          <p className="font-medium">Restaurant Name</p>
          <div className="flex font-light justify-evenly">
            {/* check for item quantity for item / items */}
            <p>{}items</p>|<p>ETA</p>
          </div>
        </div>
      </div>
      <div className=" min-h-20  flex flex-col  ">
        <Item />
      </div>
      <div className="bill-details flex flex-col  my-4 mx-2 border-t-2">
        <h1 className="font-bold px-1 py-1">Bill Details</h1>
        <div className=" flex justify-between px-2 font-thin">
          <div className="">
            <p className="py-1 px-1">Item Total</p>
            <p className="py-1 px-1">Delivery fee</p>
            <p className="py-1 px-1">Tax</p>
          </div>
          <div className="  text-center w-16 font-thin">
            <p className="py-1 px-1">₹</p>
            <p className="py-1 px-1">₹</p>
            <p className="py-1 px-1">₹</p>
          </div>
        </div>
        <div className="flex justify-between items-center my-4 border-green-500 px-2 border-t-2 border-b-2">
          <p className="font-medium py-1 px-1">To Pay</p>
          <p className="py-1 px-1 text-center  w-16">₹</p>
        </div>
      </div>
      <div className="order text-xl flex items-center justify-center h-24">
        <button className="border-2 border-red-300 w-20 h-10  cursor-pointer hover:text-white hover:bg-red-500 hover:border-none transition-colors ease-in duration-300">
          Order
        </button>
      </div>
    </section>
  );
}
export default Cart;
