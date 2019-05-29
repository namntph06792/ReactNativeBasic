import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';
import styles from '../src/styles';

export default class UserContentHeader extends Component {

    render(){
        return(
            <View style={styles.userHeader}>
                <TouchableOpacity style={styles.button}>
                    <Image source={require('../assets/post.png')} style={styles.image} />
                    <Text>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Image source={require('../assets/camera.png')} style={styles.image} />
                    <Text>Photo</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

