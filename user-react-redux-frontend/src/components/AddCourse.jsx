import React from 'react';
import PropTypes from 'prop-types';

class AddCourse extends React.Component {
    componentWillMount(){
        this.props.mappedfetchUserIfLoggedIn();
      }
    render() {
        return (
            <div>Add Course</div>
        );
    }
}

AddCourse.propTypes = {};

export default AddCourse;
