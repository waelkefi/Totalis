import refreshToken from "../helpers/functions";
import { toast } from "react-toastify";

export const createPersonality = async (personalityData) => {
  let http = await refreshToken();
  try {
    const response = await http.post("personality", personalityData);
    toast.success("Personality created successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to create personality");
    throw error.response?.data || { message: "Server error while creating personality." };
  }
};

export const getAllPersonalities = async () => {
  let http = await refreshToken();
  try {
    const response = await http.get("personality");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch personality types");
  }
};


export const getPersonality = async (type) => {
  let http = await refreshToken();
  try {
    const response = await http.get(`personality/${type}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch personality");
  }
};

export const getPersonalityById = async (id) => {
  let http = await refreshToken();
  try {
    const response = await http.get(`personality/byId/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch personality");
  }
};


export const updatePersonality = async (type, updatedData) => {
  let http = await refreshToken();
  try {
    const response = await http.put(`personality/${type}`, updatedData);
    toast.success("Personality updated successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update personality");
    throw error.response?.data || { message: "Server error while updating personality." };
  }
};

export const deletePersonality = async (type) => {
  let http = await refreshToken();
  try {
    const response = await http.delete(`personality/${type}`);
    toast.success("Personality deleted successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete personality");
  }
};
