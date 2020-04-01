import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as types from "./actions/actionTypes";

it("Should handle creating courses", () => {
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Clean Code"
  };

  store.dispatch({
    type: types.CREATE_COURSE_SUCCESS,
    course
  });

  const createdCourse = store.getState().courses[0];

  expect(createdCourse).toEqual(course);
});
