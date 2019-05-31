import React from "react";
import LoadingScreen from "./components/LoadingScreen";
import LoginScreen from "./components/LoginScreen";
import UserScreen from "./components/UserScreen";
import RegisterScreen from "./components/RegisterScreen";
import ListPostScreen from "./components/ListPostScreen";
import PostScreen from "./components/PostScreen";
import SetCamera from "./components/SetCamera";

import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Loading: { screen: LoadingScreen},
  Login: { screen: LoginScreen },
  User: { screen: UserScreen },
  Register: { screen: RegisterScreen },
  ListPost: { screen: ListPostScreen },
  Post: { screen: PostScreen },
  SetCamera: { screen: SetCamera }
});

const AppContainer = createAppContainer(MainNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}


