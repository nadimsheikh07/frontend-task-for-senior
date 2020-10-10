import axios from 'axios';

let apiUrl = 'https://bikewise.org:443/api/v2/'

let instance = axios.create({
    baseURL: apiUrl,
});

export const apiConfig = instance