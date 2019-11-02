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
      email: '',
      password: ''
    }
  }

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

  onSignUp = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
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
  }


  render() {
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
        onPress={() => this.onSignUp(this.state.email, this.state.password)}
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