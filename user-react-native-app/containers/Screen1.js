import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import MenuIcon from 'react-native-vector-icons/MaterialIcons';

export default class Screen1 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Screen One',
    header: {
      visible: true,
    },
    drawerIcon: () => (
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
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Screen 1</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
