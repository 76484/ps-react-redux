import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAuthors } from "../../redux/actions/authorActions";
import { getCourses } from "../../redux/actions/courseActions";

class ManageCoursePage extends React.Component {
  static propTypes = {
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    courses: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAuthors: PropTypes.func.isRequired,
    getCourses: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { authors, courses, getAuthors, getCourses } = this.props;

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
  }

  render() {
    return (
      <>
        <h2>Manage Course</h2>
      </>
    );
  }
}

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
