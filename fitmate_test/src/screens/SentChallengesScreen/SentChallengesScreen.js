import React from 'react'
import { TouchableHighlight, Modal, StyleSheet, Text, FlatList } from 'react-native'
import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import firebase from '../../Firebase'
import EachChallenge from '../../components/EachChallenge.js'
import ExerciseItem from '../../components/ExerciseItem'
import Exercises from '../Exercise/Exercise'

import pushupimg from '../../../icons/pushups.jpg'
import situpimg from '../../../icons/situpslabel.jpg'

import squatsimg from '../../../icons/squatslabel.jpg'

import profileicon from '../../../icons/profile.png';
import refreshicon from '../../../icons/refresh.png';


class ChallengesList extends React.Component {

    static navigatorButtons = {
        rightButtons: [
            {
                id: 'profileBtn',
                icon: profileicon
            },
            {
                id: 'refreshBtn',
                icon: refreshicon
            }
        ]
    };


    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }


    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'refreshBtn') {
                this.update();
            }
            if (event.id == 'profileBtn') {
                this.props.navigator.toggleDrawer({
                    side: 'right'
                });
            }
        }
    }

    state = {
        Challenges: []
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


    getSentChallenges = (user) => {
        const allSentChallenges = firebase.firestore().collection('receivedChallenges').where("InitiatorID", "==", user.uid).get().then((snapshot) => {
            const Challenges = (snapshot.docs.map((doc, index) => {
                return ({
                    docID: doc.id,
                    ChallengeID: doc.data().ChallengeID,
                    key: index.toString(),
                    Exercise: doc.data().Exercise,
                    InitiatorID: doc.data().InitiatorID,
                    InitiatorName: doc.data().InitiatorName,
                    Number: doc.data().Number,
                    TimeStamp: doc.data().TimeStamp,
                    VerifiedCount: doc.data().TimeStamp,
                    Contenders: doc.data().Contenders,
                    DownloadURL: doc.data().DownloadURL,
                    videoUpdated: doc.data().videoUpdated,
                });
            }));
            return Challenges

        });
        return allSentChallenges
    }

    setChallengeDone = async (challenge) => {
        await firebase.firestore().collection('challenges').doc(challenge.docID).update({
            Completed: true
        }).then(() => {
            console.log("Doc successfully Updated!")
        });

        const Obj = await firebase.firestore().collection('receivedChallenges').where("ChallengeID", "==", challenge.ChallengeID).get().then((snapshot) => {
            return { id: snapshot.docs[0].id, contenders: snapshot.docs[0].data().Contenders }
        });

        console.log(Obj)

        const updatedArrOfChallengeState = await Obj.contenders.map((item) => {
            if (item.userId === challenge.RecipientID) {
                return ({
                    ...item,
                    done: true
                })
            } else {
                return ({
                    ...item
                })
            }

        });

        await firebase.firestore().collection('receivedChallenges').doc(Obj.id).update({
            Contenders: updatedArrOfChallengeState
        }).then(() => {
            console.log("Received Doc successfully Updated!")
        });


    }

    ViewContendersStateScreen = (challenge) => {
        this.props.navigator.push({
            screen: 'fitmate.ViewContendersStateScreen',
            title: "View State of sent challenges",
            subtitle: undefined,
            passProps: {
                ...challenge,
            },
            animated: true,
            animationType: 'fade',
            backButtonTitle: undefined,
            backButtonHidden: false,
        });

    }

    update = async () => {
        console.log("Updating!")
        const user = firebase.auth().currentUser;
        const allSentChallenges = await this.getSentChallenges(user);
        this.setState({ Challenges: [...allSentChallenges] });
    }

    componentDidMount() {
        console.log("Challenges  Compponent did moutn");
        this.update();
    }



    render() {
        const ChallengeDisplay = (
            <FlatList
                style={styles.listcontainer}
                data={this.state.Challenges}
                numColumns={2}
                renderItem={({ item }) => <EachChallenge pressed={() => this.ViewContendersStateScreen(item)} {...item} img={this.getImage(item.Exercise)} />}>
            </FlatList>
        );


        return (
            <Container>
                {this.state.Challenges.length === 0 ? <Text style={{ width: "100%", height: "100%", textAlign: "center", textAlignVertical: "center", fontSize: 30, fontStyle: "bold", color: "black" }}>You have not sent any Challenges!!</Text> : ChallengeDisplay}


            </Container>
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
