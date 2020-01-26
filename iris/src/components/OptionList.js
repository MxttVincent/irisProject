import React from 'react';
import {View, Text} from 'react-native';

import data from './options.json';

// Renders a list of options for EditorScreen.
export default class OptionList extends React.Component {
  render() {
    return data.map((obj, index) => {
      {console.log(obj, index)}
        return <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Option key={index} text={obj.text}/>
              </View>
      })
    
  }
}