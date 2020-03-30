import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: ""
    }
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          onChange={this.handleChange}
          type="text"
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

const matchDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(CoursesPage);