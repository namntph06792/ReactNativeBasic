import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
} from 'react-native';
import styles from '../src/styles';
import firebase from 'firebase';

export default class LoadingScreen extends Component{

    static navigationOptions = {
        header: null,
    }

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn(){
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                this.props.navigation.navigate('ListPost');
            }else{
                this.props.navigation.navigate('Login');
            }
        }.bind(this))
    }

    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }
}