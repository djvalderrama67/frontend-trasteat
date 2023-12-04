import axios from 'axios';

const API_URL = 'https://back-trasteat-bbb5675bd933.herokuapp.com';

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
