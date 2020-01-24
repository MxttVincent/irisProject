import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image, CameraRoll} from 'react-native';
import firebase from '../../config/firebase';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

export default class openCamera extends React.Component {
    static navigationOptions = {
        title: 'Camera',
        /* Camera Functionality */
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
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 0.1,
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.setState({
                        type:
                          this.state.type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back,
                      });
                    }}>
                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                  </TouchableOpacity>
                </View>
              </Camera>
              <Button
            title="Take photo"
            onPress={() => this.snap()}
            />
             <Image
           
           style={{
             width: 300,
             height: 100,
           }}
           source={{uri: this.state.uri}}
         />
            </View>
          );
        }
      }
    }

const styles = StyleSheet.create({});





