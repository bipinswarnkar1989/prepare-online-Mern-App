import { NavigationActions } from 'react-navigation';
//import { AppNavigator } from '../components/AppNavigator';
import AppNavigation from '../Navigation/AppNavigation.js'

// Start with two routes: The Main screen, with the Login screen on top.
// const firstAction = AppNavigation.router.getActionForPathAndParams('App');
// const tempNavState = AppNavigation.router.getStateForAction(firstAction);
// const secondAction = AppNavigation.router.getActionForPathAndParams('Home');
// const initialNavState = AppNavigation.router.getStateForAction(
//   secondAction,
//   tempNavState
// );

const navReducer_ = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case 'App':
      nextState = AppNavigation.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Home':
      nextState = AppNavigation.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state
      );
      break;
    default:
      nextState = AppNavigation.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

const navReducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}

export default navReducer;
