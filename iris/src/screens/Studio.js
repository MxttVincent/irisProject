import React, { Component } from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity, Image, CameraRoll} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import firebase from '../config/firebase';

export default class Studio extends Component {
    
    static navigationOptions = {
        title: 'Studio',
    };

    state = {
        image: null,
        height: null,
        width: null
    };

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
    if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Please allow access to Gallery');
        }
        }
    }

    openGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            //Only allow images to be selected
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ 
              image: result.uri,
              height: result.height,
              width: result.width
        });

        const { img } = this.state;

        this.props.navigation.navigate('Editor', {result});
    }
    }
    
    render() {
        return (
            <View>
            <Text>Studio Screen for accessing Camera and Gallery</Text>
            {/* <Button
            title="Gallery"
            onPress={() => this.snap()}
            /> */}
            <Button
            title="Take Photo"
            onPress={() => this.props.navigation.navigate('Camera')}/>
            <Button
            title="Select Image"
            onPress={() => {
                this.openGallery();
                /* this.props.navigation.navigate('Editor', { img }); */
            }
        }/>
            </View>
            
        )
    }
}
