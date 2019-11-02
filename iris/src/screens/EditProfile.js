import React from 'react';
import { Text } from 'react-native';

export default class EditProfile extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile',
    /* No more header config here! */
  };

  render() {
    return (
      <Text>Edit profile screen</Text>
    )
  }
}