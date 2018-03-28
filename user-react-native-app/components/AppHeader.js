import React, { Component } from 'react';
import { 
  StatusBar,
  View,
  StyleSheet,
  NativeModules, 
  findNodeHandle,
  BackHandler
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
  Right,
  Input,
  InputGroup,
  Item
} from 'native-base';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from "react-native-vector-icons/FontAwesome";

const { UIManager } = NativeModules;

  export default class AppHeader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchBar:false
      }
      this.showSearchBar = this.showSearchBar.bind(this);
      this.hideSearchBar = this.hideSearchBar.bind(this);
    }

    componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', function() {
        // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
        // Typically you would use the navigator here to go to the last state.
      
        if (this.state.searchBar !== false) {
          this.setState({
            searchBar:false
          });
          return true;
        }
        else{
          //this.goBack();
          return false;
        }
      }.bind(this));
    }
    
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
          //alert(JSON.stringify(result));
          if (result !== 'dismissed' && result === 'itemSelected') {
            this.props.navigation.navigate(actions[index])
          }else{
            return;
          }
        },
      );
    };
    showSearchBar(){
      this.setState({
        searchBar:true
      })
    }
    hideSearchBar(){
      this.setState({
        searchBar:false
      })
    }
    handleSearchInput(){

    }
    render() {
      const { labels } = this.props;
      return (
        <View>
        <View>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={{ backgroundColor:"#FF5B6C", height: 24 }} />
        </View>
        {this.state.searchBar !== true  && 
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
          <Title>{this.props.navigation.state.routeName === "Home" ?
                  "MockOnline" :
                   this.props.navigation.state.routeName
                   }</Title>
        </Body>
        <Right>
        <Button
          transparent
          onPress={this.showSearchBar}
          style={{ right:2 }}
        >
          <Icon name="search" />
        </Button>
        <View
           >
        <Button
          transparent
          onPress={() => this.onMenuPressed(labels)}
          style={{ right:-1 }}
          ref={c => this.menu = c}
        >
        <MIcon name="dots-vertical" size={20} color="white" ref="menu"  />
        </Button>
        </View>
        </Right>
      </Header>
        }

        {this.state.searchBar === true  && 
        <Header searchBar style={styles.header} >
        <View style={{flex:1,justifyContent:'flex-start',height:'100%',alignItems:'flex-start',flexDirection:'row'}}>
        <View style={{justifyContent: 'center',
    alignItems:'center',flexBasis:'10%',}}>
        <Left>
        <Button transparent
        onPress={this.hideSearchBar.bind(this)}
        >
            <Icon name='arrow-back' />
          </Button>
          </Left>
        </View>
        <View style={{flexBasis:'90%',
    opacity:0.9,
    borderRadius:7,marginTop:2,}}>
    <View style={styles.inputWrapper}>
        <InputGroup>
						<FIcon name="search" size={15} color="white"/>
						<Input 
							onFocus={()=>alert()}
							style={styles.inputSearch}
							placeholder="Search here"
              onChangeText={this.handleSearchInput.bind(this)}
              placeholderTextColor="#fff"
						/>
					</InputGroup>
          </View>
        </View>
        </View>
      </Header>
        }

      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    header:{
      backgroundColor:"#FF5B6C"
    },
    inputSearch:{
      fontSize:14,
      color:'#fff'
  },
  inputWrapper:{
    marginLeft:2,
    marginRight:2,
    marginTop:0,
    marginBottom:0,
    
},
  })
