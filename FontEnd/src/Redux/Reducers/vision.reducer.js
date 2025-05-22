// src/reducers/vision.reducer.js

import {
  FETCH_VISIONS_BY_USER,
  CREATE_VISION,
  UPDATE_VISION,
  DELETE_VISION,
} from "../Actions/vision.action";

// bring in the child action types
import {
  CREATE_OUTCOME,
  UPDATE_OUTCOME,
  DELETE_OUTCOME,
} from "../Actions/outcome.action";
import {
  CREATE_MILESTONE,
  UPDATE_MILESTONE,
  DELETE_MILESTONE,
} from "../Actions/milestone.action";
import {
  CREATE_GOAL,
  UPDATE_GOAL,
  DELETE_GOAL,
} from "../Actions/goal.action";
import {
  CREATE_ACTION,
  UPDATE_ACTION,
  DELETE_ACTION,
} from "../Actions/action.action";

const initialState = {
  all: [],
  byUser: [],
};

const visionReducer = (state = initialState, action) => {
  switch (action.type) {
    // --------------------------------------------------
    // vision handlers
    // --------------------------------------------------
    case FETCH_VISIONS_BY_USER:
      return { ...state, byUser: action.payload };

    case CREATE_VISION:
      return { ...state, all: [...state.all, action.payload] };

    case UPDATE_VISION:
      return {
        ...state,
        all: state.all.map((v) =>
          v._id === action.payload._id ? action.payload : v
        ),
      };

    case DELETE_VISION:
      return {
        ...state,
        all: state.all.filter((v) => v._id !== action.payload),
      };

    // --------------------------------------------------
    // mirror outcomes into byUser[].outcomes
    // --------------------------------------------------
    case CREATE_OUTCOME: {
      const oc = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) =>
          v._id === oc.vision
            ? { ...v, outcomes: [...(v.outcomes||[]), oc] }
            : v
        ),
      };
    }
    case UPDATE_OUTCOME: {
      const oc = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) =>
          v._id === oc.vision
            ? {
                ...v,
                outcomes: v.outcomes.map(o =>
                  o._id === oc._id ? oc : o
                ),
              }
            : v
        ),
      };
    }
    case DELETE_OUTCOME: {
      const { visionId, outcomeId } = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) =>
          v._id === visionId
            ? {
                ...v,
                outcomes: v.outcomes.filter(o => o._id !== outcomeId),
              }
            : v
        ),
      };
    }

    // --------------------------------------------------
    // mirror milestones into byUser[].outcomes[].milestones
    // --------------------------------------------------
    case CREATE_MILESTONE: {
      const ms = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) => ({
          ...v,
          outcomes: v.outcomes.map((o) =>
            o._id === ms.outcome
              ? { ...o, milestones: [...(o.milestones||[]), ms] }
              : o
          ),
        })),
      };
    }
    case UPDATE_MILESTONE: {
      const ms = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) => ({
          ...v,
          outcomes: v.outcomes.map((o) =>
            o._id === ms.outcome
              ? {
                  ...o,
                  milestones: o.milestones.map(m =>
                    m._id === ms._id ? ms : m
                  ),
                }
              : o
          ),
        })),
      };
    }
    case DELETE_MILESTONE: {
      const { outcomeId, milestoneId } = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) => ({
          ...v,
          outcomes: v.outcomes.map((o) =>
            o._id === outcomeId
              ? {
                  ...o,
                  milestones: o.milestones.filter(m => m._id !== milestoneId),
                }
              : o
          ),
        })),
      };
    }

    // --------------------------------------------------
    // mirror goals into byUser[].outcomes[].milestones[].goals
    // (same pattern as above)
    // --------------------------------------------------
    case CREATE_GOAL: {
      const g = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) => ({
          ...v,
          outcomes: v.outcomes.map((o) => ({
            ...o,
            milestones: o.milestones.map((m) =>
              m._id === g.milestone
                ? { ...m, goals: [...(m.goals||[]), g] }
                : m
            ),
          })),
        })),
      };
    }
    case UPDATE_GOAL: {
      const g = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) => ({
          ...v,
          outcomes: v.outcomes.map((o) => ({
            ...o,
            milestones: o.milestones.map((m) =>
              m._id === g.milestone
                ? {
                    ...m,
                    goals: m.goals.map(goal =>
                      goal._id === g._id ? g : goal
                    ),
                  }
                : m
            ),
          })),
        })),
      };
    }
    case DELETE_GOAL: {
      const { milestoneId, goalId } = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) => ({
          ...v,
          outcomes: v.outcomes.map((o) => ({
            ...o,
            milestones: o.milestones.map((m) =>
              m._id === milestoneId
                ? {
                    ...m,
                    goals: m.goals.filter(goal => goal._id !== goalId),
                  }
                : m
            ),
          })),
        })),
      };
    }

    // --------------------------------------------------
    // mirror actions into byUser[].…[].…[].actions
    // --------------------------------------------------
    case CREATE_ACTION: {
      const a = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) => ({
          ...v,
          outcomes: v.outcomes.map((o) => ({
            ...o,
            milestones: o.milestones.map((m) => ({
              ...m,
              goals: m.goals.map((g) =>
                g._id === a.goal
                  ? { ...g, actions: [...(g.actions||[]), a] }
                  : g
              ),
            })),
          })),
        })),
      };
    }
    case UPDATE_ACTION: {
      const a = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) => ({
          ...v,
          outcomes: v.outcomes.map((o) => ({
            ...o,
            milestones: o.milestones.map((m) => ({
              ...m,
              goals: m.goals.map((g) =>
                g._id === a.goal
                  ? {
                      ...g,
                      actions: g.actions.map(act =>
                        act._id === a._id ? a : act
                      ),
                    }
                  : g
              ),
            })),
          })),
        })),
      };
    }
    case DELETE_ACTION: {
      const { goalId, actionId } = action.payload;
      return {
        ...state,
        byUser: state.byUser.map((v) => ({
          ...v,
          outcomes: v.outcomes.map((o) => ({
            ...o,
            milestones: o.milestones.map((m) => ({
              ...m,
              goals: m.goals.map((g) =>
                g._id === goalId
                  ? {
                      ...g,
                      actions: g.actions.filter(act => act._id !== actionId),
                    }
                  : g
              ),
            })),
          })),
        })),
      };
    }

    // --------------------------------------------------
    default:
      return state;
  }
};

export default visionReducer;
