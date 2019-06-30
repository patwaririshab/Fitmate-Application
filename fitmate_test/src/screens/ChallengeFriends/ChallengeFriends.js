import React from 'react';
import { Platform, PermissionsAndroid, CameraRoll, FlatList, AppRegistry, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

import AuthContext from '../../Context/AuthContext'
import firebase from '../../Firebase'
import { SearchBar, Button } from 'react-native-elements'
import SearchedFriend from '../../components/SearchedFriend'

// import 'firebase/storage'
import RNFetchBlob from 'react-native-fetch-blob'
import fs from 'react-native-fs'
// import RNFetchBlob from 'rn-fetch-blob'
// import RNFS from 'react-native-fs'

class ChallengeFriendsScreen extends React.Component {
  state = {
    text: "",
    friends: [
    ],
    userID: "",

    uri: "",
    type: `video/mp4`,
    currentVideoURL: "",
    currentChallengesId: [],
    doneUploadingVideo: false,
    // doneUploadingChallenge: false
  }
  static contextType = AuthContext;

  getAllFriends = (user) => {
    const allFriends = firebase.firestore().collection('allFriends').doc(user.uid).get().then((doc) => {
      return [...doc.data().Friends];
    })
    return allFriends
  }

  getAllUsers = () => {

    return firebase.firestore().collection('users').get().then((snapshot) => {
      const allUsers = snapshot.docs.map((doc, index) => {
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

  async componentDidMount() {

    const user = firebase.auth().currentUser;
    console.log(user.uid);

    const allUsers = await this.getAllUsers();
    const allFriends = await this.getAllFriends(user);

    const allFriendsData = await this.getFriendsFromUsers(allFriends, allUsers);
    const allNonFriendData = await this.getNonFriendsFromUsers(allFriends, allUsers);

    console.log(allFriendsData)
    console.log(allUsers)

    this.setState({ friends: [...allFriendsData], userID: user.uid });

  }

  componentDidUpdate(prevProps, prevState) {
    //Typical usage, don't forget to compare the props
    if (this.state.doneUploadingVideo == true && prevState.doneUploadingVideo == false) {
      console.log("Before");
      this.sendAllChallenges();
      console.log("After");
    }
  }

  AddRemoveChallengedFriend = (item) => {
    console.log(item)
    const cpyFriends = [...this.state.friends]
    const stat = cpyFriends[item.key].isChallenged;
    cpyFriends[item.key].isChallenged = !stat;
    console.log(cpyFriends)
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
    console.log("SUBMISSION!!")
    console.log(friend)
    console.log(this.state.currentVideoURL)

    if (friend.isChallenged) {
      console.log("SUBMISSION TESTING !!!")
      const newchallenge = {
        Completed: false,
        Exercise: exercise,
        Number: num,
        InitiatorID: UserID,
        RecipientID: friend.userId,
        Name: friend.name,
        DownloadURL: this.state.currentVideoURL,
        videoUpdated: false
      }

      firebase.firestore().collection('challenges').add(newchallenge).then(docRef => {
        console.log("DOC REF", docRef);
        const newListofChallenges = [...this.state.currentChallengesId]
        newListofChallenges.push(docRef.id)
        this.setState({ currentChallengesId: [...newListofChallenges] });
        console.log("DOC REF ADDED", this.state.currentChallengesId);
      }).catch(err => { console.log("SUBMISSION ERROR", err) });



      console.log("FINSIHED WITH SEDNING DATA")
      console.log(this.state.currentChallengesId);


    }
  }


  updateVideoIntoChallenge = async (docuID) => {
    console.log(docuID)
    const tempDoc = await firebase.firestore().collection('challenges').doc(docuID).get();
    console.log("THIS IS THE DATA!!", tempDoc.data)
    firebase.firestore().collection('challenges').doc(docuID).update({
      ...tempDoc.data,
      DownloadURL: this.state.uri
    });
  }

  updateVideoURLs = async () => {
    console.log("HERER", this.state.currentChallengesId)
    return await Promise.all(this.state.currentChallengesId.map(item => this.updateVideoIntoChallenge(item)))
  }


  // async updateVideoURLs() {
  //   console.log("HERER")

  //   this.state.currentChallengesId.forEach(docuID => {
  //     console.log(docuID)
  //     const tempDoc = firebase.firestore().collection('challenges').doc(docuID).get();
  //     console.log(tempDoc)
  //     firebase.firestore().collection('challenges').doc(docuID).update({
  //       ...tempDoc,
  //       DownloadURL: this.state.currentVideoURL
  //     });
  //   })

  // }

  SubmitBtnPressedHandler = () => {

    // this.props.navigator.push({
    //   screen: 'fitmate.UploadScreen',
    //   title: 'Upload Video',
    //   subtitle: undefined,
    //   passProps: { uri: this.state.uri, type: this.state.type },
    //   animated: true,
    //   animationType: 'fade',
    //   backButtonTitle: undefined,
    //   backButonHidden: false,
    // });
    // console.log(this.props.Exercise);
    // console.log(this.props.Number);
    // console.log(this.state.friends, "MY FRIENDS!!!")
    // this.state.friends.forEach((friend) => this.Submission(friend, this.props.Exercise, this.props.Number, this.state.userID));


    this.uploadBackend();
    // console.log("DONE !!!!")
  }


  sendAllChallenges = async () => {
    console.log("HERER", this.state.currentChallengesId)
    await Promise.all(this.state.friends.map(friend => this.Submission(friend, this.props.Exercise, this.props.Number, this.state.userID)))
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

  uploader = (uri, mime = 'video/mp4', name) => {
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
          console.log("Uplaod Blob")
          return imageRef.put(blob, { contentType: mime, name: name });
        })
        .then(() => {
          uploadBlob.close();
          let currentVideoURLVal = imageRef.getDownloadURL()




          return currentVideoURLVal;
        })
        .then(url => {
          console.log("THER URL IS ", url)
          resolve(url);
          this.setState({ currentVideoURL: url, doneUploadingVideo: true });

          // this.myPromise();
        })
        .catch(error => {
          reject(error)
        })
    })
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
          icon={{ name: 'cached' }}
          title='Capture Video'
          onPress={this.captureVideoHandler}
        />

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
