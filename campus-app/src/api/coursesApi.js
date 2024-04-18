import api from './api';

async function getCourseDetails(id) {
    const response = await api.get(`courses/${id}/details`);
    
    return response.data;
}

async function signUpForCourse(id) {
    const response = await api.post(`courses/${id}/sign-up`);
    return response.data;
}

async function editCourseStatus(id, data) {
    ///DOBAVIT CHE-TO NA ONTLOV OSHIBOK
    const response = await api.post(`courses/${id}/status`, data);
    window.location.href = `/courses/${id}`;

    return response.data;
}

async function editStudentStatus(id, studentId, data) {
    const response = await api.post(`courses/${id}/student-status/${studentId}`, data);
    window.location.href = `/courses/${id}`;

    return response.data;
}

async function createCourseNotification(id, data) {
    const response = await api.post(`courses/${id}/notifications`, data);
    window.location.href = `/courses/${id}`;

    return response.data;
}

async function editStudentMark(id, studentId, data) {
    const response = await api.post(`courses/${id}/marks/${studentId}`, data);
    window.location.href = `/courses/${id}`;

    return response.data;
}

async function editCourseRequirementsAndAnnotations(id, data) {
    const response = await api.put(`courses/${id}/requirements-and-annotations`, data);
    window.location.href = `/courses/${id}`;

    return response.data;
}

async function editCourse(id, data) {
    const response = await api.put(`courses/${id}`, data);
    return response.data;
}

async function deleteCourse(id) {
    const response = await api.delete(`courses/${id}`);
    return response.data;
}

async function addTeacherToCourse(id, data) {
    const response = await api.post(`courses/${id}/teachers`, data);
    window.location.href = `/courses/${id}`;
    
    return response.data;
}

const coursesApi = {
    getCourseDetails,
    signUpForCourse,
    editCourseStatus,
    editStudentStatus,
    createCourseNotification,
    editStudentMark,
    editCourseRequirementsAndAnnotations,
    editCourse,
    deleteCourse,
    addTeacherToCourse,
};

export default coursesApi;
