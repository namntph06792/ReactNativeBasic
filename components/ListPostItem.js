import React, { Component } from 'react';
import {
    TouchableHighlight,
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
import FlashMessage from "react-native-flash-message"; ``

export default class ListPostItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            like: '',
            comment: '',
            visible: false,
        }
    }

    validatePost(){
        space = /^\s*$/;
        regP = /\d+/;
        const { title, content, like, comment } = this.state;
        if (space.test(title)) {
            this.refs.post.showMessage({
                message: 'Error',
                description: 'Please input title !',
                type: 'warning',
            });
        } else if (space.test(content)) {
            this.refs.post.showMessage({
                message: 'Error',
                description: 'Please input content !',
                type: 'warning',
            });
        } else if (space.test(like) || !regP.test(like)) {
            this.refs.post.showMessage({
                message: 'Error',
                description: 'Please input like !',
                type: 'warning',
            });
        } else if (space.test(comment) || !regP.test(comment)) {
            this.refs.post.showMessage({
                message: 'Error',
                description: 'Please input comment !',
                type: 'warning',
            });
        } else {
            this.updateData();
        }
    }

    updateData() {
        firebaseApp.database().ref('posts/' + this.state.id).set({
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
            visible: false,
        });
    }

    deleteData(id) {
        firebaseApp.database().ref('posts/' + id).remove();
    }

    async hidePopup(){
        await this.setState({visible:false});
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
                        id: this.props.dat.id,
                        title: this.props.dat.title,
                        content: this.props.dat.content,
                        like: this.props.dat.like,
                        comment: this.props.dat.comment,
                        visible:true
                    })},
                style:{height:90}
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
                <FlashMessage ref='login' position='top' hideOnPress={true} autoHide={false} animated={true} />
                <Swipeout 
                    right={swipeButtonOptions} 
                    autoClose={true} 
                    backgroundColor='transparent'
                    sensitivity={80}
                    buttonWidth={65}
                    >
                    <TouchableHighlight underlayColor='#8ED1FC' >
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
                    height={300}
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
                            />
                            <DialogButton
                                text="SAVE"
                                bordered
                                onPress={() => { this.validatePost()}}
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
                                        placeholder="Title"
                                        placeholderTextColor="#d9e3f0"
                                        keyboardType="default"
                                        returnKeyType="next"
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.content.focus()}
                                        onChangeText={(title) => this.setState({ title })}
                                        value={this.state.title}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Content"
                                        placeholderTextColor="#d9e3f0"
                                        keyboardType="default"
                                        returnKeyType="next"
                                        autoCorrect={false}
                                        ref={input => (this.content = input)}
                                        onSubmitEditing={() => this.like.focus()}
                                        onChangeText={(content) => this.setState({ content })}
                                        value={this.state.content}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Like"
                                        placeholderTextColor="#d9e3f0"
                                        keyboardType="numbers-and-punctuation"
                                        returnKeyType="next"
                                        autoCorrect={false}
                                        ref={input => (this.like = input)}
                                        onSubmitEditing={() => this.comment.focus()}
                                        onChangeText={(like) => this.setState({ like })}
                                        value={this.state.like}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Comment"
                                        placeholderTextColor="#d9e3f0"
                                        keyboardType="numbers-and-punctuation"
                                        returnKeyType="go"
                                        autoCorrect={false}
                                        ref={input => (this.comment = input)}
                                        onChangeText={(comment) => this.setState({ comment })}
                                        value={this.state.comment}
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