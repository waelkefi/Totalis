import {
    FETCH_OUTCOMES_BY_VISION,
    CREATE_OUTCOME,
    UPDATE_OUTCOME,
    DELETE_OUTCOME
  } from "../Actions/outcome.action";
  
  const initialState = {
    byVision: {}, // { visionId: [outcomes] }
  };
  
  const outcomeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_OUTCOMES_BY_VISION:
        return {
          ...state,
          byVision: {
            ...state.byVision,
            [action.payload.visionId]: action.payload.outcomes,
          },
        };
  
      case CREATE_OUTCOME:
        const visionIdCreate = action.payload.visionId;
        return {
          ...state,
          byVision: {
            ...state.byVision,
            [visionIdCreate]: [
              ...(state.byVision[visionIdCreate] || []),
              action.payload,
            ],
          },
        };
  
      case UPDATE_OUTCOME:
        const visionIdUpdate = action.payload.visionId;
        return {
          ...state,
          byVision: {
            ...state.byVision,
            [visionIdUpdate]: state.byVision[visionIdUpdate]?.map((o) =>
              o._id === action.payload._id ? action.payload : o
            ),
          },
        };
  
      case DELETE_OUTCOME:
        const { visionId, outcomeId } = action.payload;
        return {
          ...state,
          byVision: {
            ...state.byVision,
            [visionId]: state.byVision[visionId]?.filter(
              (o) => o._id !== outcomeId
            ),
          },
        };
  
      default:
        return state;
    }
  };
  
  export default outcomeReducer;
  