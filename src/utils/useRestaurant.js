import { useState, useEffect } from "react";
import { FETCH_MENU } from "../constant";
import useCurrentLocation from "./useCurrentLocation";
function useRestaurant(id) {
  const [restaurant, setRestaurant] = useState(null);
  const { latitude, longitude } = useCurrentLocation();
  useEffect(() => {
    const getRestaurantDetail = async () => {
      const data = await fetch(
        `${FETCH_MENU}id=${id}&longitude=${longitude}&latitude=${latitude}`
      );
      const json = await data.json();
      setRestaurant(json?.data);
      // const restaurantdetails = restaurantPage;
      // setRestaurant(restaurantdetails.data);
    };
    getRestaurantDetail();
  }, [id, longitude, latitude]);
  console.log(restaurant);
  return restaurant;
}
export default useRestaurant;
