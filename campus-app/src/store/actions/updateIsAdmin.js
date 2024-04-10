const UPDATE_IS_ADMIN = 'UPDATE_IS_ADMIN';

const updateIsAdmin = (bool) => ({
    type: UPDATE_IS_ADMIN,
    payload: bool,
});

export default updateIsAdmin;