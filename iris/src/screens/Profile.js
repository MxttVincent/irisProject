// will show the users profile

import React from 'react';
import { Text, Button, View, StyleSheet, Image } from 'react-native';
import firebase from '../config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = firebase.firestore();

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'User Profile',
    /* No more header config here! */
    
  };
  constructor(props) {
      super(props);
      this.state = {
        uid: firebase.auth().currentUser.uid || null,
        username: this.props.navigation.state.params.username,
        searchId: this.props.navigation.state.params.searchId,
        photos: [],
      }
    }

  componentDidMount = () => {
    this.fetchPhotos(this.state.searchId);
  }

  fetchPhotos = (uid) => {
    const listRef = db.doc("users/" + uid).collection("posts")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let dataUri = doc.data().uri;
          this.setState({photos: [...this.state.photos, dataUri]});
      })
  })
  }

  render() {
    return (
      <View>
        <View style={styles.photoArea}>
          <Text>{this.state.username}'s photos: </Text>
          <View style={styles.photoRow}>
            {this.state.photos.map(photo =>{
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
            })}
            </View>
        </View>
        <Button
          title="Edit profile"
          onPress={() => this.props.navigation.navigate('EditProfile')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  photoArea: {
    marginVertical: 10
  },

  photo1: {
    display: "flex",
    flexWrap: "wrap",
    width: "30%"
  },

  photoRow: {
    flexDirection: "row", 
    justifyContent: "space-around",
    padding: 20
  }
})