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
import Slideshow from 'react-native-slideshow';
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
            position: 1,
            interval: null,
            dataSource: [
                { url: 'https://www.innofied.com/wp-content/uploads/2018/12/2018-12-06.jpg' },
                { url: 'https://ideamotive.co/blog/wp-content/uploads/08-01-2019-State-Of-React-Native-At-The-Beginning-of-2019.png' },
                { url: 'https://cdn-images-1.medium.com/max/2400/1*osBJxMiKxAkFnw-8aR5Sbg.png' },
                { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Lvpxp1eamPUY0-ahlD2N2a-YBjO1Xuleak7bx74LyvIbxcGc' },
            ]
        }
    }

    componentWillMount(){
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            },2000)
        });
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
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

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.post_container}>
                <Slideshow
                    dataSource={this.state.dataSource}
                    position={this.state.position}
                    onPositionChanged={position => this.setState({position})}
                />
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
