import React, { Component } from 'react';
import { StatusBar,View,StyleSheet } from 'react-native';
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

  export default class AppHeader extends Component {
    render() {
      return (
        <Container>
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
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("DrawerOpen")}
            style={{ right:-1 }}
          >
          <MIcon name="dots-vertical" size={20} color="white" />
          </Button>
          </Right>

        </Header>
        <Content>
          <Card style={{flex:0}}>
            <CardItem>
              <Body>
                <Text>Chat App to talk some awesome people!</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
      );
    }
  }

  const styles = StyleSheet.create({
    header:{
      backgroundColor:"#FF5B6C"
    }
  })
