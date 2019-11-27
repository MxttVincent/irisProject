import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";
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
      password: '',
      showDialog: false,
      resetEmailValue: ''
    }
  }

  // Called when the user clicks the sign in button.
  onSignIn = (email, password) => {
    // checks to see if the user entered a username not an email.
    if (!email.includes("@")) {
      const db = firebase.firestore();
      const usersRef = db.collection("users");
      // email in this case is the users input. so email could be just john123
      const query = usersRef.where("username", "==", email)
      
        query.get().then(snapshot => {
          snapshot.forEach(doc => {
            // console.log(doc.id, " => ", doc.data().email);
            // get the correct user's email
            userEmail = doc.data().email;
            // login with that users email, but it seems like they logged in with their username instead
            this.handleLogin(userEmail, password);
          })
        }).catch(error => {
          console.log("Error getting documents: ", error);
        })
        
    } else {
      // just login normally with email and pass
      this.handleLogin(email, password);
    }

  }

  // this method handles to login logic.
  handleLogin = (email, password) => {
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

  // handles on the event the user requests to reset their password.
  handleEmailSend = (resetEmail) => {  
    firebase.auth().sendPasswordResetEmail(resetEmail).then(() =>{
      // Email sent.
      alert("Email has been successfully sent");
      // reset state values
      this.setState({showDialog: false, resetEmailValue: ''});
    }).catch((error) => {
      // An error happened.
      alert(error);
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
        onPress={() => {this.setState({showDialog: true})}
        }>
            <Text style={styles.textLink}>Forgot Password</Text>
        </TouchableOpacity>
        <Button
        title="Sign in"
        onPress={() => this.onSignIn(this.state.email, this.state.password)}
        />
        <Dialog.Container visible={this.state.showDialog}>
            <Dialog.Title>Reset password</Dialog.Title>
              <Dialog.Input  
              value={this.state.resetEmailValue}
              onChangeText={(value) => this.setState({resetEmailValue: value})}
              label="Email" 
              wrapperStyle={{borderBottomWidth: 1, borderColor: 'gray'}}
              /> 
            <Dialog.Button label="Cancel"  onPress={() => this.setState({showDialog: false})} />
            <Dialog.Button label="Send" onPress={() => this.handleEmailSend(this.state.resetEmailValue)} />
        </Dialog.Container>
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