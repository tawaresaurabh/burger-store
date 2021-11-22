import { call, fork, put, takeLatest } from 'redux-saga/effects';
import * as CONSTANTS from './sandwichAction'

import * as API from './sandwichService';

import sandwich1 from '../assets/sandwich1.jpg'
import sandwich2 from '../assets/sandwich2.jpg'
import sandwich3 from '../assets/sandwich3.jpg'
import sandwich4 from '../assets/sandwich4.jpg'
import sandwich5 from '../assets/sandwich5.jpg'



export function* fetchSandwichList(action) {
  let response;
  try {
    response = yield call(API.getAllSandwiches);    
    if (response.status === 200) {
      const modifiedResponse = response.data.map(sandwich => {
        let sandwhichImage;
        if (sandwich.imageUrl === 'sandwich1') {
          sandwhichImage = sandwich1;
        } else if (sandwich.imageUrl === 'sandwich2') {
          sandwhichImage = sandwich2;
        } else if (sandwich.imageUrl === 'sandwich3') {
          sandwhichImage = sandwich3;
        } else if (sandwich.imageUrl === 'sandwich4') {
          sandwhichImage = sandwich4;
        } else if (sandwich.imageUrl === 'sandwich5') {
          sandwhichImage = sandwich5;
        } else {
          sandwhichImage = sandwich1;
        }
        sandwich = { ...sandwich, sandwhichImage }
        return sandwich;
      })



      yield put(CONSTANTS.setSandwichList(modifiedResponse));
    } else {
      throw new Error("Failed to fetch List")
    }
  } catch (err) {
    console.warn(`List fetch error ${err}`);
  }
}




export function* addNewSandwich(action) {
  
  let response;
  try {

    response = yield call(API.addNewSandwich, action.sandwich);
    if (response.status === 201 || response.status === 200) {
      yield put(CONSTANTS.resetCreateSandwichFormValues());  
      yield put(CONSTANTS.setRedirectToList(true));  
      
    } else {
      throw new Error("Failed to fetch List")
    }
  } catch (err) {
    console.warn(`List fetch error ${err}`);
  }
}



export function* deleteSandwich(action) {
  
  let response;
  try {

    response = yield call(API.deleteSandwich, action.id);
    if (response.status === 201 || response.status === 200) {
      yield put(CONSTANTS.fetchSandwichList());       
    } else {
      throw new Error("Failed to fetch List")
    }
  } catch (err) {
    console.warn(`List fetch error ${err}`);
  }
}


export function* updateSandwich(action) {
  
  let response;
  try {

    response = yield call(API.updateSandwich, action.sandwich);
    if (response.status === 201 || response.status === 200) {
      yield put(CONSTANTS.resetCreateSandwichFormValues());  
      yield put(CONSTANTS.setRedirectToList(true));  
    } else {
      throw new Error("Failed to fetch List")
    }
  } catch (err) {
    console.warn(`List fetch error ${err}`);
  }
}







function* fetchSandwichListWatcher() {
  yield takeLatest(CONSTANTS.FETCH_SANDWICH_LIST, fetchSandwichList);
}



function* addNewSandwichWatcher() {
  yield takeLatest(CONSTANTS.CREATE_SANDWICH, addNewSandwich);
}


function* deleteSandwichWatcher() {
  yield takeLatest(CONSTANTS.DELETE_SANDWICH, deleteSandwich);
}


function* updateSandwichWatcher() {
  yield takeLatest(CONSTANTS.UPDATE_SANDWICH, updateSandwich);
}







export default function* SandwichSagas() {
  yield fork(fetchSandwichListWatcher);
  yield fork(addNewSandwichWatcher);
  yield fork(deleteSandwichWatcher);
  yield fork(updateSandwichWatcher);



}