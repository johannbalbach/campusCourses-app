import axios from 'axios';

const baseURL = 'https://camp-courses.api.kreosoft.space/courses'

const instance = axios.create({
    baseURL : baseURL
});
