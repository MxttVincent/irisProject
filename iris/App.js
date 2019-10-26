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

  }
  
  render() {
    

    signUpUser = (email, password) => {
      console.log("user was created");
      firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
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
          onPress={() => signUpUser(this.state.email, this.state.password)}
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
