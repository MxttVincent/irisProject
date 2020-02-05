import React from 'react';
import {View, TouchableOpacity,Text } from 'react-native';

import OptionList from './OptionList';
import { Slider } from 'react-native-elements'


export default Scroller = ({type, areOptionsShowing, iconPressHandler, handleSliderChange,closeSlider, imgPropertyValues}) => {
  // show only return content if type is defined.  !undefined. null if so
  // Depending on the type return different options
  // Each Option needs their own icon and text value, as well as an on press function. 
  return (
      <View>
      {
        areOptionsShowing 
        ? <OptionList type={type} iconPressHandler={iconPressHandler}/> 
        : <View><TouchableOpacity onPress={closeSlider}>
        <Text>close</Text>
        </TouchableOpacity>
        <Slider value={1} onValueChange={value => handleSliderChange(value)}/>
        </View>
      }
      </View>
  )
}