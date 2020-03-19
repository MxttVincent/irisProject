import React from 'react';
import {View, StyleSheet} from 'react-native';
import PostElement from '../../components/PostElement';

export default class Post extends React.Component {
  static navigationOptions = {
    title: 'Post',
  };

  render() {
    return (
        <PostElement 
          uri={this.props.navigation.state.params.uri} 
          username={this.props.navigation.state.params.username}>
        </PostElement>
    )
  }
}

const styles = StyleSheet.create({
  Icon: {
      marginHorizontal: 20
  }
})