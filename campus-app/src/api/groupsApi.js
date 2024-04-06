import api from './api';

async function getGroups() {
    const response = await api.get('groups');
    return response.data;
}

async function createGroup(data) {
    await api.post('groups', data);
    window.location.href = '/groups';
}

async function editGroup(groupId, data) {
    await api.put(`groups/${groupId}`, data);
    window.location.href = '/groups';
}

async function deleteGroup(groupId) {
    await api.delete(`groups/${groupId}`);
    window.location.href = '/groups';
}

async function getGroupCourses(groupId) {
    const response = await api.get(`groups/${groupId}`);
    return response.data;
}

async function createCourse(groupId, data){
    await api.post(`groups/${groupId}`, data);
    window.location.href = '/groups';
}

const groupsApi = {
    getGroups: getGroups,
    createGroup: createGroup,
    editGroup: editGroup,
    deleteGroup: deleteGroup,
    getGroupCourses: getGroupCourses,
    createCourse: createCourse
};

export default groupsApi;