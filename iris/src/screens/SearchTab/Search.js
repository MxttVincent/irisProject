// will be able to search for users

import React from 'react';
import { TextInput, Button, View, StyleSheet, Image } from 'react-native';
import firebase from '../../config/firebase';

const db = firebase.firestore();

export default class Search extends React.Component {
  static navigationOptions = {
    title: 'Search',
    /* No more header config here! */
    
  };
  constructor(props) {
      super(props);
      this.state = {
        uid: firebase.auth().currentUser.uid || null,
        dbResult: null
      }
    }


  //Retrieves the collection of posts given a username and stores it in the state variable
  dbQuery = (value) => {
    db.collection("users").where("username", "==", value)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let rndr = this.renderAccount(doc.data());
          this.setState({
           dbResult: rndr
          });
      });
    });
  }

  //Sets the state parameters for the profile page, which will either be the user logged in or a 
  //profile that has been searched for
  renderAccount = (doc) => {
    console.log(doc);
    return(
      <View>
        <Button title={doc.username} style={{marginLeft: 5}} 
          onPress={() => this.props.navigation.navigate('UserProfile', {username: doc.username, searchId: doc.userId})}>
        </Button>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.area}>
        <TextInput style={{marginHorizontal: 5, marginBottom: 10}} placeholder="Search for a user..." onChangeText={value => this.dbQuery(value)}></TextInput>
        {this.state.dbResult}
        <Button 
          title="Go to User Gallery"
          onPress={() => this.props.navigation.navigate('Gallery')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  area: {
    margin: 10
  }
})