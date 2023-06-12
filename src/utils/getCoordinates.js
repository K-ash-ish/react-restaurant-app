const getCoordinates = async (address) => {
  let coordinateJson;
  const coordinate = await fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${process.env.REACT_APP_GEO_API_KEY}`
  );
  coordinateJson = await coordinate.json();
  return coordinateJson?.items[0]?.position;
};
export default getCoordinates;
