import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducerConfig from './../reducers/_reducerConfig';
import sagaConfig from '../sagas/_sagaConfig';





let store = null;
export const getStore = () => {
  if (!store) {

    const preloadedStore =  {};
    const sagaMiddleware = createSagaMiddleware();

    let middleware = undefined;
    if (process.env.NODE_ENV === 'development') {
      // Enables more logging and Redux DevTools in browser
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      const loggerMiddleware = createLogger();
      middleware = composeEnhancers(applyMiddleware(thunkMiddleware,
        loggerMiddleware,
        sagaMiddleware));
    } else {
      middleware = applyMiddleware(thunkMiddleware,
        sagaMiddleware);
    }

    store = createStore(
      reducerConfig.getRootReducer(),
      preloadedStore,
      middleware
    );
    sagaMiddleware.run(sagaConfig.getRootSaga());
    
  }
  return store;
};

const storeConfig = {
  getStore: getStore
};

export default storeConfig;