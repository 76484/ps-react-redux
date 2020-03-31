import * as actionTypes from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall } from "./apiStatusActions";

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
        throw error; // TODO: Handle error.
      });
  };
}
