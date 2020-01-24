// will show the users profile
import React from 'react';
import { Text, View } from 'react-native';

export default class Feed extends React.Component {
  static navigationOptions = {
    headerShown: false,
    title: 'User Profile',
    /* No more header config here! */
  };

  render() {
    console.log("HomeFeed screen loaded");
    return (
      <View>
        <Text>This is the HomeFeed Screen. </Text>
      </View>
    )
  }
}