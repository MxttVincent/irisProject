import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import firebase from '../config/firebase';

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

// Create a child reference
var imagesRef = storageRef.child('images/test.jpg');
// imagesRef now points to 'images'

export default class Gallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      height: null,
      width: null
    }
  }

  componentDidMount = () => {
    this.fetchPhotos();
  }

  loadImageLibrary = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          //Only allow images to be selected
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
      });
      console.log(result);
      // if the user selects an image
      if (!result.cancelled) {
        this.setState({ 
            image: result.uri,
            height: result.height,
            width: result.width
        });
      }
  }

  uploadImage = async () => {
    const response = await fetch(this.state.image);
    const blob = await response.blob();

    const filename = blob.data.name;
    let imagesRef = storageRef.child(`images/${filename}`); 
    imagesRef.put(blob).then((snapshot) => {
      // console.log(snapshot);
      console.log("image uploaded successfully");
      this.setState({
        image: null,
        height: null,
        width: null
      });
    }).catch(error => {
      console.log(error)
    })
    
  }

  fetchPhotos = () => {
    const listRef = storageRef.child('images');
    // console.log(listRef);
    
  }

  render() {
    return (
      <View>
        {this.state.image 
          ? <Text>You have an image selected ready to upload</Text> 
          : <Text>No Image Selected, please select an image</Text> }

        {this.state.image 
          ? <Button title="Upload your selected photo to storage" onPress={() => this.uploadImage()}/>
          : <Button title="Pick an image from your library" onPress={() => this.loadImageLibrary()} />
        }

        
        
        <View style={styles.photoArea}>
          <Text>current photos in the cloud: </Text>
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  photoArea: {
    marginVertical: 50
  }
})