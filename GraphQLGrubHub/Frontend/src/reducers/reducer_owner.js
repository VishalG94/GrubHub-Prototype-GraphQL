import {
  GET_OWNER_PROFILE,
  GET_RESTAURANT_CONTACT,
  ADD_RESTAURANT_MENU,
  ORDER_STATUS,
  DELETE_DISH,
  DELETE_SECTION,
  UPDATE_RESTAURANT_MENU,
  GET_MENU_DETAILS,
  LOGIN_OWNER,
  OWNER_SIGNUP,
  OWNER_DETAILS
} from '../actions'

export default function (state, action) {
  switch (action.type) {
    case GET_OWNER_PROFILE:
      return action.payload
    case GET_RESTAURANT_CONTACT:
      return action.payload
    case ADD_RESTAURANT_MENU:
      return action.payload
    case ORDER_STATUS:
      return action.payload
    case DELETE_DISH:
      return action.payload
    case DELETE_SECTION:
      return action.payload
    case UPDATE_RESTAURANT_MENU:
      return action.payload
    case GET_MENU_DETAILS:
      return action.payload
    case LOGIN_OWNER:
      return action.payload
    case OWNER_SIGNUP:
      return action.payload
    case OWNER_DETAILS:
      return action.payload
    default:
      return { ...state }
  }
}
