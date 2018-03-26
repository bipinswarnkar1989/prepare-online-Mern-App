// ./user-react-native-app/components/Home.jsx
import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';
import {
  Text,
  Container,
  Content,
  Card,
  CardItem,
  Body,
} from 'native-base';

export default class Home extends Component {
  componentDidMount(){
    this.props.mappedgetLatestqBanks();
  }
  render() {
    const { latestQbanks, qbQuestionsCount, userBookMarks } = this.props.mappedQbankState;
    return (
      <Container>
        <AppHeader navigation={this.props.navigation}/>
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
  container: {
    
  }

});
