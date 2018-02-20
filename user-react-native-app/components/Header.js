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
   StatusBar,

  } from 'react-native';
  import {
      ActionButton,
      Avatar,
      ListItem,
      Toolbar,
      BottomNavigation,
      Icon,
      COLOR,
      Button
  } from 'react-native-material-ui';
  import { MIcon } from 'react-native-vector-icons/MaterialIcons';

  export default class Header extends Component {
    render() {
      return (
        <View>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={{ backgroundColor: COLOR.green500, height: 24 }} />
      {this.props.navigation.state.routeName !== "Home" &&
      <Toolbar
                  leftElement="arrow-back"
                  onLeftElementPress={() => this.props.navigation.goBack()}
                  centerElement={this.props.navigation.state.routeName}
                  rightElement={
                            <Button
                                text="Save"
                                style={{ text: { color: 'white' } }}
                                onPress={() => alert()}
                            />
                        }
              />
      }
      {this.props.navigation.state.routeName === "Home" &&
        <Toolbar
                  key="toolbar"
                  leftElement="menu"
                  onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
                  centerElement={this.props.navigation.state.routeName}
                  searchable={{
                      autoFocus: true,
                      placeholder: 'Search',
                      onChangeText: value => this.setState({ searchText: value }),
                      onSearchClosed: () => this.setState({ searchText: '' }),
                  }}
              />
        }

              </View>

      );
    }
  }
