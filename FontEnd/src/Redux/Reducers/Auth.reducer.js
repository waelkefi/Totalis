
import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_FAILURE,
    LOGOUT,
    CHECK_AUTH,
    SET_MESSAGE,
  } from "../Actions/Auth.action";
// authReducer.js
const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_REQUEST:
        return { ...state, isLoading: true, error: null };
      case AUTH_SUCCESS:
        return { ...state, user: action.payload, isAuthenticated: true, isLoading: false };
      case AUTH_FAILURE:
        return { ...state, error: action.payload, isLoading: false };
      case LOGOUT:
        return { ...state, user: null, isAuthenticated: false, isLoading: false };
      case CHECK_AUTH:
        return { ...state, user: action.payload, isAuthenticated: !!action.payload, isCheckingAuth: false };
      case SET_MESSAGE:
        return { ...state, message: action.payload, isLoading: false };
      default:
        return state;
    }
  };
  
  export default authReducer;