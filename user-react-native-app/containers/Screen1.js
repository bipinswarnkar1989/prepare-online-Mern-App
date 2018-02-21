import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import AppHeader from '../components/AppHeader';
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
      <AppHeader navigation={this.props.navigation}/>
      <View style={styles.container}>
        <Text>Screen 1</Text>
      </View>
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
