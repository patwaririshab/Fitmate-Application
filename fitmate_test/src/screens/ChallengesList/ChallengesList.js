import React from 'react'
import {StyleSheet ,View , Text ,FlatList} from 'react-native'
import firebase  from '../../Firebase'
import EachChallenge from '../../components/EachChallenge.js'

class ChallengesList extends React.Component{

    state = {
      Completed :[],
      Incomplete : []
    }


    async componentDidMount(){
      console.log("Challenges  Compponent did moutn");
      let arr = [];

      let allCompletedChallenges = [];
      let allIncompleteChallenges = [];

      const user = firebase.auth().currentUser;
        console.log(user.uid);


      await firebase.firestore().collection('challenges').where("RecipientID", "==", user.uid).get().then((snapshot)=>{
        snapshot.docs.forEach((doc ,index) => {

          console.log(doc)

          allIncompleteChallenges.push({
            key: index.toString(),
            Exercise: doc.data().Exercise,
            InitiatorID: doc.data().InitiatorID,
            InitiatorName: doc.data().Name,
            Number: doc.data().Number
          });

          // if(doc.data().Completed === true){
          //   allCompletedChallenges.push({
          //     key: index.toString(),
          //     Exercise: doc.data().Exercise,
          //     InitiatorID: doc.data().InitiatorID,
          //     InitiatorName: doc.data().Name,
          //     Number: doc.data().Number
          //   });
          // }else{
          //   allIncompleteChallenges.push({
          //     key: index.toString(),
          //     Exercise: doc.data().Exercise,
          //     InitiatorID: doc.data().InitiatorID,
          //     InitiatorName: doc.data().Name,
          //     Number: doc.data().Number
          //   });
          // }

        });
        console.log("INCOMEPLERTerjfke");
        console.log(allIncompleteChallenges)
        this.setState({
          Completed: [...allCompletedChallenges],
          Incomplete: [...allIncompleteChallenges]
        });

      });



    }


  render(){
    const ChallengeDisplay  = (
      <FlatList
        style = {styles.listcontainer}
        data = {this.state.Incomplete}
        renderItem={({item}) => <EachChallenge pressed = {() => this.IssuedChallengeClickedHandler(item)} Number= {item.Number} Exercise = {item.Exercise} Initiator = {item.InitiatorName}/>}>

      </FlatList>
      );

      // <Friendgrp members = {item.FriendList} groupname = {item.GroupName}/>



    return(
      <View style = {styles.overallcontainer}>
        {ChallengeDisplay}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  listcontainer:{
    width: "100%"
  },
  overallcontainer:{
    paddingBottom:16
  }
});

export default ChallengesList;
