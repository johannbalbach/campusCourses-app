import * as axios from 'axos';

const baseURL = 'https://camp-courses.api.kreosoft.space/'

const instance = axios.create({
    baseURL : baseURL
});

async function registration(){
    return instance.post('registration')
    .then(response => {
        if (response.status === 200){
            return true
        }
    })
}