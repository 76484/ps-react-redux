import * as actionTypes from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function getAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch({
          type: actionTypes.GET_AUTHORS_SUCCESS,
          authors
        });
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
