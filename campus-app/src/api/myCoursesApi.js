import api from './api';

async function subscribed() {
    const response = await api.get('courses/my');
    return response.data;
}

async function teaching() {
    const response = await api.get('courses/teaching');
    return response.data;
}

const myCoursesApi = {
    subscribed: subscribed,
    teaching: teaching,
};

export default myCoursesApi;
