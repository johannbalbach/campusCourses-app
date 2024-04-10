import { createStore } from 'redux';

const initialState = {
    userRole: 'non',  // (non, user, student, teacher, combo)
    isAdmin: false
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_ROLE':
            return {
                ...state,
                userRole: action.payload,
            };
        case 'UPDATE_IS_ADMIN':
            return {
                ...state,
                isAdmin: action.payload,
            }
        default:
            return state;
    }
};  

const store = createStore(reducer);

export default store;