import * as actionTypes from "./contants";

export const defaultState = {
  path: "",
  mode: null,
  exactSet: new Set(),
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PATH:
      return { ...state, path: action.data };
    case actionTypes.CHANGE_MODE:
      return { ...state, path: action.path, mode: action.mode };
    case actionTypes.ADD_EXACT_ITEM:
      state.exactSet.add(action.data);
      return { ...state };
    case actionTypes.DELETE_EXACT_ITEM:
      state.exactSet.delete(action.data);
      return { ...state };
    default:
      return state;
  }
}

export default reducer;
