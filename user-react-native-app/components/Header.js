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
      Badge,
      IconToggle,
      Button
  } from 'react-native-material-ui';
  import { MIcon } from 'react-native-vector-icons/MaterialIcons';

  export default class Header extends Component {
    render() {
      return (
        <View>
        <StatusBar translucent={false} barStyle="light-content"/>
        <View style={{ backgroundColor: COLOR.blue400, height: 24 }} />
      {this.props.navigation.state.routeName !== "Home" &&
      <Toolbar
                  leftElement="arrow-back"
                  onLeftElementPress={() => this.props.navigation.goBack()}
                  centerElement={this.props.navigation.state.routeName}
                  rightElement={
                    <View style={{top: 5, right: -1}}>
                    <Button
                                text="Save"
                                style={{ text: { color: 'white' } }}
                                onPress={() => alert()}
                            />
                    </View>
                        }
                  searchable={{
                      autoFocus: true,
                      placeholder: 'Search',
                      onChangeText: value => this.setState({ searchText: value }),
                      onSearchClosed: () => this.setState({ searchText: '' })
                }}
                  style={{
                            container: { backgroundColor: COLOR.blue400 },
                            rightElement: { color: COLOR.white,left:10 },
                        }}
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
                      onSearchClosed: () => this.setState({ searchText: '' })
                  }}
                  rightElement={<Badge text="9" style={{ container: {top: 2, right: -1} }} >
                   <IconToggle
                    name="notifications-active"
                    color="#ffffff"
                    onPress={() => alert()}
                  />
                </Badge>
              }
                  style={{
                            container: { backgroundColor: COLOR.blue400 },
                            rightElement: { color: COLOR.white },
                        }}
              />
        }

              </View>

      );
    }
  }
