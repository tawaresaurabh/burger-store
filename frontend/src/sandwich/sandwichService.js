import axios from 'axios';
import { getStore } from '../config/redux/_storeConfig';




export const getAllSandwiches = () => {
    setUrl();
    const token = getStore().getState().LoginReducer.token;

    const config = {
        headers: { Authorization: `Bearer ${token}`},
    }

    return axios.get('/sandwich',config);       
}



export const addNewSandwich = (sandwich) => {
    setUrl();
    const token = getStore().getState().LoginReducer.token;

    const config = {
        headers: { Authorization: `Bearer ${token}`},
    }
    return axios.post('/sandwich',sandwich,config);       
}


export const getSandwichById = (id) => {
    setUrl();
    const token = getStore().getState().LoginReducer.token;

    const config = {
        headers: { Authorization: `Bearer ${token}`},
    }
    return axios.get(`/sandwich/${id}`,config);       
}


export const deleteSandwich = (id) => {
    setUrl();
    const token = getStore().getState().LoginReducer.token;

    const config = {
        headers: { Authorization: `Bearer ${token}`},
    }
    return axios.delete(`/sandwich/${id}`,config);       
}



export const updateSandwich = (sandwich) => {
    setUrl();
    const token = getStore().getState().LoginReducer.token;    

    const config = {
        headers: { Authorization: `Bearer ${token}`},
    }
    return axios.put(`/sandwich/${sandwich._id}`,sandwich,config);       
}



const setUrl = () => {    
    axios.defaults.baseURL = `http://localhost:5001/api`;

}