import { connect } from 'react-redux';
import AddCourse from '../components/AddCourse';
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
        mappedrequestAddCourseFailed: response => dispatch(courseActions.requestAddCourseFailed(response))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
) (AddCourse);