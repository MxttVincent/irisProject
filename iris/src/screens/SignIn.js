import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import firebase from '../config/firebase';

class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Sign In Screen',
    /* No more header config here! */
  };

  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    // For each of your app's pages that need information about the signed-in user, 
    // attach an observer to the global authentication object. 
    // This observer gets called whenever the user's sign-in state changes.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log("user is logged in");
        // console.log([displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData]);
        // ...
      } else {
        // User is signed out.
        // ...
        console.log("user is not logged in");
      }
    });
  }

  // Called when the user wants to sign up.
  onSignUp = (email, password) => {
    // attemots to create a user with their email and password in firebase.
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      // on success
      console.log("user was created");
    }).catch((error) => {
      // destructuring error code and message from the error object.
      const { code, message } = error;
      // if error, alert the error message to the user
      if (code) {
        alert(message);
      }
    });
  }

  // Called when the user wants to sign in with their email and password.
  onSignIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      // on success
      console.log("user signed in");
    }).catch((error) => {
      // destructuring error code and message from the error object.
      const { code, message } = error;
      // if error, alert the error message to the user
      if (code) {
        alert(message);
      }
    });
  }

  render() {
    return (
      <View>
        <TextInput 
        style={styles.input}
        placeholder="Email/Username"
        
        />
        <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() => alert('Forgot password has been pressed')}>
            <Text style={styles.textLink}>Forgot Password</Text>
        </TouchableOpacity>
        <Button
          title="Sign in"
          onPress={() => alert('Sign in pressed')}
        />
      </View>
    );
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

export default SignIn;