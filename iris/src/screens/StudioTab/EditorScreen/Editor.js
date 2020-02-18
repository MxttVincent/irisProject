import React, { Component } from 'react'
import {View, StyleSheet, Image, CameraRoll } from 'react-native';
import { withNavigationFocus } from 'react-navigation';


import IconNavigationRight from '../../../components/IconNavigationRight';

import Example from '../HelloBlue';


import TabBar from '../../../components/editor/TabBar';
import Scroller from '../../../components/editor/Scroller'; 

class Editor extends Component {
    static navigationOptions = ({route, navigation}) => {
        const {params = {}} = navigation.state;
        return {
        headerRight: () => (
            <IconNavigationRight 
            name="save"
            onPress={() => params.savePhoto()}
        
            />)}
            
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
                areOptionsShowing: true,
                currentOptionSelected: null
            },
            imgProperties: { // Stores the state of the current values for each of their properties respectively. 
                contrast: 1,
                saturation: 1,
                brightness: 1
            }
        }
    }

    componentDidMount() {
        console.log(this.props.route + " is the route");
        this.props.navigation.setParams({
            savePhoto: this.savePhoto
        });
        let {photoUri, result} = this.props.navigation.state.params; 
        let img = null;
        if (result) {
             const {uri} = result;
             img = uri;
        } else if (photoUri) {
             img = photoUri
        }
        console.log(result)
        this.setState({ 
            uri: img,
            height: 100,
            width: 100,
            manip: img,
         });
    }

    

    savePhoto = () => {
        CameraRoll.saveToCameraRoll(this.state.uri,'photo').then(image => {
            // on success
            console.log(image);
        }).catch(error => {
          console.log(error);
        })
        
    }
   

    // Event handler to display a set of options based on a type. The type depends on which tab the user clicked.
    handleSetOfOptions = (type) => {
        this.setState({ scroller: {
            ...this.state.scroller,
            type: type,
            areOptionsShowing: true
        }
    })
    } 


    // A User-Press-Event handler which triggers when a user selects an adjustment option.
    // @param option :: String - the name of the option that was pressed.
    adjustmentOptionPress = (option) => {
        console.log('editor option from press is', option);
        // update the state of the scroller, ensuring all object properties are kept or atleast updated.
        this.setState({
            scroller: {
                ...this.state.scroller,
                areOptionsShowing: false,
                currentOptionSelected: option
            }
        }, () => {
            console.log('scroller state updated', this.state.scroller);
        })
    }

    // 
    handleSliderChange = (value) => {
        this.setState({
            imgProperties: {
                ...this.state.imgProperties,
                [this.state.scroller.currentOptionSelected]: value
            }
        })
    }
    
    closeSlider = () => {
        this.setState({scroller: {
            ...this.state.scroller,
            areOptionsShowing: true
        }})
    }
    
    // The editor screens render function. 
    render() {
        return this.props.isFocused ? (
            <View >
                {this._renderImage()}
                <Scroller 
                    type={this.state.scroller.type} 
                    areOptionsShowing={this.state.scroller.areOptionsShowing} 
                    iconPressHandler={this.adjustmentOptionPress}
                    currentSliderValue={this.state.imgProperties[this.state.scroller.currentOptionSelected]}
                    handleSliderChange={this.handleSliderChange}
                    closeSlider={this.closeSlider}
                /> 
                <TabBar onPressHandler={this.handleSetOfOptions} type={this.state.scroller.type } />
            </View>
        )
        : null
    }

    // Renders the image on the editor screen.
    _renderImage = () => {
        if (this.state.manip != null){
            return (
                <View style={{ marginVertical: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Example 
                        contrast={this.state.imgProperties.contrast} 
                        saturation={this.state.imgProperties.saturation} 
                        brightness={this.state.imgProperties.brightness} 
                        imageUri={{uri: `${this.state.uri }`}}
                    />
                </View>
            );
        }
    };

}

// Exports with HOC to fix react lifecycles in mobile navigation
export default withNavigationFocus(Editor);