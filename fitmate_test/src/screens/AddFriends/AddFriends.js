import React from 'react';
import {View ,Text ,FlatList ,StyleSheet} from 'react-native';
import AuthContext from '../../Context/AuthContext'
import firebase  from '../../Firebase'
import { SearchBar , Button} from 'react-native-elements'
import EachFriend from '../../components/Eachfriend'
import SearchedFriend from '../../components/SearchedFriend'


class AddFriendsScreen extends React.Component{
  state = {
    text: "" ,
    users:[

    ],
    filtered:[

    ],
    userID:""
  }


  static contextType = AuthContext;


  async componentDidMount(){

    const user = firebase.auth().currentUser;
    console.log(user.uid);



    let arr = []

    let arrofFriends = []
    await firebase.firestore().collection('allFriends').doc(user.uid).get().then((doc) => {
      arrofFriends = [...doc.data().Friends];
    })

    await firebase.firestore().collection('users').get().then((snapshot)=>{

      snapshot.docs.forEach((doc ,index) => {

        const friendStat = (arrofFriends.includes(doc.data().userID)) ? true : false;
        arr.push({
          key:index,
          name: doc.data().name,
          userid: doc.data().userID,
          isFriend : friendStat
        });


      });

      this.setState({userID: user.uid ,users:[...arr]});
      console.log("TESTING FIRNDS")
      console.log(this.state.users);
    });




  }

 AddRemoveFriend = ( item ) => {
   if(item.isFriend){
     firebase.firestore().collection('allFriends').doc(this.state.userID).update({
      Friends: firebase.firestore.FieldValue.arrayRemove(item.userid)
    });
    const tempArr = [...this.state.users]
    tempArr[item.key].isFriend = false;
    this.setState({
      users: [...tempArr],
      filtered: [...this.state.filtered]
    });
  }else{
    firebase.firestore().collection('allFriends').doc(this.state.userID).update({
     Friends: firebase.firestore.FieldValue.arrayUnion(item.userid)
   });
   const tempArr = [...this.state.users]
   tempArr[item.key].isFriend = true;
   this.setState({
     users: [...tempArr],
     filtered: [...this.state.filtered]
   });
  }

 }

 searchBtnPressedHandler = () => {

    let searchtext = this.state.text;
    if(this.state.text === ""){

    }else{
      let tempArr = this.state.users.filter((friend) => {
        return friend.name.toLowerCase().includes(searchtext.toLowerCase());
      })
      let newtempArr = tempArr.map((friend) => {
        return {key : friend.key.toString() ,index: friend.key}
      })

      this.setState({filtered : [...newtempArr]});

    }

    console.log(this.state.filtered)
  }

  render(){

    const friendDisplay  = (
      <FlatList
        style = {styles.listcontainer}
        data = {this.state.filtered}
        renderItem={({item}) =>  <SearchedFriend addtext = "Add Friend" removetext = "Remove Friend" item = {this.state.users[item.index]} pressed = {() => this.AddRemoveFriend(this.state.users[item.index])}/>}>

      </FlatList>
      );


    return(
      <View style = {styles.overallcontainer}>
        <SearchBar
          onChangeText={(e)=>{this.setState({text : e})}}
          onClearText={()=>{}}
           noIcon
          // icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Type Here...'
          value = {this.state.text} />

        <Button
           raised
           icon={{name: 'cached'}}
           title='Search'
           onPress = {this.searchBtnPressedHandler}
             />

        <Text>{this.state.searchtext}</Text>
        {friendDisplay}
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

export default AddFriendsScreen;
