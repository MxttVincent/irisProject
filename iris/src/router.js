import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from './config/firebase';
// import non-auth screens
import SignIn from './screens/PreAuth/SignIn';
import SignUp from './screens/PreAuth/SignUp';
import Home from './screens/PreAuth/Home';
// import screens when authorised.
import Feed from './screens/FeedTab/Feed';
import Gallery from './screens/Gallery';
import Search from './screens/SearchTab/Search';
import UserProfile from './screens/SearchTab/UserProfile';
import Profile from './screens/ProfileTab/Profile';
import EditProfile from './screens/ProfileTab/EditProfile';
import Camera from './screens/StudioTab/Camera';
import Studio from './screens/StudioTab/Studio';
import Editor from './screens/StudioTab/EditorScreen/Editor';

import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export const HomeStack = createStackNavigator({
    Feed,
    Gallery, 
    Search
  }, {
  initialRouteName: 'Feed',
})

export const SearchStack = createStackNavigator({
    Search,
    UserProfile
  }, {
  initialRouteName: 'Search',
})

export const StudioStack = createStackNavigator({
    Studio, 
    Camera,
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
  Search : {
    screen: SearchStack,
    navigationOptions: {
      title: "Search",
      tabBarIcon: <Icon name="search" size={18} color="#242424" />,
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
    //initialParams: { username: firebase.auth().currentUser.providerData[0].displayName, searchId: firebase.auth().currentUser.uid},
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




