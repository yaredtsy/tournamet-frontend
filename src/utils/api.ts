import axios from 'axios';
import jwt from 'jwt-decode';

const apiUrl: string = ''

const api = axios.create({
    baseURL: `${apiUrl}`,
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

export default api