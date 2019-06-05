import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback, 
    TextInput,
    Keyboard,
    Text,
} from 'react-native';
import styles from '../src/styles';
import { firebaseApp } from '../components/FirebaseConfig';

export default class PostScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: '',
            content: '',
            like: '',
            comment: '',
        }
    }

    static navigationOptions = {
        title: "New Post",
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

    validatePost() {
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
            this.saveToFirebase();
        }
    }

    saveToFirebase(){
        firebaseApp.database().ref('posts/').push({
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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.post_container}>
                <KeyboardAvoidingView behavior="padding" style={styles.post_container}>
                    <TouchableWithoutFeedback
                        style={styles.post_container}
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
                            <TouchableOpacity style={styles.btnSubmit} onPress={() => this.validatePost()}>
                                <Text style={styles.textButtonSubmit}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
