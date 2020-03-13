import React from 'react'
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
      <Text>Updated version 0.3</Text>
        <Button 
          title="Go to User Gallery"
          onPress={() => this.props.navigation.navigate('Gallery')}/>
        <Button 
          title="Go to personal feed"
          onPress={() => this.props.navigation.navigate('Feed')}/>
        <Button 
          title="Search user"
          onPress={() => this.props.navigation.navigate('Search')}/>
      </View>
    )}
}