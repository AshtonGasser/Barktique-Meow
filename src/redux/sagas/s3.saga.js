import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// POST route to backend
function* checkThisImageForUsS3(action) {
  console.log(`Data coming from client =>`, action.payload);

  try {
    // Send our image back
    const s3ImageResponse = yield axios.post(`/api/s3/images`, action.payload);

    // set image to reducer and send back to client from there
  } catch (error) {
    console.log(`Yah that didn't work... try again `, error);
  }
}

// Watcher Saga
function* s3WatcherSaga() {
  yield takeLatest('SEND_IMAGE_S3', checkThisImageForUsS3);
}

export default s3WatcherSaga;
