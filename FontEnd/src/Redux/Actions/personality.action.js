import {
  createPersonality,
  getAllPersonalities,
  getPersonality,
  updatePersonality,
  deletePersonality,
  getPersonalityById
} from "../../Services/Personnality.services"

// 🚀 Action Types
export const FETCH_ALL_PERSONALITIES = "FETCH_ALL_PERSONALITIES";
export const FETCH_PERSONALITY = "FETCH_PERSONALITY";
export const CREATE_PERSONALITY = "CREATE_PERSONALITY";
export const UPDATE_PERSONALITY = "UPDATE_PERSONALITY";
export const DELETE_PERSONALITY = "DELETE_PERSONALITY";


export const getAllPersonalitiesReq = () => async (dispatch) => {
  const data = await getAllPersonalities();
  dispatch({ type: FETCH_ALL_PERSONALITIES, payload: data });
};

export const getPersonalityByType = (type) => async (dispatch) => {
  const data = await getPersonality(type);
  dispatch({ type: FETCH_PERSONALITY, payload: data });
};

export const getPersonalityByIdRed = (id) => async (dispatch) => {
  const data = await getPersonalityById(id);
  dispatch({ type: FETCH_PERSONALITY, payload: data });
};

export const createPersonalityReq = (personalityData) => async (dispatch) => {
  const data = await createPersonality(personalityData);
  dispatch({ type: CREATE_PERSONALITY, payload: data });
};

export const updatePersonalityReq = (type, updatedData) => async (dispatch) => {
  const data = await updatePersonality(type, updatedData);
  dispatch({ type: UPDATE_PERSONALITY, payload: data });
};

export const deletePersonalityReq = (type) => async (dispatch) => {
  await deletePersonality(type);
  dispatch({ type: DELETE_PERSONALITY, payload: type });
};
