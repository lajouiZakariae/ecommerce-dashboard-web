import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/admin',
    headers: {
        Accept: 'application/json',
    },
    withXSRFToken: true,
    withCredentials: true,
});

export default apiClient;
