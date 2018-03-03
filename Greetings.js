import {Text, View} from 'react-native';
import React, { Component } from 'react';

class Greeting extends Component{
    render() {
        return(
            <Text>Hello {this.props.name}</Text>
        )
    }
}

export default class ListOfGreetings extends Component{
    render(){
        return(
            <View style={{alignItems: 'center'}}>
                <Greeting name = 'Roman'/>
                <Greeting name = 'Ivan'/>
                <Greeting name = 'Maria'/>
            </View>
        );
    }
}