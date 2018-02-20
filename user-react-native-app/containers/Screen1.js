import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import MenuIcon from 'react-native-vector-icons/MaterialIcons';
import { ActionButton } from 'react-native-material-ui';
import { Drawer } from 'react-native-material-ui';
import Header from '../components/Header';
import Container from '../components/Container';

export default class Screen1 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Screen One',
    header: {
      visible: true,
    }
  }

  render() {
    return (
      <Container>
      <Header navigation={this.props.navigation}/>
      <View style={styles.container}>
        <Text>Screen 1</Text>
      </View>
        <ActionButton />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
