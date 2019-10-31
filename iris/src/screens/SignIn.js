import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity } from 'react-native';

class SignIn extends React.Component {
  render() {
    return (
      <View>
        <TextInput 
        style={styles.input}
        placeholder="Email/Username"
        />
        <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() => alert('Forgot password has been pressed')}>
            <Text style={styles.textLink}>Forgot Password</Text>
        </TouchableOpacity>
        <Button
          title="Sign in"
          onPress={() => alert('Sign in pressed')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1 
  },
  textLink: {
    textDecorationLine: 'underline',
    color: 'gray'
  }
})

export default SignIn;