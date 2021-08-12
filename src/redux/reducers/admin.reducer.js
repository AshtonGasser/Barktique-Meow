export const adminEmployeeInfoReducer = (state = [], action) => {
  // Switch it up!
  switch (action.type) {
    case 'SET_EMPLOYEE_INFO':
      return action.payload;
    case 'FETCH_EMPLOYEE_INFO':
      return state;
    default:
      return state;
  }
};

export const adminSingleEmpInfo = (state = [], action) => {
  // Switch it up!
  switch (action.type) {
    case 'SET_SINGLE_EMP_INFO':
      return action.payload;
    case 'FETCH_NEW_EMPLOYEE_INFO':
      return state;
    case 'CLEAR_SINGLE_EMPLOYEE_INFO':
      return [];
    default:
      return state;
  }
};
