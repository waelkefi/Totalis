import {
    FETCH_ACTIONS_BY_GOAL,
    CREATE_ACTION,
    UPDATE_ACTION,
    DELETE_ACTION,
  } from "../Actions/action.action";
  
  const initialState = {
    byGoal: {}, // { goalId: [actions] }
  };
  
  const actionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ACTIONS_BY_GOAL:
        return {
          ...state,
          byGoal: {
            ...state.byGoal,
            [action.payload.goalId]: action.payload.actions,
          },
        };
  
      case CREATE_ACTION:
        const goalIdForCreate = action.payload.goalId;
        return {
          ...state,
          byGoal: {
            ...state.byGoal,
            [goalIdForCreate]: [
              ...(state.byGoal[goalIdForCreate] || []),
              action.payload,
            ],
          },
        };
  
      case UPDATE_ACTION:
        const goalIdForUpdate = action.payload.goalId;
        return {
          ...state,
          byGoal: {
            ...state.byGoal,
            [goalIdForUpdate]: state.byGoal[goalIdForUpdate]?.map((a) =>
              a._id === action.payload._id ? action.payload : a
            ),
          },
        };
  
      case DELETE_ACTION:
        const { goalId, actionId } = action.payload;
        return {
          ...state,
          byGoal: {
            ...state.byGoal,
            [goalId]: state.byGoal[goalId]?.filter((a) => a._id !== actionId),
          },
        };
  
      default:
        return state;
    }
  };
  
  export default actionReducer;
  