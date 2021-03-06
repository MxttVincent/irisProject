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
import Following from './screens/ProfileTab/Following';
import Followers from './screens/ProfileTab/Followers';
import Loading from './screens/Loading';

import Post from './screens/ProfileTab/Post';

import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

let initialLoad = true;

export const HomeStack = createStackNavigator({
    Feed,
    Gallery, 
    Search
  }, {
  initialRouteName: 'Feed',
})

export const SearchStack = createStackNavigator({
    Search,
    UserProfile,
    Post,
    Followers,
    Following
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
    Following,
    Followers,
    UserProfile,
    Post
  }, {
  initialRoute: 'Profile',
}, { headerLayoutPreset: 'center' })


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
    headerLayoutPreset: 'center'
  }
}, { headerLayoutPreset: 'center' })

// All the screens the user can navigate to without being signed in.
// Home, signUp (Form), SignIn (Form), maybe loading screen, etc.. 
export const SignedOut = createStackNavigator({
  Home: {
    screen: Home
  },
  SignUp,
  SignIn
})

export const createRootNavigator = (x) => {
  //The Loading screen acts as a buffer for relogin so that the connection with firebase can be established, it will always 
  //return signed out otherwise. This solves the flash of the signedOut screen when the login state persists
  if (x == false && !initialLoad){
    screen_ = 'SignedOut';
  }
  else if (x == false){
    screen_ = 'Loading';
  }
  else {
    screen_ = 'SignedIn';
  }
  initialLoad = false;

  return createSwitchNavigator(
    {
      SignedOut: {
        screen: SignedOut
      },
      SignedIn: {
        screen: SignedIn
      },
      Loading: {
        screen: Loading
      }
    },
    {
      initialRouteName: (screen_)
    }
  );
};




