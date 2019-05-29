import React, { Component } from 'react';
import { View,FlatList } from 'react-native';
import { Content } from "native-base";
import UserContentHeader from "../components/UserContentHeader";
import styles from '../src/styles';

export default class UserContent extends Component {
    render() {
        return (
            <Content>
                <UserContentHeader/>
                <FlatList></FlatList>
            </Content>
        );
    }
}


