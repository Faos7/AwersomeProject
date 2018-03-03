'use strict';

import React, {Component} from 'react';
import {DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import {Alert, Button, StyleSheet, View, Text} from 'react-native'

import RNFS from 'react-native-fs';

import RNFetchBlob from 'react-native-fetch-blob';


let fname = "Nothing";


export default class OpenFile extends Component{


//perhaps need react-native-doc-viewer
    _onButtonPress() {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            if (res != null) {
                fname = res.fileName;
                // RNF
                // Alert.alert(
                //     fname);
                const split = res.uri.split('/');
                const name = split.pop();
                const inbox = split.pop();
                const realPath = '${RNFS.TemporaryDirectoryPath}${inbox}/${name}';

                // RNFS.readFile(realPath, "base64").then(data => this.setState({base64: data}))
                let data = ''
                Alert.alert(realPath)

                RNFetchBlob.fs.readStream(realPath, 'base64', 4095).
                    then((ifstream) => {
                    ifstream.open()
                    ifstream.onData((chunk) =>{
                        data += chunk
                    })
                    ifstream.onError((err) => {
                        Alert.alert('oops', err)
                    })
                    ifstream.onEnd(() =>{
                        fname = data;
                    })
                })

                Alert.alert(fname)

            }else {
                Alert.alert("You havent choosed an" + fname)
            }
        })
    };




    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.buttonContainer}>
                    <Button
                        onPress={this._onButtonPress}
                        title="Press me!"
                    />
                    <Text>{fname}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center'
    },
    buttonContainer:{
        margin: 20
    },
    alternativeLayoutButtonContainer:{
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});