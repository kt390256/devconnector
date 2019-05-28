import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken  from '../utils/setAuthToken'

//Load User(This is waht persist the session, this will be called everytime you refresh)
export const loadUser = () => async dispatch => {

    //if there is a token
    if(localStorage.token) {
        //put that token into the header
        setAuthToken(localStorage.token);
    }   

    try {
        //this route gets the user
        const res = await axios.get("/api/auth");
    
        let action = {type: "USER_LOADED", data: res.data}
        dispatch(action);
    } 
    catch (err) {
        
        dispatch({type: "AUTH_ERROR"})
    }
}

//Register User
export const register = ({name, email, password}) => async dispatch => {

    const config = {
        headers: {
            'Content-Type' :"Application/json"
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);
        let action = {type: "REGISTER_SUCCESS", data: res, token: res.data.token}

        dispatch(action);
        dispatch(loadUser());
    }
    catch (err) {//this will triggered if the code is >= 400 this err is like 'body'

        const errors = err.response.data.errors;        

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({type: "REGISTER_FAIL"})
    }
}

//login user
export const login = ( email, password) => async dispatch => {

    const config = {
        headers: {
            'Content-Type' :"Application/json"
        }
    }

    const body = JSON.stringify({  email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        let action = {type: "LOGIN_SUCCESS", data: res, token: res.data.token}
        
        dispatch(action);
        dispatch(loadUser())
    }
    catch (err) {//this will triggered if the code is >= 400 this err is like 'body'
        
    // const errors = err.response.data.errors;
        
    //     if(errors) {
    //         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    //     }

        dispatch({type: "LOGIN_FAIL"})
    }
}

//Logout / CLear Profile
export const logout = () => dispatch => {
    
    dispatch({type: "CLEAR_PROFILE"})
    dispatch({type: "LOGOUT"});

}