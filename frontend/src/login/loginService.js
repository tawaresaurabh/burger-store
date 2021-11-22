import axios from 'axios';




export const login = (username,password) => {

    const credentials = btoa(`${username}:${password}`)    
    setUrl();
    const config = {
        headers: { Authorization: `Basic ${credentials}`},
    }
    return axios.get('/auth',config);
}




const setUrl = () => {
    axios.defaults.baseURL = `http://localhost:5001/`;

}