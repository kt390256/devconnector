import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import profileReducer from './profile';
import postReducer from './post';

const allReducers = combineReducers({
        alert:alertReducer,
        auth: authReducer,
        profile: profileReducer,
        post: postReducer
})

export default allReducers;