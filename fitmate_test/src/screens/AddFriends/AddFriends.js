import React from 'react';
import {View ,Text ,FlatList ,StyleSheet} from 'react-native';
import AuthContext from '../../Context/AuthContext'
import firebase  from '../../Firebase'
import { SearchBar , Button} from 'react-native-elements'
import EachFriend from '../../components/EachFriend'


class AddFriendsScreen extends React.Component{
  state = {
    text: "" ,
    friends:[

    ],
    users:[

    ],
    filtered:[

    ]
  }


  static contextType = AuthContext;


  async componentDidMount(){

    const user = firebase.auth().currentUser;
    console.log(user.uid);

    let arr = []

    await firebase.firestore().collection('users').get().then((snapshot)=>{

      snapshot.docs.forEach((doc ,index) => {

        arr.push({
          name: doc.data().name,
          userid: doc.data().userID
        });


      });

      this.setState({users:[...arr]});

      console.log(this.state.users);
    });




  }

 searchBtnPressedHandler = () => {

    let searchtext = this.state.text;
    if(this.state.text === ""){

    }else{
      let tempArr = this.state.users.filter((friend) => {
        return friend.name.toLowerCase().includes(searchtext.toLowerCase())
      })
      this.setState({filtered : [...tempArr]});

    }
    console.log(this.state.filtered)

  }

  render(){

    const friendDisplay  = (
      <FlatList
        style = {styles.listcontainer}
        data = {this.state.filtered}
        renderItem={({item}) =>  <EachFriend name = {item}/>}>

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
