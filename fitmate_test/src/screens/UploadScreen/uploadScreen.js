import React, { Component, useState } from 'react';
import { Platform, PermissionsAndroid, CameraRoll, AppRegistry, StyleSheet, Text, TouchableOpacity, View, Button, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/storage'
import RNFetchBlob from 'react-native-fetch-blob'
import fs from 'react-native-fs'
import axios from 'react-native-axios';

function uploader(uri, mime = 'video/mp4', name) {
    return new Promise((resolve, reject) => {
        let imgUri = uri; let uploadBlob = null;
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
            passProps:{uri: this.props.uri},
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
        requestExternalStoragePermission = async  () => {
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



// uploadHandlerTest2 = () => {
//     var storageRef = firebase.storage().ref();
//     var pushUpRef = storageRef.child('PushUp1.mp4');
//     var pushUpVideosRef = storageRef.child('pushUpVideos/PushUp1.mp4')
    
//     var file = {
//         uri: this.props.uri,
//         name: 'pushups.mp4',
//         type: 'videos/mp4'
//     }

//     var uploadTask = storageRef.child('videos/pushup.mp4').put(file);
//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function(snapshot) {    
//                     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     console.log('Upload is ' + progress + '% done');
//                     switch (snapshot.state) {
//                       case firebase.storage.TaskState.PAUSED: // or 'paused'
//                         console.log('Upload is paused');
//                         break;
//                       case firebase.storage.TaskState.RUNNING: // or 'running'
//                         console.log('Upload is running');
//                         break;
//                     }
//                 }, 
//                 error => {
//                     switch (error.code) {
//                         case 'storage/unauthorized' :
//                             console.log('Storage Unauthorized');
//                             break;
                        
//                         case 'storage/canceled' :
//                             console.log('Storage Canceled');
//                             break;
//                         case 'storage/unknown' :
//                             console.log('Storage Unknown');
//                             break;
//                     }
//                 }, 
//                 function() {
//                     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//                         console.log('File available at', downloadURL);
//                     });
//                 });
//     };


// uploadHandler = () => {
//         const data = new FormData;
//         data.append('video', {
//             uri: this.props.uri,
//             type: 'video/mp4',
//             name: 'pushUpVideo'
//         });

//         axios.post('https://us-central1-fit-mate-8457f.cloudfunctions.net/uploadFile',
//             data, 
//             {headers: {'Content-Type': 'multipart/form-data'}}
//         )
//         .then(() => console.log('SUCCESS!!'))
//         .catch(() => console.log('FAILURE!!'));
        
//         // fetch('https://us-central1-fit-mate-8457f.cloudfunctions.net/uploadFile', {
//         //     method: 'POST',
//         //     headers: { 
//         //         'Accept': 'application/json',
//         //         'Content-Type': 'multipart/form-data',
//         //     },
//         //     body: data,
//         //     })
//         //     .then((response) => console.log(response)).catch((error) => {
//         //         console.log(error)
//         //     });
//     }


//     uploadHandler = () => {
//         var storageRef = firebase.storage().ref();
//         //var file = new Blob (["/sdcard/DCIM/a956d98c-b27d-4fd7-aad9-14207f98fd8d.mp4"],{"type": "video\/mp4"});
//         var file = new Blob(["file:///data/user/0/com.fitmate_test/cache/Camera/391b307a-6cc0-4d43-aaf5-80373d02c349.mp4"],{"type": "video\/mp4"})
//         //var value = URL.createObjectURL(file);

//         // let formData = new FormData();
//         // formData.append("videoFile", {
//         //     name: video1.mp4,
//         //     uri: this.props.uri,
//         //     type: 'video/mp4'
//         // })
        
//         storageRef
//             .child('videos/video1.mp4')
//             .put(file)
//             .on(firebase.storage.TaskEvent.STATE_CHANGED,
//                 function(snapshot) {    
//                     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     console.log('Upload is ' + progress + '% done');
//                     switch (snapshot.state) {
//                       case firebase.storage.TaskState.PAUSED: // or 'paused'
//                         console.log('Upload is paused');
//                         break;
//                       case firebase.storage.TaskState.RUNNING: // or 'running'
//                         console.log('Upload is running');
//                         break;
//                     }
//                 }, 
//                 error => {
//                     switch (error.code) {
//                         case 'storage/unauthorized' :
//                             console.log('Storage Unauthorized');
//                             break;
                        
//                         case 'storage/canceled' :
//                             console.log('Storage Canceled');
//                             break;
//                         case 'storage/unknown' :
//                             console.log('Storage Unknown');
//                             break;
//                     }
//                 }); 
//                 // function() {
//                 //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//                 //         console.log('File available at', downloadURL);
//                 //     });
//                 // });
//                 // }
//         }