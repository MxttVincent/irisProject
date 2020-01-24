import React, { Component } from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity, Image, CameraRoll} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import FloatingButton from '../../components/FloatingButton.component';

export default class Studio extends Component {
    
    // static navigationOptions = {
    // };

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
          allowsEditing: true,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ 
              image: result.uri,
              height: result.height,
              width: result.width
        });
            this.props.navigation.navigate('Editor', {result});
        }
    }
    
    render() {
        return (
            <View >
             <Text>Studio Screen for accessing Camera and Gallery</Text>
            <Button
             title="Take Photo"
             onPress={() => this.props.navigation.navigate('Camera')}/>
             <Button
             title="Select Image"
             onPress={() => {
                 this.openGallery();
             }
         }/>
         </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        position: "absolute"
    }
})


