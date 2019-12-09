import {
  GET_PROFILE,
  GET_USER_IMAGE,
  LOGIN_USER,
  SIGNUP_USER,
  GET_RESTAURANTS,
  GET_RESTAURANT_DETAILS,
  GET_RESTAURANT_MENU,
  GET_RESTAURANT_SECTIONS,
  GET_SECTIONS_MENU,
  USER_ORDER,
  GET_USER_ORDER,
  GET_USER_PAST_ORDERS,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PHONE
} from '../actions'

export default function (state, action) {
  switch (action.type) {
    case GET_PROFILE:
      return action.payload
    case GET_USER_IMAGE:
      return action.payload
    case LOGIN_USER:
        return action.payload
      // return [action.payload, ...state ]
    case SIGNUP_USER:
      return action.payload
    case GET_RESTAURANTS:
        return action.payload
      // return [action.payload, ...state ]
      
    case GET_RESTAURANT_DETAILS:
      return action.payload
    case GET_RESTAURANT_MENU:
      return action.payload
    case GET_RESTAURANT_SECTIONS:
      return action.payload
    case GET_SECTIONS_MENU:
      return action.payload
    case USER_ORDER:
      return action.payload
    case GET_USER_ORDER:
      return action.payload
    case GET_USER_PAST_ORDERS:
      return action.payload
    case UPDATE_USER_PHONE:
      return action.payload
    case UPDATE_USER_EMAIL:
        return action.payload

      // case ERROR:
      //   return action.payload

    default:
      return { ...state }
  }
}
