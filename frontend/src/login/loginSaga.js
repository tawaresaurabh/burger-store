import { call, fork, put, takeLatest } from 'redux-saga/effects';
import * as CONSTANTS from './loginAction'

import * as API from './loginService';








export function* login(action) {

    let response;
    try {

        response = yield call(API.login, action.username, action.password);
        if (response.status === 201 || response.status === 200) {
            
            yield put(CONSTANTS.setUser(response.data.user));
            yield put(CONSTANTS.setToken(response.data.token));
            yield put(CONSTANTS.setLoginError(''));
            yield put(CONSTANTS.setIsLoggedIn(true));
            localStorage.setItem('isLoggedIn','true')
            localStorage.setItem('user',JSON.stringify(response.data.user))
            localStorage.setItem('token',JSON.stringify(response.data.token))            
        } else {
            throw new Error("Failed to fetch List")
        }
    } catch (err) {
        console.error(`Error on login ${err}`);
        yield put(CONSTANTS.setLoginError('Invalid Username and password'));
    }
}










function* loginWatcher() {
    yield takeLatest(CONSTANTS.LOGIN, login);
}








export default function* LoginSagas() {
    yield fork(loginWatcher);




}