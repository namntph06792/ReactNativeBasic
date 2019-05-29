import React from "react";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./components/LoginScreen";
import UserScreen from "./components/UserScreen";
import RegisterScreen from "./components/RegisterScreen";
import ListPostScreen from "./components/ListPostScreen";
import PostScreen from "./components/PostScreen";

import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen},
  User: { screen: UserScreen },
  Register: { screen: RegisterScreen},
  ListPost: { screen: ListPostScreen},
  Post: { screen: PostScreen}
});

const App = createAppContainer(MainNavigator);
export default App;


