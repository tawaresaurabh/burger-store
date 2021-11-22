import appSagas from './_appSagas';

import { fork } from 'redux-saga/effects';

let sagas = [...appSagas];

function* rootSaga() {
  for (let saga of sagas) { yield fork(saga); }
}

const sagaConfig = {
  getRootSaga: () => (rootSaga)
};

export default sagaConfig;