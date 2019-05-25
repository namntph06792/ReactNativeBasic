import React, { Component } from 'react';
import {
    Content
} from "native-base";
import UserContentItem from "../components/UserContentItem";

export default class UserContent extends Component {
    render() {
        return (
            <Content>
                <UserContentItem/>
                <UserContentItem/>
            </Content>
        );
    }
}


