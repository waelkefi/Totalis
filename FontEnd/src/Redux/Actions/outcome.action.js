import {
    createOutcome,
    getOutcomesByVision,
    updateOutcome,
    deleteOutcome
  } from "../../Services/Outcome.services";

export const FETCH_OUTCOMES_BY_VISION = "FETCH_OUTCOMES_BY_VISION";
export const CREATE_OUTCOME = "CREATE_OUTCOME";
export const UPDATE_OUTCOME = "UPDATE_OUTCOME";
export const DELETE_OUTCOME = "DELETE_OUTCOME";

  
  export const getOutcomesByVisionReq = (visionId) => async (dispatch) => {
    const data = await getOutcomesByVision(visionId);
    dispatch({ type: FETCH_OUTCOMES_BY_VISION, payload: { visionId, outcomes: data } });
  };
  
  export const createOutcomeReq = (outcomeData) => async (dispatch) => {
    const data = await createOutcome(outcomeData);
    dispatch({ type: CREATE_OUTCOME, payload: data });
  };
  
  export const updateOutcomeReq = (id, updatedData) => async (dispatch) => {
    const data = await updateOutcome(id, updatedData);
    dispatch({ type: UPDATE_OUTCOME, payload: data });
  };
  
  export const deleteOutcomeReq = (visionId, outcomeId) => async (dispatch) => {
    await deleteOutcome(outcomeId);
    dispatch({ type: DELETE_OUTCOME, payload: { visionId, outcomeId } });
  };
  