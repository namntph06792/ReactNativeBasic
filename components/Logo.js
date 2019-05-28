import React from "react";
import {
    View,
    Image,
    TouchableHighlight,
} from "react-native";
import SetCamera from '../components/SetCamera';

export default class Logo extends React.Component {

    renderCamera(){
        return (<SetCamera/>);
    }

    render(){
        return(
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
                    onPress={() => {this.renderCamera()} 
                    }>
                    <Image source={require("../assets/avatar.png")} />
                </TouchableHighlight>
            </View>
        );
    }
}