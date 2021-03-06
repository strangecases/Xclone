import * as types from "../types";

const initialState = {
    modalTestVisible: false,
    modalSectionVisible: false,
    popTestVisible: false,
    popSectionVisible: false,
    popSchoolVisible: false,
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.VISIBLE_TEST_YES:
            return { ...state, modalTestVisible: true };
        case types.VISIBLE_TEST_NO:
            return { ...state, modalTestVisible: false };
        case types.VISIBLE_SECTION_YES:
            return { ...state, modalSectionVisible: true };
        case types.VISIBLE_SECTION_NO:
            return { ...state, modalSectionVisible: false };
        case types.VISIBLE_DELETE_TEST_YES:
            return { ...state, popTestVisible: true };
        case types.VISIBLE_DELETE_TEST_NO:
            return { ...state, popTestVisible: false };
        case types.VISIBLE_DELETE_SECTION_YES:
            return { ...state, popSectionVisible: true };
        case types.VISIBLE_DELETE_SECTION_NO:
            return { ...state, popSectionVisible: false };
        case types.VISIBLE_DELETE_SCHOOL_YES:
            return { ...state, popSchoolVisible: true };
        case types.VISIBLE_DELETE_SCHOOL_NO:
            return { ...state, popSchoolVisible: false };
        default:
            return state;
    }
};

export default modalReducer;
