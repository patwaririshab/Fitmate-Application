import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AuthContext from '../../Context/AuthContext'
import firebase from '../../Firebase'
import { SearchBar, Button } from 'react-native-elements'
//import EachFriend from '../../components/EachFriend'

import SearchedFriend from '../../components/SearchedFriend'

import profileicon from '../../../icons/profile.png';
import refreshicon from '../../../icons/refresh.png';

import trophyIcon from '../../../icons/trophy.jpg'



class AddFriendsScreen extends React.Component {


  static navigatorButtons = {
    rightButtons: [
      {
        id: 'leaderBoardBtn',
        icon: trophyIcon
      }, {
        id: 'profileBtn',
        icon: profileicon
      },
      {
        id: 'refreshBtn',
        icon: refreshicon
      }
    ]
  };


  openLeaderBoard = () => {
    this.props.navigator.push({
      screen: 'fitmate.LeaderBoard',
      title: "LeaderBoard",
      subtitle: undefined,
      passProps: {
        userID: this.state.userID
      },
      animated: true,
      animationType: 'fade',
      backButtonTitle: undefined,
      backButtonHidden: false,
    });
  }

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }


  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'refreshBtn') {
        // this.SubmitBtnPressedHandler();
      }
      if (event.id == 'profileBtn') {
        this.props.navigator.toggleDrawer({
          side: 'right'
        });
      }
      if (event.id == 'leaderBoardBtn') {
        this.openLeaderBoard();

      }

    }
  }

  state = {
    text: "",
    users: [

    ],
    filtered: [

    ],
    userID: ""
  }


  static contextType = AuthContext;


  getAllFriends = (user) => {
    const allFriends = firebase.firestore().collection('allFriends').doc(user.uid).get().then((doc) => {
      return [...doc.data().Friends];
    })
    return allFriends
  }

  getAllUsers = (allFriends) => {

    return firebase.firestore().collection('users').get().then((snapshot) => {
      const allUsers = snapshot.docs.map((doc, index) => {

        const friendStat = (allFriends.includes(doc.data().userID)) ? true : false;
        return (
          {
            key: index,
            name: doc.data().name,
            userID: doc.data().userID,
            isFriend: friendStat
          }
        );
      });
      return allUsers;
    });
  }


  async componentDidMount() {

    const user = firebase.auth().currentUser;
    console.log(user.uid);


    const allFriends = await this.getAllFriends(user);

    const allUsers = await this.getAllUsers(allFriends);

    this.setState({ userID: user.uid, users: [...allUsers] });
    console.log("TESTING FIRNDS")
    console.log(this.state.users);


  }

  AddRemoveFriend = (item) => {
    console.log(item)
    if (item.isFriend) {
      firebase.firestore().collection('allFriends').doc(this.state.userID).update({
        Friends: firebase.firestore.FieldValue.arrayRemove(item.userID)
      });
      const usersCpy = [...this.state.users]
      usersCpy[item.key].isFriend = false;
      this.setState({
        users: [...usersCpy],
        filtered: [...this.state.filtered]
      });
    } else {
      firebase.firestore().collection('allFriends').doc(this.state.userID).update({
        Friends: firebase.firestore.FieldValue.arrayUnion(item.userID)
      });
      const usersCpy = [...this.state.users]
      usersCpy[item.key].isFriend = true;
      this.setState({
        users: [...usersCpy],
        filtered: [...this.state.filtered]
      });
    }

  }

  searchBtnPressedHandler = () => {
    const searchtext = this.state.text;
    if (searchtext === "") {

    } else {
      const usersCpy = this.state.users.filter((friend) => {
        return friend.name.toLowerCase().includes(searchtext.toLowerCase());
      })
      const newusersCpy = usersCpy.map((friend) => {
        return { key: friend.key.toString(), index: friend.key }
      })

      this.setState({ filtered: [...newusersCpy] });

    }

    console.log(this.state.filtered)
  }

  render() {

    const friendDisplay = (
      <FlatList
        style={styles.listcontainer}
        data={this.state.filtered}
        renderItem={({ item }) => <SearchedFriend addtext="Add Friend" removetext="Remove Friend" item={this.state.users[item.key]} yesOrNo={this.state.users[item.key].isFriend} pressed={() => this.AddRemoveFriend(this.state.users[item.key])} />}>

      </FlatList>
    );


    return (
      <View style={styles.overallcontainer}>
        <SearchBar
          onChangeText={
            (e) => {
              this.setState({ text: e });
              this.searchBtnPressedHandler();
            }
          }
          onClearText={() => { }}
          noIcon
          //icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Type Here...'
          value={this.state.text} />
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

export default AddFriendsScreen;
