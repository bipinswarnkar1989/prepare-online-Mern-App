import { connect } from 'react-redux';
import AddCourse from '../components/AddCourse';
import * as userActions from '../actions/userActions';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mappedfetchUserIfLoggedIn: () => dispatch(userActions.fetchUserIfLoggedIn()),
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
) (AddCourse);