import React from 'react'
import { View, Text, Button, StyleSheet, Image } from 'react-native';

import firebase from '../../config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

const db = firebase.firestore();

export default class Feed extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Updated version 0.3.5</Text>
        {/* {this.state.photos.map(photo =>{
                return (
                  <View key={photo} style={styles.photo1}>
                    <TouchableOpacity>
                      <Image 
                      key={photo} 
                      source={{uri: photo}} 
                      style={{width: 100, height: 100, marginVertical: 5}} 
                      />
                    </TouchableOpacity>
                  </View>
                )
            })} */}
      </View>
    )}
}