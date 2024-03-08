import { useContext, useEffect, useMemo, useState } from "react";
import useBrowserLocation from "./useBrowserLocation";
import { LocationContext } from "../context/LocationContext";

function useGetCityName() {
  const [cityName, setCityName] = useState();
  const { coordinates } = useBrowserLocation();
  const { latitude, longitude } = coordinates;
  const { location } = useContext(LocationContext);

  useEffect(() => {
    (async () => {
      if ((location?.lat || latitude) && (location?.lng || longitude)) {
        const res = await fetch(
          `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${
            location?.lat || latitude
          }%2C${location?.lng || longitude}&lang=en-US&apiKey=${
            process.env.REACT_APP_GEO_API_KEY
          }`
        );
        const resJson = await res?.json();
        setCityName(resJson?.items[0]?.address?.city);
      }
    })();
  }, [latitude, longitude, location]);
  return cityName;
}
export default useGetCityName;
