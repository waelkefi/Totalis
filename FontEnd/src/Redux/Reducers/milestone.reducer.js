import {
    FETCH_MILESTONES_BY_OUTCOME,
    CREATE_MILESTONE,
    UPDATE_MILESTONE,
    DELETE_MILESTONE
  } from "../Actions/milestone.action";
  
  const initialState = {
    byOutcome: {}, // { outcomeId: [milestones] }
  };
  
  const milestoneReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MILESTONES_BY_OUTCOME:
        return {
          ...state,
          byOutcome: {
            ...state.byOutcome,
            [action.payload.outcomeId]: action.payload.milestones,
          },
        };
  
      case CREATE_MILESTONE:
        const outcomeIdCreate = action.payload.outcomeId;
        return {
          ...state,
          byOutcome: {
            ...state.byOutcome,
            [outcomeIdCreate]: [
              ...(state.byOutcome[outcomeIdCreate] || []),
              action.payload,
            ],
          },
        };
  
      case UPDATE_MILESTONE:
        const outcomeIdUpdate = action.payload.outcomeId;
        return {
          ...state,
          byOutcome: {
            ...state.byOutcome,
            [outcomeIdUpdate]: state.byOutcome[outcomeIdUpdate]?.map((m) =>
              m._id === action.payload._id ? action.payload : m
            ),
          },
        };
  
      case DELETE_MILESTONE:
        const { outcomeId, milestoneId } = action.payload;
        return {
          ...state,
          byOutcome: {
            ...state.byOutcome,
            [outcomeId]: state.byOutcome[outcomeId]?.filter(
              (m) => m._id !== milestoneId
            ),
          },
        };
  
      default:
        return state;
    }
  };
  
  export default milestoneReducer;
  