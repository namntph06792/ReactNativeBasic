import React from "react";
import {
    View,
    Image,
    Text,
    SafeAreaView,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
} from "react-native";
import {
    showMessage,
} from 'react-native-flash-message';
import FlashMessage from "react-native-flash-message";
import Logo from '../components/Logo';
import styles from '../src/styles';
import { firebaseApp } from '../components/FirebaseConfig';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }
    static navigationOptions = {
        header: null,
        headerTruncatedBackTitle: "Logout"
    }

    login(){
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() =>{
                showMessage({
                    message: 'Success',
                    description: 'Login Successful, Welcome : ' + this.state.email,
                    type: 'success',
                    onPress: () => {
                        this.props.navigation.navigate("User");
                    }
                });
            })
            .catch(function (error) {
            
            });
    }

    validate(){
        space = /^\s*$/;
        regE = /\w+@\w+(\.\w+){1,2}/;
        regP = /\w{5,}/;
        const { email, password } = this.state;
        if (space.test(email)) {
            showMessage({
                message: 'Error',
                description: 'Email can not be empty !',
                type: 'warning',
            });
        } else if (!regE.test(email)) {
            showMessage({
                message: 'Error',
                description: 'Please fill the correct email format !',
                type: 'warning',
            });
        } else if (space.test(password) || !regP.test(password)) {
            showMessage({
                message: 'Error',
                description: 'Password can not be empty and at least 5 characters !',
                type: 'warning',
            });
        } else {
            this.login();
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <TouchableWithoutFeedback
                        style={styles.container}
                        onPress={Keyboard.dismiss}>

                        <View style={styles.container}>
                            <View style={styles.header}>
                                <Image
                                    style={styles.logo}
                                    source={require("../assets/welcome.png")}
                                />
                            </View>
                            <Logo />
                            <FlashMessage position='top' hideOnPress={true} autoHide={false} animated={true}/>
                            <View style={styles.loginInfo}>
                                <View style={styles.loginInfoSection}>
                                    <Image
                                        source={require("../assets/mail.png")}
                                        style={styles.inputImage}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                        keyboardType="email-address"
                                        returnKeyType="next"
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.password.focus()}
                                        onChangeText={(email) => this.setState({ email })}
                                        value={this.state.email}
                                    />
                                </View>
                                <View style={styles.loginInfoSection}>
                                    <Image
                                        source={require("../assets/pass.png")}
                                        style={styles.inputImage}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor="rgba(255,255,255,0.8)"
                                        keyboardType="email-address"
                                        returnKeyType="go"
                                        secureTextEntry={true}
                                        autoCorrect={false}
                                        ref={input => (this.password = input)}
                                        onChangeText={(password) => this.setState({ password })}
                                        value={this.state.password}
                                    />
                                </View>

                                <TouchableOpacity style={styles.btnLogin} onPress={() => this.validate()}>
                                    <Text style={styles.textButton}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signup}>
                                <Text style={styles.text}>
                                    Don't have an account ?
                                        <Text style={{ color: "blue" }} onPress={() => { navigate("Register") }}> Sign up </Text>
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
