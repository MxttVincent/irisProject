import React from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import AdjusmentOption from './AdjusmentOption';

// import data to generate lists of options from it
import AdjustmentsOptionData from './options.json';
import filterOptions from './filterOptions.json';

// Renders a list of options for EditorScreen.
export default class OptionList extends React.Component {

    renderOptions = (type) => {
    switch (type) {
      case 'filter':
        return <FlatList data={filterOptions} horizontal={true} showsHorizontalScrollIndicator={false} keyExtractor={(obj, index) => index.toString()} renderItem={(obj) => (
          <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => console.log('option clicked')}>
            <AdjusmentOption text={obj.item.text || null} iconName={obj.item.iconName || null} />
          </TouchableOpacity>
        )
      }/>
      case 'sliders':
        return <FlatList data={AdjustmentsOptionData} horizontal={true} showsHorizontalScrollIndicator={false} keyExtractor={(obj, index) => index.toString()} renderItem={(obj) => (
                <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => console.log('option clicked')}>
                  <AdjusmentOption text={obj.item.text || null} iconName={obj.item.iconName || null} />
                </TouchableOpacity>
              )
        }/>
      case 'history':
        return <FlatList data={AdjustmentsOptionData} horizontal={true} showsHorizontalScrollIndicator={false} keyExtractor={(obj, index) => index.toString()} renderItem={(obj) => (
                <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => console.log('option clicked')}>
                  <AdjusmentOption text={obj.item.text || null} iconName={obj.item.iconName || null} onPress={() => console.log('option clicked')}/>
                </TouchableOpacity>
              )
      }/>
      default:
        return null;
    }
  }

  render() {
    // this.props.type will tell option list which list to render
    return (
      this.renderOptions(this.props.type)
      
    )
    
  }
}



