import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ListItem } from 'react-native';
import AuthContext from '../../Context/AuthContext'
import firebase from '../../Firebase'
import { SearchBar, Button } from 'react-native-elements'

import SearchedFriend from '../../components/SearchedFriend'
import Profile1 from '../../../icons/profilepic.jpg'
import Profile2 from '../../../icons/profilepic2.jpg'

const picture = Math.random() > 0.5 ? Profile1 : Profile2;

class AddFriendsScreen extends React.Component {
  state = {
    text: "",
    users: [

    ],
    filtered: [

    ],
    userID: ""
  }



  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if(event.type === "NavBarButtonPress") {
      if(event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: 'right'     
        });
      }
    }
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
    } 
    else {
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
      this.setState({filtered: []}) 
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
          inputContainerStyle={{ borderRadius: 20}}
          onChangeText={ 
            (e) => { this.setState({ text: e });
                    this.searchBtnPressedHandler();
          }
          }
          onClearText={() => { }}
          noIcon
          icon={{ type: 'font-awesome', name: 'search' }}
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  innercontainer: {

    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },

//   placeInput: {
//     width: "70%"
//   },

//   placeBtn: {
//     width: "30%"
//   },


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
    width: "100%",
  },
  overallcontainer: {
    paddingBottom: 5,
  }
});

export default AddFriendsScreen;
