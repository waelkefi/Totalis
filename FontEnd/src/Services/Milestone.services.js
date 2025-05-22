import refreshToken from "../helpers/functions";
import { toast } from "react-toastify";

export const createMilestone = async (milestoneData) => {
  const http = await refreshToken();
  try {
    const response = await http.post("milestone", milestoneData);
    toast.success("Milestone created successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to create milestone");
    throw error.response?.data || { message: "Server error while creating milestone." };
  }
};

export const getMilestonesByOutcome = async (outcomeId) => {
  const http = await refreshToken();
  try {
    const response = await http.get(`milestone/outcome/${outcomeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch milestones");
  }
};

export const updateMilestone = async (id, updatedData) => {
  const http = await refreshToken();
  try {
    const response = await http.put(`milestone/${id}`, updatedData);
    toast.success("Milestone updated successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update milestone");
    throw error.response?.data || { message: "Server error while updating milestone." };
  }
};

export const deleteMilestone = async (id) => {
  const http = await refreshToken();
  try {
    const response = await http.delete(`milestone/${id}`);
    toast.success("Milestone deleted successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete milestone");
  }
};
