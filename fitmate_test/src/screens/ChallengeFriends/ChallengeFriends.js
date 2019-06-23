import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AuthContext from '../../Context/AuthContext'

import firebase  from '../../Firebase'
import { SearchBar , Button} from 'react-native-elements'
import EachFriend from '../../components/Eachfriend'
import SearchedFriend from '../../components/SearchedFriend'


class ChallengeFriendsScreen extends React.Component {
  state = {
    text: "",
    friends: [
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

    this.setState({ friends: [...allFriendsData] });

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

  searchBtnPressedHandler = () => {


  }

  async Submission(friend, ExerciseNum, Number, UserID) {

    const exercise = parseInt(ExerciseNum, 10);
    const num = parseInt(Number, 10);

    if (friend.isChallenged) {
      const newchallenge = {
        Completed: false,
        Exercise: exercise,
        Number: num,
        InitiatorID: UserID,
        RecipientID: friend.userid,
        Name: friend.name
      }
      await firebase.firestore().collection('challenges').doc().set(newchallenge);
    }


  }

  SubmitBtnPressedHandler = () => {
    console.log(this.props.Exercise);
    console.log(this.props.Number);
    this.state.friends.forEach((friend) => this.Submission(friend, this.props.Exercise, this.props.Number, this.state.userID));
  }

  render() {

    const friendDisplay = (
      <FlatList
        style={styles.listcontainer}
        data={this.state.friends}
        renderItem={({ item }) => <SearchedFriend addtext="Challenge Friend" removetext="Dun Challenge Remove" item={item} pressed={() => this.AddRemoveChallengedFriend(item)} />}>

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
          title='Search'
          onPress={this.searchBtnPressedHandler}
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
