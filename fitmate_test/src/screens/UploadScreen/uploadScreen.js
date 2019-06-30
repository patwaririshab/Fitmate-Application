import React, { Component, useState } from 'react';
import { Platform, PermissionsAndroid, CameraRoll, AppRegistry, StyleSheet, Text, TouchableOpacity, View, Button, ActivityIndicator } from 'react-native';

import firebase from '../../Firebase'
import 'firebase/storage'
import RNFetchBlob from 'react-native-fetch-blob'
import fs from 'react-native-fs'

function uploader(uri, mime = 'video/mp4', name) {
  return new Promise((resolve, reject) => {
    let imgUri = uri; let uploadBlob = null;
    console.log("THE URI ISS !!! ", uri)
    const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
    const { currentUser } = firebase.auth();
    const imageRef = firebase.storage().ref(`/videos/${currentUser.uid}`)

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime, name: name });
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error)
      })
  })
}
class uploadScreen extends Component {
  constructor(props) {
    super(props);
  }


  successfulUploadHandler = () => {
    this.props.navigator.push({
      screen: 'fitmate.ExerciseScreen',
      title: 'Challenge Friends',
      subtitle: undefined,
      passProps: { uri: this.props.uri },
      animated: true,
      animationType: 'fade',
      backButtonTitle: undefined,
      backButonHidden: false,
    })
  };

  uploadHandler = () => {
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;
    uploader(this.props.uri, 'video/mp4', 'video1');
    console.log('UploadHandler Function Worked');
  }


  saveToCameraRoll = () => {
    requestExternalStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'My App Storage Permission',
            message: 'My App needs access to your storage ' +
              'so you can save your video',
          },
        );
        console.log('DONT HAVE PERMISSION ERROR');
        console.log(this.props.uri);
        CameraRoll.saveToCameraRoll(this.props.uri)
        return granted;
      } catch (err) {
        console.error('Failed to request permission ', err);
        alert('Something went wrong')
        return null;
      }
    };
    requestExternalStoragePermission();

  }

  uploadBackend = () => {
    this.saveToCameraRoll();
    this.uploadHandler();
    this.successfulUploadHandler();
  }
  render() {
    return (
      <View style={styles.outerview}>
        <View>
          <Button
            onPress={this.uploadBackend}
            title="Upload Video to Database"
            warning
            style={styles.outerview}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerview: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }

})
export default uploadScreen

