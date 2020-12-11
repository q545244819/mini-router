import * as actionTypes from "./contants";

export interface IState {
  path: string;
  mode: string;
}

export const defaultState: IState = {
  path: "",
  mode: "",
};

export interface IAction {
  type: string;
  data?: string;
  path?: string;
  mode?: string;
}

function reducer(state = defaultState, action: IAction): IState {
  switch (action.type) {
    case actionTypes.CHANGE_PATH:
      return { ...state, path: action.data || '' };
    case actionTypes.CHANGE_MODE:
      return { ...state, path: action.path || '', mode: action.mode || '' };
    default:
      return state;
  }
}

export default reducer;
