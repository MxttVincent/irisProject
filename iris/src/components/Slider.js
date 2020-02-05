import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Slider as SliderRNE} from 'react-native-elements'


export default Slider = ({handleSliderChange, closeSlider, currentSliderValue}) => {
  return (
    <View>
      <TouchableOpacity onPress={closeSlider}>
        <Text>close</Text> 
      </TouchableOpacity>

      <SliderRNE value={currentSliderValue} onValueChange={value => handleSliderChange(value)}/>
    </View>
  )
} 