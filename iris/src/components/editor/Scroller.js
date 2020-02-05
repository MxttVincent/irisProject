import React from 'react';
import {View, TouchableOpacity,Text } from 'react-native';

import OptionList from './OptionList';
import Slider from '../Slider';


export default Scroller = ({type, areOptionsShowing, iconPressHandler, handleSliderChange,closeSlider, imgPropertyValues, currentSliderValue}) => {
  // show only return content if type is defined.  !undefined. null if so
  // Depending on the type return different options
  // Each Option needs their own icon and text value, as well as an on press function. 
  return (
      <View>
      {
        areOptionsShowing 
        ? <OptionList type={type} iconPressHandler={iconPressHandler}/> 
        : <Slider handleSliderChange={handleSliderChange} closeSlider={closeSlider} imgPropertyValues={imgPropertyValues} currentSliderValue={currentSliderValue}/>
      }
      </View>
  )
}