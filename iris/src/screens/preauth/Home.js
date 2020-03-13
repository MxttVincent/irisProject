import React, { Component } from 'react'
import { View, Text, Button } from 'react-native';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home Screen',
    /* No more header config here! */
    
  };
  
  render() {
    console.log("Home screen loaded");
    return (
      <View>
      <Text>Home Screen</Text>
        <Button
        title="Go to Sign up screen"
        onPress={() => this.props.navigation.navigate('SignUp')}
        />
        <Button
        title="Go to Sign In Screen"
        onPress={() => this.props.navigation.navigate('SignIn')}
        />
      </View>
    )
  }
}
