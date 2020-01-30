import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
          <View style={styles.tabView}>
              <Icon 
                name="filter" 
                size={28} 
                onPress={() => this.handleTabPick("filter")}
               />
               <Text style={styles.title}>Filters</Text>
          </View>
          <View style={styles.tabView}>
              <Icon name="sliders" size={28} onPress={() => this.handleTabPick("sliders")}/>
              <Text style={styles.title}>Adjustments</Text>
          </View>
          <View style={styles.tabView}>
              <Icon name="history" size={28} onPress={() => this.handleTabPick("history")}/>
              <Text style={styles.title}>history</Text>
          </View>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  title : {
    fontSize: 12,
    marginTop: 7
  },
  tabView : {
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