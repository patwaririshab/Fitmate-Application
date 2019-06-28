import React, { Component, useState } from 'react';
import { PermissionsAndroid, CameraRoll, AppRegistry, StyleSheet, Text, TouchableOpacity, View, Button, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/storage'
import axios from 'react-native-axios';


const { app } = firebase.storage();

class uploadScreen extends Component {
    constructor(props) {
        super(props);
      }
    
    successfulUploadHandler = () => {
        this.props.navigator.push({
            screen: 'fitmate.ExerciseScreen',
            title: 'Challenge Friends',
            subtitle: undefined,
            passProps:{uri: this.props.uri},
            animated: true,
            animationType: 'fade',
            backButtonTitle: undefined,
            backButonHidden: false,
        })
    };



uploadHandlerTest2 = () => {
    var storageRef = firebase.storage().ref();
    var pushUpRef = storageRef.child('PushUp1.mp4');
    var pushUpVideosRef = storageRef.child('pushUpVideos/PushUp1.mp4')
    
    var file = {
        uri: this.props.uri,
        name: 'pushups.mp4',
        type: 'videos/mp4'
    }

    var uploadTask = storageRef.child('videos/pushup.mp4').put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function(snapshot) {    
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                      case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                      case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    }
                }, 
                error => {
                    switch (error.code) {
                        case 'storage/unauthorized' :
                            console.log('Storage Unauthorized');
                            break;
                        
                        case 'storage/canceled' :
                            console.log('Storage Canceled');
                            break;
                        case 'storage/unknown' :
                            console.log('Storage Unknown');
                            break;
                    }
                }, 
                function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log('File available at', downloadURL);
                    });
                });
    };


    uploadHandler = () => {
        
        var storageRef = firebase.storage().ref();

        var file = new Blob (
            [this.props.uri],
            {"type": "video\/mp4"}
            );
        
        firebase.storage().ref()
            .child('videos/')
            .put(file)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                function(snapshot) {    
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                      case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                      case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    }
                }, 
                error => {
                    switch (error.code) {
                        case 'storage/unauthorized' :
                            console.log('Storage Unauthorized');
                            break;
                        
                        case 'storage/canceled' :
                            console.log('Storage Canceled');
                            break;
                        case 'storage/unknown' :
                            console.log('Storage Unknown');
                            break;
                    }
                }, 
                function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log('File available at', downloadURL);
                    });
                });
        }
    saveToCameraRoll = () => {
        requestExternalStoragePermission = async () => {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                  title: 'My App Storage Permission',
                  message: 'My App needs access to your storage ' +
                    'so you can save your photos',
                },
              );
              console.log('DONT HAVE PERMISSION ERROR');
              return granted;
            } catch (err) {
              console.error('Failed to request permission ', err);
              return null;
            }
          };
        requestExternalStoragePermission();
        CameraRoll.saveToCameraRoll(this.props.uri);        
    }

   uploadBackend = () => {
       this.saveToCameraRoll();
       this.uploadHandler(); 
       this.successfulUploadHandler();
   }
   render() {
    return (
        <View style = {styles.outerview}>
            <View>
                <Button
                    onPress={this.uploadBackend}
                    title="Upload Video to Database"
                    warning
                    style = {styles.outerview}
                />
            </View>
        </View>
    );
   }
}

const styles = StyleSheet.create({
    outerview : {
        margin: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
    
})
export default uploadScreen
