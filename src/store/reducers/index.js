import {
  combineReducers
} from 'redux'
import {
    SET_TOKEN
} from '../actionTypes'

const INITIAL_STATE = {
  token: ""
}


function login (state=INITIAL_STATE, action) {
    // 获取当前todos条数，用以id自增
    
    switch (action.type) {  
      // 根据指令处理todos
      case SET_TOKEN:      
        return {
          ...state,
          token: action.data
        }
      default:
        return state
    }
  }

  export default combineReducers({
    login
  })