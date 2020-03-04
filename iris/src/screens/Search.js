// will be able to search for users

import React from 'react';
import { TextInput, Text, Button, View, StyleSheet, Image } from 'react-native';
import firebase from '../config/firebase';

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

  renderAccount = (doc) => {
    console.log(doc);
    return(
      <View>
        <Button title={doc.username} style={{marginLeft: 5}} onPress={() => this.props.navigation.navigate('Profile', {username: doc.username, searchId: doc.userId})}></Button>
      </View>
    )
  }

  componentDidMount = () => {
    console.log(firebase.auth().currentUser.providerData[0].displayName);
  }

  render() {
    return (
      <View>
        <TextInput style={{marginLeft: 5}} placeholder="Search for a user..." onChangeText={value => this.dbQuery(value)}></TextInput>
        {this.state.dbResult}
      </View>
    )
  }
}

const styles = StyleSheet.create({
})