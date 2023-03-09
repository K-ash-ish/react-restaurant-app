import { useState, useEffect } from "react";
import { FETCH_MENU } from "../constant";
function useRestaurant(id) {
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    const getRestaurantDetail = async () => {
      const data = await fetch(FETCH_MENU + id);
      const json = await data.json();
      setRestaurant(json?.data);
    };
    getRestaurantDetail();
  }, [id]);
  return restaurant;
}
export default useRestaurant;
