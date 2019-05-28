import axios from 'axios';

const setAuthToken = token => {
    if(token){
        //put token into header via axios, so this token will be sent along with every single request
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;