// will show the users profile

import React from 'react';
import { Text, Button, View, StyleSheet, Image } from 'react-native';
import firebase from '../../config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = firebase.firestore();

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'User Profile',
    /* No more header config here! */
    
  };

  //Uses state navigation params which will decide if it is the current user or a searched user
  constructor(props) {
      super(props);
      this.state = {
        uid: firebase.auth().currentUser.uid || null,
        username: this.props.navigation.state.params.username,
        searchId: this.props.navigation.state.params.searchId,
        photos: [],
        button: null,
        followersCount: 0
      }
    }

  //Fetches all posts for the given username
  componentDidMount = () => {
    this.isFollowing();
    this.fetchPhotos(this.state.searchId);
  }

  renderButton = (current) => {
    if (current == "following"){
      return (
        <View>
          <Button color="green"
            title="Following"
            onPress={() => this.followUser()}
          />
        </View>
      )
    }
    else {
      return (
        <View>
          <Button color="blue"
            title="Follow"
            onPress={() => this.followUser()}
          />
        </View>
      )
    }
    
  }

  //Checks if the current user is currently following a given user, then returns the correct button
  isFollowing = () => {
    let docRef = db.doc("users/" + this.state.uid).collection("following").doc(this.state.searchId);
    docRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        this.setState({
          button: this.renderButton("following")
        })
      }
      else {
        this.setState({
          button: this.renderButton()
        })    
      }
    })
    //Gets the current follower and following count
    db.doc("users/" + this.state.searchId).get()
    .then(doc => {
      this.setState({followingCount: doc.data().following, followersCount: doc.data().followers >= 0 ? doc.data().followers : 0})
    });
  }

  //Retrieves each post individually from the given user and adds them to the state array 'photos'
  fetchPhotos = (uid) => {
    db.doc("users/" + uid).collection("posts")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let dataUri = doc.data().uri;
          this.setState({photos: [...this.state.photos, dataUri]});
      })
    })
  }

  followUser = () => {
    //Sets the reference for the user and then adds them to the following list
    let userRef = db.doc("users/" + this.state.uid);
    //Calling the location that does not exist will create a new document, but the doc must be set to create the collection
    let followingRef = userRef.collection("following").doc(this.state.searchId);
    let followersRef = db.doc("users/" + this.state.searchId);

    followingRef.get()
    .then((docSnapshot) => {
      //Unfollow user
      if (docSnapshot.exists) {
        //Delete from current user's following list
        followingRef.delete();
        userRef.update({following: firebase.firestore.FieldValue.increment(-1)});

        //Delete from other user's follower list
        followersRef.collection("followers").doc(this.state.uid).delete();
        followersRef.update({followers: firebase.firestore.FieldValue.increment(-1)});

        this.isFollowing();
      } 
      //Follow user
      else {
        //Add to current user's following list
        followingRef.set({})
        userRef.update({following: firebase.firestore.FieldValue.increment(1)});

        //Add to other user's follower list
        followersRef.collection("followers").doc(this.state.uid).set({});
        followersRef.update({followers: firebase.firestore.FieldValue.increment(1)});

        this.isFollowing();
      }
    });
    
  }

  //Uses the map function to repeat the process of displaying an image on the profile
  render() {
    return (
      <View>
        <View style={styles.photoArea}>
          <Text>{this.state.username}'s photos: </Text>
          <View style={styles.photoRow}>

            {this.state.photos.map(photo =>{
                return (
                  <View key={photo} style={styles.photo1}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Post", {uri: photo, username: this.state.username})}>
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

            {this.state.button}

            <Button
              title= {"Followers: " + this.state.followersCount}
              onPress={() => this.props.navigation.navigate('Followers', {uid: this.state.searchId, username: this.state.username})}
            />
            
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  photoArea: {
    margin: 10
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