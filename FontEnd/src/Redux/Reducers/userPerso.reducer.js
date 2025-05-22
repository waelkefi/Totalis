import {
    SET_USER_PERSONALITY,
    UPDATE_USER_SWOT,
} from "../Actions/userPerso.actions";

const initialState = {
    userId: null,
    type: "",
    role: "",
    description: "",
    categorie: "",
    swot: {
        forces: [],
        faiblesses: [],
        opportunites: [],
        menaces: [],
    },
};

const userPersonalityReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PERSONALITY:
            return { ...state, ...action.payload };

        case UPDATE_USER_SWOT:
            return { ...state, swot: action.payload };

        default:
            return state;
    }
};

export default userPersonalityReducer;
