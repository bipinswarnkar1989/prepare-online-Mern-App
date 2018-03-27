import React from 'react';
import PropTypes from 'prop-types';
import { View,  Alert, TextInput, TouchableOpacity } from 'react-native';
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
  Right
} from 'native-base';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            auth_token: ''
        };
    }

    Signup = async () => {

    }

    Login = async () => {

    }

    render() {
        return (
            <Container>
            <AppHeader navigation={this.props.navigation}/>
            <Content>
              <View>
     <TextInput
           placeholder="Enter User name"
           onChangeText={ TextInputValue =>
           this.setState({username : TextInputValue }) }
           underlineColorAndroid='transparent'
           style={
           {
               textAlign: 'center',
               width: '90%',
               marginBottom: 7,
               height: 40,
               borderRadius: 5 ,
               fontSize: 20,
           }
         }
         />
     <TextInput
           placeholder="Enter password"
           onChangeText={ TextInputValue =>
           this.setState({password: TextInputValue }) }
           underlineColorAndroid='transparent'
           secureTextEntry={true}
           style={
           {
               textAlign: 'center',
               width: '90%',
               marginBottom: 7,
               height: 40,
               borderRadius: 5 ,
               fontSize: 20,
           }
         }
         />
        <TouchableOpacity onPress={this.Signup.bind(this)}>
        <View style={{height: 50, backgroundColor:
        'purple',justifyContent: 'center',
        alignItems: 'center',}}>
          <Text style={{
          fontSize: 20,
          color: '#FFFFFF',
          }}> 
          Signup</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.Login.bind(this)}>
        <View style={{height: 50, backgroundColor:
        'purple',justifyContent: 'center',
        alignItems: 'center',}}>
          <Text style={{
          fontSize: 20,
          color: '#FFFFFF',
          }}> 
          Login </Text>
        </View>
        </TouchableOpacity>
     </View>
     </Content>
      </Container>
        );
    }
}

Login.propTypes = {};

export default Login;
