import refreshToken from "../helpers/functions";

// Get details of the connected user
export const getMe = async () => {
  let http = await refreshToken();
  try {
    const response = await http.get(`users/me`);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Error fetching user details");
  }
};

// Update connected user details
export const updateUser = async (id,userData) => {
  let http = await refreshToken();
  try {
    const response = await http.put(`user/${id}`, userData);
    toast.success("User details updated successfully");
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Error updating user details");
  }
};

// Delete the connected user
export const deleteUser = async () => {
  let http = await refreshToken();
  try {
    const response = await http.delete(`users/me`);
    toast.success("User deleted successfully");
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Error deleting user");
  }
};

// Login user
export const login = async (email, password) => {
  let http = await refreshToken();
  try {
    const response = await http.post(`users/login`, { email, password });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: "An error occurred during login." };
  }
};

// Register user (if you need this as well)
export const register = async (userData) => {
  let http = await refreshToken();
  try {
    const response = await http.post(`users/register`, userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || { message: "An error occurred during registration." };
  }
};

