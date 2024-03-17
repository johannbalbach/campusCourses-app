import axios from 'axios';

const baseURL = 'https://camp-courses.api.kreosoft.space/courses'

const instance = axios.create({
    baseURL:baseURL
});


async function subscribed() {
    const token = localStorage.getItem('token');
    return await instance.get('my', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        }).then(async response => {
            if (response.status === 200) {
                return response.data;
            }
            if (response.status === 401){
                localStorage.removeItem('token');
            }
        }).catch(error => {
            console.error(error);
        })
    }

async function teaching() {
    const token = localStorage.getItem('token');
    return await instance.get('teaching', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        }).then(async response => {
            if (response.status === 200) {
                return response.data;
            }
            if (response.status === 401){
                localStorage.removeItem('token');
            }
        }).catch(error => {
            console.error(error);
        })
    }


const myCoursesApi = {
    subscribed: subscribed,
    teaching: teaching,
};

export default myCoursesApi;