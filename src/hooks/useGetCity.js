import { useContext, useEffect, useState } from "react";
import useBrowserLocation from "./useBrowserLocation";
import { LocationContext } from "../context/LocationContext";

function useGetCity() {
  const [cityName, setCityName] = useState();
  const { coordinates, setCoordinates } = useBrowserLocation();
  const { latitude, longitude } = coordinates;
  const { location } = useContext(LocationContext);

  useEffect(() => {
    console.log(
      "useGetCity:- " +
        "lat " +
        latitude +
        "lng " +
        longitude +
        "location " +
        location
    );
    (async () => {
      const res = await fetch(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${
          location?.lat || latitude || 23.1966693
        }%2C${location?.lng || longitude || 79.9247142}&lang=en-US&apiKey=${
          process.env.REACT_APP_GEO_API_KEY
        }`
      );
      const resJson = await res.json();
      setCityName(resJson?.items[0]?.address?.city);
    })();
  }, [latitude, longitude, location]);
  return cityName;
}
export default useGetCity;
