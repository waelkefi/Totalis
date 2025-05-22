import refreshToken from "../helpers/functions";
import { toast } from "react-toastify";

// ➕ Créer un profil personnalité pour un utilisateur
export const createUserPersonality = async (data) => {
  const http = await refreshToken();
  try {
    const response = await http.post("userPersonality/", data);
    toast.success("User personality profile created");
    return response.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to create personality profile");
    throw err.response?.data || { message: "Server error" };
  }
};

// 📄 Récupérer le profil d’un utilisateur
export const getUserPersonality = async (userId) => {
  const http = await refreshToken();
  try {
    const response = await http.get(`userPersonality/${userId}`);
    
    return response.data ;
  } catch (err) {
    console.error(err);
    toast.error("Failed to fetch user personality");
  }
};

// ✏️ Mettre à jour le SWOT
export const updateUserSWOT = async (userId, swotData) => {
  const http = await refreshToken();
  try {
    const response = await http.put(`userPersonality/${userId}/swot`, swotData);
    toast.success("SWOT updated successfully");
    return response.data;
  } catch (err) {
    console.error(err);
    toast.error("Failed to update SWOT");
    throw err.response?.data || { message: "Server error" };
  }
};
