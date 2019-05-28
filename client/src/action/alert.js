import uuid from 'uuid';

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {

    const id = uuid.v4();//give random long string

    let action = {type: "SET_ALERT", data: {id, msg, alertType}};

    dispatch(action);

    setTimeout(() => dispatch({type: "REMOVE_ALERT", id}), timeout)
}