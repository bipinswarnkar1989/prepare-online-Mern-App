import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   View,
   ToastAndroid,
   ScrollView,
   Platform,
   Animated,
   Easing,
   StatusBar
  } from 'react-native';
  import {
      ActionButton,
      Avatar,
      ListItem,
      Toolbar,
      BottomNavigation,
      Icon,
      COLOR,
  } from 'react-native-material-ui';

  export default class Header extends Component {
    render() {
      return (
        <View>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={{ backgroundColor: COLOR.green500, height: 24 }} />
        <Toolbar
                  key="toolbar"
                  leftElement="menu"
                  onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
                  centerElement="Home"
                  searchable={{
                      autoFocus: true,
                      placeholder: 'Search',
                      onChangeText: value => this.setState({ searchText: value }),
                      onSearchClosed: () => this.setState({ searchText: '' }),
                  }}
              />
              </View>

      );
    }
  }
