'use strict';

import React, {Component} from 'react';
import {Alert, Button, StyleSheet, View, Text} from 'react-native'

import {AndroReader} from './FileReaderAndroid'

export default class OpenFile extends Component {

    constructor(props){
        super(props);
        this.state = {
            file: undefined,
            loading: false,
        }
    }

    _onButtonPress() {
        this.setState({loading: true});
        AndroReader.openFile()
            .then((res)=> {
                this.setState({
                    file: res,
                    loading: false
                });
                console.log(this.state.file)
        })
    };


    render() {
        return (
            <View style={styles.container}>
                {this.state.loading &&
                <Text>LOADING IN PROGRESS</Text>
                }
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this._onButtonPress.bind(this)}
                        title="Press me!"
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonContainer: {
        margin: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});