import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
   } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar,ListItem, Subheader, Toolbar,COLOR, Card } from 'react-native-material-ui';
import PropTypes from 'prop-types';



 class DrawerContainer extends React.Component {

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
          <Avatar size={100} image={<Image
          style={{width: 100, height: 100}} resizeMode="contain"
          source={{uri: 'https://avatars2.githubusercontent.com/u/19688480?s=460&v=4'}}
        />}/>

                </View>

      <View style={styles.menuView}>
      <Text style={ styles.DLogo }>Bipin Swarnkar</Text>
                    <ListItem
                        divider
                        centerElement={{
                            primaryText: 'Home',
                        }}
                        style={{
                            color: 'white',backgroundColor:'#64b5f6'
                        }}
                        onPress={() => navigation.navigate('Screen1')}
                    />
                    <ListItem
                        divider
                        centerElement={{
                            primaryText: 'Screen',
                        }}
                        onPress={() => navigation.navigate('Screen1')}
                    />
                    <ListItem
                        divider
                        centerElement={{
                            primaryText: 'Screen1',
                        }}
                        onPress={() => navigation.navigate('Screen1')}
                    />
                    <ListItem
                        divider
                        centerElement={{
                            primaryText: 'Scree2',
                        }}
                        onPress={() => navigation.navigate('Screen1')}
                    />
                    <ListItem
                        divider
                        centerElement={{
                            primaryText: '',
                        }}/>

        </View>
        </View>
      </ScrollView>
    )
  }
}


export default DrawerContainer;

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
  menuView:{
    backgroundColor:COLOR.blue400,
  },
  DLogo:{
    color:'white',
    padding:10,
    fontSize: 15,
  },
  avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 110,
        flex: 0.1,
        // backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    avatar_image: {
      width:100,
      height:100
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
