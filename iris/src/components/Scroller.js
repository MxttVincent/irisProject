import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import Option from '../components/Option';

export default Scroller = (props) => {
  const {type} = props;
  console.log(props);
  // show only return content if type is defined.  !undefined. null if so
  // Depending on the type return different options
  // Each Option needs their own icon and text value, as well as an on press function. 
  return (
    <ScrollView horizontal={true}> 
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      <Option />
      </View>
    </ScrollView>
  )
}