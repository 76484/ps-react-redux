import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as authorActions from "../../redux/actions/authorActions";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

import CourseList from "./CourseList";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    courses: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { authors, courses, actions } = this.props;

    if (authors.length === 0) {
      actions.getAuthors().catch(error => {
        alert(`Loading authors failed: ${error}`);
      });
    }

    if (courses.length === 0) {
      actions.getCourses().catch(error => {
        alert(`Loading courses failed: ${error}`);
      });
    }
  }

  handleDeleteCourse = course => {
    toast.success("Course deleted");
    this.props.actions.deleteCourse(course).catch(error => {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        <h2>Courses</h2>
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <>
            <Link
              className="btn btn-primary add-course"
              style={{ marginBottom: 20 }}
              to="/course"
            >
              Add Course
            </Link>
            <CourseList
              courses={this.props.courses || []}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    authors: state.authors,
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    isLoading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
      getAuthors: bindActionCreators(authorActions.getAuthors, dispatch),
      getCourses: bindActionCreators(courseActions.getCourses, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
