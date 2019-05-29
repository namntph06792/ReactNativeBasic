import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
} from 'react-native';
import styles from '../src/styles';
import { View } from 'native-base';

export default class PostScreen extends Component {
    static navigationOptions = {
        title: "Post",
        headerRight: (
            <TouchableOpacity activeOpacity={0.5}>
                <Image
                    source={require('../assets/hamburger.png')}
                    style={{ width: 25, height: 25 }}
                />
            </TouchableOpacity>
        ),
        // header: null
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

            </View>
        );
    }
}
