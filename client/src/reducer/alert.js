
import { SET_ALERT, REMOVE_ALERT } from '../action/types'


export default function(state = [], action) {

    switch(action.type){
       // case "SET_ALERT":
       case "SET_ALERT":
         //return action.data;
         return [...state, action.data];//if these already other state, copy them and add new one
        case "REMOVE_ALERT":
   
         return state.filter(alert => alert.id !== action.id);
        default:
          return state;
    }
    return state;
}