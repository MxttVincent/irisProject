import React, { Component } from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity, Image, CameraRoll} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from '../config/firebase';
export default class ImagePicker extends Component {
    render() {
        return (
            <View>
            ImagePicker.launchImageLibrary(options, (response) => {
            // Same code as in above section!
            });

            </View>
        )
    }
}
