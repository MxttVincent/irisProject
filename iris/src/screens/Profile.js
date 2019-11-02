// will show the users profile

import React from 'react';
import { Text, Button, View } from 'react-native';

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'User Profile',
    /* No more header config here! */
  };

  render() {
    return (
      <View>
        <Text>This is the Profile Screen. will display a users profile</Text>
        <Button
          title="Edit profile"
          onPress={() => this.props.navigation.navigate('EditProfile')}
        />
      </View>
    )
  }
}