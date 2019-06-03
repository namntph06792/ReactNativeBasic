import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import {
    Card,
    CardItem,
    Text,
} from "native-base";
import Swipeout from 'react-native-swipeout';
import styles from '../src/styles';
import { firebaseApp } from '../components/FirebaseConfig';

export default class ListPostItem extends Component {

    constructor(props) {
        super(props);
    }

    updateData(title, content, like, comment) {
        firebaseApp.database().ref('posts/').set({
            title: title,
            content: content,
            like: like,
            comment: comment
        }, function (error) {
            if (error) {
                // The write failed...
                alert('Loi')
            } else {
                // Data saved successfully!
                alert('Thanh cong!!!')
            }
        });
    }

    deleteData(id) {
        firebaseApp.database().ref('posts/' + id).remove();
    }

    render() {
        let swipeButtonOptions = [
            {
                text: 'Edit',
                backgroundColor: 'blue',
                underlayColor: '#8ED1FC',
                onPress: () => {this.editPost()}
            },
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: '#8ED1FC',
                onPress: () => { this.deleteData(this.props.dat.id) }
            }
        ]
        return (
            <Swipeout right={swipeButtonOptions} autoClose={true} backgroundColor='transparent'>
                <TouchableHighlight underlayColor='#8ED1FC'>
                    <Card style={styles.item}>
                        <CardItem cardBody>
                            <Text>{this.props.dat.title}</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Text note>{this.props.dat.content}</Text>
                        </CardItem>
                    </Card>
                </TouchableHighlight>
            </Swipeout>
        );
    }
}