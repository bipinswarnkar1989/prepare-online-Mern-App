// ./user-react-native-app/components/Home.jsx
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Container from './Container';
import Header from '../components/Header';

export default class Home extends Component {
  render() {
    return (
      <Container>
      <Header navigation={this.props.navigation}/>
      <View style={styles.container}>
          <Text>Home Content in Home Route</Text>
          <Text>
A single page app on the web is not an app with a single screen, that would indeed be useless most of the time; rather, it is an app that does not ask the browser to navigate to a new URL for each new screen. Instead, a single page app will use its own routing
          </Text>
      </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:30
  },
});
