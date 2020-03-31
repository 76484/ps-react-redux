import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAuthors } from "../../redux/actions/authorActions";
import { getCourses } from "../../redux/actions/courseActions";

const ManageCoursePage = ({ authors, courses, getAuthors, getCourses }) => {
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
    <>
      <h2>Manage Course</h2>
    </>
  );
};

ManageCoursePage.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAuthors: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    authors: state.authors,
    courses: state.courses
  };
};

const mapDispatchToProps = {
  getAuthors,
  getCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
