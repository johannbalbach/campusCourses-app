import axios from 'axios';

const baseURL = 'https://camp-courses.api.kreosoft.space/';

const instance = axios.create({
    baseURL:baseURL
});

async function logout() {
    const token = localStorage.getItem('token');
    await instance.post('logout', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        }).then(async response => {
            if (response.status === 200) 
            {
                localStorage.removeItem('token');
                window.location.href = '/';
            }
        }).catch(error => {
            if (error.response.status === 401){
                localStorage.removeItem('token');
                window.location.href = '/';
            }
            console.error(error.response.data.error);
        })
    }
async function registration(body = null) {
    await instance.post('registration', body, {
        headers: {
            'Content-Type': 'application/json'
        }
        }).then(async response => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/';
            }
        }).catch(error => {
            console.error(error);
        })
    }
async function login(body = null) {
    await instance.post('login', body, {
        headers: {
            'Content-Type': 'application/json'
        }
        }).then(async response => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                window.location.href = '/';
            }
        })
    }
async function getProfile() {
    const token = localStorage.getItem('token');
    return await instance.get('profile', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        }).then(async response => {
            if (response.status === 200) {
                return response.data;
            }
        }).catch(error => {
            if (error.response.status === 401){
                localStorage.removeItem('token');
            }
            console.error(error);
        })
    }

async function editProfile(body = null) {
    console.log(body);
    const token = localStorage.getItem('token');
    return await instance.put('profile', body, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        }).then(async response => {
            if (response.status === 200) {
                return response.data;
            }
        }).catch(error => {
            if (error.response.status === 401){
                localStorage.removeItem('token');
            }
            console.error(error);
        })
    }


const profileApi = {
    logout: logout,
    registration: registration,
    login: login,
    getProfile: getProfile,
    editProfile: editProfile
};

export default profileApi;