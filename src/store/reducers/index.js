import {
  combineReducers
} from 'redux'
import {
    SET_TOKEN,
    SET_USER
} from '../actionTypes'

const INITIAL_STATE = {
  token: "",
  userInfo: null
}


function user (state=INITIAL_STATE, action) {
    
    switch (action.type) {  
      case SET_TOKEN:      
        return {
          ...state,
          token: action.data
        }
      case SET_USER:      
        return {
          ...state,
          userInfo: action.data
        }
        
      default:
        return state
    }
  }

  export default combineReducers({
    user
  })