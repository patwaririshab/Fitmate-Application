import React from 'react';
import {View ,Text ,FlatList ,StyleSheet} from 'react-native';
import AuthContext from '../../Context/AuthContext'
import firebase  from '../../Firebase'
import { SearchBar , Button} from 'react-native-elements'
import EachFriend from '../../components/Eachfriend'
import SearchedFriend from '../../components/SearchedFriend'


class ChallengeFriendsScreen extends React.Component{
  state = {
    text: "" ,
    friends:[

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
        let i = 0;
      snapshot.docs.forEach((doc ,index) => {

        const friendStat = (arrofFriends.includes(doc.data().userID)) ? true : false;
        if(friendStat){
          arr.push({
            key:i,
            name: doc.data().name,
            userid: doc.data().userID,
            isFriend : false
          });
          i++;
        }


      });

      this.setState({userID: user.uid ,friends:[...arr]});

    });




  }

 AddRemoveFriend = ( item ) => {
   console.log(item)
   const tempArr = [...this.state.friends]
   const stat = tempArr[item.key].isFriend;
   tempArr[item.key].isFriend = !stat;
   this.setState({
     friends: [...tempArr],
   });
 }

 searchBtnPressedHandler = () => {

    // let searchtext = this.state.text;
    // if(this.state.text === ""){
    //
    // }else{
    //   let tempArr = this.state.users.filter((friend) => {
    //     return friend.name.toLowerCase().includes(searchtext.toLowerCase());
    //   })
    //   let newtempArr = tempArr.map((friend) => {
    //     return {key : friend.key.toString() ,index: friend.key}
    //   })
    //
    //   this.setState({filtered : [...newtempArr]});
    //
    // }
    //
    // console.log(this.state.filtered)
  }

  async Submission(friend , ExerciseNum , Number , UserID){

      const exercise = parseInt(ExerciseNum, 10);
      const num = parseInt(Number, 10);

      if(friend.isFriend){
        const newchallenge = {
          Completed: false,
          Exercise: exercise,
          Number: num,
          InitiatorID: UserID,
          RecipientID:friend.userid,
          Name:friend.name
        }
        await firebase.firestore().collection('challenges').doc().set(newchallenge);
      }


  }

  SubmitBtnPressedHandler = () => {
    console.log(this.props.Exercise);

    console.log(this.props.Number);
    this.state.friends.forEach((friend) => this.Submission(friend , this.props.Exercise ,this.props.Number , this.state.userID ));
  }

  render(){

    const friendDisplay  = (
      <FlatList
        style = {styles.listcontainer}
        data = {this.state.friends}
        renderItem={({item}) =>  <SearchedFriend addtext = "Challenge Friend" removetext = "Dun Challenge Remove" item = {item} pressed = {() => this.AddRemoveFriend(item)}/>}>

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

         <Button
            raised
            icon={{name: 'flame'}}
            success
            title='Submit Challenge'
            onPress = {this.SubmitBtnPressedHandler}
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

export default ChallengeFriendsScreen;
