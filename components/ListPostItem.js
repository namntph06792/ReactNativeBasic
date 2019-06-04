import React, { Component } from 'react';
import {
    TouchableHighlight,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
} from 'react-native';
import Dialog, { DialogFooter, DialogButton,SlideAnimation,DialogTitle,DialogContent} from 'react-native-popup-dialog';
import {
    Card,
    CardItem,
    Text,
    View,
} from "native-base";
import Swipeout from 'react-native-swipeout';
import styles from '../src/styles';
import { firebaseApp } from '../components/FirebaseConfig';

export default class ListPostItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            title: '',
            content: '',
            like: '',
            comment: '',
        }
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

    editPost(){
        
    }

    render() {
        const slideAnimation = new SlideAnimation({
            initialValue: 0, // optional
            slideFrom: 'bottom', // optional
            useNativeDriver: true, // optional
        })
        let swipeButtonOptions = [
            {
                text: 'Edit',
                backgroundColor: 'blue',
                underlayColor: '#8ED1FC',
                onPress: () => {this.setState({visible:true})}
            },
            {
                text: 'Delete',
                backgroundColor: 'red',
                underlayColor: '#8ED1FC',
                onPress: () => { this.deleteData(this.props.dat.id) }
            }
        ]
        return (
            <View>
                <Swipeout right={swipeButtonOptions} autoClose={true} backgroundColor='transparent'>
                    <TouchableHighlight underlayColor='#8ED1FC'>
                    <Card style={styles.post_item}>
                        <CardItem cardBody>
                            <Text>{this.props.dat.title}</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Text note>{this.props.dat.content}</Text>
                        </CardItem>
                    </Card>
                </TouchableHighlight>
                </Swipeout>
                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {this.setState({visible:false});}}
                    dialogTitle={<DialogTitle title='Edit post' />}
                    dialogAnimation={slideAnimation}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                onPress={() => { this.setState({ visible: false }); }}
                            />
                            <DialogButton
                                text="OK"
                                onPress={() => { }}
                            />
                        </DialogFooter>
                    }
                    >
                    <DialogContent>
                        <KeyboardAvoidingView behavior="padding" style={styles.edit_post_container}>
                            <TouchableWithoutFeedback
                                style={styles.post_container}
                                onPress={Keyboard.dismiss}>
                                <View style={styles.loginInfo}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.password.focus()}
                                        onChangeText={(title) => this.setState({ title })}
                                        value={this.state.title}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.password.focus()}
                                        onChangeText={(content) => this.setState({ content })}
                                        value={this.state.content}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                        keyboardType="numeric"
                                        returnKeyType="next"
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.password.focus()}
                                        onChangeText={(like) => this.setState({ like })}
                                        value={this.state.like}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                        keyboardType="numeric"
                                        returnKeyType="go"
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.password.focus()}
                                        onChangeText={(comment) => this.setState({ comment })}
                                        value={this.state.comment}
                                    />
                                    <TouchableOpacity style={styles.btnSubmit} onPress={() => this.saveToFirebase()}>
                                        <Text style={styles.textButtonSubmit}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}