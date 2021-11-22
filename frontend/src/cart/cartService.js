import axios from 'axios';

import { getStore } from '../config/redux/_storeConfig';


export const confirmOrder = (order) => {
    setUrl();
    const token = getStore().getState().LoginReducer.token;

    const config = {
        headers: { Authorization: `Bearer ${token}`},
    }
    return axios.post('/order', order,config);
}



const setUrl = () => {
    axios.defaults.baseURL = `http://localhost:5001/api`;

}