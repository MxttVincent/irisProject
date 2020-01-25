import React, { Component } from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity, Image, CameraRoll} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

// import icon bundle from font awesome pack
import Icon from 'react-native-vector-icons/FontAwesome'

const IconNavigationRight = (props) => {
    return (
        <View style={{flexDirection: "row", display: "flex"}}>
            <Icon style={styles.Icon} 
                name="camera" 
                size={24} 
                color="#000"
                onPress={() => props.navigation.navigate('Camera')}
                />
            <Icon style={styles.Icon} 
                name="plus" 
                size={24} 
                color="#000" 
                onPress={() => props.addPhoto() }
            />
        </View>
    )
}

export default class Studio extends Component {
    
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;
        return {
            title: "Studio",
            headerRight: () => <IconNavigationRight addPhoto={params.addPhoto} navigation={navigation}/>
            
        };
    };

    state = {
        image: null,
        height: null,
        width: null
    };

    componentDidMount() {
        this.getPermissionAsync();
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
            
             
         </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        position: "absolute"
    },
    Icon: {
        marginHorizontal: 20
    }
})

