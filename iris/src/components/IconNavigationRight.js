import React from 'react';
import {View, StyleSheet} from 'react-native';
// import icon bundle from font awesome pack
import Icon from 'react-native-vector-icons/FontAwesome'

export default IconNavigationRight = (props) => {
  return (
      <View>
          <Icon style={styles.Icon} 
              name={props.name} 
              size={24} 
              color="#000" 
              onPress={props.onPress}
            />
      </View>
  )
}

const styles = StyleSheet.create({
  Icon: {
      marginHorizontal: 20
  }
})