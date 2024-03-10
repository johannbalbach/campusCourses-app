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
        }).then(response => {
            if (response.status === 200) 
            {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }).catch(error => {
            console.error(error.response.data.error);
        })
    }

async function registration(body = null) {
    const token = localStorage.getItem('token');
    await instance.post('registration', {
        body: JSON.stringify(body) }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        }).then(async response => {
            if (response.status === 200) {
                const responseData = response.json();
                localStorage.setItem('token', responseData.token);
                window.location.href = '/';
            }
        }).catch(error => {
            console.error(error.response.data.error);
        })
    }

const profileApi = {
    logout: logout,
    registration: registration
};

export default profileApi;