import axios, { AxiosError } from 'axios';

type apiErrors = { message: string; errors: { [key: string]: string } };

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: AxiosError<apiErrors>;
    }
}

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api/admin',
    headers: {
        Accept: 'application/json',
    },
    withXSRFToken: true,
    withCredentials: true,
});

export default apiClient;
