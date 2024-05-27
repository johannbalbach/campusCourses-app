const UPDATE_EMAIL = 'UPDATE_EMAIL';

const updateEmail = (email) => ({
    type: UPDATE_EMAIL,
    payload: email,
});

export default updateEmail;