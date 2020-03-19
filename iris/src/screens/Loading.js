import React, { Component } from 'react'
import { View, Image, Text } from 'react-native';

//Needs to be converted to a component to use on other screens

export default class Loading extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../../assets/loading.gif')} style={{width: 120, height: 120}}/>
      </View>
    )
  }
}
