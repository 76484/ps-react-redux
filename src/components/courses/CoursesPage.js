import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  componentDidMount() {
    this.props.actions.getCourses().catch(error => {
      alert(`Loading courses failed: ${error}`);
    });
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses || []} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
