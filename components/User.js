import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Container
} from "native-base";
// import UserHeader from "../components/UserHeader";
import UserContent from "../components/UserContent";
import UserFooter from "../components/UserFooter";

export default class User extends Component {
  static navigationOptions = {
    title: "User",
    headerRight:(
      <TouchableOpacity activeOpacity={0.5}>
        <Image
          source={require('../assets/hamburger.png')}
          style={{width:25,height:25}}
        />
        </TouchableOpacity>
    ),
    // header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        {/* <UserHeader/> */}
        <UserContent/>
        <UserFooter/>
      </Container>
    );
  }
}
