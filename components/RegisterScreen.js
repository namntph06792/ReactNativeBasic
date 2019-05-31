import React from "react";
import {
    ScrollView,
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
import { Icon } from 'native-base';
import Logo from './Logo';
import styles from '../src/styles';
import { firebaseApp } from './FirebaseConfig';
import FlashMessage from "react-native-flash-message";

export default class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            re_password: '',
            showPassword: true,
            press: false
        }
    }
    static navigationOptions = {
        header: null,
    }

    register() {
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.refs.register.showMessage({
                    message: 'Success',
                    description: 'Register Successful : ' + this.state.email,
                    type: 'success',
                    onPress: () => {
                        this.props.navigation.navigate("Login")
                    }
                });
                this.setState({
                    email: '',
                    password: '',

                })
            })
            .catch(function (error) {

            });
    }

    validate() {
        space = /^\s*$/;
        regE = /\w+@\w+(\.\w+){1,2}/;
        regP = /\w{5,}/;
        const { email, password, re_password } = this.state;
        if (space.test(email)) {
            this.refs.register.showMessage({
                message: 'Error',
                description: 'Email can not be empty !',
                type: 'warning',
            });
        } else if (!regE.test(email)) {
            this.refs.register.showMessage({
                message: 'Error',
                description: 'Please fill the correct email format !',
                type: 'warning',
            });
        } else if (space.test(password) || !regP.test(password)) {
            this.refs.register.showMessage({
                message: 'Error',
                description: 'Password can not be empty and at least 5 characters !',
                type: 'warning',
            });
        } else if (re_password != password) {
            this.refs.register.showMessage({
                message: 'Error',
                description: 'Password not match !',
                type: 'warning',
            });
        } else {
            this.register();
        }
    }

    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPassword: false, press: true })
        }
        else {
            this.setState({ showPassword: true, press: false })
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
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
                                <Logo nav={this.props.navigation}/>
                                <FlashMessage ref='register' position='top' hideOnPress={true} autoHide={false} animated={true} />
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
                                            secureTextEntry={this.state.showPassword}
                                            autoCorrect={false}
                                            ref={input => (this.password = input)}
                                            onSubmitEditing={() => this.re_password.focus()}
                                            onChangeText={(password) => this.setState({ password })}
                                            value={this.state.password}
                                        />
                                        <TouchableOpacity onPress={this.showPass.bind(this)} style={styles.btnEye} >
                                            <Icon active name={'eye'} />
                                        </TouchableOpacity>
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
                                            secureTextEntry={this.state.showPassword}
                                            autoCorrect={false}
                                            ref={input => (this.re_password = input)}
                                            onChangeText={(re_password) => this.setState({ re_password })}
                                            value={this.state.re_password}
                                        />
                                        <TouchableOpacity onPress={this.showPass.bind(this)} style={styles.btnEye} >
                                            <Icon active name={'eye'} />
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={styles.btnRegister} onPress={() => { this.validate() }}>
                                        <Text style={styles.textButton}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.signin}>
                                    <Text style={styles.text}>
                                        Already have an account ?
                                    <Text style={{ color: "blue" }} onPress={() => { navigate("Login") }}> Login </Text>
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </ScrollView>
        );
    }
}
