const UPDATE_USER_ROLE = 'UPDATE_USER_ROLE';

const updateUserRole = (newRole) => ({
    type: UPDATE_USER_ROLE,
    payload: newRole,
});

export default updateUserRole;