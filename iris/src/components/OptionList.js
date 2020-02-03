import React from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import AdjusmentOption from './AdjusmentOption';

// import data to generate lists of options from it
import AdjustmentsOptionData from './options.json';
import filterOptions from './filterOptions.json';

import { Slider } from 'react-native-elements'

// Renders a list of options for EditorScreen.
export default class OptionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contrast: 1,
      isSliderActive: false,
      areOptionsShowing: true
    }
  }

  handleIconPress = () => {
    this.setState({isSliderActive: true, areOptionsShowing: false})
  }
  

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
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => this.handleIconPress()}>
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
    return (
      <View>
        {
            this.state.areOptionsShowing 
          ? this.renderOptions(this.props.type) 
          : null
        }
        
        {
          this.state.isSliderActive ? <Slider
          value={this.state.contrast}
          onValueChange={value => this.setState({ contrast: value })}
          />
          : 
          null
        }

      </View>

      
    )
    
  }
}



