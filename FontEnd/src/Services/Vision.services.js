import refreshToken from "../helpers/functions";
import { toast } from "react-toastify";

export const createVision = async (visionData) => {
  const http = await refreshToken();
  try {
    const response = await http.post("vision", visionData);
    toast.success("Vision created successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to create vision");
    throw error.response?.data || { message: "Server error while creating vision." };
  }
};

export const getAllVisions = async () => {
  const http = await refreshToken();
  try {
    const response = await http.get("vision");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch visions");
  }
};

export const getVisionById = async (id) => {
  const http = await refreshToken();
  try {
    const response = await http.get(`vision/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch vision");
  }
};
export const getVisionByUserId = async (id) => {
  const http = await refreshToken();
  try {
    const response = await http.get(`vision/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch vision");
  }
};

export const updateVision = async (id, updatedData) => {
  const http = await refreshToken();
  try {
    const response = await http.put(`vision/${id}`, updatedData);
    toast.success("Vision updated successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update vision");
    throw error.response?.data || { message: "Server error while updating vision." };
  }
};

export const deleteVision = async (id) => {
  const http = await refreshToken();
  try {
    const response = await http.delete(`vision/${id}`);
    toast.success("Vision deleted successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete vision");
  }
};
