import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FriendGroup from '../../components/FriendGroup.js'
import AuthContext from '../../Context/AuthContext'
import firebase from '../../Firebase'


class FriendsScreen extends React.Component {
  state = {
    friends: [
      {
        key: "1",
        GroupName: "NS Friends",
        FriendList: [
          { key: "Tom" }, { key: "Coco" }, { key: "Desmond" }, { key: "Thomas" }, { key: "Cococruch" }, { key: "Desmond lee" }, { key: "Sayesha" }, { key: "Saigal" }, { key: "Priaynka" }, { key: "Deepika" }, { key: "Regina" }, { key: "Casandra" }
        ]
      },
      {
        key: "2",
        GroupName: "NUS Friends",
        FriendList: [
          { key: "Tony" }, { key: "Cindy" }, { key: "Cynthia" }
        ]
      },
      {
        key: "3",
        GroupName: "School Friends",
        FriendList: [
          { key: "Ashlynn" }, { key: "Bridget" }, { key: "Linda" }
        ]
      },
      {
        key: "4",
        GroupName: "Gym Buddies",
        FriendList: [
          { key: "John" }, { key: "Jack" }, { key: "Jasmin" }
        ]
      },
    ]
  }

  friendGroupClickedHandler = (item) => {
    this.props.navigator.push({
      screen: 'fitmate.FriendGroupListScreen',
      title: item.GroupName,
      subtitle: undefined,
      passProps: item,
      animated: true,
      animationType: 'fade',
      backButtonTitle: undefined,
      backButtonHidden: false,
    });
  }

  static contextType = AuthContext;


  getAllFriendGroups = (user) => {
    const dataOfFriendGroups = firebase.firestore().collection('friendGroups').where("OwnerID", "==", user.uid).get().then((snapshot) => {
      const arrOfFriendGroups = snapshot.docs.map((doc, index) => {

        const friendsGroup = doc.data().friends.map((friend) => {
          return (
            ({
              key: friend.id,
              name: friend.name,
            })
          );
        })
        return ({
          key: index.toString(),
          GroupName: doc.data().GroupName,
          FriendList: [...friendsGroup]
        });

      });
      return arrOfFriendGroups

    });

    return dataOfFriendGroups
  }


  async componentDidMount() {

    const user = firebase.auth().currentUser;
    const arrOfFriendGroupDetails = await this.getAllFriendGroups(user);

    this.setState({
      friends: arrOfFriendGroupDetails
    });

  }


  render() {
    const friendGroupDisplay = (
      <FlatList
        style={styles.listcontainer}
        data={this.state.friends}
        renderItem={({ item }) => <FriendGroup pressed={() => this.friendGroupClickedHandler(item)} members={item.FriendList} groupname={item.GroupName} />}>
      </FlatList>
    );

    return (
      <View style={styles.overallcontainer}>
        {friendGroupDisplay}
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

export default FriendsScreen;
