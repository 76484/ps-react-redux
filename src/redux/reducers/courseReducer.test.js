import courseReducer from "./courseReducer";
import * as types from "../actions/actionTypes";

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  const initialState = [
    {
      title: "A"
    },
    {
      title: "B"
    }
  ];

  const newCourse = {
    title: "C"
  };

  const newState = courseReducer(initialState, {
    type: types.CREATE_COURSE_SUCCESS,
    course: newCourse
  });

  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("should update course when passed UPDATE_COURSE_SUCCESS", () => {
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" }
  ];

  const course = { id: 2, title: "New Title" };
  const newState = courseReducer(initialState, {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  });
  const updatedCourse = newState.find(
    nextCourse => nextCourse.id === course.id
  );
  const untouchedCourse = newState.find(nextCourse => nextCourse.id === 1);

  expect(updatedCourse.title).toEqual("New Title");
  expect(untouchedCourse.title).toEqual("A");
  expect(newState.length).toEqual(3);
});
