import React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import firebase from '../config/firebase';

export default class EditProfile extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile',
    /* No more header config here! */
  };

  constructor(props) {
    super(props);
    const user = firebase.auth().currentUser;
    let username, email, photoUrl, uid, emailVerified;

    this.state = {
      username: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,

    }
  }

  onSaveChanges = () => {
    console.log("saving changes");
  }

  onChangePassword = () => {
    console.log("change password was pressed");
  }

  render() {
    // console.log(user);

    // if (user != null) {
    //   username = user.displayName;
    //   email = user.email;
    //   photoUrl = user.photoURL;
    //   emailVerified = user.emailVerified;
    //   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    //                   // this value to authenticate with your backend server, if
    //                   // you have one. Use User.getToken() instead.
    // }
    return (
      <View>
        <Text>Edit profile screen</Text>
          <TextInput 
          style={styles.input}
          placeholder="Username"
          value={this.state.username} 
          onChangeText={(username) => this.setState({username})} 
          />
          <TextInput 
          style={styles.input}
          placeholder="Email"
          value={this.state.email} 
          onChangeText={(email) => console.log("")} 
          />
          <TextInput 
          style={styles.input}
          placeholder="extra field"
          value={this.state.username} 
          onChangeText={(username) => console.log("")} 
          />
          <Button 
          title="Save Changes"
          onPress={() => this.onSaveChanges()}
          />
          <TouchableOpacity
          onPress={() => this.onChangePassword()}>
            <Text style={styles.textLink}>Change Password</Text>
          </TouchableOpacity>
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