
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

//returning state because we are most likely not gonna refresh the page
//so the data in the redux store will be persisted

export default function(state = initialState, action) {

    switch(action.type) {
        case "USER_LOADED":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.data
            }
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.token);
             //this format is replacing the following properties inside the previous state(which is the default state)
            return {...state,
                    ...action.data, 
                    token:action.token,
                    isAuthenticated: true,
                    loading: false
            }
        case 'AUTH_ERROR':
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {...state,
                token: null, 
                isAuthenticated: false,
                loading: false
            }
        case "CLEAR_PROFILE":
         return {
             ...state,
             profile: null,
            repos: [],
            loading: false
         }
        default:
            return state;
    }

}