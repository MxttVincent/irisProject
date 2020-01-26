import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Option = () => {
  return (
    <View style={{flex: 1, width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
        <Icon name="filter" size={32} onPress={() => null}/>
    </View>
  )
}