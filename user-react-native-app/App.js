import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

//import AppWithNavigationState from './components/AppNavigator';
// We're going to use navigation with redux
import ReduxNavigation from './Navigation/ReduxNavigation'

import { COLOR, ThemeProvider } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

const store = configureStore();


export default class App extends Component {
  render() {
   return (
     <Provider store={store}>
     <ThemeProvider uiTheme={uiTheme}>
       <ReduxNavigation />
         </ThemeProvider>
     </Provider>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
