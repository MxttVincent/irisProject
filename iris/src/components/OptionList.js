import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Option from './Option';
import data from './options.json';

// Renders a list of options for EditorScreen.
export default class OptionList extends React.Component {
  render() {
    return <FlatList horizontal={true} data={data} keyExtractor={(obj, index) => index.toString()} renderItem={(obj) => (
      
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/* Each onPress will differ depending on the text value*/}
        <Option text={obj.item.text || null} iconName={obj.item.iconName || null}/>
      </View>
      )
    }/>
    
  }
}



