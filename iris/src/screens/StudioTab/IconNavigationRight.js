import React from 'react';
import {View, StyleSheet} from 'react-native';
// import icon bundle from font awesome pack
import Icon from 'react-native-vector-icons/FontAwesome'

export default IconNavigationRight = (props) => {
  return (
      <View style={{flexDirection: "row", display: "flex"}}>
          <Icon style={styles.Icon} 
              name="camera" 
              size={24} 
              color="#000"
              onPress={() => props.navigation.navigate('Camera')}
              />
          <Icon style={styles.Icon} 
              name="plus" 
              size={24} 
              color="#000" 
              onPress={() => props.addPhoto() }
          />
      </View>
  )
}

const styles = StyleSheet.create({
  Icon: {
      marginHorizontal: 20
  }
})