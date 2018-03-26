import React, { Component } from 'react';
import { 
  StatusBar,
  View,
  StyleSheet,
  NativeModules, 
  findNodeHandle
 } from 'react-native';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from 'native-base';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { UIManager } = NativeModules;

  export default class AppHeader extends Component {
    onError () {
      console.log('Popup Error')
    }
    
    onMenuPressed = (labels) => {
      const actions=['Login', 'Register'];
      UIManager.showPopupMenu(           // UIM.showPopupMenu(reactTag, items, error, success);
        findNodeHandle(this.refs.menu),
        actions,
        () => {},
        (result, index) => {
          //alert(actions[index])
        },
      );
    };
    render() {
      const { labels } = this.props;
      return (
        <View>
        <View>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={{ backgroundColor:"#FF5B6C", height: 24 }} />
        </View>
        <Header style={styles.header} searchBar>
        <Left>
        {this.props.navigation.state.routeName !== "Home" &&
        <Button transparent
        onPress={() => this.props.navigation.goBack()}
        >
            <Icon name='arrow-back' />
          </Button>
        }
          {this.props.navigation.state.routeName === "Home" &&
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("DrawerOpen")}
          >
            <Icon name="menu" />
          </Button>
          }
        </Left>
        <Body>
          <Title>{this.props.navigation.state.routeName}</Title>
        </Body>
        <Right>
        <Button
          transparent
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
          style={{ right:2 }}
        >
          <Icon name="search" />
        </Button>
        <View
            ref={c => this.menu = c}>
        <Button
          transparent
          onPress={() => this.onMenuPressed(labels)}
          style={{ right:-1 }}
        >
        <MIcon name="dots-vertical" size={20} color="white" ref="menu"  />
        </Button>
        </View>
        </Right>
      </Header>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    header:{
      backgroundColor:"#FF5B6C"
    }
  })
