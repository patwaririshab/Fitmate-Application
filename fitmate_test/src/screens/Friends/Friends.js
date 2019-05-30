import React from 'react';
import {View ,Text ,FlatList ,StyleSheet} from 'react-native';
import FriendGroup from '../../components/FriendGroup.js'
import AuthContext from '../../Context/AuthContext'
import firebase  from '../../Firebase'

class FriendsScreen extends React.Component{
  state = {
    friends:[
      {
        key: "1",
        GroupName: "NS Friends",
        FriendList: [
          {key: "Tom"} ,{key: "Coco"} ,{key: "Desmond"},{key: "Thomas"} ,{key: "Cococruch"} ,{key: "Desmond lee"}, {key: "Sayesha"} ,{key: "Saigal"} ,{key: "Priaynka"},{key: "Deepika"} ,{key: "Regina"} ,{key: "Casandra"}
        ]
      },
      {
        key: "2",
        GroupName: "NUS Friends",
        FriendList: [
          {key: "Tony"} ,{key: "Cindy"} ,{key: "Cynthia"}
        ]
      },
      {
        key: "3",
        GroupName: "School Friends",
        FriendList: [
          {key: "Ashlynn"} ,{key: "Bridget"} ,{key: "Linda"}
        ]
      },
      {
        key: "4",
        GroupName: "Gym Buddies",
        FriendList: [
          {key: "John"} ,{key: "Jack"} ,{key: "Jasmin"}
        ]
      },
    ]
  }

  friendGroupClickedHandler = (item) => {
    this.props.navigator.push({
      screen: 'fitmate.FriendGroupListScreen', // unique ID registered with Navigation.registerScreen
      title: item.GroupName, // navigation bar title of the pushed screen (optional)
      subtitle: undefined, // navigation bar subtitle of the pushed screen (optional)
      passProps: item, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      backButtonTitle: undefined, // override the back button title (optional)
      backButtonHidden: false, // hide the back button altogether (optional)
    });
  }

  static contextType = AuthContext;

  componentDidMount(){
    console.log("Friends Compponent did moutn");
    let arr = [];


    firebase.firestore().collection('users').get().then((snapshot)=>{
      snapshot.docs.forEach((doc) => {
        arr.push({
          key:doc.data().email,
          name:doc.data().name,
          email:doc.data().email
        })
      });
    });

    console.log(arr);

    let tempfriends = [...this.state.friends];

    tempfriends.forEach((friendsgrp) => {
      friendsgrp.FriendList = arr;
    });

    console.log(tempfriends);


  }

  render(){
    // const templist = [{key:1 , height:"hello"} , {key:2 , height:"hello"}  ,{key:3 , height:"hello"}, {key:4 , height:"hello"}, {key:5 , height:"hello"}, {key:6 , height:"hello"},{key:7 , height:"hello"},{key:8 , height:"hello"}, {key:9 , height:"hello"}, {key:10 , height:"hello"} , {key:11 , height:"hello"}  ,{key:12 , height:"hello"}, {key:13 , height:"hello"}, {key:14 , height:"hello"}, {key:15 , height:"hello"},{key:16 , height:"hello"},{key:17 , height:"hello"}, {key:18 , height:"hello"} ]

    const friendGroupDisplay  = (
      <FlatList
        style = {styles.listcontainer}
        data = {this.state.friends}
        renderItem={({item}) => <FriendGroup pressed = {() => this.friendGroupClickedHandler(item)} members = {item.FriendList} groupname = {item.GroupName}/>}>

      </FlatList>
      );

      // <Friendgrp members = {item.FriendList} groupname = {item.GroupName}/>



    return(
      <View style = {styles.overallcontainer}>
        {friendGroupDisplay}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20 ,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  innercontainer:{

    width : "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center"
    },

  placeInput:{
    width: "70%"
    },

  placeBtn:{
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
  listcontainer:{
    width: "100%"
  },
  overallcontainer:{
    paddingBottom:16
  }
});

export default FriendsScreen;
