import React from 'react'
import {Modal, View, Text, Button, StyleSheet, Image, FlatList, Dimensions} from 'react-native';
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
      uid: firebase.auth().currentUser.uid || null,
      photos: [],
      modalVisible: false
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
  handlePhotoLongPress = () => {
    console.log(this.state.modalVisible);
    this.setState({modalVisible: true}), () => {
      console.log("state has been set");
      return (
        <View style={{marginTop: 22}}>
            
      </View>
      )
    };

    // display a modal menu
    
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

  openCloudPhotoInEditor = (item) => {
    console.log('user pressed photo ' + item + 'to view it')
    // navigate to editor with the image passed to navigation params
    this.props.navigation.navigate('Editor', {
      photoUri: item
    })
  }

  _renderPhoto = ({item, index, seperators}) => {
    // item is the value of the photos data, in this case the uri link. 
    return (
      <TouchableOpacity onPress={() => this.openCloudPhotoInEditor(item)} onLongPress={() => this.handlePhotoLongPress() } >
        <Image 
          source={{uri: item}} 
          style={{width: 125, height: 125, marginVertical: 5, marginHorizontal: 5}} 
        />
      </TouchableOpacity>
    )
  }

  // key prop will beed to be fixed here
  render() {
    return (
      <View style={{marginTop: 22}}>

        <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => { this.setState({modalVisible: false}) }}
        >
        <View style={{marginTop: 100, backgroundColor: '#f7f7f7', height: 100, marginHorizontal: 20}}>
          <View>
            <Text>View</Text>
            <Text> Edit</Text>
            <Text>Remove this photo</Text>
          </View>
            </View>
          </Modal>

        <View style={styles.photoArea}>
          <FlatList data={this.state.photos}  keyExtractor={item => item} renderItem={this._renderPhoto} horizontal={false} numColumns={3} columnWrapperStyle={styles.row}/>


          
        </View>
      </View>
    )
  }

}
const screenWidth = Math.round(Dimensions.get('window').width);
const numberOfColumns = 3;

const styles = StyleSheet.create({
  photoArea: {
    marginVertical: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 5
  }
})

// {this.state.photos.map((val, index, arr) =>{ 
          //   console.log('this is the array of photos', arr);
          //     return (
          //         <TouchableOpacity onPress={() => console.log('user pressed photo to view it')} onLongPress={() => this.handlePhotoLongPress() } key={index}>
          //           <Image 
          //           source={{uri: val}} 
          //           style={{width: 100, height: 100, marginVertical: 5}} 
          //           />
                    
          //       </TouchableOpacity>
          //     )
              
              
          // })}