import {
    createAction,
    getActionsByGoal,
    updateAction,
    deleteAction,
  } from "../../Services/Action.services";
// 🚀 Action Types
export const FETCH_ACTIONS_BY_GOAL = "FETCH_ACTIONS_BY_GOAL";
export const CREATE_ACTION = "CREATE_ACTION";
export const UPDATE_ACTION = "UPDATE_ACTION";
export const DELETE_ACTION = "DELETE_ACTION";

  
  export const getActionsByGoalReq = (goalId) => async (dispatch) => {
    const data = await getActionsByGoal(goalId);
    dispatch({ type: FETCH_ACTIONS_BY_GOAL, payload: data });
  };
  
  export const createActionReq = (actionData) => async (dispatch) => {
    const data = await createAction(actionData);
    dispatch({ type: CREATE_ACTION, payload: data });
  };
  
  export const updateActionReq = (id, updatedData) => async (dispatch) => {
    const data = await updateAction(id, updatedData);
    dispatch({ type: UPDATE_ACTION, payload: data });
  };
  
  export const deleteActionReq = (id) => async (dispatch) => {
    await deleteAction(id);
    dispatch({ type: DELETE_ACTION, payload: id });
  };
  