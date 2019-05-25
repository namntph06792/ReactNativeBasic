import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/Login";
import User from "./components/User";

import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Login: { screen: Login},
  User: { screen: User }
});
const App = createAppContainer(MainNavigator);
export default App;


