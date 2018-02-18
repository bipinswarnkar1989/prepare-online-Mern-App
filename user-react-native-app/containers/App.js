// ./user-react-redux-frontend/src/containers/App.js
import { connect } from 'react-redux';
import App from '../components/App';
import { NavigationActions } from 'react-navigation';
//map state to props
const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mappedNavigate: screen => dispatch(NavigationActions.navigate({ routeName: screen }))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
