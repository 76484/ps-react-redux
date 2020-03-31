import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function apiCallStatusReducer(
  state = initialState.apiCallInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (action.type.endsWith("_SUCCESS")) {
    return state - 1;
  }
}
