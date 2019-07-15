import React from 'react'
import { TouchableHighlight, Modal, StyleSheet, Text, FlatList, ImageBackground } from 'react-native'
import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import firebase from '../../Firebase'
import EachChallenge from '../../components/EachChallenge.js'
import ExerciseItem from '../../components/ExerciseItem'
import Exercises from '../Exercise/Exercise'

import pushupimg from '../../../icons/pushups.jpg'
import situpimg from '../../../icons/situpslabel.jpg'
import squatsimg from '../../../icons/squatslabel.jpg'
import backgrndimg from '../../../icons/background-image-green.png'


class ChallengesList extends React.Component {

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


  state = {
    Completed: [],
    Incomplete: [],
    modalVisible: false,
    active: true,


  }

  getImage = (exercise) => {
    switch (exercise) {
      case 1:
        return pushupimg;
      case 2:
        return situpimg;
      case 3:
        return squatsimg
      default:
        return pushupimg
    }
  }


  getIncompleteChallenges = (user) => {
    const allIncompleteChallenges = firebase.firestore().collection('challenges').where("RecipientID", "==", user.uid).where("Completed", "==", false).get().then((snapshot) => {
      const incompleteChallenges = (snapshot.docs.map((doc, index) => {
        return ({
          key: index.toString(),
          Exercise: doc.data().Exercise,
          InitiatorID: doc.data().InitiatorID,
          InitiatorName: doc.data().InitiatorName,
          Name: doc.data().Name,
          Number: doc.data().Number,
          TimeStamp: (doc.data().TimeStamp),
          VerifiedCount: doc.data().TimeStamp,
          RecipientID: doc.data().RecipientID,
          DownloadURL: doc.data().DownloadURL,
          videoUpdated: doc.data().videoUpdated,
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
          InitiatorName: doc.data().InitiatorName,
          Name: doc.data().Name,
          Number: doc.data().Number,
          TimeStamp: doc.data().TimeStamp,
          VerifiedCount: doc.data().TimeStamp,
          RecipientID: doc.data().RecipientID,
          DownloadURL: doc.data().DownloadURL,
          videoUpdated: doc.data().videoUpdated,
        });
      }));
      return completeChallenges

    });
    return allCompleteChallenges
  }

  loadViewChallengeScreen = (challenge) => {
    props.navigator.push({
      // screen: 'fitmate.ChallengeFriendsScreen',
      // title: "Challenge Friends",
      subtitle: undefined,
      passProps: {
        ...challenge
      },
      animated: true,
      animationType: 'fade',
      backButtonTitle: undefined,
      backButtonHidden: false,
    });

  }

  async componentDidMount() {
    console.log("Challenges  Compponent did moutn");
    const user = firebase.auth().currentUser;
    const allCompleteChallenges = await this.getCompleteChallenges(user);
    const allIncompleteChallenges = await this.getIncompleteChallenges(user);
    this.setState({ Completed: [...allCompleteChallenges], Incomplete: [...allIncompleteChallenges] });
  }
  setModalVisibility = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const ChallengeDisplay = (
      <FlatList
        style={styles.listcontainer}
        data={this.state.Incomplete}
        numColumns={2}
        renderItem={({ item }) => <EachChallenge pressed={() => this.loadViewChallengeScreen(item)} {...item} img={this.getImage(item.Exercise)} />}>
      </FlatList>
    );

    const exercisesModal = (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>

        <TouchableHighlight onPress={() => { this.setModalVisibility(false) }}>


          <View style={{
            backgroundColor: '#21212180',
            height: "100%",
            width: "100%",
            padding: 0
          }}>


            <View style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: 30,
              marginLeft: 30,
              backgroundColor: '#white',
              // borderRadius: 10,
              borderWidth: 2,
              borderColor: 'black',
              padding: 0
            }}>
              <View>
                <Exercises closeModal={() => { this.setModalVisibility(false) }} navigator={this.props.navigator} />
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Modal>

    );


    return (
      <Container
        style = {styles.overallcontainer}
      >
        {ChallengeDisplay}
        {exercisesModal}
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: 'green' }}
            position="bottomRight"
            onPress={() => this.setModalVisibility(!this.state.modalVisible)}>
            <Icon name="add" />
          </Fab>
        </View>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  listcontainer: {
    width: "100%",
  },
  overallcontainer: {
    paddingBottom: 16
  },
  backgroundImage: {
    flex: 1,
    padding: 10,
    justifyContent:'center',
  },
});

export default ChallengesList;
