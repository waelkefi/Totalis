import {
    createGoal,
    getGoalsByMilestone,
    updateGoal,
    deleteGoal,
  } from "../../Services/Goal.services";

export const FETCH_GOALS_BY_MILESTONE = "FETCH_GOALS_BY_MILESTONE";
export const CREATE_GOAL = "CREATE_GOAL";
export const UPDATE_GOAL = "UPDATE_GOAL";
export const DELETE_GOAL = "DELETE_GOAL";

  
  export const getGoalsByMilestoneReq = (milestoneId) => async (dispatch) => {
    const data = await getGoalsByMilestone(milestoneId);
    dispatch({ type: FETCH_GOALS_BY_MILESTONE, payload: { milestoneId, goals: data } });
  };
  
  export const createGoalReq = (goalData) => async (dispatch) => {
    const data = await createGoal(goalData);
    dispatch({ type: CREATE_GOAL, payload: data });
  };
  
  export const updateGoalReq = (id, updatedData) => async (dispatch) => {
    const data = await updateGoal(id, updatedData);
    dispatch({ type: UPDATE_GOAL, payload: data });
  };
  
  export const deleteGoalReq = (milestoneId, goalId) => async (dispatch) => {
    await deleteGoal(goalId);
    dispatch({ type: DELETE_GOAL, payload: { milestoneId, goalId } });
  };
  