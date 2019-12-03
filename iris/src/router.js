import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
// import non-auth screens
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
// import screens when authorised.
import Feed from './screens/Feed';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import Camera from './screens/Camera';
import Studio from './screens/Studio';
import ImageSelector from './screens/ImageSelector';
import Editor from './screens/Editor';

import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export const HomeStack = createStackNavigator({
    Feed, 
  }, {
  initialRouteName: 'Feed',
})

export const StudioStack = createStackNavigator({
  Studio, 
  Camera,
  ImageSelector,
  Editor
}, {
initialRouteName: 'Studio',
})

// A stack of screens that defines all the screens the user can navigate to 
// relating through their profile screen
export const ProfileStack = createStackNavigator({
    Profile,
    EditProfile,
  }, {
  initialRoute: 'Profile',
})


// Once signed in, The screens the user can navigate to these tabs.
export const SignedIn = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      title: "Feed",
      tabBarIcon: <Icon name="bolt" size={18} color="#242424" />,
    },
  },
  Studio : {
    screen: StudioStack,
    navigationOptions: {
      title: "Studio",
      tabBarIcon: <Icon name="camera" size={18} color="#242424" />,
    },
  },
  Profile: {
    screen: ProfileStack, // the screen is not just 1 screen. It is a STACK of (multiple) screens.
    navigationOptions: {
      title: "Profile",
      tabBarIcon: <Icon name="user" size={18} color="#242424" />,
    },
  }
})

// All the screens the user can navigate to without being signed in.
// Home, signUp (Form), SignIn (Form), maybe loading screen, etc.. 
export const SignedOut = createStackNavigator({
  Home: {
    screen: Home
  },
  SignUp,
  SignIn
})

// export const AppNavigator = createSwitchNavigator(
//   {
//   Auth: SignedOut,
//   Home: SignedIn,
//   },
  
// );

export const createRootNavigator = (x = false) => {
  return createSwitchNavigator(
    {
      SignedOut: {
        screen: SignedOut
      },
      SignedIn: {
        screen: SignedIn
      },
      
    },
    {
      initialRouteName: x ? "SignedIn" : "SignedOut"
    }
  );
};




