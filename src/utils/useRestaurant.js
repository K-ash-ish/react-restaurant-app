import { useState, useEffect, useContext } from "react";
import { FETCH_MENU } from "../constant";
import useCurrentLocation from "./useCurrentLocation";
import { LocationContext } from "../context/LocationContext";
function useRestaurant(id) {
  const [restaurant, setRestaurant] = useState(null);
  const { latitude, longitude } = useCurrentLocation();
  const { location } = useContext(LocationContext);
  useEffect(() => {
    const getRestaurantDetail = async () => {
      const data = await fetch(
        `${FETCH_MENU}id=${id}&longitude=${
          location?.lng || longitude
        }&latitude=${location?.lat || latitude}`
      );
      // const data = await fetch(
      //   `${FETCH_MENU}&lat=${latitude}&lng=${longitude}&restaurantId=${id}&submitAction=ENTER`
      // );
      const json = await data.json();
      setRestaurant(json?.data);
      // const restaurantdetails = restaurantPage;
      // setRestaurant(restaurantdetails.data);
    };
    getRestaurantDetail();
  }, [id, latitude, longitude]);
  return restaurant;
}
export default useRestaurant;
