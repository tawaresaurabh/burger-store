import {  call, fork, put, takeLatest } from 'redux-saga/effects';
import * as CONSTANTS from './orderAction'

import * as API from './orderService';






export function* fetchOrderList(action) {
    let response;
    try {        
        response = yield call(API.getAllOrders);        
        if (response.status === 200) {
            const orderList = response.data.map(order => ({...order, showOrderDetails:false}))
            yield put(CONSTANTS.setOrderList(orderList));          
        } else {
            throw new Error("Failed to fetch List")
        }
    } catch (err) {
        console.warn(`List fetch error ${err}`);               
    }   
}

export function* fetchOrderDetails(action) {
    let response;
    try {        
        response = yield call(API.getOrderbyId , action.id);        
        if (response.status === 200) {                          
            yield put(CONSTANTS.setOrderDetails(response.data));                 
            yield put(CONSTANTS.setOrderProgressPercent(response.data.status));                 

            
        } else {
            throw new Error("Failed to fetch Details")
        }
    } catch (err) {
        console.warn(`List fetch error ${err}`);               
    }   
}





function* fetchOrderListWatcher() {
    yield takeLatest(CONSTANTS.FETCH_ORDER_LIST, fetchOrderList);
}



function* fetchOrderDetailsWatcher() {
    yield takeLatest(CONSTANTS.FETCH_ORDER_DETAILS, fetchOrderDetails);
}





export default function* OrderSagas() {
    yield fork(fetchOrderListWatcher);
    yield fork(fetchOrderDetailsWatcher);
   


}