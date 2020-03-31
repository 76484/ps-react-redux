import * as types from "./actionTypes";

export function apiCallError() {
  return { type: types.API_CALL_ERROR };
}

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}
