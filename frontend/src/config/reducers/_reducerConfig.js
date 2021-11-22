import { combineReducers } from 'redux';
//import { i18nReducer } from 'react-redux-i18n';

import appReducer from './_appReducer';



const mergedReducers = Object.assign({},
    appReducer

);
const rootReducer = combineReducers(mergedReducers);

const reducerConfig = {
    getMergedReducers: () => (mergedReducers),
    getRootReducer: () => (rootReducer)
};

export default reducerConfig;