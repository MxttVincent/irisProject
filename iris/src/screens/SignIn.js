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

  // Called when the user wants to sign up.
  // onSignUp = (email, password) => {
  //   // attemots to create a user with their email and password in firebase.
  //   firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
  //     // on success
  //     console.log("user was created");
  //   }).catch((error) => {
  //     // destructuring error code and message from the error object.
  //     const { code, message } = error;
  //     // if error, alert the error message to the user
  //     if (code) {
  //       alert(message);
  //     }
  //   });
  // }

  // Called when the user wants to sign in with their email and password.
  onSignIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      // on success
      console.log("user signed in");
      // navigate the user to the appropriate page when a user signs up
      this.props.navigation.navigate('Home');
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
        value={this.state.email}
        onChangeText={(email) => this.setState({email})}
        />
        <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={this.state.password}
        onChangeText={(password) => this.setState({password})}
        />
        <TouchableOpacity
          onPress={() => alert('Forgot password has been pressed')}>
            <Text style={styles.textLink}>Forgot Password</Text>
        </TouchableOpacity>
        <Button
          title="Sign in"
          onPress={() => this.onSignIn(this.state.email, this.state.password)}
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