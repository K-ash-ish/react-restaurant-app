import { useEffect, useState } from "react";

const useManualLocation = (searchLocation) => {
  const [suggestions, setSuggestions] = useState();
  const getLocations = async (signal) => {
    try {
      const location = await fetch(
        `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchLocation}&apiKey=${process.env.REACT_APP_GEO_API_KEY}&in=countryCode%3AIND`,
        { signal }
      );
      let locationJson = await location.json();
      setSuggestions(locationJson.items);
    } catch (error) {
      if (error) return error;
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    searchLocation.length > 3 && setTimeout(() => getLocations(signal), 2000);
    return () => {
      controller.abort();
    };
  }, [searchLocation]);
  return suggestions;
};
export default useManualLocation;
