// will show the users profile

import React from 'react';
import { Text, ImageBackground, View, StyleSheet, Image, } from 'react-native';
import firebase from '../../config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';


const db = firebase.firestore();

export default class Profile extends React.Component {
  static navigationOptions = {
    title: 'PROFILE',
    headerTransparent: true,
    headerTitleStyle: { textAlign: 'center', flex: 1, fontSize: 16, color: "white"},
    headerRight: () => (
      <View style={styles.headerRight}>
        <TouchableOpacity
          onPress={() => alert('This will be used for account settings')}
          title="SettingsMenu"
          color="#fff"
          style={styles.iconRight}>
            <Icon 
                name='ellipsis-h' 
                size={25} 
                color="#fff"
              />
        </TouchableOpacity>
      </View>
    ),
    headerLeft: <View></View>
  }
 
  //Uses state navigation params which will decide if it is the current user or a searched user
  constructor(props) {
      super(props);
      this.state = {
        uid: firebase.auth().currentUser.uid || null,
        username: firebase.auth().currentUser.providerData[0].displayName,
        photos: [],
        followingCount: 0,
        followersCount: 0,
        fontLoaded: false,
        avatar: null,
        coverImage: null
      }
    }

  loadFont = async () => {
    await Font.loadAsync({
      'HelveticaNow': require('../../../assets/fonts/HelveticaNowText-Regular.ttf'),
      'HelveticaNowBold': require('../../../assets/fonts/HelveticaNowText-Bold.ttf'),
    });
    this.setState({fontLoaded: true});
  }

  //Fetches all posts for the given username
  componentDidMount = () => {
    this.loadFont();
    this.fetchPhotos(this.state.uid);
  }

  //Retrieves each post individually from the given user and adds them to the state array 'photos'
  fetchPhotos = (uid) => {
    db.doc("users/" + uid).collection("posts")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let dataUri = doc.data().uri;
          this.setState({photos: [...this.state.photos, dataUri]});
      })
    });

    //Gets the current follower and following count
    db.doc("users/" + uid).get()
    .then(doc => {
      this.setState({
        followingCount: doc.data().following, 
        followersCount: doc.data().followers, 
        avatar: doc.data().avatarUrl,
        coverImage: doc.data().coverImage})
    });
  }

  createPhotoGrid = () => {
    let photoGrid = this.state.photos.map(photo =>{
      return (
        <View key={photo} style={styles.photo1}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Post", {uri: photo, username: this.state.username})}>
            <Image 
            key={photo} 
            source={{uri: photo}} 
            style={{width: 100, height: 100, marginVertical: 5}} 
            />
          </TouchableOpacity>
        </View>
      )
  });
    return photoGrid;
  }


  //Uses the map function to repeat the process of displaying each image on the profile
  render() {
    return (
      <View style={{backgroundColor: "white", height: '100%'}}>
        <View>
          <View style={styles.wrap}>

            <ImageBackground resizeMode="cover" source={require('../../../assets/mountains.png')} style={styles.innerWrap}>
              <View style={{backgroundColor: "rgba(0,0,0,0.35)", position: "absolute", width: '100%', height: 320, zIndex: 0}}/>

              <View style={styles.userWrap}>
                <Image source={{uri: this.state.avatar}} style={styles.profileImage} title="profileImage"></Image>
                <View style={styles.userInfo}>
                  <View style={styles.textWrap}>
                    { this.state.fontLoaded ? (<Text style={styles.username}>{this.state.username}</Text>) : null }
                    { this.state.fontLoaded ? (<Text style={styles.text}>London, United Kingdom</Text>) : null }
                    <TouchableOpacity
                      style={styles.editProfile}
                      onPress={() => this.props.navigation.navigate('EditProfile')}
                    >
                      <Text style={{textAlign: "center"}}>EDIT PROFILE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.followerWrap}>

                <TouchableOpacity
                  style={styles.button}
                  disabled={true}
                >
                  <Text style={{fontWeight: "bold", textAlign: "center", color: "white"}}>
                    <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 22}}>{this.state.photos.length}</Text>
                    {"\n"}Posts</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('Following', {uid: this.state.uid, username: this.state.username})}
                >
                  <Text style={{fontWeight: "bold", textAlign: "center", color: "white"}}>
                    <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 22}}>{this.state.followingCount}</Text>
                    {"\n"}Following</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('Followers', {uid: this.state.uid, username: this.state.username})}
                >
                  <Text style={{fontWeight: "bold", textAlign: "center", color: "white"}}>
                    <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 22}}>{this.state.followersCount}</Text>
                    {"\n"}Followers</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
            
            <View style={styles.photoRow}>
              {this.createPhotoGrid()}
            </View>

          </View>

          

          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    margin: 10
  },

  photo1: {
    width: "30%"
  },

  photoRow: {
    flexDirection: "row", 
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "wrap",
    padding: 12
  },

  headerRight: {
    marginRight: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 2
  },

  iconRight: {
    width: '100%',
    height: '45%'
  },

  wrap: {
    backgroundColor: "white"
  },

  innerWrap: {
    height: 320,
    paddingTop: 80,
    backgroundColor: "grey"
  },

  username: {
    fontSize: 20,
    fontFamily: 'HelveticaNowBold',
    color: "white"
  },

  text: {
    fontFamily: 'HelveticaNow',
    color: "white",
    marginVertical: 5
  },

  userWrap: {
    flex: 1,
    flexDirection: "row",
    flexBasis: '50%',
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10
  },

  userInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: 100
  },

  followerWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(255,255,255,0.3)",
    borderBottomWidth: 1,
    paddingBottom: 5
  },

  button: {
    width: 100,
    backgroundColor: "transparent",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },

  editProfile: {
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 5
  },

  border: {
    borderLeftColor: "#fff",
    borderLeftWidth: 1,
    borderRightColor: "#fff",
    borderRightWidth: 1,
    height: 40,
    position: 'absolute',
    width: '100%'
  },

  profileImage: {
    height: 100,
    width: 100,
    marginLeft: 10,
    backgroundColor: "white",
    borderRadius: 50
  },
})