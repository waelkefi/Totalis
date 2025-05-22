import axios from "axios";
const API = import.meta.env.VITE_REACT_APP_API_URL;

export async function refreshToken() {
  let token = localStorage.getItem("auth_token");

  return axios.create({
    baseURL: API,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export default refreshToken;
