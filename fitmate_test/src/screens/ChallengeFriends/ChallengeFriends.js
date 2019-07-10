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
            key: index,
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
      return snapshot.docs[0];
    });
    return userDoc
  }


  async componentDidMount() {

    const user = firebase.auth().currentUser;
    const userDoc = await this.getMyName(user);
    console.log(user.uid);

    const allUsers = await this.getAllUsers();
    const allFriends = await this.getAllFriends(user);

    console.log(allFriends)

    const allFriendsData = await this.getFriendsFromUsers(allFriends, allUsers);
    const allNonFriendData = await this.getNonFriendsFromUsers(allFriends, allUsers);

    console.log(allFriendsData)
    console.log(allUsers)

    this.setState({ userDoc: { userDoc }, friends: [...allFriendsData], userID: user.uid });

  }


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
      VerifiedCount: -1
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
    this.uploader(this.props.videoURI, 'video/mp4', 'video1');
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


  render() {

    const friendDisplay = (
      <FlatList
        style={styles.listcontainer}
        data={this.state.friends}
        renderItem={({ item }) => <SearchedFriend addtext="Challenge Friend" removetext="Dun Challenge Remove" item={item} yesOrNo={item.isChallenged} pressed={() => this.AddRemoveChallengedFriend(item)} />}>

      </FlatList>
    );


    return (
      <View style={styles.overallcontainer}>
        <SearchBar
          onChangeText={(e) => { this.setState({ text: e }) }}
          onClearText={() => { }}
          noIcon
          // icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Type Here...'
          value={this.state.text} />

        <Button
          raised
          icon={{ name: 'flame' }}
          success
          title='Submit Challenge'
          onPress={this.SubmitBtnPressedHandler}
        />

        <Text>{this.state.searchtext}</Text>
        {friendDisplay}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
