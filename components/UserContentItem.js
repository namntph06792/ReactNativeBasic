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

    constructor(props){
        super(props);
        this.state = {
            com: 'React Native',
            author: 'itachi',
        }
    }

    render() {
        return (
            <Card style={styles.item}>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/react-native.png')} />
                        <Body>
                            <Text>{this.state.com}</Text>
                            <Text note>{this.state.author}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{ uri: 'https://www.innofied.com/wp-content/uploads/2018/12/2018-12-06.jpg' }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem cardBody>
                    <Text>{this.props.dat.title}</Text>
                </CardItem>
                <CardItem cardBody>
                    <Text note>{this.props.dat.content}</Text>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>{this.props.dat.like} Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>{this.props.dat.comment} Comments</Text>
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