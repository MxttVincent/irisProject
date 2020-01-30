import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import OptionList from './OptionList';

// can be deleted if it seems like we only need option list, which so far looks so.
export default Scroller = (props) => {
  const {type, active} = props;
  // show only return content if type is defined.  !undefined. null if so
  // Depending on the type return different options
  // Each Option needs their own icon and text value, as well as an on press function. 
  return (
      <View>
        <OptionList type={type}/>
      </View>
  )
}