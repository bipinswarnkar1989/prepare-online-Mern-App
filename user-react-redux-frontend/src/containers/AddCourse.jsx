import { connect } from 'react-redux';
import AddCourse from '../components/AddCourse';
import * as userActions from '../actions/userActions';
import * as videoActions from '../actions/videoActions';

const mapStateToProps = (state) => {
    return {
        mappedUserState:state.userState,
        mappedVideoState:state.videoState,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mappedfetchUserIfLoggedIn: () => dispatch(userActions.fetchUserIfLoggedIn()),
        mappedrequestUploadVideo: () => dispatch(videoActions.requestUploadVideo()),
        mappedsuccessUploadVideo: response => dispatch(videoActions.successUploadVideo(response)),
        mappedfailedUploadVideo: response => dispatch(videoActions.failedUploadVideo(response))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
) (AddCourse);