import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import AppWithNavigationState from './components/AppNavigator';

const store = configureStore();


export default class App extends Component {
  render() {
   return (
     <Provider store={store}>
       <AppWithNavigationState />
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
