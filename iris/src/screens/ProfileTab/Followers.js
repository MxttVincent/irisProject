// will show the users profile

import React from 'react';
import { Text, Button, View, StyleSheet, Image } from 'react-native';
import firebase from '../../config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = firebase.firestore();

export default class Followers extends React.Component {
  static navigationOptions = {
    title: 'Following',
    /* No more header config here! */
    
  };
 
  //Uses state navigation params which will decide if it is the current user or a searched user
  constructor(props) {
      super(props);
      this.state = {
        uid: firebase.auth().currentUser.uid || null,
        username: firebase.auth().currentUser.providerData[0].displayName,
        following: []
      }
    }


  //Fetches all posts for the given username
  componentDidMount = () => {
    this.fetchFollowing(this.state.uid);
  }

  //Finds all users in the collection 'following'
  fetchFollowing = (uid) => {
    db.doc("users/" + uid).collection("following").get()  //Retrieves id of each follower
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        //Find the actual follower object using the given id
        db.doc("users/" + doc.id).get()
        .then(doc => {
          this.setState({following: [...this.state.following, doc.data()]})
        })
      })
    })
  }


  //Uses the map function to repeat the process of displaying an image on the profile
  render() {
    return (
     <View>
        {this.state.following.map(follower =>{
          return (
            <View key={follower.userId}>
              <Button title={follower.username} style={{marginLeft: 5}} 
                onPress={() => this.props.navigation.navigate('UserProfile', {username: follower.username, searchId: follower.userId})}>
              </Button>
            </View>
          )
        })}
     </View>
    );
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