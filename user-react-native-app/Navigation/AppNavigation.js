import React from 'react'
import { Text, Animated, Easing,View  } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
// import LoginScreen from '../Containers/LoginScreen'
// import SignupScreen from '../Containers/SignupScreen'
// import ForgottenPasswordScreen from '../Containers/ForgottenPasswordScreen'
import Screen1 from '../containers/Screen1'
import Screen2 from '../containers/Screen2'
// import Screen3 from '../Containers/Screen3'
import App from '../containers/App';
import Home from '../containers/Home';
import DrawerContainer from '../containers/DrawerContainer';
import MenuIcon from 'react-native-vector-icons/MaterialIcons';

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const DrawerStack = DrawerNavigator({
  screen1: { screen: Screen1 },
  screen2: { screen: Screen2 },
}, {
  gesturesEnabled: true,
  contentComponent: DrawerContainer,
  drawerPosition:'left',
})

const drawerButton = (navigation) =>
 <View style={{paddingLeft:11}}>
  <MenuIcon
    name="menu"
    color="rgba(255,0,0,.9)"
    size={30}
    style={{padding: 5, color: 'white'}}
    onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }
  } />
  </View>



const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'none',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#4C3E54'},
    title: 'Welcome!',
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: drawerButton(navigation)
  })
})

// login stack
const AppStack = StackNavigator({
  App: { screen: App },
  Home: { screen: Home },
//  forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: '#E73536'},
    title: 'You are in App',
    headerTintColor: 'white'
  }
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  appStack: { screen: AppStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'drawerStack',
  transitionConfig: noTransitionConfig
})

export default PrimaryNav
