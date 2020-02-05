import React, { Component } from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity, Image, CameraRoll} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import IconNavigationRight from '../../components/IconNavigationRight';

 export default class Studio extends Component {
    
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;
        return {
            title: "Studio",
            headerRight: () => (
                <View style={{flexDirection: "row", display: "flex"}}>
                    <IconNavigationRight
                        onPress={() => navigation.navigate('Camera')}
                        name="camera" 
                    />    
                    <IconNavigationRight 
                        onPress={params.addPhoto}
                        name="plus" 
                    />
                </View>
            )
            
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            image: null,
            height: null,
            width: null,
            contrast: 1,
            saturation: 1,
            brightness: 1
        };
    }

    componentDidMount() {
        this.getPermissionAsync();
        // Allows the header icon access to this classes function.
        this.props.navigation.setParams({addPhoto: this.openGallery});
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
        return <View>
                </View>
                
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        position: "absolute"
    }
})