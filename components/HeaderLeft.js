import React, { Component } from 'react';
import {Button } from 'react-native';
import firebase from 'firebase';

export default class HeaderLeft extends Component{
    render(){
        return(
            <Button
                onPress={firebase.auth().signOut()}
                title="< Log out"
            />
        )
    }
}