import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import customerWatcherSaga from './customer.order.saga';
import employeeWatcherSaga from './employee.saga';
import adminWatcherSaga from './admin.saga'
import s3WatcherSaga from './s3.saga'
import mailerWatcherSaga from './mailer.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(), // Saga to watch registering user
    userSaga(), // Saga to watch user
    customerWatcherSaga(), // Saga to watch customer order form
    employeeWatcherSaga(), // Saga to watch employee needs
    adminWatcherSaga(), // Saga to watch admin needs
    s3WatcherSaga(), // S3 to watch for images coming in
    mailerWatcherSaga(), //Saga to watch for when automated emails need to be sent
  ]);
}
