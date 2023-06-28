import { useContext, useEffect, useState } from "react";
import useCurrentLocation from "./useCurrentLocation";
import { LocationContext } from "../context/LocationContext";

function useGetCity() {
  const [cityName, setCityName] = useState();
  const { coordinates, setCoordinates } = useCurrentLocation();
  const { latitude, longitude } = coordinates;
  const { location } = useContext(LocationContext);

  const getCity = async (address) => {
    let cityJson;
    const city = await fetch(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${
        location?.lat || latitude || 23.1966693
      }%2C${location?.lng || longitude || 79.9247142}&lang=en-US&apiKey=${
        process.env.REACT_APP_GEO_API_KEY
      }`
    );
    cityJson = await city.json();
    setCityName(cityJson?.items[0]?.address?.city);
  };
  useEffect(() => {
    getCity();
  }, [latitude, longitude, location]);
  return cityName;
}
export default useGetCity;
