import api from './api';

async function logout() {
    await api.post('logout');
    localStorage.removeItem('token');
    window.location.href = '/';
}

async function registration(body = null) {
    try {
        const response = await api.post('registration', body);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
    } catch (error) {
        if (error.response.status === 409){
            alert("пользователь с таким email уже существует");
        }
    }
    
}

async function login(body = null) {
    try {
        const response = await api.post('login', body);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/'
    } catch (error) {
        if (error.response.status === 409){
            alert("пользователь с таким email уже существует");
        }
        else if (error.response.status === 400){
            alert("вы ввели неправильный логин или пароль");
        }
    }
;
}

async function getProfile() {
    const response = await api.get('profile');
    return response.data;
}

async function editProfile(body = null) {
    const response = await api.put('profile', body);
    window.location.href = `/profile`;

    return response.data;
}

async function getRole() {
    const response = await api.get('roles');
    return response.data;
}

const profileApi = {
    logout: logout,
    registration: registration,
    login: login,
    getProfile: getProfile, 
    editProfile: editProfile,
    getRole: getRole
};

export default profileApi;