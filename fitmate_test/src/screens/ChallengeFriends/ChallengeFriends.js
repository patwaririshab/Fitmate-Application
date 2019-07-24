import React from 'react';
import { Platform, PermissionsAndroid, CameraRoll, FlatList, AppRegistry, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import AuthContext from '../../Context/AuthContext'

import firebase from '../../Firebase'
import Contestants from '../../components/Contestants'
import RNFetchBlob from 'react-native-fetch-blob'
import fs from 'react-native-fs'

import UUIDGenerator from 'react-native-uuid-generator';

import * as Progress from 'react-native-progress';


import Toast from 'react-native-root-toast';

const db = firebase.firestore();


class ChallengeFriendsScreen extends React.Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Submit',
        id: 'submit',
        disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      },
      // {
      //   icon: require('../../../icons/phoneC-icon.png'), // for icon button, provide the local image asset name
      //   id: 'add' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      // }
    ]
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'submit') {
        this.SubmitBtnPressedHandler();
      }
    }
  }



  state = {
    text: "",
    friends: [
    ],
    userID: "",
    progress: 0,
    isUploading: false,
    currentVideoURL: "testURL",
    currentChallengesId: [],
    doneUploadingVideo: false,
    windowXMLHTTP: window.XMLHttpRequest
  }
  static contextType = AuthContext;

  getAllFriends = (user) => {
    const allFriends = db.collection('allFriends').doc(user.uid).get().then((doc) => {
      return [...doc.data().Friends];
    })
    return allFriends
  }

  getAllUsers = () => {

    console.log("INSIDE!!")
    return db.collection('users').get().then((snapshot) => {
      const allUsers = snapshot.docs.map((doc, index) => {
        console.log(doc)
        return (
          {
            key: doc.data().userID,
            name: doc.data().name,
            userId: doc.data().userID,
            isChallenged: false
          }
        );
      });
      return allUsers;
    });
  }

  getFriendsFromUsers = (allFriends, allUsers) => {
    const allFriendDetails = allUsers.filter((user) => {
      return (allFriends.includes(user.userId))
    })
    return allFriendDetails;
  }

  getNonFriendsFromUsers = (allFriends, allUsers) => {
    const allNonFriendDetails = allUsers.filter((user) => {
      return !(allFriends.includes(user.userId))
    })
    return allNonFriendDetails;
  }

  getMyName = (user) => {
    const userDoc = firebase.firestore().collection('users').where("userID", "==", user.uid).get().then((snapshot) => {
      return snapshot.docs[0].data();
    });
    return userDoc
  }


  async componentDidMount() {

    const user = firebase.auth().currentUser;
    const userDoc = await this.getMyName(user);
    console.log(user.uid);
    console.log("USER DOC", userDoc)

    const allUsers = await this.getAllUsers();
    const allFriends = await this.getAllFriends(user);

    console.log(allFriends)

    const allFriendsData = await this.getFriendsFromUsers(allFriends, allUsers);
    const allNonFriendData = await this.getNonFriendsFromUsers(allFriends, allUsers);

    console.log(allFriendsData)
    console.log(allUsers)

    this.setState({ userDoc: { ...userDoc }, friends: [...allFriendsData], userID: user.uid });

  }


  submitChallengesToBackend = () => {
    const allFriends = db.collection('allFriends').doc(user.uid).get().then((doc) => {
      return [...doc.data().Friends];
    })
    return allFriends
  }

  AddRemoveChallengedFriend = (item) => {
    console.log(item)
    const cpyFriends = this.state.friends.map(friendData => {
      if (friendData.userId === item.userId) {
        const tempFriendData = { ...friendData };
        tempFriendData.isChallenged = !item.isChallenged
        return tempFriendData
      } else {
        return friendData
      }
    })
    this.setState({
      friends: [...cpyFriends],
    });
  }


  Submission(friend, ExerciseNum, NumberE, UserID) {

    const exercise = parseInt(ExerciseNum, 10);
    const num = parseInt(NumberE, 10);
    const newchallenge = {
      Completed: false,
      Exercise: exercise,
      Number: num,
      InitiatorID: UserID,
      InitiatorName: this.state.userDoc.name,
      RecipientID: friend.userId,
      Name: friend.name,
      DownloadURL: this.state.currentVideoURL,
      videoUpdated: false,
      TimeStamp: new Date(),
      VerifiedCount: -1,
      ChallengeID: this.state.challengeID,

    }
    return newchallenge;

  }

  getReceivedChallengeDoc = (contenders, ExerciseNum, NumberE, UserID) => {

    console.log("EXERCISE MUMBER", NumberE)
    const exercise = parseInt(ExerciseNum, 10);
    const num = parseInt(NumberE, 10);
    const contenderCpy = contenders.map(item => {
      return {
        name: item.name,
        key: item.key,
        userId: item.userId,
        done: false
      }
    });
    const newDoc = {
      Exercise: exercise,
      Number: num,
      TimeStamp: new Date(),
      ChallengeID: this.state.challengeID,
      DownloadURL: this.state.currentVideoURL,
      InitiatorID: UserID,
      InitiatorName: this.state.userDoc.name,
      Contenders: contenderCpy
    }

    return newDoc
  }


  SubmitBtnPressedHandler = () => { this.uploadBackend(); }


  sendAllChallenges = () => {

    var batch = db.batch();
    const contenders = this.state.friends.filter((friend) => friend.isChallenged);


    console.log(contenders)

    const numberOfContenders = contenders.length;

    contenders.map(friend => {

      const challengeVal = this.Submission(friend, this.props.Exercise, this.props.Number, this.state.userID)
      console.log("CHELLENGE", challengeVal)
      const challengesRef = db.collection("challenges").doc();
      batch.set(challengesRef, challengeVal);


    })
    const receivedChallengesRef = db.collection("receivedChallenges").doc();
    const chalDoc = this.getReceivedChallengeDoc(contenders, this.props.Exercise, this.props.Number, this.state.userID);
    console.log("ChalDoc", chalDoc)
    batch.set(receivedChallengesRef, chalDoc);


    batch.commit().then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    });

    this.updateScore(numberOfContenders)



  }

  updateScore = async (numberOfContenders) => {

    let score = 0

    await firebase.firestore().collection('leaderboard').doc(this.state.userID).get().then((doc) => {
      if (doc.exists) {

        score = doc.data().Score

      }
    });

    console.log(score)

    const finalscore = score + numberOfContenders


    const leaderBoardRef = await db.collection("leaderboard").doc(this.state.userID).set({
      Score: finalscore
    }, { merge: true }).then(() => {
      console.log("Scores Updated")
    }).catch(err => {
      console.log(err);
    });

  }


  uploadBackend = () => {
    this.setState({ isUploading: true })
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;
    this.uploader(this.props.videoURI, 'video/mp4', 'video1');
    console.log('UploadHandler Function Worked');
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

    const uuidVideo = await UUIDGenerator.getRandomUUID()
    this.setState({ challengeID: uuidVideo })
    console.log("UUID", uuidVideo)

    const imageRef = firebase.storage().ref(`/videos/${uuidVideo}`)

    const blob = await fs.readFile(uploadUri, 'base64').then(data => {
      return Blob.build(data, { type: `${mime};BASE64` });
    });

    const uploadTask = imageRef.put(blob, { contentType: mime, name: name });
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes);

        this.setState({ progress: progress });
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
          this.setState({ isUploading: false });
          this.props.navigator.pop();
          const toast = Toast.show('Challenges Sent!!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 1,
            backgroundColor: "green"
          });
        });
      });

  }


  render() {

    const friendDisplay = (
      <FlatList
        style={styles.listcontainer}
        data={this.state.friends}
        renderItem={({ item }) => <Contestants addtext="Challenge Friend" removetext="Dun Challenge Remove" item={item} yesOrNo={item.isChallenged} pressed={() => this.AddRemoveChallengedFriend(item)} />}>

      </FlatList>
    );


    return (
      <View style={styles.overallcontainer}>
        {this.state.isUploading ?
          <View style={styles.container}><Progress.Circle showsText={true} progress={this.state.progress} size={60} /></View>
          :
          friendDisplay}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  innercontainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },

  placeInput: {
    width: "70%"
  },

  placeBtn: {
    width: "30%"
  },


  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listcontainer: {
    width: "100%"
  },
  overallcontainer: {
    paddingBottom: 16
  }
});

export default ChallengeFriendsScreen;
