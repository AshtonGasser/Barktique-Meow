import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// GET route to fetch all employee's
function* fetchAllEmployees() {
  console.log(`You're fetching all employee's info minus password`);
  // No data is needed, only the correct way to get in

  try {
    // Send a request to the backend to get our employee info
    const getAllEmployeesResponse = yield axios.get(`/api/admin/getArtists/v1`);

    // Need to set our response to adminEmployeeInfoReducer
    // They know what to do.
    yield put({
      type: 'SET_EMPLOYEE_INFO',
      payload: getAllEmployeesResponse.data,
    });
  } catch (error) {
    console.log(`Sorry, we don't know where the employee's went... `, error);
  }
}

// PUT route to edit employee first name
function* putEmployeeFirstName(action) {
  console.log(`Data we need for this route => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  id:'employee id' This is who's first name will change
   *  employee_first_name: 'Name to be changed here'
   * }
   */
  try {
    // Let the backend know we got a first name change coming in.
    // ${id of employee here!}
    const employeeFirstNameResponse = yield axios.put(
      `/api/admin/editEmployee/firstName/v1/${action.payload.data.id}`,
      action.payload.data
    );

    // Need to do a GET request to get updated info for DOM
    yield put({
      type: 'FETCH_INDIVIDUAL_EMPLOYEE',
      payload: action.payload.data.id,
    });
  } catch (error) {
    console.log(
      `Hmm, doesn't look like we couldn't change their first name... `,
      error
    );
  }
}

// PUT route to edit employee last name
function* putEmployeeLastName(action) {
  console.log(`Data we need for this route => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  id:'employee id' This is who's last name will change
   *  employee_last_name: 'Name to be changed here'
   * }
   */
  try {
    // Let the backend know we got a last name change coming in.
    // ${id of employee here!}
    const employeeLastNameResponse = yield axios.put(
      `/api/admin/editEmployee/lastName/v1/${action.payload.data.id}`,
      action.payload.data
    );

    // Need to do a GET request to get updated info for DOM
    yield put({
      type: 'FETCH_INDIVIDUAL_EMPLOYEE',
      payload: action.payload.data.id,
    });
  } catch (error) {
    console.log(
      `Hmm, doesn't look like we couldn't change their last name... `,
      error
    );
  }
}

// PUT route to edit employee phone number
function* putEmployeePhoneNumber(action) {
  console.log(`Data we need for this route => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  id:'employee id' This is who's phone number will change
   *  employee_phone_number: 'phone number to be changed'
   * }
   */
  try {
    // Let the backend know we got a phone number change coming in.
    // ${id of employee here!}
    const employeePhoneNumberResponse = yield axios.put(
      `/api/admin/editEmployee/phoneNumber/v1/${action.payload.data.id}`,
      action.payload.data
    );

    // Need to do a GET request to get updated info for DOM
    yield put({
      type: 'FETCH_INDIVIDUAL_EMPLOYEE',
      payload: action.payload.data.id,
    });
  } catch (error) {
    console.log(
      `Hmm, doesn't look like we couldn't change their phone number... `,
      error
    );
  }
}

// PUT route to edit employee access level
function* putEmployeeAccessLevel(action) {
  console.log(`Data we need for this route => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  id:'employee id' This is who's access level will change
   *  employee_access_level: 1 for non admin, 2 for admin
   * }
   */
  try {
    // Let the backend know we got a access level change coming in.
    // ${id of employee here!}
    const employeeAccessLevelResponse = yield axios.put(
      `/api/admin/editEmployee/accessLevel/v1/${action.payload.data.id}`,
      action.payload.data
    );

    // Need to do a GET request to get updated info for DOM
    yield put({
      type: 'FETCH_INDIVIDUAL_EMPLOYEE',
      payload: action.payload.data.id,
    });
  } catch (error) {
    console.log(`Hmm, access level denied apparently... `, error);
  }
}

// PUT route to edit employee email
function* putEmployeeEmail(action) {
  console.log(`Data we need for this route => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  id:'employee id' This is who's email will change
   *  username: 'new email IE username'
   * }
   */
  try {
    // Let the backend know we got a email change coming in.
    // ${id of employee here!}
    const employeeEmailResponse = yield axios.put(
      `/api/admin/editEmployee/email/v1/${action.payload.data.id}`,
      action.payload.data
    );

    // Need to do a GET request to get updated info for DOM
    yield put({
      type: 'FETCH_INDIVIDUAL_EMPLOYEE',
      payload: action.payload.data.id,
    });
  } catch (error) {
    console.log(`Hmm, something went wrong with the email... `, error);
  }
}

// DELETE route to deleting employee from database
function* deleteEmployee(action) {
  console.log(`Data we need for this route => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  cus_progress_status: 'Not Started', <= needs to change to not started
   *  cus_order_isStarted: false, <= needs to false, no employee assigned now
   *  user_id_ref: null, <= needs to be set to null now, no employee assigned now
   *  id:'employee id' This is who's getting deleted
   *  employee_full_name: null
   * }
   */
  try {
    // Looks like we have an employee to delete
    // ${id of employee here!}
    const employeeDeleteResponse = yield axios.put(
      `/api/admin/delete/v1/${action.payload.data.id}`,
      action.payload.data
    );

    // Need to do a GET request to get updated info for DOM
    yield put({ type: 'FETCH_EMPLOYEES_FROM_SERVER' });
  } catch (error) {
    console.log(`Can't process that employee deletion... `, error);
  }
}

// GET route for Image Issues and Date Issues from database
function* imageAndDateIssues() {
  console.log(`You're fetching all issues with orders`);

  try {
    const imageAndDateIssuesResponse = yield axios.get(`
    /api/admin/getOrderIssue/v1
    `);

    yield put({
      type: 'SET_ORDER_ISSUES',
      payload: imageAndDateIssuesResponse.data,
    });
  } catch (error) {
    console.log(`Guess we couldn't get to the backend issues... `, error);
  }
}

// GET route for single employee information
function* getMyEmployeesInfo(action) {
  console.log(`You're looking for what employee? `, action.payload);

  try {
    const getEmployeeResponse = yield axios.get(`
  /api/admin/getSingleEmployeeInfo/v1/${action.payload}
  `);

    yield put({
      type: 'SET_SINGLE_EMP_INFO',
      payload: getEmployeeResponse.data,
    });
    yield put({ type: 'FETCH_NEW_EMPLOYEE_INFO' });
    yield put({type: 'SET_SINGLE_EMPLOYEE_STATE', payload: true})
  } catch (error) {
    console.log(`Sorry, they never came back with your employee... `, error);
  }
}

// Watcher SAGA for admin
function* adminWatcherSaga() {
  yield takeLatest('FETCH_EMPLOYEES_FROM_SERVER', fetchAllEmployees);
  yield takeLatest('UPDATE_EMPLOYEE_FIRST_NAME', putEmployeeFirstName);
  yield takeLatest('UPDATE_EMPLOYEE_LAST_NAME', putEmployeeLastName);
  yield takeLatest('UPDATE_EMPLOYEE_PHONE_NUMBER', putEmployeePhoneNumber);
  yield takeLatest('UPDATE_EMPLOYEE_ACCESS_LEVEL', putEmployeeAccessLevel);
  yield takeLatest('UPDATE_EMPLOYEE_EMAIL', putEmployeeEmail);
  yield takeLatest('DELETE_EMPLOYEE_FROM_DATABASE', deleteEmployee);
  yield takeLatest('FETCH_ISSUES_WITH_ORDERS', imageAndDateIssues);
  yield takeLatest('FETCH_INDIVIDUAL_EMPLOYEE', getMyEmployeesInfo);
}

export default adminWatcherSaga;
