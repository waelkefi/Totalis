import {
    FETCH_GOALS_BY_MILESTONE,
    CREATE_GOAL,
    UPDATE_GOAL,
    DELETE_GOAL,
  } from "../Actions/goal.action";
  
  const initialState = {
    byMilestone: {}, // { milestoneId: [goals] }
  };
  
  const goalReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GOALS_BY_MILESTONE:
        return {
          ...state,
          byMilestone: {
            ...state.byMilestone,
            [action.payload.milestoneId]: action.payload.goals,
          },
        };
  
      case CREATE_GOAL:
        const milestoneIdCreate = action.payload.milestoneId;
        return {
          ...state,
          byMilestone: {
            ...state.byMilestone,
            [milestoneIdCreate]: [
              ...(state.byMilestone[milestoneIdCreate] || []),
              action.payload,
            ],
          },
        };
  
      case UPDATE_GOAL:
        const milestoneIdUpdate = action.payload.milestoneId;
        return {
          ...state,
          byMilestone: {
            ...state.byMilestone,
            [milestoneIdUpdate]: state.byMilestone[milestoneIdUpdate]?.map((g) =>
              g._id === action.payload._id ? action.payload : g
            ),
          },
        };
  
      case DELETE_GOAL:
        const { milestoneId, goalId } = action.payload;
        return {
          ...state,
          byMilestone: {
            ...state.byMilestone,
            [milestoneId]: state.byMilestone[milestoneId]?.filter(
              (g) => g._id !== goalId
            ),
          },
        };
  
      default:
        return state;
    }
  };
  
  export default goalReducer;
  