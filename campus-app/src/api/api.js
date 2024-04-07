import axios from 'axios';

const baseURL = 'https://camp-courses.api.kreosoft.space/';

const api = axios.create({
    baseURL: baseURL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            console.log("OK")
            localStorage.removeItem('token');
            console.error(error);
            return;
        }
        return Promise.reject(error);
    }
);

export default api;