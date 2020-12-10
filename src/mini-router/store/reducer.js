import * as actionTypes from "./contants";

export const defaultState = {
  path: "",
  mode: null,
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PATH:
      return { ...state, path: action.data };
    case actionTypes.CHANGE_MODE:
      return { ...state, path: action.path, mode: action.mode };
    default:
      return state;
  }
}

export default reducer;
