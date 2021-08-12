export const productOrderReducer = (state = [], action) => {
  // Switch me up!
  switch (action.type) {
    case 'SET_PRODUCT_ORDER':
      return action.payload;
    case 'FETCH_PRODUCT_ORDER':
      return state;
    case 'CLEAR_PRODUCT_ORDER':
      return [];
    default:
      return state;
  }
};
