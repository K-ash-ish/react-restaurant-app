import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../index.css";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import { useDispatch, useSelector } from "react-redux";
import { addItems, repeatItem } from "../features/cart/cartSlice";
import { useState } from "react";
import FloatingCart from "./FloatingCart";
import { RestaurantPageShimmer } from "./ui/Shimmer";
import { addRestaurantInfo } from "../features/restaurant/restaurantSlice";
import RestaurantBanner from "./ui/RestaurantBanner";
import FilterMenu from "./ui/FilterMenu";

function RestaurantPage() {
  const { id } = useParams();
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
      restaurantInfo?.id !== cartRestaurantInfo?.id
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
      <RestaurantBanner restaurantInfo={restaurantInfo} />
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
              <FilterMenu
                key={uuidv4()}
                categories={categories}
                handleClick={handleClick}
              />
            );
          })}
        </div>
        {cartItems?.length > 0 ? (
          <>
            <FloatingCart cartError={cartError} />
          </>
        ) : null}
      </div>
    </div>
  ) : (
    <RestaurantPageShimmer />
  );
}
export default RestaurantPage;
