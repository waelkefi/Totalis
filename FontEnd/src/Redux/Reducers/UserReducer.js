// src/reducers/userReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SET_USER } from '../Actions/UserActions';

const initialState = {
  user: null,
  token: localStorage.getItem('auth_token') || null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log('User data:', action.payload);
      // Save user data and token to localStorage and update the state
      localStorage.setItem('auth_token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
      };

    case LOGOUT:
      // Clear the user data and token from localStorage
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
