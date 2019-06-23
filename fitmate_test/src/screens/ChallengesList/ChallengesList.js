import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import firebase from '../../Firebase'
import EachChallenge from '../../components/EachChallenge.js'

class ChallengesList extends React.Component {

  state = {
    Completed: [],
    Incomplete: []
  }

  getIncompleteChallenges = (user) => {
    const allIncompleteChallenges = firebase.firestore().collection('challenges').where("RecipientID", "==", user.uid).where("Completed", "==", false).get().then((snapshot) => {
      const incompleteChallenges = (snapshot.docs.map((doc, index) => {
        return ({
          key: index.toString(),
          Exercise: doc.data().Exercise,
          InitiatorID: doc.data().InitiatorID,
          InitiatorName: doc.data().Name,
          Number: doc.data().Number
        });
      }));

      return incompleteChallenges

    });
    return allIncompleteChallenges
  }

  getCompleteChallenges = (user) => {
    const allCompleteChallenges = firebase.firestore().collection('challenges').where("RecipientID", "==", user.uid).where("Completed", "==", true).get().then((snapshot) => {
      const completeChallenges = (snapshot.docs.map((doc, index) => {
        return ({
          key: index.toString(),
          Exercise: doc.data().Exercise,
          InitiatorID: doc.data().InitiatorID,
          InitiatorName: doc.data().Name,
          Number: doc.data().Number
        });
      }));
      return completeChallenges

    });
    return allCompleteChallenges
  }

  async componentDidMount() {
    console.log("Challenges  Compponent did moutn");
    const user = firebase.auth().currentUser;
    const allCompleteChallenges = await this.getCompleteChallenges(user);
    const allIncompleteChallenges = await this.getIncompleteChallenges(user);
    this.setState({ Completed: [...allCompleteChallenges], Incomplete: [...allIncompleteChallenges] });
  }

  render() {
    const ChallengeDisplay = (
      <FlatList
        style={styles.listcontainer}
        data={this.state.Incomplete}
        renderItem={({ item }) => <EachChallenge pressed={() => { }} Number={item.Number} Exercise={item.Exercise} Initiator={item.InitiatorName} />}>
      </FlatList>
    );

    return (
      <View style={styles.overallcontainer}>
        {ChallengeDisplay}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  listcontainer: {
    width: "100%"
  },
  overallcontainer: {
    paddingBottom: 16
  }
});

export default ChallengesList;
