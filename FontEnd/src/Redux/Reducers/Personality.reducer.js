import {
    FETCH_ALL_PERSONALITIES,
    FETCH_PERSONALITY,
    CREATE_PERSONALITY,
    UPDATE_PERSONALITY,
    DELETE_PERSONALITY,
  } from "../Actions/personality.action";
  
  const initialState = {
    all: [],
    selected: null,
  };
  
  const personalityReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_PERSONALITIES:
        return { ...state, all: action.payload };
  
      case FETCH_PERSONALITY:
        return { ...state, selected: action.payload };
  
      case CREATE_PERSONALITY:
        return { ...state, all: [...state.all, action.payload] };
  
      case UPDATE_PERSONALITY:
        return {
          ...state,
          all: state.all.map((p) =>
            p.type === action.payload.type ? action.payload : p
          ),
          selected:
            state.selected?.type === action.payload.type
              ? action.payload
              : state.selected,
        };
  
      case DELETE_PERSONALITY:
        return {
          ...state,
          all: state.all.filter((p) => p.type !== action.payload),
          selected:
            state.selected?.type === action.payload ? null : state.selected,
        };
  
      default:
        return state;
    }
  };
  
  export default personalityReducer;
  