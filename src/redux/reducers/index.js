import { combineReducers } from "redux";

import apiCallInProgress from "./apiStatusReducers";
import authors from "./authorReducer";
import courses from "./courseReducer";

const rootReducer = combineReducers({
  apiCallInProgress,
  authors,
  courses
});

export default rootReducer;
