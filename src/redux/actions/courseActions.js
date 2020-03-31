import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function getCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch({
          type: types.GET_COURSES_SUCCESS,
          courses
        });
      })
      .catch(error => {
        throw error; // TODO: Handle error
      });
  };
}

export function saveCourse(course) {
  return function(dispatch) {
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
        throw error;
      });
  };
}
