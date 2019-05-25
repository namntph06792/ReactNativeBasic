import React from "react";
import {
    StyleSheet,
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
    TouchableHighlight
} from "react-native";

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
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <TouchableHighlight
                                    style={{
                                        borderRadius: 80,
                                        width: 80,
                                        height: 80,
                                        borderWidth: 0.5,
                                        borderColor: "black",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    underlayColor="#ccc"
                                    onPress={() => alert("Yaay!")}
                                >
                                    <Image source={require("../assets/avatar.png")} />
                                </TouchableHighlight>
                            </View>
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
                                    <Text style={{ color: "blue" }}>Sign up</Text>
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "rgb(32,53,78)",
        justifyContent: "center"
    },
    header: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        width: 128,
        height: 56,
        marginTop: 100
    },
    loginInfo: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    loginInfoSection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    inputImage: {
        position: "absolute",
        top: 0,
        left: 10,
        height: 35,
        width: 25,
        resizeMode: "stretch",
        alignItems: "center"
    },
    input: {
        textAlign: "center",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#000",
        height: 40,
        width: 250,
        backgroundColor: "rgba(255,255,255,0.2)",
        marginBottom: 20,
        paddingHorizontal: 10
    },
    btnLogin: {
        backgroundColor: "green",
        paddingVertical: 15,
        width: 250
    },
    textButton: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        color: "rgb(32,53,70)"
    },
    signup: {
        position: "absolute",
        bottom: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
});
