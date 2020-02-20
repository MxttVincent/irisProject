import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image, CameraRoll} from 'react-native';
import firebase from '../../config/firebase';
import { Camera } from 'expo-camera';
import IconNavigationRight from '../../components/IconNavigationRight';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

const Flip = (props) => {
  return (
    <TouchableOpacity
    style={styles.flipCameraButton} 
    onPress={props.onPress}>
      <IconNavigationRight name="repeat" size={props.size} color={props.color} onPress={props.flipCamera}/>
  </TouchableOpacity>
  )
}



const Flash = (props) => {
  return (
    <TouchableOpacity
    style={styles.flashButton}
    onPress={() => {
        console.log('flash')
    }}>
      <IconNavigationRight name="bolt" size={props.size} color={props.color} onPress={() => console.log('icon press')}/>
  </TouchableOpacity>
  )
}

export default class openCamera extends React.Component {
    static navigationOptions = {
        title: 'Camera',
        /* Camera Functionality */
        headerStyle: {
          headerTransparent: true,
          backgroundColor: 'transparent',
          zIndex: 100
        },
        
      };
    constructor(props){

        super(props)
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            uri:''
          };
    }
    
    
      async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === 'granted' });
      }

      snap = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          console.log(photo);
          this.setState({uri: photo.uri})
          CameraRoll.saveToCameraRoll(photo.uri ,'photo').then(image => {
              // on success
              console.log(image);
          }).catch(error => {
            console.log(error);
          })
        }
      };

      flipCamera = () => {
        console.log('flipped')
        this.setState({
          type:
            this.state.type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back,
        });
      }

      render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>Please allow access to Camera</Text>;
        } else {
          return (
            <View style={{ flex: 1 }}>
               
              <Camera 
              style={{ flex: 1 }} 
              type={this.state.type} 
              ref={ref => this.camera = ref}
              ratio={'16:9'}>
                <Flip size={30} color={'#fff'} onPress={this.flipCamera}/>
                <Flash size={30} color={'#fff'}/>

                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                  }}>
                    
                  {/* //Take photo button  */}
                    <TouchableOpacity
                    style={styles.takePhotoButton}
                    onPress={() => this.snap()}
                     />

                </View>
              </Camera>
             
            </View>
          );
        }
      }
    }

const styles = StyleSheet.create({
  takePhotoButton : {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 10,
    borderColor: 'white',
    opacity: 0.2,
    borderRadius: 50,
    width: 100,
    height: 100,
    bottom: 50
  },
  flashButton : {
    position: 'absolute',
    opacity: 1,
    top: 20,
    right: 20,
  },
  flipCameraButton : {
    position: 'absolute',
    opacity: 1,
    bottom: 50,
    right: 20,

  }
});





