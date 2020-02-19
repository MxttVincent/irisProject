import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default ModalOption = () => {
  return (
    <TouchableOpacity onPress={() => this.savePhoto()}>
        <Icon style={styles.Icon} 
          name={"cloud"} 
          size={24} 
          color="#000" 

        />
        <Text>Save to phone</Text>
        <Text>description</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  Icon: {
      marginHorizontal: 20
  }
})