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
            </View>
        );
    }
}
