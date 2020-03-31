import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function getCourses() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch({
          type: types.GET_COURSES_SUCCESS,
          courses
        });
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch({
              type: types.UPDATE_COURSE_SUCCESS,
              course: savedCourse
            })
          : dispatch({
              type: types.CREATE_COURSE_SUCCESS,
              course: savedCourse
            });
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
