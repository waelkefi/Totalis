import axios from "axios";
import { updateUser } from "../../Services/Users.services";
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5005/api/auth" : "/api/auth";
axios.defaults.withCredentials = true;

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const LOGOUT = "LOGOUT";
export const CHECK_AUTH = "CHECK_AUTH";
export const SET_MESSAGE = "SET_MESSAGE";

export const signup = (data) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    dispatch({ type: AUTH_SUCCESS, payload: response.data.user });
    console.log('pa', payload)
  } catch (error) {
    dispatch({ type: AUTH_FAILURE, payload: error.response || "Error signing up" });
    console.log('er', error)
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    dispatch({ type: AUTH_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: AUTH_FAILURE, payload: error.response?.data?.message || "Error logging in" });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    await axios.post(`${API_URL}/logout`);
    dispatch({ type: LOGOUT });
  } catch (error) {
    dispatch({ type: AUTH_FAILURE, payload: "Error logging out" });
  }
};

export const verifyEmail = (code) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/verify-email`, { code });
    dispatch({ type: AUTH_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: AUTH_FAILURE, payload: error.response?.data?.message || "Error verifying email" });
  }
};

export const checkAuth = () => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const response = await axios.get(`${API_URL}/check-auth`);
    dispatch({ type: CHECK_AUTH, payload: response.data.user });
  } catch (error) {
    dispatch({ type: CHECK_AUTH, payload: null });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    dispatch({ type: SET_MESSAGE, payload: response.data.message });
  } catch (error) {
    dispatch({ type: AUTH_FAILURE, payload: error.response?.data?.message || "Error sending reset password email" });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
    dispatch({ type: SET_MESSAGE, payload: response.data.message });
  } catch (error) {
    dispatch({ type: AUTH_FAILURE, payload: error.response?.data?.message || "Error resetting password" });
  }
};


export const updateUserDetails = (userId,updatedData) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const response = await updateUser(userId,updatedData);
    dispatch({ type: AUTH_SUCCESS, payload: response.data.user }); // met à jour le user
  } catch (error) {
    dispatch({ type: AUTH_FAILURE, payload: error.response?.data?.message || "Error updating user" });
  }
};
