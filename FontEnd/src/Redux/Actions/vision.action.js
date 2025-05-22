import {
  createVision,
  getAllVisions,
  updateVision,
  deleteVision,
  getVisionByUserId
} from "../../Services/Vision.services";
export const FETCH_ALL_VISIONS = "FETCH_ALL_VISIONS";
export const CREATE_VISION = "CREATE_VISION";
export const UPDATE_VISION = "UPDATE_VISION";
export const DELETE_VISION = "DELETE_VISION";
export const FETCH_VISIONS_BY_USER = "FETCH_VISIONS_BY_USER";


export const getAllVisionsReq = () => async (dispatch) => {
  const data = await getAllVisions();
  dispatch({ type: FETCH_ALL_VISIONS, payload: data });
};

export const getVisionByUserIdReq = (userId) => {
  return async (dispatch) => {
    const data = await getVisionByUserId(userId);
    if (data) {
      dispatch({ type: FETCH_VISIONS_BY_USER, payload: data });
    }
  };
}

export const createVisionReq = (visionData) => async (dispatch) => {
  const data = await createVision(visionData);
  dispatch({ type: CREATE_VISION, payload: data });
};

export const updateVisionReq = (id, updatedData) => async (dispatch) => {
  const data = await updateVision(id, updatedData);
  dispatch({ type: UPDATE_VISION, payload: data });
};

export const deleteVisionReq = (id) => async (dispatch) => {
  await deleteVision(id);
  dispatch({ type: DELETE_VISION, payload: id });
};
