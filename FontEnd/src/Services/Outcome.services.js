import refreshToken from "../helpers/functions";
import { toast } from "react-toastify";

export const createOutcome = async (outcomeData) => {
  const http = await refreshToken();
  try {
    const response = await http.post("outcome", outcomeData);
    toast.success("Outcome created successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to create outcome");
    throw error.response?.data || { message: "Server error while creating outcome." };
  }
};

export const getOutcomesByVision = async (visionId) => {
  const http = await refreshToken();
  try {
    const response = await http.get(`outcome/vision/${visionId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch outcomes");
  }
};

export const updateOutcome = async (id, updatedData) => {
  const http = await refreshToken();
  try {
    const response = await http.put(`outcome/${id}`, updatedData);
    toast.success("Outcome updated successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update outcome");
    throw error.response?.data || { message: "Server error while updating outcome." };
  }
};

export const deleteOutcome = async (id) => {
  const http = await refreshToken();
  try {
    const response = await http.delete(`outcome/${id}`);
    toast.success("Outcome deleted successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete outcome");
  }
};
