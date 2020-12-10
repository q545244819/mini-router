import * as actionTypes from "./contants";
import { hash2pathname } from "../utils";

export function changePath(data) {
  return {
    type: actionTypes.CHANGE_PATH,
    data,
  };
}

export function changeHashMode() {
  return {
    type: actionTypes.CHANGE_MODE,
    path: hash2pathname(window.location.hash),
    mode: actionTypes.HASH_MODE,
  };
}

export function changeHistoryMode() {
  return {
    type: actionTypes.CHANGE_MODE,
    path: window.location.pathname,
    mode: actionTypes.HISTORY_MODE,
  };
}
