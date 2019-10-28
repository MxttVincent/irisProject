import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBsDGLvWJTHpFBf2pUZoNL9QEfmPe81Sz4",
      authDomain: "iris-pro.firebaseapp.com",
      databaseURL: "https://iris-pro.firebaseio.com",
      projectId: "iris-pro",
      storageBucket: "iris-pro.appspot.com",
      messagingSenderId: "239445951991",
      appId: "1:239445951991:web:9b035888b4ac6f057fdaf2",
      measurementId: "G-DQFV89EYG1"
    };
    firebase.initializeApp(firebaseConfig);
    
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
  
  render() {
    
    onSignUp = (email, password) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        console.log("user was created");
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
  
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        }
        if(errorCode == 'auth/weak-password') {
          alert(errorMessage)
        }
        if(errorCode =='auth/email-already-in-use') {
          alert(errorMessage);
        }
      });
    }

    onSignIn = (email, password) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log("user signed in");
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code)
        if(errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        if(errorCode == 'auth/wrong-password') {
          alert(errorMessage);
        }
        // disabled account for signing in
        if(errorCode == 'auth/user-disabled') {
          alert(errorMessage);
        }
      });
    }
    // signs out the current user
    onSignOut = () => {
      firebase.auth().signOut();
    }

    return (
      <View style={styles.container}>
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
        <Button
          title="Sign up"
          onPress={() => onSignUp(this.state.email, this.state.password)}
        />
        <Button
          title="Sign in"
          onPress={() => onSignIn(this.state.email, this.state.password)}
        />
        <Button
          title="Sign out"
          onPress={() => onSignOut()}
        />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    display: 'flex',
    width: 200
  }
});
