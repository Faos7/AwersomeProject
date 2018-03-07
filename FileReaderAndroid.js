import {DocumentPicker, DocumentPickerUtil} from 'react-native-document-picker';
import RNFS from 'react-native-fs';

function _readFileFromUriRNFS(uri) {
    const promise = new Promise((resolve, reject) => {
        RNFS.readFile(uri, 'base64')
        .then((data)=>{
            resolve(data);
        })
        .catch((err) =>{
            console.log('error while parsing file ' + err)
            reject( undefined);
        })
    });

    return promise;
}

function _openFile(){
    const promise = new Promise((resolve, reject) => {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            if (res != null) {
                resolve(_readFileFromUriRNFS(res.uri))
            } else {
                console.log('cancelled')
                reject(undefined)
            }
        });
    });
    return promise;
}

var AndroReader = {
    openFile(){
        return _openFile()
    }
};
module.exports = Reader;