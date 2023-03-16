import { useEffect, useState } from "react";
const useCurrentLocation = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  function getLocation(position) {
    const { latitude, longitude } = position.coords;
    setCoordinates({
      latitude: latitude,
      longitude: longitude,
    });
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLocation);
  }, []);
  // return coordinates;
};
export default useCurrentLocation;
