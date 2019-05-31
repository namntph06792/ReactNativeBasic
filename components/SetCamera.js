import React from "react";
import { View,Text,TouchableOpacity,Image } from 'react-native';
import {Camera,Permissions} from 'expo';

export default class SetCamera extends React.Component {


    static navigationOptions = {
        header: null,
    }

    camera = null;

    state = {
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <React.Fragment>
                    <View style={{ flex: 1 }}>
                        <Camera style={{ flex: 1 }} 
                            type={cameraType}
                            flashMode={flashMode}
                            ref={camera => this.camera = camera}>
                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                                <TouchableOpacity style={{ position: 'absolute', top: 30, left: 20}} onPress={() => {this.props.navigation.goBack(null)}}>
                                    <Image source={require('../assets/cancel.png')} style={{width: 22,height: 22 }}/>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
                                underlayColor="#ccc"
                                onPress={() => {
                                    this.setState({
                                        cameraType: this.state.cameraType === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>{' '}Flip{' '}</Text>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                </React.Fragment>
            );
        }
    }
}