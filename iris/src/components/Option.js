import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Option = (props) => {
  // Each Option needs their own icon and text value, as well as an on press function
  return (
    
    <View style={{flex: 1, width: 75, height: 75, marginHorizontal: 10, justifyContent: "center", alignItems: "center"}}>
        <Icon name="filter" size={32} onPress={() => null}/>
        <Text >{props.text}</Text>
    </View>
  )
}