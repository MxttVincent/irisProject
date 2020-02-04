import React from 'react';
import {View } from 'react-native';

import OptionList from './OptionList';
import { Slider } from 'react-native-elements'


export default Scroller = ({type, areOptionsShowing, iconPressHandler}) => {
  // show only return content if type is defined.  !undefined. null if so
  // Depending on the type return different options
  // Each Option needs their own icon and text value, as well as an on press function. 
  return (
      <View>
      {
        areOptionsShowing 
        ? <OptionList type={type} iconPressHandler={iconPressHandler}/> 
        : <Slider value={1} onValueChange={value => console.log(value)}/>
      }
      </View>
  )
}