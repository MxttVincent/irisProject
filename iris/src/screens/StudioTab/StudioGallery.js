import React from 'react'
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import firebase from '../../config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

export default class StudioGallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      height: null,
      width: null,
      uid: firebase.auth().currentUser.uid || null,
      photos: [],
      showPostButton: false
    }
  }

  componentDidMount = () => {
    this.fetchPhotos(this.state.uid);
  }


  // uploads an image to firebase storage. using storage references
  // uploadImage = async (uid) => {
  //   // fetch the image uri
  //   const response = await fetch(this.state.image);
  //   // create a BINARY LARGE OBJECT (Blob)
  //   const blob = await response.blob();
  //   // store the images filename
  //   const filename = blob.data.name;
  //   // create a reference where the image will live in storage
  //   let imagesRef = storageRef.child(`users/${uid}/${filename}`);
    
  //   const task = imagesRef.put(blob);
  //   // Upload the blob/image to the referred location
  //   task.then((snapshot) => {
  //     console.log(snapshot.state);
  //     console.log("image uploaded successfully");
  //     this.setState({
  //       image: null,
  //       height: null,
  //       width: null
  //     });
  //   }).catch(error => {
  //     console.log(error)
  //   })
    
  // }

  fetchPhotos = (uid) => {
    const listRef = storageRef.child(`users/${uid}`);
    listRef.listAll().then(res => {
      res.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(url => {
          this.setState({photos: [...this.state.photos, url]});
        }).catch(error => {
          console.log(error);
        }) 

      })
    }).catch(err => {
      console.log(err);
    })
    
  } 

  // what happens when the user selects a photo.
  onSelectPhoto = () => {
    // toggle button display to publish
    this.setState({showPostButton: !this.state.showPostButton})

  }
  // This method needs to be refactored. This adds a dummy reference into the database.
  // onPublishPhoto = () => {
  //   const db = firebase.firestore();

  //   db.collection("posts").add({
  //     postName: "initial test"
  //   })
  //   .then(function(docRef) {
  //       console.log("Document written with ID: ", docRef.id);
  //   })
  //   .catch(function(error) {
  //       console.error("Error adding document: ", error);
  //   });
  // }

  
  // key prop will beed to be fixed here
  render() {
    return (
      <View>


        <View style={styles.photoArea}>
          {this.state.photos.map(photo =>{ 
              return (
                <View>
                  <TouchableOpacity onPress={() => this.onSelectPhoto() }>
                    <Image 
                    key={photo} 
                    source={{uri: photo}} 
                    style={{width: 100, height: 100, marginVertical: 5}} 
                    />
                    
                </TouchableOpacity>
                  {this.state.showPostButton 
                    ? <Button title="publish" onPress={() => this.onPublishPhoto()}/> 
                    : null}
                </View>
              )
              
          })}
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