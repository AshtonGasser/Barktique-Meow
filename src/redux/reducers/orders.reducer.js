
const orders = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_PRODUCT_ORDERS':
        return action.payload;
      case 'CLEAR_ALL_ORDERS':
        return []
      default:
        return state;
    }
}

export default orders;
