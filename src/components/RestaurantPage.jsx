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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import FloatingPanel from "./ui/FloatingPanel";

function Categories({ customClass, scrollToSection, category }) {
  return (
    <li
      className={customClass}
      key={uuidv4()}
      onClick={() => scrollToSection(category)}
    >
      {category}
    </li>
  );
}

function RestaurantPage() {
  const { id } = useParams();
  const [cartError, setCartError] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartRestaurantInfo = useSelector(
    (state) => state.restaurantInfo.cartRestaurantInfo
  );

  let restaurantMenu, restaurantInfo, categories;
  let restaurantDetails = useRestaurantMenu(id);
  if (restaurantDetails) {
    restaurantMenu = restaurantDetails.restaurantMenu;
    restaurantInfo = restaurantDetails.restaurantInfo;
    categories = restaurantMenu?.map((categories) => categories?.title);
  }

  function handleClick(addItem) {
    if (cartItems?.length === 0) {
      const { id, name, city, cloudinaryImageId, locality } = restaurantInfo;
      const info = { id, name, city, cloudinaryImageId, locality };
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
      dispatch(repeatItem(addItem.dishName));
    }
  }
  function scrollToSection(category) {
    const elementToScroll = document.getElementById(category);
    elementToScroll.scrollIntoView({ behavior: "smooth" });
  }
  return restaurantMenu ? (
    <div className=" capitalize w-full md: flex flex-col  items-center relative ">
      <RestaurantBanner restaurantInfo={restaurantInfo} />
      <div className=" w-5/6 flex md:flex-row md:justify-center md:gap-10 flex-col  ">
        <ul className="md:border-r-2   md:border-b-0   md:w-1/5 md:px-2   md:my-2 md:flex md:flex-col  md:items-end  hidden">
          {categories?.map((category, index) => {
            return (
              <Categories
                key={index}
                category={category}
                scrollToSection={scrollToSection}
                customClass="underline   py-1  category text-sm md:text-right font-medium cursor-pointer my-3 hover:bg-gray-100 md:px-2   rounded-md w-full"
              />
            );
          })}
        </ul>
        <div className="menu my-2  px-4  w-full md:w-[520px]  md:mx-2  flex flex-col  md:overflow-auto md:h-[700px]">
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
        {
          <FloatingPanel
            showPanel={showMenu}
            setShowPanel={setShowMenu}
            customClass=" fixed right-0 left-0 w-1/2 "
          >
            <ul className="flex-col flex pl-4">
              {categories?.map((category, index) => {
                return (
                  <Categories
                    key={index}
                    scrollToSection={scrollToSection}
                    customClass="  text-xs font-medium cursor-pointer my-2  rounded-md list-disc  "
                    category={category}
                  />
                );
              })}
            </ul>
          </FloatingPanel>
        }
        <button
          className="border-2 bg-blue-400 w-auto fixed right-2  bottom-4 flex items-center gap-2 p-5 rounded-full"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {cartItems?.length > 0 ? (
          <>
            <FloatingPanel
              showPanel={showCart}
              setShowPanel={setShowCart}
              customClass="fixed bottom-24 left-0 right-0   w-80 max-h-[200px] overflow-y-scroll  "
            >
              <FloatingCart cartError={cartError} />
            </FloatingPanel>

            <button
              className=" bg-gray-50  w-40 mx-auto fixed bottom-10 left-0 right-0 border-2 border-red-300 rounded-md px-1 py-2 "
              onClick={() => {
                setShowCart(!showCart);
              }}
            >
              Cart
              <span className="text-red-500 font-semibold ml-2">
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
