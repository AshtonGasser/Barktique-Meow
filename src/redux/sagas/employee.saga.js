import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// GET route fetch all orders
function* fetchAllProductOrders() {
  console.log('In fetchAllProductOrders');
  // No data needs to go back to this route

  try {
    // Hit the backend with a get route to grab all orders
    // yield put({type: 'SET_ORDER_STATE', payload: false})
    const getAllOrdersResponse = yield axios.get(
      '/api/employee/getAllOrders/v1'
    );

    console.log(
      `This is the response we get from the server for all orders => `,
      getAllOrdersResponse
    );
    // Set our reducer with all orders from database
    yield put({
      type: 'SET_ALL_PRODUCT_ORDERS',
      payload: getAllOrdersResponse.data,
    });
    yield put({ type: 'SET_ORDER_STATE', payload: true });
  } catch (error) {
    console.log('ERROR in fetchAllProductOrders => ', error);
  }
}

// PUT route to start an ORDER
function* putProductOrderIsStarted(action) {
  console.log(`Data for putProductOrderIsStarted => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  cus_order_isStarted: true,
   *  cus_progress_status: 'In Progress',
   *  cus_order_number: 'Order Number Here',
   *  id: 'employee id here'
   * }
   */
  try {
    // Inform the backend that employee is ready to start order

    const startOrderButtonResponse = yield axios.put(
      `/api/employee/startOrder/v1/${action.payload.data.id}`,
      action.payload.data
    );
    yield put({
      type: 'GET_PRODUCT_ORDER',
      payload: action.payload.data,
    });
    // Need to do a GET request to get updated info for DOM
    // stating that this order is started
    yield put({ type: 'FETCH_ALL_PRODUCT_ORDERS' });
  } catch (error) {
    console.log(`Sorry, this order couldn't be started... `, error);
  }
}

// PUT route for Image Error Button on Order
function* putImageErrorButton(action) {
  console.log(`Data for putImageErrorButton => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  cus_error_image: true,
   *  cus_order_number: 'Order Number Here',
   *  id: 'employee id here'
   * }
   */
  try {
    // Let the backend know we got a problem with IMAGE
    // ${user.id here}/${cus_order_number here}
    const errorWithImageButtonResponse = yield axios.put(
      `/api/employee/productOrder/errorButton/v1/${action.payload.data.id}/${action.payload.data.cus_order_number}`,
      action.payload.data
    );
    // Need to do a GET request to get updated info for DOM
    // stating that this order had an Error
    yield put({ type: 'FETCH_ALL_PRODUCT_ORDERS' });
    yield put({ type: 'GET_PRODUCT_ORDER', payload: action.payload.data });
    // ***** DEVELOPER NOTE, need to let error reducer know we got a problem here!
  } catch (error) {
    console.log(`Hey, we couldn't process that error button... `, error);
  }
}

// PUT route for completing product order
function* putOrderCompleteButton(action) {
  console.log(`Data we need for this route => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  cus_progress_status: 'Complete',
   *  cus_order_number: 'Order Number Here',
   *  id: 'employee id here'
   * }
   */
  try {
    // Inform the backend we have a completed order for them.
    // ${user.id here}/${cus_order_number here}
    const productOrderCompleteResponse = yield axios.put(
      `/api/employee/productOrder/orderCompleteButton/v1/${action.payload.data.id}/${action.payload.data.cus_order_number}`,
      action.payload.data
    );
    // Need to do a GET request to get updated info for DOM
    // stating that this order is complete
    yield put({ type: 'FETCH_ALL_PRODUCT_ORDERS' });
  } catch (error) {
    console.log(`Yo Yo Yo, we can't complete that order... `, error);
  }
}

// PUT route for un-assigning orders
function* putUnassignProductOrder(action) {
  console.log(`Data we need for this route => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  cus_progress_status: 'Not Started',
   *  cus_order_isStarted: false,
   *  cus_order_number: 'Order Number Here',
   *  user_id_ref: null
   *  id: 'employee id here',
   *  employee_full_name: null
   * }
   */
  try {
    // Inform the backend we have a product order to un-assign.
    // ${user.id here}/${cus_order_number here}
    const productOrderUnassignButton = yield axios.put(
      `/api/employee/productOrder/unassignOrderButton/v1/${action.payload.data.id}/${action.payload.data.cus_order_number}`,
      action.payload.data
    );
    // Need to do a GET request to get updated info for DOM
    // stating that this order is complete
    yield put({ type: 'FETCH_ALL_PRODUCT_ORDERS' });
  } catch (error) {
    console.log(``);
  }
}

// Watcher SAGA for employee
function* employeeWatcherSaga() {
  yield takeLatest('FETCH_ALL_PRODUCT_ORDERS', fetchAllProductOrders);
  yield takeLatest('START_ORDER_BUTTON', putProductOrderIsStarted);
  yield takeLatest('IMAGE_ERROR_BUTTON', putImageErrorButton);
  yield takeLatest('PRODUCT_ORDER_COMPLETE_BUTTON', putOrderCompleteButton);
  yield takeLatest('PRODUCT_UNASSIGN_ORDER_BUTTON', putUnassignProductOrder);
}

export default employeeWatcherSaga;
