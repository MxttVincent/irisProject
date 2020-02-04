import React from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import AdjusmentOption from './AdjusmentOption';

// import data to generate lists of options from it
import AdjustmentsOptionData from './options.json';
import filterOptions from './filterOptions.json';


// Renders a list of options for EditorScreen.
export default class OptionList extends React.Component {
  constructor(props) {
    super(props);

  }

  // An event handler for each icon press
  handleIconPress = () => {
    this.props.iconPressHandler();
  }
  

renderOptions = (type) => {
switch (type) {
  case 'filter':
    return <FlatList data={filterOptions} horizontal={true} showsHorizontalScrollIndicator={false} keyExtractor={(obj, index) => index.toString()} renderItem={(obj) => (
      <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => null}>
        <AdjusmentOption text={obj.item.text || null} iconName={obj.item.iconName || null} />
      </TouchableOpacity>
    )
  }/>
  case 'sliders':
    return <FlatList data={AdjustmentsOptionData} horizontal={true} showsHorizontalScrollIndicator={false} keyExtractor={(obj, index) => index.toString()} renderItem={(obj) => (
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => this.handleIconPress()}>
              <AdjusmentOption text={obj.item.text || null} iconName={obj.item.iconName || null} />
            </TouchableOpacity>
          )
    }/>
  case 'history':
    return <FlatList data={AdjustmentsOptionData} horizontal={true} showsHorizontalScrollIndicator={false} keyExtractor={(obj, index) => index.toString()} renderItem={(obj) => (
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => null}>
              <AdjusmentOption text={obj.item.text || null} iconName={obj.item.iconName || null} />
            </TouchableOpacity>
          )
  }/>
  default:
    return null;
  
       }
      }
    

  render() {
    return (
      <View>
        {
          this.renderOptions(this.props.type) 
        }
      </View>

      
    )
    
  }
}
