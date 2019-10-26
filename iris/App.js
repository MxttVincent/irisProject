import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: ''}
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TextInput 
        style={styles.input}
        placeholder="email"
        value={this.state.text} 
        onChangeText={(text) => this.setState({text})} 
        />
        <TextInput 
        style={styles.input}
        placeholder="password"
        secureTextEntry={true}
        value={this.state.text} 
        onChangeText={(text) => this.setState({text})} 
        />
        <Button
          title="Sign up"
          onPress={() => this.signUpUser(this.state.email, this.state.password)}
        />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    display: 'flex',
    width: 200
  }
});
