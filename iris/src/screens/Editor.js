import React, { Component } from 'react'
import { Dimensions, PixelRatio, Text, TextInput, View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

export default class Editor extends Component {

    static navigationOptions = {
        title: 'Editor',
    };
    
    constructor(props) {
        super(props);
        this.state = {
            uri: null,
            height: null,
            width: null,
            manip: null,
            _width: 300,
            _height: 300
        }

        /* let _height = 300;
        let _width = 300; */
    }

    

    componentDidMount() {
        let result = this.props.navigation.state.params.result; 
        this.setState({ 
            uri: result.uri,
            height: result.height,
            width: result.width,
            manip: result
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
            [{ resize: {x,x} }]
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
        //console.log(`this one 2 ${this.props.navigation.state.params.result.uri}`);
        return (
          <View>
             {/* <Image source={{uri: this.state.uri}}
            style={{
                width: null,
                resizeMode: 'contain',
                height: 200
            }}
            />  */}
            {this._renderImage()}
            <Button title="Rotate" onPress={this._rotate90} /> 
            <Button title="bic" onPress={this._larger} /> 
            <Button title="smol" onPress={this._smaller} /> 
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