import React from 'react';
import { Platform, PermissionsAndroid, CameraRoll, FlatList, AppRegistry, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import AuthContext from '../../Context/AuthContext'

import firebase from '../../Firebase'
import { SearchBar, Button } from 'react-native-elements'
import EachFriend from '../../components/EachFriend'
import SearchedFriend from '../../components/SearchedFriend'
import RNFetchBlob from 'react-native-fetch-blob'
import fs from 'react-native-fs'

const db = firebase.firestore();

class ChallengeFriendsScreen extends React.Component {
    state = {
        text: "",
        friends: [
        ],
        userID: "",

        uri: "",
        type: `video/mp4`,
        currentVideoURL: "testURL",
        currentChallengesId: [],
        doneUploadingVideo: false,
        windowXMLHTTP: window.XMLHttpRequest
    }
    static contextType = AuthContext;

    //   getAllFriends = (user) => {
    //     const allFriends = db.collection('allFriends').doc(user.uid).get().then((doc) => {
    //       return [...doc.data().Friends];
    //     })
    //     return allFriends
    //   }

    //   getAllUsers = () => {

    //     console.log("INSIDE!!")

    //     return db.collection('users').get().then((snapshot) => {
    //       const allUsers = snapshot.docs.map((doc, index) => {
    //         console.log(doc)
    //         return (
    //           {
    //             key: index,
    //             name: doc.data().name,
    //             userId: doc.data().userID,
    //             isChallenged: false
    //           }
    //         );
    //       });
    //       return allUsers;
    //     });
    //   }

    //   getFriendsFromUsers = (allFriends, allUsers) => {
    //     const allFriendDetails = allUsers.filter((user) => {
    //       return (allFriends.includes(user.userId))
    //     })
    //     return allFriendDetails;
    //   }

    //   getNonFriendsFromUsers = (allFriends, allUsers) => {
    //     const allNonFriendDetails = allUsers.filter((user) => {
    //       return !(allFriends.includes(user.userId))
    //     })
    //     return allNonFriendDetails;
    //   }

    //   async componentDidMount() {

    //     const user = firebase.auth().currentUser;
    //     console.log(user.uid);

    //     const allUsers = await this.getAllUsers();
    //     const allFriends = await this.getAllFriends(user);

    //     console.log(allFriends)

    //     const allFriendsData = await this.getFriendsFromUsers(allFriends, allUsers);
    //     const allNonFriendData = await this.getNonFriendsFromUsers(allFriends, allUsers);

    //     console.log(allFriendsData)
    //     console.log(allUsers)

    //     this.setState({ friends: [...allFriendsData], userID: user.uid });

    //   }

    // componentDidUpdate(prevProps, prevState) {
    //   //Typical usage, don't forget to compare the props
    //   if (this.state.doneUploadingVideo == true && prevState.doneUploadingVideo == false) {
    //     console.log("Before");
    //     this.sendAllChallenges();
    //     console.log("After");
    //   }
    // }

    submitChallengesToBackend = () => {
        const allFriends = db.collection('allFriends').doc(user.uid).get().then((doc) => {
            return [...doc.data().Friends];
        })
        return allFriends
    }

    AddRemoveChallengedFriend = (item) => {
        console.log(item)
        const cpyFriends = [...this.state.friends]
        const stat = cpyFriends[item.key].isChallenged;
        cpyFriends[item.key].isChallenged = !stat;
        this.setState({
            friends: [...cpyFriends],
        });
    }

    captureVideoHandler = () => {
        this.props.navigator.push({
            screen: 'fitmate.CameraScreen',
            title: "Record Video",
            subtitle: undefined,
            passProps: { uri: this.state.uri, type: this.state.type, videoDetailsChanged: this.videoDetailsChanged },
            animated: true,
            animationType: 'fade',
            backButtonTitle: undefined,
            backButtonHidden: false,

        });
    }

    videoDetailsChanged = (uri, type) => {
        console.log(uri, type)
        this.setState({ uri: uri, type: type })
    }

    Submission(friend, ExerciseNum, NumberE, UserID) {

        const exercise = parseInt(ExerciseNum, 10);
        const num = parseInt(NumberE, 10);
        const newchallenge = {
            Completed: false,
            Exercise: exercise,
            Number: num,
            InitiatorID: UserID,
            RecipientID: friend.userId,
            Name: friend.name,
            DownloadURL: this.state.currentVideoURL,
            videoUpdated: false,
            TimeStamp: new Date(),
            VerifiedCount: undefined
        }
        return newchallenge;

    }


    SubmitBtnPressedHandler = () => { this.uploadBackend(); }


    sendAllChallenges = () => {

        var batch = db.batch();
        this.state.friends.map(friend => {
            if (friend.isChallenged) {
                const challengeVal = this.Submission(friend, this.props.Exercise, this.props.Number, this.state.userID)
                const challengesRef = db.collection("challenges").doc();
                batch.set(challengesRef, challengeVal);
            }

        })
        batch.commit().then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        });
    }


    uploadHandler = () => {
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        this.uploader(this.state.uri, 'video/mp4', 'video1');
        console.log('UploadHandler Function Worked');
    }


    uploadBackend = () => {
        this.uploadHandler();
    }

    // uploader = (uri, mime = 'video/mp4', name) => {
    //   return new Promise((resolve, reject) => {
    //     let imgUri = uri; let uploadBlob = null;
    //     const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
    //     const { currentUser } = firebase.auth();
    //     const imageRef = firebase.storage().ref(`/videos/${currentUser.uid}`)

    //     fs.readFile(uploadUri, 'base64')
    //       .then(data => {
    //         return Blob.build(data, { type: `${mime};BASE64` });
    //       })
    //       .then(blob => {
    //         uploadBlob = blob;
    //         console.log("Uplaod Blob")
    //         return imageRef.put(blob, { contentType: mime, name: name });
    //       })
    //       .then(() => {
    //         uploadBlob.close();
    //         let currentVideoURLVal = imageRef.getDownloadURL()
    //         return currentVideoURLVal;
    //       })
    //       .then(url => {
    //         console.log("THER URL IS ", url)
    //         resolve(url);
    //         this.setState({ currentVideoURL: url, doneUploadingVideo: true });

    //         // this.myPromise();
    //       }).then(() => {
    //         this.sendAllChallenges();
    //       })
    //       .catch(error => {
    //         reject(error)
    //       })
    //   })
    // }

    uploader = async (uri, mime = 'video/mp4', name) => {
        let imgUri = uri; let uploadBlob = null;
        const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
        const { currentUser } = await firebase.auth();
        const imageRef = firebase.storage().ref(`/videos/${currentUser.uid}`)

        const blob = await fs.readFile(uploadUri, 'base64').then(data => {
            return Blob.build(data, { type: `${mime};BASE64` });
        });

        const uploadTask = imageRef.put(blob, { contentType: mime, name: name });
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
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
            }, (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    this.setState({ currentVideoURL: downloadURL, doneUploadingVideo: true });
                    window.XMLHttpRequest = this.state.windowXMLHTTP;
                    await this.sendAllChallenges();
                });
            });
    }
}