import {
    createMilestone,
    getMilestonesByOutcome,
    updateMilestone,
    deleteMilestone
  } from "../../Services/Milestone.services";
export const FETCH_MILESTONES_BY_OUTCOME = "FETCH_MILESTONES_BY_OUTCOME";
export const CREATE_MILESTONE = "CREATE_MILESTONE";
export const UPDATE_MILESTONE = "UPDATE_MILESTONE";
export const DELETE_MILESTONE = "DELETE_MILESTONE";

  
  export const getMilestonesByOutcomeReq = (outcomeId) => async (dispatch) => {
    const data = await getMilestonesByOutcome(outcomeId);
    dispatch({ type: FETCH_MILESTONES_BY_OUTCOME, payload: { outcomeId, milestones: data } });
  };
  
  export const createMilestoneReq = (milestoneData) => async (dispatch) => {
    const data = await createMilestone(milestoneData);
    dispatch({ type: CREATE_MILESTONE, payload: data });
  };
  
  export const updateMilestoneReq = (id, updatedData) => async (dispatch) => {
    const data = await updateMilestone(id, updatedData);
    dispatch({ type: UPDATE_MILESTONE, payload: data });
  };
  
  export const deleteMilestoneReq = (outcomeId, milestoneId) => async (dispatch) => {
    await deleteMilestone(milestoneId);
    dispatch({ type: DELETE_MILESTONE, payload: { outcomeId, milestoneId } });
  };
  