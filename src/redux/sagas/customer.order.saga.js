import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// POST route to backend
function* postCustomerOrderFormSaga(action) {
  console.log(`Data coming from client =>`, action.payload.newOrder);

  try {
    // Send back our Order to backend => Database
    const postCustomerOrderResponse = yield axios.post(
      `/api/customer/order/v1/form/${action.payload.newOrder.cus_order_number}`,
      action.payload.newOrder
    );
    if (postCustomerOrderResponse.data[0] === -1) {
      console.log(
        `This is our data from posting customer info => `,
        postCustomerOrderResponse.data
      );
      yield put({ type: 'SET_DUPE_ORDER_STATE', payload: true });
    } else {
      console.log(`This order isn't a duplicate.`)
      yield put({type: 'FETCH_ALL_PRODUCT_ORDERS'})
    }
    // ****** DEV NOTE Need a ok response to boot customer to barktiqueandmeow.com
  } catch (error) {
    console.log(`Hey, We had a problem with Customer Order =>`, error);
  }
}

// GET route to backend
function* getCustomerOrderSaga(action) {
  console.log(
    `Hey, looks like you're looking for an Order...
        You got some action for us => `,
    action.payload.data
  );
  // action.payload.data is only used for the URL params to get
  // specific order. -- data model doesn't need to go back with
  // this route.
  try {
    // Grab our Product Order from backend
    // We need the employee id => table user SET id &&
    // table order_table SET cus_order_number to hit
    // this endpoint.
    const getCustomerOrderResponse = yield axios.get(
      `/api/employee/productOrder/v1/${action.payload.id}/${action.payload.cus_order_number}`
    );

    // Set our response to our reducer
    yield put({
      type: 'SET_PRODUCT_ORDER',
      payload: getCustomerOrderResponse.data,
    });
  } catch (error) {
    console.log(`Sorry, we couldn't your Product Order... `, error);
  }
}

// GET route to check for dupe orders
function* getDupeOrderSaga(action) {
  console.log(`What order we're looking for => `, action.payload)

  try {
    // Fire off a axios to the backend, we got stuff to do...
    const getDupeOrderResponse = yield axios.get(`
      /api/customer/checkDupeOrder/${action.payload}
    `)

    console.log(
      `This is our response for our orders => `,
      getDupeOrderResponse.data
    );
    if (getDupeOrderResponse.data[0] === 'dupe') {
      yield put({type: 'SET_DUPE_STATE', payload: true})
    } else if (getDupeOrderResponse.data[0] === 'ok') {
      yield put({type: 'SET_DUPE_STATE', payload: false})
    } 

  } catch(error) {
    console.log(`Sorry, something went wrong ... `, error)
  }
} 

// Watcher Saga
function* customerWatcherSaga() {
  yield takeLatest('POST_CUSTOMER_ORDER_FORM', postCustomerOrderFormSaga);
  yield takeLatest('GET_PRODUCT_ORDER', getCustomerOrderSaga);
  yield takeLatest('GET_DUPE_ORDERS', getDupeOrderSaga)
}

export default customerWatcherSaga;
