import React, { Component } from 'react';
import {TouchableOpacity,Image,Text} from 'react-native';
import {Header} from "native-base";
import styles from '../src/styles';

export default class UserHeader extends Component {
    render() {
        // const { navigate } = this.props.navigation;
        return (
            <Header style={styles.userHeader}>
                <TouchableOpacity style={styles.button}>
                    <Image souce={require('../assets/post.png')} style={styles.image}/>
                    <Text>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image souce={require('../assets/camera.png')} style={styles.image}/>
                    <Text>Photo</Text>
                </TouchableOpacity>
            </Header>
        );
    }
}