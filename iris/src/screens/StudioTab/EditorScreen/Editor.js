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
            tabActive: false,
            scrollerType: {type: null}
        }
    }

    componentDidMount() {
        let result = this.props.navigation.state.params.result; 
        this.setState({ 
            uri: result.uri,
            height: result.height,
            width: result.width,
            manip: result,
            tabActive: false, // you can only have one tab active at a time
            scrollerType: null
         });
         console.log(Dimensions.get('window').width);
    }
    handleOption = (type) => {
        console.log('handle option runs')
        console.log(type);
        this.setState({ scrollerType: {type: type}, tabActive: !this.state.tabActive})
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
        console.log("editor rendered")
        return (
            <View >
                {this._renderImage()}
                {this.state.tabActive ? <Scroller type={this.state.scrollerType.type} active={this.state.tabActive}/>  : null}
                <TabBar onPressHandler={this.handleOption}/>
            </View>
        )
    }
}
// 