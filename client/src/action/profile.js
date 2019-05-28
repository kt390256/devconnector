import axios from 'axios';
import { setAlert } from './alert';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile/me');

        let action = {type: "GET_PROFILE", data:res.data}

        dispatch(action);
    }
    catch (err) {
        dispatch({type:"PROFILE_ERROR", data: {msg: err.response.statusText, status: err.response.status}})
    }
}

//Get all users profile
export const getProfiles = () => async dispatch => {

    dispatch({type: "CLEAR_PROFILE"});

    try {
        const res = await axios.get('/api/profile');

        let action = {type: "GET_PROFILES", data:res.data}

        dispatch(action);
    }
    catch (err) {
        dispatch({type:"PROFILE_ERROR", data: {msg: err.response.statusText, status: err.response.status}})
    }
}

//Get profile by ID
export const getProfileById = (userId) => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        let action = {type: "GET_PROFILE", data:res.data}

        dispatch(action);
    }
    catch (err) {
        dispatch({type:"PROFILE_ERROR", data: {msg: err.response.statusText, status: err.response.status}})
    }
}

//Get Github repo
export const getGithubRepos = username => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        let action = {type: "GET_REPOS", data:res.data}

        dispatch(action);
    }
    catch (err) {
        dispatch({type:"PROFILE_ERROR", data: {msg: err.response.statusText, status: err.response.status}})
    }
}



//Create or update probile
//history comes from the Router
export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }   

        const res = await axios.post('/api/profile', formData, config);

        dispatch({type: "GET_PROFILE", data: res.data});
        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"))


        //you can't called the redirect here, you need the history to redirect
        if(!edit) {
            history.push('/dashboard');
        }
    }
    catch (err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({type: "PROFILE_ERROR", data: {msg: err.response.statusText, status: err.response.status}})
    }

}

//Add Experience
export const addExperience = (formData, history) => async dispatch => {


    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }   

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({type: "UPDATE_PROFILE", data: res.data});
        dispatch(setAlert("Experience Added", "Profile Created"))

            history.push('/dashboard');
    }
    catch (err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({type: "PROFILE_ERROR", data: {msg: err.response.statusText, status: err.response.status}})
    }
}

//Add Education
export const addEducation = (formData, history) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }   

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({type: "UPDATE_PROFILE", data: res.data});
        dispatch(setAlert("Education Added", "Profile Created"))

            history.push('/dashboard');
    }
    catch (err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({type: "PROFILE_ERROR", data: {msg: err.response.statusText, status: err.response.status}})
    }
}

//Delete Experience
export const deleteExperience = id => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)

        dispatch({
            type: "UPDATE_PROFILE",
            data: res.data
        })

        dispatch(setAlert('Experience Removed', 'success'));
    }
    catch (err) {
        dispatch({
            type: "PROFILE_ERROR",
            data: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Delete Experience
export const deleteEducation = id => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/education/${id}`)

        dispatch({
            type: "UPDATE_PROFILE",
            data: res.data
        })

        dispatch(setAlert('Education Removed', 'success'));
    }
    catch (err) {
        dispatch({
            type: "PROFILE_ERROR",
            data: { msg: err.response.statusText, status: err.response.status }
        })
    }

}

