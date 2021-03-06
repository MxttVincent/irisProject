import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createRootNavigator } from "./src/router"; // import stack & tab navigation
import './src/screens/StudioTab/fixtimerbug';
import firebase from './src/config/firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: firebase.auth().currentUser == null ? false : true,
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
        
        // if user is logged in, navigate them to the appropriate page
      } else {
        // User is signed out.
        // ...
        this.setState({signedIn: false});
      }
    });
  }

  render() {
    // const A = createAppContainer(createRootNavigator(false));

  const A = createAppContainer(createRootNavigator(this.state.signedIn));
    return (
      <A />
    )
  }

}


