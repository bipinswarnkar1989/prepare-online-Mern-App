// ./user-react-native-app/components/Home.jsx
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Container from './Container';
import Header from '../components/Header';

export default class Home extends Component {
  render() {
    return (
      <Container>
      <Header navigation={this.props.navigation}/>
      <ScrollView>
      <View style={styles.container}>
      <Image
      resizeMode="contain"
         style={{width: 400, height: 400}}
         source={{uri: 'https://scontent.fbho1-1.fna.fbcdn.net/v/t1.0-9/1935820_1080518951981580_9166413032173843073_n.jpg?oh=480f013820967e2ccb9675c9ef6cf3a5&oe=5B4DEA06'}}
       />
          <Text>Home Content in Home Route</Text>
          <Text>
A single page app on the web is not an app with a single screen, that would indeed be useless most of the time; rather, it is an app that does not ask the browser to navigate to a new URL for each new screen. Instead, a single page app will use its own routing
          </Text>

      </View>
      </ScrollView>
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
  canvas: {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}
});
