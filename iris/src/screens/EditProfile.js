import React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Dialog from "react-native-dialog";
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
      newEmail: '',
      photoUrl: user.photoURL,
      showPasswordDialog: false,
      showEmailDialog: false,
      currentPassword: '',
      newPassword: ''
    }
  }

  onSaveChanges = () => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: this.state.username
    }).then(() => {
      // Update successful.
      console.log("user info updated, username is " + user.displayName);
    }).catch((error) => {
      // An error happened.
      alert(error);
    });
    
  }

  /**
   * Retreives logged in users credentials and attempts to re-authenticate them.
   * returns a promise to handle on success and on failure results.
   */
  onReauthenticate = (current) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, current);
    // returns a promise
    return user.reauthenticateWithCredential(cred);

  }

  /**
   * Called when the user clicks confirm to change their password.
   * Will only update the users password, if they are authenticated. 
   */
  onChangePassword = () => {
    // attempts to re authenticate with users current entered password
    this.onReauthenticate(this.state.currentPassword)
    .then(() => {
      var user = firebase.auth().currentUser;
      // if successful, update users password with new password
      user.updatePassword(this.state.newPassword)
      .then(() => {
        alert("Password was changed successfully");
        // close dialog prompt at the end
        this.setState({showPasswordDialog: false});
      })
      .catch(error => {
        // if can't update password, then alert error
        alert(error.message);
      });
    })
    .catch(error => {
      // if can't authenticate user, then alert error to the user
      alert(error.message);
    });
  }
  
  /**
   * Will be called when the user confirms to change their email.
   * Will take in the new email they want to change to and their current password to reauthenticate themselves.
   */
  onEmailChange = (newEmail, currentPassword) => {
    var user = firebase.auth().currentUser;

    this.onReauthenticate(currentPassword)
    .then(() => {
      //update email
      user.updateEmail(newEmail)
      .then(() => {
        // Update successful.
        alert(`Email has been successfully changed to ${newEmail}`);
        // only hide dialog if email was changed. if error, then user should be able to retry.
        this.toggleChangeEmailDialog();
        // update view to display new email instantly when changed.
        this.setState({email: user.email});
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
      
    })
    .catch((error) => {
      alert(error.message, " new error")
      console.log(firebase.auth().currentUser);
    })
  }
  /**
   * Display a dialog prompt to the user for them to change their password.
   */
  toggleChangePasswordDialog = () => {
    this.setState({
      showPasswordDialog: !this.state.showPasswordDialog,
      currentPassword: '',
      newPassword: ''
    });
  }

  /**
   * Display a dialog prompt to the user for them to change their email.
   */
  toggleChangeEmailDialog = () => {
    this.setState({
      showEmailDialog: !this.state.showEmailDialog,
      newEmail: '',
      currentPassword: ''
    });
  }

  render() {
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
          onChangeText={(email) => {
            this.setState({email});
          }} 
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
          onPress={() => this.toggleChangePasswordDialog()}>
            <Text style={styles.textLink}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => this.toggleChangeEmailDialog()}>
            <Text style={styles.textLink}>Change Email</Text>
          </TouchableOpacity>

          <Dialog.Container visible={this.state.showPasswordDialog}>
            <Dialog.Title>Change Password</Dialog.Title>
              <Dialog.Input  
              value={this.state.currentPassword}
              onChangeText={(currentPassword) => this.setState({currentPassword})}
              label="Current Password" 
              wrapperStyle={{borderBottomWidth: 1, borderColor: 'gray'}}
              />
              <Dialog.Input  
              value={this.state.newPassword}
              onChangeText={(newPassword) => this.setState({newPassword})}
              label="New Password" 
              wrapperStyle={{borderBottomWidth: 1, borderColor: 'gray'}}
              />  
            <Dialog.Button label="Cancel"  onPress={() => this.toggleChangePasswordDialog()} />
            <Dialog.Button label="Confirm" onPress={() => this.onChangePassword()} />
        </Dialog.Container>

        <Dialog.Container visible={this.state.showEmailDialog}>
            <Dialog.Title>Change Email</Dialog.Title>
              <Dialog.Input  
              value={this.state.newEmail}
              onChangeText={(newEmail) => this.setState({newEmail})}
              label="New Email" 
              wrapperStyle={{borderBottomWidth: 1, borderColor: 'gray'}}
              />
              <Dialog.Input  
              value={this.state.currentPassword}
              onChangeText={(currentPassword) => this.setState({currentPassword})}
              label="Current Password" 
              wrapperStyle={{borderBottomWidth: 1, borderColor: 'gray'}}
              />  
            <Dialog.Button label="Cancel"  onPress={() => this.toggleChangeEmailDialog()} />
            <Dialog.Button label="Confirm" onPress={() => this.onEmailChange(this.state.newEmail, this.state.currentPassword)} />
        </Dialog.Container>
        
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