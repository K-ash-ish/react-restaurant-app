import { useEffect, useState } from "react";

const useBrowserLocation = () => {
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
  return { coordinates, setCoordinates };
};

export default useBrowserLocation;
