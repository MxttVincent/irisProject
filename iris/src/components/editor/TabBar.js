import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
          <TouchableOpacity style={styles.tabOption} onPress={() => this.handleTabPick("filter")}>
              <Icon 
              name="filter" 
              size={28} />
               <Text style={styles.title}>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabOption} onPress={() => this.handleTabPick("sliders")}>
              <Icon 
              name="sliders" 
              size={28} />
              <Text style={styles.title}>Adjustments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabOption} onPress={() => this.handleTabPick("history")}>
              <Icon 
              name="history" 
              size={28} />
              <Text style={styles.title}>history</Text>
          </TouchableOpacity>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  title : {
    fontSize: 12,
    marginTop: 7
  },
  tabOption : {
    flex: 1, 
    width: 50, 
    height: 50, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 10
  },
  inActive : {
    color: "red"
  }
})