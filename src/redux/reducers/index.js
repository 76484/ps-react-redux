import { combineReducers } from "redux";

import apiCallsInProgress from "./apiStatusReducers";
import authors from "./authorReducer";
import courses from "./courseReducer";

const rootReducer = combineReducers({
  apiCallsInProgress,
  authors,
  courses
});

export default rootReducer;
