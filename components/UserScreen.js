import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Container
} from "native-base";
// import UserHeader from "./UserHeader";
import UserContent from "./UserContent";
import UserFooter from "./UserFooter";

export default class UserScreen extends Component {
  static navigationOptions = {
    headerTitle: (
      <Image 
        source={require('../assets/react-native-logo.png')}
        style={{width: 30,height: 30}}
      />
    ),
    headerRight: (
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
        <UserContent/>
        <UserFooter/>
      </Container>
    );
  }
}
