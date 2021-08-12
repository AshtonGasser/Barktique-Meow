export const s3ImageHolderReducer = (state = [], action) => {
  // Switch me up!
  switch (action.type) {
    case 'SET_S3_IMAGE_FROM_BUCKET':
      return action.payload;
    case 'RESET_S3_REDUCER':
      return [];
    default:
      return state;
  }
};
