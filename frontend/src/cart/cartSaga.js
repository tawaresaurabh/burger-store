import { call, fork, put, takeLatest } from 'redux-saga/effects';
import * as CONSTANTS from './cartAction'
import { setGeneratedOrderId } from './cartAction'
import { setOrderDetails, setOrderProgressPercent } from './../order/orderAction'
import * as API from './cartService';





export function* confirmOrder(action) {
    let response;
    try {

        response = yield call(API.confirmOrder, action.order);
        if (response.status === 201 || response.status === 200) {                        
            yield put(setOrderDetails(response.data));
            yield put(setOrderProgressPercent(response.data.status));
            yield put(setGeneratedOrderId(response.data._id));
        } else {
            throw new Error("Failed to fetch List")
        }
    } catch (err) {
        console.warn(`List fetch error ${err}`);
    }
}



function* confirmOrderWatcher() {
    yield takeLatest(CONSTANTS.CONFIRM_ORDER, confirmOrder);
}




export default function* CartSagas() {
    yield fork(confirmOrderWatcher);



}