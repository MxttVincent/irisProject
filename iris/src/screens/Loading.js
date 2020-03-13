import React, { Component } from 'react'
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Loading extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Icon name="spinner" size={60} color="#242424" />
      </View>
    )
  }
}
