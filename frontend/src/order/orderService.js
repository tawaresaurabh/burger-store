import axios from 'axios';

import { getStore } from '../config/redux/_storeConfig';


export const getAllOrders = () => {
    setUrl();
    const token = getStore().getState().LoginReducer.token;

    const config = {
        headers: { Authorization: `Bearer ${token}`},
    }
    return axios.get('/order',config);       
}


export const getOrderbyId = (id) => {
    setUrl();
    const token = getStore().getState().LoginReducer.token;

    const config = {
        headers: { Authorization: `Bearer ${token}`},
    }
    return axios.get(`/order/${id}`,config);       
}


const setUrl = () => {    
    axios.defaults.baseURL = `http://localhost:5001/api`;

}