import React, { Component } from 'react'
import {View, StyleSheet, Image } from 'react-native';

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
            scroller: {
                type: 'sliders', 
                areOptionsShowing: true
            }
        }
    }

    componentDidMount() {
        let result = this.props.navigation.state.params.result; 
        this.setState({ 
            uri: result.uri,
            height: result.height,
            width: result.width,
            manip: result,
            scroller: {type: 'sliders', areOptionsShowing: true}
         });
    }

    
    // Renders the image on the editor screen.
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

    // Event handler to display a set of options based on a type. The type depends on which tab the user clicked.
    handleSetOfOptions = (type) => {
        this.setState({ scroller: {
            type: type,
            areOptionsShowing: true
        }
    })
    } 
    // Event handler when a user presses on an option in OptionList.js
    iconPressHandler = () => {
        // update the state of the scroller, ensuring all object properties are kept or atleast updated.
        this.setState({
            scroller: {
                ...this.state.scroller,
                areOptionsShowing: false
            }
        }, () => {
            console.log('scroller state updated', this.state.scroller);
        })
    }

    render() {
        return (
            <View >
                {this._renderImage()}
                <Scroller 
                    type={this.state.scroller.type} 
                    areOptionsShowing={this.state.scroller.areOptionsShowing} 
                    iconPressHandler={this.iconPressHandler}
                /> 
                <TabBar onPressHandler={this.handleSetOfOptions} type={this.state.scroller.type } />
            </View>
        )
    }
}
// 