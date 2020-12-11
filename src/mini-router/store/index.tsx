import { useReducer } from "react";
import reducer, { defaultState } from "./reducer";

function useRouterReducer() {
  return useReducer(reducer, defaultState);
}

export { reducer, useRouterReducer };
