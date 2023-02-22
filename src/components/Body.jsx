import ReastaurantCard from "./RestaurantCard";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  useEffect(() => {
    getRestaurantDetails();
  }, []);
  const getRestaurantDetails = async () => {
    console.log("api call");
    const details = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.1768293&lng=79.97640129999999&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await details.json();
    console.log(json?.data?.cards[2]?.data?.data?.cards);
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  };
  return allRestaurants.length > 0 ? (
    <div className="wrapper sm:my-0 sm:mx-auto w-full  border-2  flex flex-col  h-1/2">
      <h1>Order From</h1>
      <div className="restaurant-container my-0 mx-auto  flex flex-col  sm:flex-row sm:w-5/6 w-full  sm:flex-wrap items-center justify-center ">
        {allRestaurants.map((restaurant) => {
          return <ReastaurantCard key={uuidv4()} {...restaurant.data} />;
        })}
      </div>
    </div>
  ) : (
    <p className="text-3xl">Loading</p>
  );
};
export default Body;
