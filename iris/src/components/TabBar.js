import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TabBar extends React.Component {
  
  // handles the event, when a user presses a tab.
  handleTabPick = (type) => {
    // Get the icon reference that was clicked and pass its name to our prop function in Editor.js
    this.props.onPressHandler(type); 
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1, width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
              <Icon 
                ref={(ref) => this.icon = ref} 
                name="filter" 
                size={32} 
                onPress={() => this.handleTabPick("filter")}
               />
          </View>
          <View style={{flex: 1, width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
              <Icon name="sliders" size={32} onPress={() => this.handleTabPick("sliders")}/>
          </View>
          <View style={{flex: 1, width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
              <Icon name="history" size={32} onPress={() => this.handleTabPick("history")}/>
          </View>
      </View>
      )
  }
}