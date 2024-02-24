import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../index.css";
import { IMG_CDN_URL, restaurantPage } from "../constant";
import Cart from "./Cart";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import { useDispatch, useSelector } from "react-redux";
import { addItems, repeatItem } from "../features/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FloatingCart from "./FloatingCart";
import { RestaurantPageShimmer } from "./Shimmer";
import { addRestaurantInfo } from "../features/restaurant/restaurantSlice";

function FilteredMenu({ categories, handleClick }) {
  return (
    <div className=" flex flex-col ">
      <h1 className="font-medium text-xl underline decoration-red-500 underline-offset-4 my-4 md:my-0">
        {categories?.title}
      </h1>
      {categories?.itemCards?.map((item) => {
        return (
          <div
            key={uuidv4()}
            className="flex md:justify-between  md:my-4 border-b-2 md:pb-3"
          >
            <div className=" w-2/3 flex flex-col  justify-center">
              <h2 className="font-medium text-lg">{item?.card?.info?.name}</h2>
              <p className="my-2">
                <span className="text-green-500">₹</span>
                {item?.card?.info?.price?.toString()?.slice(0, -2) ||
                  item?.card?.info?.defaultPrice?.toString()?.slice(0, -2)}
              </p>
              {item?.card?.info?.description ? (
                <p className="font-thin text-xs my-2 w-3/5">
                  {item?.card?.info?.description}
                </p>
              ) : null}
            </div>
            <div className=" px-2 flex md:flex-row flex-wrap flex-col justify-around  md:justify-between  items-center w-1/3  h-36">
              {item?.card?.info?.imageId ? (
                <img
                  src={IMG_CDN_URL + item?.card?.info?.imageId}
                  alt={item?.card?.info?.name}
                  className="md:w-32 w-28 rounded-lg y-0 mx-auto"
                />
              ) : (
                <div></div>
              )}
              <button
                onClick={(e) => {
                  const dishName = item?.card?.info?.name;
                  const dishPrice =
                    item?.card?.info?.price?.toString()?.slice(0, -2) ||
                    item?.card?.info?.defaultPrice?.toString()?.slice(0, -2);
                  const quantity = 1;
                  handleClick({ dishName, dishPrice, quantity });
                }}
                className="my-0 mx-auto border-2  h-10  px-4 hover:shadow-md"
              >
                Add
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RestaurantPage() {
  const { id } = useParams();
  const [showCart, setShowCart] = useState(false);
  const [cartError, setCartError] = useState(false);
  let restaurantMenu, restaurantInfo, categories;
  let restaurantDetails = useRestaurantMenu(id);
  if (restaurantDetails) {
    restaurantMenu = restaurantDetails.restaurantMenu;
    restaurantInfo = restaurantDetails.restaurantInfo;
    categories = restaurantMenu?.map((categories) => categories?.title);
  }
  // let restaurant = restaurantPage.data;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartRestaurantInfo = useSelector(
    (state) => state.restaurantInfo.cartRestaurantInfo
  );
  function repeatItems(dishName) {
    dispatch(repeatItem(dishName));
  }

  function handleClick(addItem) {
    if (cartItems?.length === 0) {
      const { id, name, city } = restaurantInfo;
      const info = { id, name, city };
      dispatch(addRestaurantInfo(info));
    }
    if (
      cartItems?.length > 0 &&
      restaurantInfo?.name !== cartRestaurantInfo?.name
    ) {
      setShowCart(true);
      setCartError(true);
      return;
    }
    const isPresent = cartItems.filter((item) => {
      return item.dishName === addItem.dishName;
    });
    if (isPresent.length === 0) {
      dispatch(addItems(addItem));
    } else {
      repeatItems(addItem.dishName);
    }
  }
  return restaurantMenu ? (
    <div className=" capitalize w-full md: flex flex-col  items-center relative ">
      <div className=" my-5 text-white restaurant-banner w-full flex md:justify-around  items-center ">
        <div className=" md:ml-48 hidden md:block">
          <img
            className="w-72"
            src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
            alt="restaurant-img"
          />
        </div>
        <div className="md:ml-24 md:h-52 md:w-72 w-full flex justify-around items-center  md:flex-col md:justify-center ">
          <div className="md:border-b-2  md:border-red-500 md:pb-2 md:px-2">
            <h1 className="text-2xl">{restaurantInfo?.name}</h1>
            <p className="font-thin text-lg">
              {restaurantInfo?.cuisines?.join(", ")}
            </p>
          </div>
          <div className=" mt-4 mb-2  flex flex-row items-center justify-around text-xs">
            <div className="">
              <p className="font-semibold text-lg my-1">
                {restaurantInfo?.avgRating || "--"} ⭐
              </p>
              <p>{restaurantInfo?.totalRatingsString}</p>
            </div>
            <div className="hidden md:block md:text-xl px-2">•</div>
            <div className="hidden md:flex flex-col">
              <p className="font-semibold text-lg my-1">
                {restaurantInfo?.sla?.slaString}
              </p>
              <p>Delivery time</p>
            </div>
            <div className="hidden md:block md:text-xl px-2">•</div>
            <div className="hidden md:flex flex-col">
              <p className="font-semibold text-lg my-1">
                <span className="text-green-500">₹</span>
                {restaurantInfo?.costForTwo.toString().slice(0, -2)}
              </p>
              <p>cost for two</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-5/6 flex md:flex-row md:justify-center md:gap-10 flex-col  ">
        <ul className="md:border-r-2  border-b-2 md:border-b-0  pr-4 md:w-1/5 py-2 h-1/2 my-2 flex flex-row flex-wrap  items-center md:flex-col  md:items-end ">
          {categories?.map((category) => {
            return (
              <li
                className=" underline   py-1 mx-2 category text-sm md:text-right font-medium cursor-pointer my-3 "
                key={uuidv4()}
              >
                {category}
              </li>
            );
          })}
        </ul>
        <div className="menu my-2 px-4  w-full md:w-5/12  md:mx-2  flex flex-col  md:overflow-auto md:h-[700px]">
          {restaurantMenu?.map((categories) => {
            return (
              <FilteredMenu
                key={uuidv4()}
                categories={categories}
                handleClick={handleClick}
              />
            );
          })}
        </div>
        {cartItems?.length > 0 ? (
          <>
            <div
              className={` fixed bottom-24 left-0 right-0  bg-gray-50 w-80 mx-auto  rounded-xl shadow-md border-2  border-red-200   
               transition-all ease-in-out duration-500 ${
                 showCart
                   ? "translate-y-0"
                   : "translate-y-full opacity-0  border-none "
               }`}
            >
              <div className="flex flex-col-reverse p-2  overflow-y-auto h-full">
                <FloatingCart setShowCart={setShowCart} cartError={cartError} />
              </div>
            </div>
            <button
              className=" bg-gray-50  w-40 mx-auto fixed bottom-10 left-0 right-0 border-2 rounded-md px-1 py-2 "
              onClick={() => setShowCart(!showCart)}
            >
              Cart{" "}
              <span className="text-red-500 font-semibold">
                {cartItems.length}
              </span>
            </button>
          </>
        ) : null}
      </div>
    </div>
  ) : (
    <RestaurantPageShimmer />
  );
}
export default RestaurantPage;
