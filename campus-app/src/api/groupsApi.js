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
            console.error(error);
    })
}

async function createGroup(data) {
    const token = localStorage.getItem('token');
    return await instance.post('groups', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(async response => {
            if (response.status === 200) {
                window.location.href = '/groups';
        }
            if (response.status === 401){
                localStorage.removeItem('token');
        }
    }).catch(error => {
            console.error(error);
    })
}

async function EditGroup(groupId, data) {
    const token = localStorage.getItem('token');
    return await instance.pust(`groups/${groupId}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        if (response.status === 200) {
            window.location.href = '/groups';
        }
        if (response.status === 401) {
            localStorage.removeItem('token');
        }
    }).catch(error => {
        console.error(error);
    });
}

async function DeleteGroup(groupId) {
    const token = localStorage.getItem('token');
    return await instance.delete(`groups/${groupId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        if (response.status === 200) {
            window.location.href = '/groups';
        }
        if (response.status === 401) {
            localStorage.removeItem('token');
        }
    }).catch(error => {
        console.error(error);
    });
}

async function GetGroupCourses(groupId) {
    const token = localStorage.getItem('token');
    return await instance.get(`groups/${groupId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        if (response.status === 200) {
            return response.data;
        }
        if (response.status === 401) {
            localStorage.removeItem('token');
        }
    }).catch(error => {
        console.error(error);
    });
}

const groupsApi = {
    getGroups: getGroups,
    createGroup: createGroup,
    EditGroup: EditGroup,
    DeleteGroup: DeleteGroup,
    GetGroupCourses: GetGroupCourses
};

export default groupsApi;