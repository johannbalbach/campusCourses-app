import api from './api';

async function logout() {
    await api.post('logout');
    localStorage.removeItem('token');
    window.location.href = '/';
}

async function registration(body = null) {
    const response = await api.post('registration', body);
    localStorage.setItem('token', response.data.token);
    window.location.href = '/';
}

async function login(body = null) {
    const response = await api.post('login', body);
    localStorage.setItem('token', response.data.token);
    window.location.href = '/';
}

async function getProfile() {
    const response = await api.get('profile');
    return response.data;
}

async function editProfile(body = null) {
    const response = await api.put('profile', body);
    return response.data;
}

const profileApi = {
    logout: logout,
    registration: registration,
    login: login,
    getProfile: getProfile,
    editProfile: editProfile
};

export default profileApi;