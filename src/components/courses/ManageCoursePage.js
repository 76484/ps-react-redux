import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { getAuthors } from "../../redux/actions/authorActions";
import { getCourses, saveCourse } from "../../redux/actions/courseActions";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";
import { newCourse } from "../../../tools/mockData";

const ManageCoursePage = ({
  authors,
  course: propsCourse,
  courses,
  history,
  getAuthors,
  getCourses,
  saveCourse
}) => {
  const [course, setCourse] = useState({ ...propsCourse });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) {
      errors.title = "Title is required";
    }
    if (!authorId) {
      errors.author = "Author is required";
    }
    if (!category) {
      errors.category = "Category is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? Number(value) : value
    }));
  };

  const handleSave = event => {
    event.preventDefault();
    if (!formIsValid()) {
      return;
    }

    setIsSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Cours saved");
        history.push("/courses");
      })
      .catch(error => {
        setIsSaving(false);
        setErrors({ onSave: error.message });
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
    } else {
      setCourse({ ...propsCourse });
    }
  }, [propsCourse]);

  return authors.length && courses.length ? (
    <CourseForm
      authors={authors}
      course={course}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={isSaving}
    />
  ) : (
    <Spinner />
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

const mapStateToProps = (state, ownProps) => {
  const courseSlug = ownProps.match.params.slug;
  return {
    authors: state.authors,
    course:
      (courseSlug &&
        state.courses.find(course => course.slug === courseSlug)) ||
      newCourse,
    courses: state.courses
  };
};

const mapDispatchToProps = {
  getAuthors,
  getCourses,
  saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
