import axios from 'axios';
import { setAlert } from './alert';


//GET posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: "GET_POSTS",
            data: res.data
        })
    } catch (err) {
        dispatch({type: "POST_ERROR", data: {msg:err.response.statusText, status: err.response.status}})
    }
}

//Add likes
export const addLike = (id) => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: "UPDATE_LIKES",
            data: {
                id,
                likes: res.data
            }
        })
    } catch (err) {
        console.log("error catch")
        dispatch({type: "POST_ERROR", data: {msg:err.response.statusText, status: err.response.status}})
    }
}

//Add likes
export const removeLike = (id) => async dispatch => {

    try {

        const res = await axios.put(`/api/posts/unlike/${id}`);
   
        dispatch({
            type: "UPDATE_LIKES",
            data: {
                id,
                likes: res.data
            }
        })
    } catch (err) {
        dispatch({type: "POST_ERROR", data: {msg:err.response.statusText, status: err.response.status}})
    }
}

//Delete post
export const deletePost = (id) => async dispatch => {

    try {

        const res = await axios.delete(`/api/posts/${id}`);
   
        dispatch({
            type: "DELETE_POST",
            data: id
        })
        dispatch(setAlert('Post Remove', 'success'));
    } catch (err) {
        dispatch({type: "POST_ERROR", data: {msg:err.response.statusText, status: err.response.status}})
    }
}

export const addPost = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
    
        const res = await axios.post(`/api/posts`, formData, config);
   
        dispatch({
            type: "ADD_POST",
            data: res.data
        })
        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({type: "POST_ERROR", data: {msg:err.response.statusText, status: err.response.status}})
    }
}

//GET post
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        console.log(res)
        dispatch({
            type: "GET_POST",
            data: res.data
        })
    } catch (err) {
        dispatch({type: "POST_ERROR", data: {msg:err.response.statusText, status: err.response.status}})
    }
}

//Add comment
export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    console.log(postId, formData)
   

    try {
    
        const res = await axios.post(`/api/posts/comment/${postId}`, {text:formData}, config);
   
        dispatch({
            type: "ADD_COMMENT",
            data: res.data
        })
        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({type: "POST_ERROR", data: {msg:err.response.statusText, status: err.response.status}})
    }
}

//Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    console.log("being called")
    try {
    
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
   
        dispatch({
            type: "REMOVE_COMMENT",
            data: commentId
        })
        dispatch(setAlert('Comment Remove', 'success'));
    } catch (err) {
        dispatch({type: "POST_ERROR", data: {msg:err.response.statusText, status: err.response.status}})
    }
}