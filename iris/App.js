import React from 'react';
import { View, Button, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from './src/config/firebase';
// import screens
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import Camera from './src/screens/Camera';
import Studio from './src/screens/Studio';
import ImageSelector from './src/screens/ImageSelector'

 class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
    /* No more header config here! */
    
  };

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
        // if user is logged in, navigate them to the appropriate page
      } else {
        // User is signed out.
        // ...
        console.log("user is not logged in");
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Updated version 0.2.0</Text>
        <Button
        title="Go to sign in"
        onPress={() => this.props.navigation.navigate('SignIn')}/>
        <Button
        title="Go to sign up with email"
        onPress={() => this.props.navigation.navigate('SignUp')}/>
        <Button
        title="Go to profile screen"
        onPress={() => {
          // must be logged in to go to profile screen
          if (firebase.auth().currentUser) {
            this.props.navigation.navigate('Profile');
          } else {
            alert("user is not logged in.");
          }
          }
        }
        />
        <Button
        title="sign out"
        onPress={() => firebase.auth().signOut()} 
        />
        <Button
        title="Go to Studio"
        onPress={() => this.props.navigation.navigate('Studio')}/>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    SignIn,
    SignUp,
    Profile,
    EditProfile,
    Camera,
    Studio,
    ImageSelector
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#121212',
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);

