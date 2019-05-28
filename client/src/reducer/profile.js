const initialState = {
    profile: null,
    profiles:[],
    repos:[],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {

    switch(action.type) {
        case 'GET_PROFILE':
        case "UPDATE_PROFILE":
        return {
            ...state,
            profile: action.data,
            loading: false
        }
        case 'GET_PROFILES':
            return {
                ...state,
                profile:action.data,
                loading: false
            }
        case "PROFILE_ERROR":
        return {
            ...state,
            error: action.data,
            loading:false
        }
        case "CLEAR_PROFILE":
        return {
            ...state,
            profile: null,
            repos: [],
            loading: false
        }
        case "GET_REPOS":
        return {
            ...state,
            repos: action.data,
            loading: false
        }
        default:
        return state;
    }

}