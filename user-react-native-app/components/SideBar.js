import React from "react";
import { AppRegistry, Image, StatusBar,StyleSheet } from "react-native";
import { View } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail,
  Badge
} from "native-base";
import OIcons from "react-native-vector-icons/Octicons";

const routes = [{title:"Home",iCon:"home"}, {title:"Screen1",iCon:"home"}];
const datas = [
  {
    name: "Home",
    route: "Home",
    icon: "home",
    bg: "#FF5B6C"
  },
  {
    name: "Screen1",
    route: "Screen1",
    icon: "easel",
    bg: "#C5F442"
  },
  {
    name: "Header",
    route: "Header",
    icon: "phone-portrait",
    bg: "#477EEA",
    types: "8"
  },
  {
    name: "Footer",
    route: "Footer",
    icon: "phone-portrait",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Badge",
    route: "NHBadge",
    icon: "notifications",
    bg: "#4DCAE0"
  },
  {
    name: "Button",
    route: "NHButton",
    icon: "radio-button-off",
    bg: "#1EBC7C",
    types: "9"
  },
  {
    name: "Card",
    route: "NHCard",
    icon: "keypad",
    bg: "#B89EF5",
    types: "5"
  },
  {
    name: "Check Box",
    route: "NHCheckbox",
    icon: "checkmark-circle",
    bg: "#EB6B23"
  },
  {
    name: "Deck Swiper",
    route: "NHDeckSwiper",
    icon: "swap",
    bg: "#3591FA",
    types: "2"
  },
  {
    name: "Fab",
    route: "NHFab",
    icon: "help-buoy",
    bg: "#EF6092",
    types: "2"
  },
  {
    name: "Form & Inputs",
    route: "NHForm",
    icon: "call",
    bg: "#EFB406",
    types: "12"
  },
  {
    name: "Icon",
    route: "NHIcon",
    icon: "information-circle",
    bg: "#EF6092"
  },
  {
    name: "Layout",
    route: "NHLayout",
    icon: "grid",
    bg: "#9F897C",
    types: "5"
  },
  {
    name: "List",
    route: "NHList",
    icon: "lock",
    bg: "#5DCEE2",
    types: "7"
  },
  {
    name: "ListSwipe",
    route: "ListSwipe",
    icon: "swap",
    bg: "#C5F442",
    types: "2"
  },
  {
    name: "Picker",
    route: "NHPicker",
    icon: "arrow-dropdown",
    bg: "#F50C75"
  },
  {
    name: "Radio",
    route: "NHRadio",
    icon: "radio-button-on",
    bg: "#6FEA90"
  },
  {
    name: "SearchBar",
    route: "NHSearchbar",
    icon: "search",
    bg: "#29783B"
  },
  {
    name: "Segment",
    route: "Segment",
    icon: "menu",
    bg: "#0A2C6B",
    types: "2"
  },
  {
    name: "Spinner",
    route: "NHSpinner",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Tabs",
    route: "NHTab",
    icon: "home",
    bg: "#AB6AED",
    types: "3"
  },
  {
    name: "Thumbnail",
    route: "NHThumbnail",
    icon: "image",
    bg: "#cc0000",
    types: "2"
  },
  {
    name: "Toast",
    route: "Toast",
    icon: "albums",
    bg: "#C5F442"
  },
  {
    name: "Typography",
    route: "NHTypography",
    icon: "paper",
    bg: "#48525D"
  }
];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
        <View style={{ backgroundColor:"#FF5B6C", height: 24 }} />
          <View style={{position:"relative"}}>
          <Image
            source={{
              uri:
                "https://raw.githubusercontent.com/mikepenz/MaterialDrawer/develop/app/src/main/res/drawable/header.jpg"
            }}
            style={{
              height: 100,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          />
          <List>
            <ListItem  avatar noBorder>
              <Left>
                <Thumbnail source={{ uri: 'https://avatars2.githubusercontent.com/u/19688480?s=460&v=4' }} />
              </Left>
              <Body>
                <Text style={styles.userFullName}>Bipin Swarnkar</Text>
                <Text style={styles.userNote} note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                {/* <Text note>3:43 pm</Text>*/}
              </Right>
            </ListItem>
          </List>
          </View>
        {  /*<Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20
            }}
            resizeMode="contain"
            source={{
              uri:"https://avatars2.githubusercontent.com/u/19688480?s=460&v=4"
              // uri:
              //   "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png"
            }}
          /> */}
          <View style={styles.menuList}>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  userFullName:{
    color:'white',
    fontWeight:'bold',
    backgroundColor:"#FF5B6C"
  },
  userNote:{
    color:'white',
    backgroundColor:"#FF5B6C"
  },
  menuIcon:{
    paddingRight:10
  },
  menuTitle:{
    color:'#6d4c41',
    fontWeight:'bold'
  },
  menuList:{
     paddingTop:10,
     marginTop:10
  },
  

})
