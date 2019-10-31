import React from 'react';
import { View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from './src/screens/SignIn';

 class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
    /* No more header config here! */
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        title="Go to sign in"
        onPress={() => this.props.navigation.navigate('SignIn')}/>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    SignIn
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#121212',
      headerStyle: {
        backgroundColor: '#fff',
      },
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);

