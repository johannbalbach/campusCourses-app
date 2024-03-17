import axios from 'axios';

const baseURL = 'https://camp-courses.api.kreosoft.space/'

const instance = axios.create({
    baseURL : baseURL
});

async function getGroups() {
    const token = localStorage.getItem('token');
    return await instance.get('groups', {
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
            if (error.response.status === 401){
                localStorage.removeItem('token');
                window.location.href = '/';
            }
            console.error(error);
        })
    }


const groupsApi = {
    getGroups: getGroups
};

export default groupsApi;