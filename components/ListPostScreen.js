import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    FlatList,
    Text,
    ActivityIndicator,
} from 'react-native';
import styles from '../src/styles';
import { firebaseApp } from '../components/FirebaseConfig';

export default class ListPostScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: [],
            isLoading: true,
        }

        thisState = this;
    }

    componentDidMount(){
        this.readPostData();
    }

    readPostData() {
        firebaseApp.database().ref('posts/').on('value', function (snapshot) {
            let array = [];
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                array.push({
                    id: childSnapshot.key,
                    title: childData.title,
                    content: childData.content,
                    like: childData.like,
                    comment: childData.comment
                });
            });
            thisState.setState({
                isLoading: false,
                data: array
            })
        });
    }

    static navigationOptions = ({ navigate, navigation }) => ({
        title: "Dashboard",
        headerRight: (
            <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate("Post")}}>
                <Image
                    source={require('../assets/plus.png')}
                    style={{ width: 30, height: 30,marginRight: 10 }}
                />
            </TouchableOpacity>
        ),
        // header: null
    });

    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={styles.listpost_container}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.listpost_container}>
                <View style={styles.listpost_btnGroup}>
                    <TouchableOpacity style={styles.listpost_btn}>
                        <Text>Posts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listpost_btn}>
                        <Text>Follows</Text>
                    </TouchableOpacity>
                </View>
                
                <FlatList
                    style={{flex:1}}
                    data={this.state.data}
                    renderItem={({item}) => <Text>{item.title}</Text>}
                    keyExtractor={(item,index) => item.id}
                />
            </View>
        );
    }
}
