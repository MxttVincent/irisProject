import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

export default PostElement = (props) => {
  return (
      <View style={{flex: 1}}>
          <View style={styles.postTitle}>
            <Text>Post by {props.username}</Text>
          </View>
          
          <Image source={{uri: props.uri}} style={styles.photo}></Image>
      </View>
  )
}

const styles = StyleSheet.create({
  postTitle: {
    marginVertical: 20,
    marginHorizontal: 10
  },
  photo: {
    width: '100%',
    paddingTop: '100%'
  }
})