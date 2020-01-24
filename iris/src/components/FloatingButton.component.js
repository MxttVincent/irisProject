import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native';

export default class FloatingButton extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback >
          <View style={styles.myButton}>
            <Text>Circle button</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ddd'
  },
  myButton:{
    padding: 5,
    height: 50,
    width: 50,  //The Width must be the same as the height
    borderRadius:100, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor:'rgb(195, 125, 198)',

  }
})

