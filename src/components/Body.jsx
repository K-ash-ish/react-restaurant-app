import ReastaurantCard from "./RestaurantCard";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  useEffect(() => {
    getRestaurantsDetail();
  }, []);
  const getRestaurantsDetail = async () => {
    const localApi = await fetch(
      "https://eat-treat-server.onrender.com/api/restaurants"
    );
    // const localApi = await fetch("http://localhost:4000/api/restaurants");
    const localJson = await localApi.json();
    setAllRestaurants(localJson?.data?.cards[2]?.data?.data?.cards);
    // setAllRestaurants(restaurantList);
  };
  if (!allRestaurants) {
    return (
      <h1>
        No restaurant servicable Check in some other time Or change your
        location
      </h1>
    );
  }
  return allRestaurants.length > 0 ? (
    <div className="wrapper sm:my-0 sm:mx-auto w-full  flex flex-col  h-1/2">
      <div className="flex md:mb-4 my-4 md:my-0 border-b-2 justify-around items-center h-16">
        <h1 className="md:text-2xl text-lg w-1/2 text-center">Order From</h1>
        <div className="search-box  w-1/2 h-full flex flex-row justify-center items-center">
          <input
            type="text"
            className="border-2 w-4/5 md:w-1/3 md:h-2/3 h-8 px-2 text-sm focus:outline-gray-300"
          />
          <button className="border-2 border-red-300 hover:bg-red-500 hover:text-white hover:border-none transition-colors ease-in duration-300  mx-6 md:w-20 w-24 md:h-2/3 h-8 ">
            Search
          </button>
        </div>
      </div>
      <div className="my-0 mx-auto  flex flex-col  sm:flex-row sm:w-5/6 w-full  sm:flex-wrap items-center justify-center  ">
        {allRestaurants.map((restaurant) => {
          return (
            <Link key={uuidv4()} to={"/restaurant/" + restaurant.data.id}>
              <ReastaurantCard {...restaurant.data} />;
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <p className="text-3xl">Loading</p>
  );
};
export default Body;
