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
            title: '',
            content: '',
            like: '',
            comment: '',
            visible: false,
        }
    }

    updateData(title, content, like, comment) {
        firebaseApp.database().ref('posts/').set({
            title: this.state.title,
            content: this.state.content,
            like: this.state.like,
            comment: this.state.comment
        }, function (error) {
            if (error) {
                // The write failed...
                alert('Loi')
            } else {
                // Data saved successfully!
                alert('Thanh cong!!!')
            }
        });
        this.setState({
            title: '',
            content: '',
            like: '',
            comment: '',
        });
    }

    deleteData(id) {
        firebaseApp.database().ref('posts/' + id).remove();
    }

    async hidePopup(){
        await this.setState({visible:false});
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
                onPress: () => {
                    this.setState({
                        visible:true
                    })}
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
                                bordered
                                onPress={() => { this.hidePopup()}}
                                key = "button - 1"
                            />
                            <DialogButton
                                text="SAVE"
                                bordered
                                onPress={() => { this.updateData()}}
                                key = "button - 2"
                            />
                        </DialogFooter>
                    }
                    >
                    <DialogContent>
                        <KeyboardAvoidingView behavior="padding" style={styles.edit_post_container}>
                            <TouchableWithoutFeedback
                                style={styles.edit_post_container}
                                onPress={Keyboard.dismiss}>
                                <View style={styles.loginInfo}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                        keyboardType="default"
                                        returnKeyType="next"
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.content.focus()}
                                        onChangeText={(title) => this.setState({ title })}
                                        placeholder={this.props.dat.title}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                        keyboardType="default"
                                        returnKeyType="next"
                                        autoCorrect={false}
                                        ref={input => (this.content = input)}
                                        onSubmitEditing={() => this.like.focus()}
                                        onChangeText={(content) => this.setState({ content })}
                                        placeholder={this.props.dat.content}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                        keyboardType="numbers-and-punctuation"
                                        returnKeyType="next"
                                        autoCorrect={false}
                                        ref={input => (this.like = input)}
                                        onSubmitEditing={() => this.comment.focus()}
                                        onChangeText={(like) => this.setState({ like })}
                                        placeholder={this.props.dat.like}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                        keyboardType="numbers-and-punctuation"
                                        returnKeyType="go"
                                        autoCorrect={false}
                                        ref={input => (this.comment = input)}
                                        onChangeText={(comment) => this.setState({ comment })}
                                        placeholder={this.props.dat.comment}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}