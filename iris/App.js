import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createRootNavigator } from "./src/router"; // import stack & tab navigation
import './src/screens/StudioTab/fixtimerbug';
import firebase from './src/config/firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    }
  }

  componentDidMount() {
    // For each of your app's pages that need information about the signed-in user, 
    // attach an observer to the global authentication object. 
    // This observer gets called whenever the user's sign-in state changes.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({signedIn: true});
        console.log("User is logged in");
        
        // if user is logged in, navigate them to the appropriate page
      } else {
        // User is signed out.
        // ...
        this.setState({signedIn: false});
        console.log("User is not logged in");
      }
    });
  }

  render() {
    // const A = createAppContainer(createRootNavigator(false));
  const A = createAppContainer(createRootNavigator(this.state.signedIn));
    console.log(this.state.signedIn);
    return (
      <A />
    )
  }

}


