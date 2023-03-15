const filterRestaurants = (searchText, allResturants) => {
  const filterData = allResturants.filter((restaurant) =>
    restaurant?.data?.name?.toLowerCase()?.includes(searchText.toLowerCase())
  );
  return filterData;
};

export const filterByCuisines = (cuisine, allResturants) => {
  if (cuisine === "All") {
    return allResturants;
  }
  const filterData = allResturants.filter((restaurant) => {
    return restaurant.data.cuisines.includes(cuisine);
  });
  return filterData;
};
export default filterRestaurants;
