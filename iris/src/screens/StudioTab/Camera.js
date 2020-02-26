import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image, CameraRoll} from 'react-native';
import firebase from '../../config/firebase';
import { Camera } from 'expo-camera';
import IconNavigationRight from '../../components/IconNavigationRight';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faBorderAll } from '@fortawesome/free-solid-svg-icons'

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
            uri:'',
            flashActive: Camera.Constants.FlashMode.off
            
          };
    }
    
    
      async componentDidMount() {
        console.log(this.state.flashActive);
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
        this.setState({
          type:
            this.state.type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back,
        });
      }
// grid button
      toggleFlash = (flashMode) => {
        const flashModes = ['off','on','auto']
        console.log(this.state.flashActive)
          switch(flashMode){
          case 2:
            this.setState({flashActive: Camera.Constants.FlashMode.off})
              break;
          case 1:
            this.setState({flashActive: Camera.Constants.FlashMode.auto})
              break;
          case 0:
            this.setState({flashActive: Camera.Constants.FlashMode.on})
              break;
          default:
            return null;
          
      }
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
              ratio={'16:9'}
              flashMode={this.state.flashActive}
              >

                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                  }}>

                    {/* //Flash on/off/auto button  */}
                  <TouchableOpacity
                      style={styles.flashButton}
                      onPress={() => this.toggleFlash(this.state.flashActive)}
                      >
                        <IconNavigationRight name="bolt" size={24} color={'#fff'} onPress={() => this.toggleFlash(this.state.flashActive)}/>
                    </TouchableOpacity>


                  {/* //Flip camera button  */}
                  <TouchableOpacity
                    style={styles.flipCameraButton}
                    onPress={() =>  null}>
                        <IconNavigationRight name="repeat" size={24} color={'#fff'} onPress={() => this.flipCamera()}/>
                    </TouchableOpacity>
                    
                  {/* //Take photo button  */}
                    <TouchableOpacity
                    style={styles.takePhotoButton}
                    onPress={() => this.snap()}
                     />

                  {/* //Grid button  */}
                  <TouchableOpacity
                    style={styles.gridButton}
                    onPress={() =>  null}>
                        <FontAwesomeIcon icon={faBorderAll} size={24} color={'#fff'} />
                    </TouchableOpacity>

                  {/* //Gallery button  */}
                    {
                      this.state.uri 
                      ?  <Image 
                      source={{uri: this.state.uri}} 
                      style={styles.galleryImage} 
                    />

                  : <TouchableOpacity
                  style={styles.galleryBackground}>
                  </TouchableOpacity>
                    }
            
                  
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

  gridButton : {
    position: 'absolute',
    opacity: 1,
    top: 20,
    left: 20,
  },

  flipCameraButton : {
    position: 'absolute',
    opacity: 1,
    bottom: 90,
    right: 40,

  },
  galleryBackground : {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 10,
    borderColor: 'white',
    opacity: 0.2,
    width: 60,
    height: 60,
    bottom: 70,
    left: 40,
  },
  
  galleryImage : {
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 70,
    left: 40,
    opacity: 1,
    borderWidth: 0.5,
    borderColor: 'white',
  }
});





