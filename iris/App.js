import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from './src/screens/SignIn';

 class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
        title="Go to sign in"
        onPress={() => this.props.navigation.navigate('SignIn')}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    SignIn
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);


