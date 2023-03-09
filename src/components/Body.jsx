import ReastaurantCard from "./RestaurantCard";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FETCH_RESTAURANT } from "../constant";
import useOnline from "../utils/useOnline";
const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  useEffect(() => {
    getRestaurantsDetail();
  }, []);
  const getRestaurantsDetail = async () => {
    //change to render url
    const localApi = await fetch(FETCH_RESTAURANT);
    const localJson = await localApi.json();
    setAllRestaurants(localJson?.data?.cards[2]?.data?.data?.cards);
  };
  const isOnline = useOnline();
  if (!isOnline) {
    return <h1>Please Check Your NetworkBo</h1>;
  }
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
        Filter by
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
