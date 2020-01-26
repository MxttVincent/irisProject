import React, { Component } from 'react'
import { Dimensions, ScrollView, Text, TextInput, View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

import IconNavigationRight from '../../../components/IconNavigationRight';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    _rotate90 = async () => {
        const manipResult = await ImageManipulator.manipulateAsync(
            this.state.manip.uri,
            [{ rotate: 90 } ]
          );
          this.setState({ manip: manipResult });
    }

    _larger = async () => {
        console.log(this.state._height);
        let x = this.state._height + 20;
        const manipResult = await ImageManipulator.manipulateAsync(
            this.state.manip.uri,
            [{ resize: {height: x} }]
          );
          console.log("this is");
          console.log(manipResult);
          this.setState({ manip: manipResult, _height: x });
    }

    _smaller = async () => {
        let x = this.state._height - 20;
        const manipResult = await ImageManipulator.manipulateAsync(
            this.state.manip.uri,
            [{ resize: {x} }]
          );
          this.setState({ manip: manipResult, _height: x });
    }

    render() {
        return (
            <View >
                {this._renderImage()}
                {this.state.tabActive ? <Scroller type={this.state.scrollerType.type}/> : null}
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: 1, width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
                        <Icon name="filter" size={32} onPress={() => this.setState({ scrollerType: {type:'filter'}, tabActive: !this.state.tabActive})}/>
                    </View>
                    <View style={{flex: 1, width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
                        <Icon name="sliders" size={32} onPress={() => this.setState({ scrollerType: {type:'sliders'}, tabActive: !this.state.tabActive})}/>
                    </View>
                    <View style={{flex: 1, width: 50, height: 50, justifyContent: "center", alignItems: "center"}}>
                        <Icon name="history" size={32} onPress={() => this.setState({scrollerType: {type:'history'}, tabActive: !this.state.tabActive})}/>
                    </View>
                </View>
            </View>
        )}

    _renderImage = () => {
        if (this.state.manip != null){
            return (
                <View style={{ marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={{ uri: this.state.manip.uri }}
                        style={{ width: 300, height: 300, resizeMode: 'contain' }}
                    />
                </View>
            );
        }
    };
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50
    }
})

// Code before started to edit the layout

// <Button title="Rotate" onPress={this._rotate90} /> 
//             <Button title="bic" onPress={this._larger} /> 
//             <Button title="smol" onPress={this._smaller} /> 