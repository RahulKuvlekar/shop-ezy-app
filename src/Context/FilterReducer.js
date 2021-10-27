const FilterReducer = (prevState, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...prevState, sortBy: action.payload };
    case "FILTER_BY_STOCK":
      return { ...prevState, byStock: !prevState.byStock };
    case "FILTER_BY_DELIVERY":
      return { ...prevState, byFastDelivery: !prevState.byFastDelivery };
    case "FILTER_BY_RATING":
      return { ...prevState, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...prevState, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return {
        sortBy: false,
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
      };

    default:
      return prevState;
  }
};

export default FilterReducer;
