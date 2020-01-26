import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Option from '../components/Option';
import OptionList from './OptionList';

export default Scroller = (props) => {
  const {type, active} = props;
  console.log(type, active);
  // show only return content if type is defined.  !undefined. null if so
  // Depending on the type return different options
  // Each Option needs their own icon and text value, as well as an on press function. 
  return (
      <View>
        <OptionList />
      </View>
  )
}