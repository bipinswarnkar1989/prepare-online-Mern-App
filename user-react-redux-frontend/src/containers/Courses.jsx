import { connect } from 'react-redux';
import Courses from '../components/Courses';
import * as userActions from '../actions/userActions';
import * as videoActions from '../actions/videoActions';
import * as courseActions from '../actions/courseActions';

const mapStateToProps = (state) => {
    return {
        mappedUserState:state.userState,
        mappedVideoState:state.videoState,
        mappedcourseState:state.courseState,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mappedfetchUserIfLoggedIn: () => dispatch(userActions.fetchUserIfLoggedIn()),
        mappedrequestUploadVideo: () => dispatch(videoActions.requestUploadVideo()),
        mappedsuccessUploadVideo: response => dispatch(videoActions.successUploadVideo(response)),
        mappedfailedUploadVideo: response => dispatch(videoActions.failedUploadVideo(response)),
        mappedrequestAddCourse: () => dispatch(courseActions.requestAddCourse()),
        mappedrequestAddCourseSuccess: response => dispatch(courseActions.requestAddCourseSuccess(response)),
        mappedrequestAddCourseFailed: response => dispatch(courseActions.requestAddCourseFailed(response)),
        mappedrequestGetCourses: () => dispatch(courseActions.requestGetCourses()),
        mappedrequestGetCoursesSuccess: response => dispatch(courseActions.requestGetCoursesSuccess(response)),
        mappedrequestGetCoursesFailed:response => dispatch(courseActions.requestGetCoursesFailed(response)),
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
) (Courses);