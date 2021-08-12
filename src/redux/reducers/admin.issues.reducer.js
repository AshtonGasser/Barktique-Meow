export const adminIssuesReducer = (state = [], action) => {
  // Switch it up!
  switch (action.type) {
    case 'SET_ORDER_ISSUES':
      return action.payload;
    case 'CLEAR_IMAGE_REDUCER':
      return []
    default:
      return state;
  }
};
