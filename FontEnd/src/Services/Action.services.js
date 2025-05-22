import refreshToken from "../helpers/functions";
import { toast } from "react-toastify";

export const createAction = async (actionData) => {
  let http = await refreshToken();
  try {
    const response = await http.post("action", actionData);
    toast.success("Action created successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to create action");
    throw error.response?.data || { message: "Server error while creating action." };
  }
};

export const getActionsByGoal = async (goalId) => {
  let http = await refreshToken();
  try {
    const response = await http.get(`action/goal/${goalId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch actions");
  }
};

export const updateAction = async (id, updatedData) => {
  let http = await refreshToken();
  try {
    const response = await http.put(`action/${id}`, updatedData);
    toast.success("Action updated successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update action");
    throw error.response?.data || { message: "Server error while updating action." };
  }
};

export const deleteAction = async (id) => {
  let http = await refreshToken();
  try {
    const response = await http.delete(`action/${id}`);
    toast.success("Action deleted successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete action");
  }
};
