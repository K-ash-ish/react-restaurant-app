import { useState, useEffect } from "react";
import { FETCH_MENU } from "../constant";
// import useCurrentLocation from "./useCurrentLocation";
function useRestaurant(id) {
  const [restaurant, setRestaurant] = useState(null);
  // const { latitude, longitude } = useCurrentLocation();
  useEffect(() => {
    const getRestaurantDetail = async () => {
      // const data = await fetch(
      //   `${FETCH_MENU}id=${id}&longitude=${79.97640129999999}&latitude=${23.1768293}`
      // );
      const data = await fetch(
        `${FETCH_MENU}&lat=${23.1967235}&lng=${79.9247217}&restaurantId=${id}&submitAction=ENTER`
      );
      const json = await data.json();
      setRestaurant(json?.data);
      // const restaurantdetails = restaurantPage;
      // setRestaurant(restaurantdetails.data);
    };
    getRestaurantDetail();
  }, [id]);
  return restaurant;
}
export default useRestaurant;
