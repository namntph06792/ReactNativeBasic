import React, { Component } from 'react';
import { 
    Image,
 } from 'react-native';
import {
    Left,
    Body,
    Right,
    Card,
    CardItem,
    Thumbnail,
    Button,
    Icon,
    Text,
} from "native-base";
import styles from '../src/styles';

export default class UserContentItem extends Component {
    render() {
        return (
            <Card style={styles.item}>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/react-native.png')} />
                        <Body>
                            <Text>NativeBase</Text>
                            <Text note>GeekyAnts</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{ uri: 'https://www.innofied.com/wp-content/uploads/2018/12/2018-12-06.jpg' }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>12 Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>4 Comments</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Text>11h ago</Text>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}