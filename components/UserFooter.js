import React, { Component } from 'react';
import { Image } from 'react-native';
import {
    Footer,
    FooterTab,
    Button,
    Icon,
    Text,
    Badge
} from "native-base";
import UserHeader from "../components/UserHeader";

export default class UserFooter extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button badge vertical>
                        <Badge>
                            <Text>2</Text>
                        </Badge>
                        <Icon name="apps" onPress={alert(this.props.name)} />
                        <Text>Apps</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="camera" />
                        <Text>Camera</Text>
                    </Button>
                    <Button active badge vertical>
                        <Badge>
                            <Text>51</Text>
                        </Badge>
                        <Icon active name="navigate" />
                        <Text>Navigate</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="person" />
                        <Text>Contact</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}
