import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar } from 'react-native-material-ui';

export default class DrawerContainer extends React.Component {

  logout = () => {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'App' })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView style={styles.holder}>
      <View style={styles.container}>
      <View style={styles.avatar}>
                    <TouchableOpacity>
                        <Avatar size={100} image={<Image
          style={{width: 100, height: 100}}
          source={{uri: 'https://avatars2.githubusercontent.com/u/19688480?s=460&v=4'}}
        />}/>
                    </TouchableOpacity>
                    <Text style={ styles.name }>ReactAZ.com</Text>
                    <Text style={ styles.description }>(Free Version)</Text>
                </View>
        <Text
          onPress={() => navigation.navigate('App')}
          style={styles.uglyDrawerItem}>
          Screen 1
        </Text>
        <Text
          onPress={() => navigation.navigate('Screen1')}
          style={styles.uglyDrawerItem}>
          Screen 1
        </Text>
        <Text
          onPress={() => navigation.navigate('screen3')}
          style={styles.uglyDrawerItem}>
          Screen 3
        </Text>
        <Text
          onPress={this.logout}
          style={styles.uglyDrawerItem}>
          Log Out
        </Text>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  holder: {
        flex: 0.1,

    },
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  },
  avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        // backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    avatar_image: {
      width:100,
      height:100
    },
    name:{
        fontSize: 20,
        color: '#fff',

    },
    description:{
        fontSize: 16,
        color: '#fff',
        fontWeight: '400',
    },
    section_title:{
        fontSize: 16,
        fontWeight: '500',
        padding: 20,
    },
    items:{
        flex: 1,
        backgroundColor: '#fff'
    }
})
