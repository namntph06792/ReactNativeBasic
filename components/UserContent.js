import React, { Component } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Content } from "native-base";
import UserContentHeader from "../components/UserContentHeader";
import UserContentItem from "../components/UserContentItem";

export default class UserContent extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: null,
            isLoading: true,
        }
    }

    componentDidMount(){
        this.fetchJSON();
    }

    fetchJSON(){
        fetch('http://www.tapetee.com/api.php?latest', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    data: responseJson.HD_WALLPAPER
                });
                return responseJson.HD_WALLPAPER;
            })
            .catch((error) => {
                console.error(error);
            });	
    }

    render() {
        if(this.state.isLoading){
            return(
                <Content>
                    <ActivityIndicator/>
                </Content>
            );
        }
        return (
            <Content>
                <UserContentHeader/>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => <UserContentItem dat={item}/>}
                    keyExtractor={(item,index) => item.id}
                />
            </Content>
        );
    }
}


