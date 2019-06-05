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
    Switch,
} from "react-native";
import { Icon } from 'native-base';
import Logo from './Logo';
import styles from '../src/styles';
import { firebaseApp } from './FirebaseConfig';
import FlashMessage from "react-native-flash-message"; ``

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            switchValue: false,
            showPassword: true,
            press: false
        }
    }
    static navigationOptions = {
        header: null,
        headerTruncatedBackTitle: "Logout"
    }

    login() {
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.refs.login.showMessage({
                    message: 'Success',
                    description: 'Login Successful, Welcome : ' + this.state.email,
                    type: 'success',
                    onPress: () => this.userPermissions(this.state.email, this.state.password)
                });
            })
            .catch(function (error) {

            });
    }

    userPermissions(e, p) {
        if (e == 'itachi1611@gmail.com' && p == '123456') {
            this.props.navigation.navigate("ListPost");
        } else {
            this.props.navigation.navigate("User");
        }
    }

    validateLogin() {
        // space = /^\s*$/;
        // regE = /\w+@\w+(\.\w+){1,2}/;
        // regP = /\w{5,}/;
        // const { email, password } = this.state;
        // if (space.test(email)) {
        //     this.refs.login.showMessage({
        //         message: 'Error',
        //         description: 'Email can not be empty !',
        //         type: 'warning',
        //     });
        // } else if (!regE.test(email)) {
        //     this.refs.login.showMessage({
        //         message: 'Error',
        //         description: 'Please fill the correct email format !',
        //         type: 'warning',
        //     });
        // } else if (space.test(password) || !regP.test(password)) {
        //     this.refs.login.showMessage({
        //         message: 'Error',
        //         description: 'Password can not be empty and at least 5 characters !',
        //         type: 'warning',
        //     });
        // } else {
        //     this.login();
        // }
        this.props.navigation.navigate("ListPost");
        // this.props.navigation.navigate("User");
    }

    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPassword: false, press: true })
        }
        else {
            this.setState({ showPassword: true, press: false })
        }
    }
        
    toggleSwitch() {
        this.setState({
            switchValue: !this.state.switchValue,
        })
        alert(!this.state.switchValue);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView horizontal={false}>
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
                                <FlashMessage ref='login' position='top' hideOnPress={true} autoHide={false} animated={true} />
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
                                            onChangeText={(password) => this.setState({ password })}
                                            value={this.state.password}
                                        />
                                        <TouchableOpacity onPress={this.showPass.bind(this)} style={styles.btnEye} >
                                            <Icon active name={'eye'} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.loginInfoSection}>
                                        <Switch
                                            onValueChange={() => this.toggleSwitch()}
                                            value={this.state.switchValue}
                                            style={{ transform: [{ scaleX: .5 }, { scaleY: .5 }], textAlign: 'left' }}
                                        />
                                        <Text>Remember me</Text>
                                    </View>

                                    <TouchableOpacity style={styles.btnLogin} onPress={() => this.validateLogin()}>
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
            </ScrollView>
        );
    }
}
