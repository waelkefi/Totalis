import * as api from "../../Services/userPersonality.services";

// 🔖 Types
export const SET_USER_PERSONALITY = "SET_USER_PERSONALITY";
export const UPDATE_USER_SWOT = "UPDATE_USER_SWOT";

// ➕ Create personality profile
export const createUserPersonality = (data) => {
    return async (dispatch) => {
        const response = await api.createUserPersonality(data);
        dispatch({ type: SET_USER_PERSONALITY, payload: response });
    };
}

// 📄 Get user profile
export const fetchUserPersonality = (userId) => {

    return async (dispatch) => {
        console.log('userId', userId)
        const response = await api.getUserPersonality(userId);
        dispatch({ type: SET_USER_PERSONALITY, payload: response });
    };
}

// ✏️ Update SWOT
export const updateUserSWOT = (userId, swotData) => {
    return  async (dispatch) => {
        const response = await api.updateUserSWOT(userId, swotData);
        dispatch({ type: UPDATE_USER_SWOT, payload: response.swot }); // assuming response contains updated swot
}
};
