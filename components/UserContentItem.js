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
                        <Thumbnail source={{ uri: this.props.dat.wallpaper_image_thumb}} />
                        <Body>
                            <Text>{this.props.dat.category_name}</Text>
                            <Text note>{this.props.dat.category_name}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{ uri: this.props.dat.wallpaper_image }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>{this.props.dat.total_views} Likes</Text>
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