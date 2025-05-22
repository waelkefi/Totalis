import refreshToken from "../helpers/functions";
import { toast } from "react-toastify";

export const createGoal = async (goalData) => {
  let http = await refreshToken();
  try {
    const response = await http.post("goal", goalData);
    toast.success("Goal created successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to create goal");
    throw error.response?.data || { message: "Server error while creating goal." };
  }
};

export const getGoalsByMilestone = async (milestoneId) => {
  let http = await refreshToken();
  try {
    const response = await http.get(`goal/milestone/${milestoneId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch goals");
  }
};

export const updateGoal = async (id, updatedData) => {
  let http = await refreshToken();
  try {
    const response = await http.put(`goal/${id}`, updatedData);
    toast.success("Goal updated successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update goal");
    throw error.response?.data || { message: "Server error while updating goal." };
  }
};

export const deleteGoal = async (id) => {
  let http = await refreshToken();
  try {
    const response = await http.delete(`goal/${id}`);
    toast.success("Goal deleted successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete goal");
  }
};
