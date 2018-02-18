// ./user-react-native-app/components/App.jsx
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class App extends Component {
  navigate(){
    this.props.mappedNavigate('Home');
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>App.js</Text>
          <Button
        onPress={() =>
          this.navigate()}
        title="Home"
      />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
