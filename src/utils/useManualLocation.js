const useManualLocation = (searchLocation, setSuggestions) => {
  let locationJson;
  const locations = async () => {
    const location = await fetch(
      `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchLocation}&apiKey=${process.env.REACT_APP_GEO_API_KEY}&in=countryCode%3AIND`
    );
    locationJson = await location.json();
    setSuggestions(locationJson.items);
    return locationJson;
  };
  const getLocation = setTimeout(locations, 3000);
};
export default useManualLocation;
