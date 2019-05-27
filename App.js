import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/Login";
import User from "./components/User";
import Register from "./components/Register";
import SetCamera from "./components/SetCamera";
import Logo from './components/Logo';

import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  User: {screen: User },
  Register: {screen: Register},
  SetCamera: {screen: SetCamera},
  Logo: {screen:Logo},
});
const App = createAppContainer(MainNavigator);
export default App;


