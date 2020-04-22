import {
  combineReducers
} from 'redux'
import {
  SET_TOKEN,
  SET_USER,
  Add_CAR,
  SET_ORDER
} from '../actionTypes'

function user(state, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        token: action.data,
        userInfo: state.userInfo
      }
      case SET_USER:
        return {
          userInfo: action.data,
          token: state.token
        }

        default:
          return state || {
            token: "",
            userInfo: null
          }
  }
}

function shopCar(state, action) {
  switch (action.type) {
    case Add_CAR:
      return {
        shopCarArr: action.data,
        confirmOrderArr: state.confirmOrderArr
      }
    case SET_ORDER:
      return {
        confirmOrderArr: action.data,
        shopCarArr: state.shopCarArr
      }
      default:
        return state || {
          shopCarArr: [],
          confirmOrderArr: []
        }
  }
}

export default combineReducers({
  user, shopCar
})
