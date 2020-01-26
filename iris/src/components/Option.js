import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Option = () => {
  // Each Option needs their own icon and text value, as well as an on press function
  return (
    <View style={{flex: 1, width: 75, height: 75, justifyContent: "center", alignItems: "center", borderLeftColor: '#000', borderWidth: 1}}>
        <Icon name="filter" size={32} onPress={() => null}/>
        <Text >hello</Text>
    </View>
  )
}