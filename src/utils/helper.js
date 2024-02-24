const filterRestaurants = (searchText, allResturants) => {
  const filterData = allResturants.filter(
    (restaurant) =>
      restaurant?.info?.name
        ?.toLowerCase()
        ?.includes(searchText.toLowerCase()) ||
      restaurant?.info?.cuisines?.includes(searchText.toLowerCase())
  );
  return filterData;
};

export const filterByCuisines = (cuisine, allResturants) => {
  console.log(allResturants);
  if (cuisine === "All") {
    return allResturants;
  }
  const filterData = allResturants.filter((restaurant) => {
    return restaurant?.info?.cuisines?.includes(cuisine);
  });
  return filterData;
};
export default filterRestaurants;
