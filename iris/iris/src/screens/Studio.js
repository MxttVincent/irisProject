import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import firebase from '../config/firebase';
export default class Studio extends Component {
    render() {
        return (
            <View>
            <Text>Studio Screen for accessing Camera and Gallery</Text>
            {/* <Button
            title="Gallery"
            onPress={() => this.snap()}
            /> */}
            <Button
            title="Camera"
            onPress={() => this.props.navigation.navigate('Camera')}/>
            </View>
        )
    }
}
