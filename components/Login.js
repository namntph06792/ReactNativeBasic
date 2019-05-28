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
import Logo from '../components/Logo';
import styles from '../src/styles';


export default class Login extends React.Component {
    
    static navigationOptions = {
        header : null,
        headerTruncatedBackTitle: "Logout" 
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <TouchableWithoutFeedback
                        style={styles.container}
                        onPress={Keyboard.dismiss}
                    >
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <Image
                                    style={styles.logo}
                                    source={require("../assets/welcome.png")}
                                />
                            </View>
                            <Logo/>
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
                                    />
                                </View>

                                <TouchableOpacity style={styles.btnLogin} onPress={()=>{navigate("User")}}>
                                    <Text style={styles.textButton}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signup}>
                                <Text style={styles.text}>
                                    Don't have an account ?
                                    <Text style={{ color: "blue" }} onPress={() => {navigate("Register")}}>Sign up</Text>
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
