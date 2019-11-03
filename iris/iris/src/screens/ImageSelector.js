import React, { Component } from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity, Image, CameraRoll} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import firebase from '../config/firebase';
export default class ImageSelector extends Component {
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
        alert('Please allow access to Galery');
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
        }
      };

    render() {
        let { image } = this.state;
        return (
            <View>

            <Button
            title="Select Image from Gallery"
            onPress={() => this.openGallery()}
            />
            <Image
           
           style={{
             width: this.state.width,
             height: this.state.height
           }}
           source={{uri: this.state.image}}
         />
            </View>
        )
    }
}
