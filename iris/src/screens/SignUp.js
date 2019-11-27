import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import firebase from '../config/firebase';

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Sign Up Screen',
    /* No more header config here! */
  };

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      password: null,
      confirmPassword: null
    }
  }

  createUserInDatabase = (username, email) => {
    console.log("createUserInDatabase was called")
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;

    db.collection("users").doc(id).add({
      userId: userId,
      username: username,
      email: email,
    })
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(error => {
      console.error("Error adding document: ", error);
    });
  }

  // Handles sending an verification email to the signed up user
  handleVerificationEmail = () => {
    console.log("verify was called")
    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
      // Email sent.
      alert("Please check your email to verify your account");
    }).catch((error) => {
      // Handle Errors here.
      const { code, message } = error;
      if (code ) {
        alert(message);
      }
    });
  }

  onSignUp = (username, email, password, confirmPassword) => {
    if (password === confirmPassword) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        // create a user in the database
        this.createUserInDatabase(username, email);
        // send user confirmation email 
        this.handleVerificationEmail();
        // navigate user to first page
        this.props.navigation.navigate('Home');
      }).catch((error) => {
        // Handle Errors here.
        const { code, message } = error;
        if (code ) {
          alert(message);
        }
        
      });
    } else {
      alert('passwords do not match');
    }
  }


  render() {
    return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
      placeholder="username"
      value={this.state.username} 
      onChangeText={(username) => this.setState({username})} 
      />
      <TextInput 
      style={styles.input}
      placeholder="email"
      value={this.state.email} 
      onChangeText={(email) => this.setState({email})} 
      />
      <TextInput 
      style={styles.input}
      placeholder="password"
      secureTextEntry={true}
      value={this.state.password} 
      onChangeText={(password) => this.setState({password})} 
      />
      <TextInput 
      style={styles.input}
      placeholder="Confirm Password"
      secureTextEntry={true}
      value={this.state.confirmPassword} 
      onChangeText={(confirmPassword) => this.setState({confirmPassword})} 
      />
      <Button
        title="Sign up"
        onPress={() => this.onSignUp(this.state.username, this.state.email, this.state.password, this.state.confirmPassword)}
      />
  </View>
    )

    
  }
}
const styles = StyleSheet.create({
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1 
  },
  textLink: {
    textDecorationLine: 'underline',
    color: 'gray'
  }
})