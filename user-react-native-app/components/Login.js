import React from 'react';
import PropTypes from 'prop-types';
import { View,  Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AppHeader from './AppHeader';
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
  Input,
  InputGroup
} from 'native-base';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            auth_token: ''
        };
    }

    Signup = async () => {
        fetch('https://auth.clustername+.hasura-app.io/v1/signup', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "provider": "username",
            "data": {
            "username": this.state.username,
            "password": this.state.password
            }
            })
        }).then((response) => response.json())
        .then((res) => {
          if(typeof(res.message) != "undefined"){
          Alert.alert("Error signing up", "Error: "+ res.message);
    }
          else{
          this.setState({ auth_token: res.auth_token });
          Alert.alert("Success", "You have succesfully signed up");
          }
        }).catch((error) => {
        console.error(error);
        });
      }
      Login = async () => {
        fetch('https://auth.clustername.hasura-app.io/v1/login', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "provider": "username",
                "data": {
                    "username": this.state.username,
                    "password": this.state.password
                }
              })
            }).then((response) => response.json())
            .then((res) => {
          if(typeof(res.message) != "undefined"){
           Alert.alert("Error", "Error: "+ res.message);
          }
          else{
            this.setState({ auth_token: res.auth_token });
            Alert.alert("Welcome", " You have succesfully logged in");
            }
         }).catch((error) => {
             console.error(error);
            });
      }

    render() {
        return (
            <Container>
            <AppHeader navigation={this.props.navigation}/>
            <Content>
            <View style={styles.LoginDiv}>
            <View style={{marginBottom: 35, alignContent: 'center', flex:1}}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#2c3e50'}}>Welcome back </Text>
          </View>
                 <InputGroup style={{marginBottom:10}} boarderType='round'>
          <Icon style={{color:"black"}} name='ios-person-outline'/>
          <Input style={{color:"black"}}
            placeholder='Enter Your Email'
            onChangeText={(email) => { this.setState({
                email:email
            })}
            }
             />
        </InputGroup>
        <InputGroup style={{marginBottom:10}} boarderType='round'>
          <Icon style={{color:"black"}} name='ios-lock'/>
          <Input style={{color:"black"}}
            placeholder='Enter Your Password'
            secureTextEntry={true}
            onChangeText={(pass) => { this.setState({
                password:pass
            })}} />
        </InputGroup>
        <View style={{alignContent:'center'}}>
        <Button rounded  primary style={{marginBottom:10}} onPress={this.Login.bind(this)}><Text> Login </Text></Button> 
        </View>
            </View>
            </Content>
            </Container>
        );
    }
}

Login.propTypes = {};

const styles = StyleSheet.create({
    LoginDiv:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    }
})

export default Login;
