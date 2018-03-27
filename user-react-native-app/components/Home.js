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
  Left,
  Thumbnail,
  Button,
  Icon,
  Right,
  Spinner
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
          <View style={styles.homeTop}>
          <Text style={styles.homeHeading}>Latest Question Banks</Text>
            </View>
            {latestQbanks.isFetching === true && 
             <View style={{alignContent:'center'}}>
                  <Spinner color='green' />
               </View>
            }
            <View>
            {latestQbanks.Qbanks && latestQbanks.Qbanks.length > 0 &&
                    latestQbanks.Qbanks.map((qb,i) => {
                      return(
                        <Card key={i} style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: qb.author.picture}} />
                <Body>
                  <Text>{qb.author.fullName}</Text>
                  <Text note>{qb.createdAt}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'http://192.168.43.102:3001/questionBankImages/qBImage1521352017615React_App0.png'}} style={{height: 150, width: '100%', flex: 1, alignSelf: "stretch",}}/>
                <Text>
                 {qb.title}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
              <Right>
                <Text>{qb.questions.length} Questions</Text>
              </Right>
            </CardItem>
          </Card>
                      )
                    })
                  }
          
          </View>
        </Content>
      </Container>
      
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  homeHeading:{
     fontSize: 20,
     fontWeight: 'bold',
     textAlign:'center'
  },
  homeTop:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  }

});
