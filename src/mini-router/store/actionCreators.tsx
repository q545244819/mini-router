import * as actionTypes from "./contants";
import { hash2pathname } from "../utils";

interface IChangePathReturn {
  type: string;
  data: string;
}

export function changePath(data: string): IChangePathReturn {
  return {
    type: actionTypes.CHANGE_PATH,
    data,
  };
}

interface IChangeModeReturn {
  type: string;
  path: string;
  mode: string;
}

export function changeHashMode(): IChangeModeReturn {
  return {
    type: actionTypes.CHANGE_MODE,
    path: hash2pathname(window.location.hash),
    mode: actionTypes.HASH_MODE,
  };
}

export function changeHistoryMode(): IChangeModeReturn {
  return {
    type: actionTypes.CHANGE_MODE,
    path: window.location.pathname,
    mode: actionTypes.HISTORY_MODE,
  };
}
