import React, { Component } from 'react'
import { Dimensions, ScrollView, Text, TextInput, View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

import IconNavigationRight from '../../../components/IconNavigationRight';

import TabBar from '../../../components/TabBar';
import Scroller from '../../../components/Scroller';

export default class Editor extends Component {
    static navigationOptions = {
        title: 'Editor',
        headerRight: () => (
            <IconNavigationRight 
            name="save"
            onPress={() => alert("you just saved the image! nah jk you didnt do nothing")}
            />
            )
    };
    
    constructor(props) {
        super(props);
        this.state = {
            uri: null,
            height: null,
            width: null,
            manip: null,
            _width: 300,
            _height: 300,
            scrollerType: {type: 'sliders', isShowing: true}
        }
    }

    componentDidMount() {
        let result = this.props.navigation.state.params.result; 
        this.setState({ 
            uri: result.uri,
            height: result.height,
            width: result.width,
            manip: result,
            scrollerType: {type: 'sliders', isShowing: true}
         });
    }
    // Will handle which set of options to show to the user
    handleSetOfOptions = (type) => {
        this.setState({ scrollerType: {type: type}})
    } 
    
    _renderImage = () => {
        if (this.state.manip != null){
            return (
                <View style={{ marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={{ uri: this.state.manip.uri }}
                        style={{ width: 450, height: 450, resizeMode: 'contain' }}
                    />
                </View>
            );
        }
    };

    

    render() {
        return (
            <View >
                {this._renderImage()}
                {this.state.scrollerType.isShowing 
                    ? <Scroller type={this.state.scrollerType.type} isShowing={this.state.scrollerType.isShowing}/> 
                    : null 
                }
                <TabBar onPressHandler={this.handleSetOfOptions} type={this.state.scrollerType.type } />
            </View>
        )
    }
}
// 