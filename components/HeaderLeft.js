import React, { Component } from 'react';
import {Button } from 'react-native';
import { firebaseApp } from '../components/FirebaseConfig';

export default class HeaderLeft extends Component{
    render(){
        return(
            <Button
                onPress={firebaseApp.auth().signOut()}
                title="< Log out"
            />
        )
    }
}