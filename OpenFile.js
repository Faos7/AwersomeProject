'use strict';

import React, {Component} from 'react';
import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import {Alert, Button, StyleSheet, View, Text} from 'react-native'

import RNFS from 'react-native-fs';


export default class OpenFile extends Component {

    constructor(props){
        super(props);
        this.state = {
            uri: undefined,
            file: undefined,
            name: undefined,
            loading: false,
        }
    }

    _readFileFromUriRNFS() {

        RNFS.readFile(this.state.uri, 'base64')
                .then((data)=>
                    this.setState({
                        file: data
                    })
            ).then(console.log(this.state.file))
                .then(console.log('msg'))
        }

    _onButtonPress() {
        this.setState({loading: true});
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            if (res != null) {

                this.setState({
                    uri: res.uri,
                    name: res.name
                });

                this._readFileFromUriRNFS();
            }else {
                Alert.alert('cancelled')
            }
        });
        this.setState({loading: false})
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
                <Text>{JSON.stringify(this.state.name)}</Text>
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