
const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Invalid Email or Password'
            }
        case 'SIGNOUT_SUCCESS':
            return state;
        case 'SIGNOUT_ERROR':
            return state;
        case 'SIGNUP_SUCCESS':
            console.log("success");
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log("error");
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}

export default authReducer;