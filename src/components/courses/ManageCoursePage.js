import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAuthors } from "../../redux/actions/authorActions";
import { getCourses, saveCourse } from "../../redux/actions/courseActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

const ManageCoursePage = ({
  authors,
  course: initialCourse,
  courses,
  history,
  getAuthors,
  getCourses,
  saveCourse
}) => {
  const [course, setCourse] = useState({ ...initialCourse });
  const [errors, setErrors] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? Number(value) : value
    }));
  };

  const handleSave = event => {
    event.preventDefault();
    saveCourse(course)
      .then(() => {
        history.push("/courses");
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (authors.length === 0) {
      getAuthors().catch(error => {
        alert(`Loading authors failed: ${error}`);
      });
    }

    if (courses.length === 0) {
      getCourses().catch(error => {
        alert(`Loading courses failed: ${error}`);
      });
    }
  }, []);

  return (
    <CourseForm
      authors={authors}
      course={course}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};

ManageCoursePage.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  course: PropTypes.object.isRequired,
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
  getAuthors: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    authors: state.authors,
    course: newCourse,
    courses: state.courses
  };
};

const mapDispatchToProps = {
  getAuthors,
  getCourses,
  saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
