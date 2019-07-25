import React from 'react'
import UserScore from '../../components/userScore'
import firebase from '../../Firebase'
import { View, FlatList, StyleSheet } from 'react-native'
class LeaderBoardScreen extends React.Component {

    state = {
        AllScores: [],
        MyScore: {},
        AllScores: [],
        AllFriendsScores: [],

    }

    getAllScores = () => {


        return firebase.firestore().collection('leaderboard').get().then((snapshot) => {
            const AllScores = snapshot.docs.map((doc, index) => {

                return (
                    {
                        key: doc.data().UserID,
                        name: doc.data().Name,
                        userID: doc.data().UserID,
                        score: doc.data().Score
                    }
                );
            });
            return AllScores;
        });
    }

    getMyScore = () => {
        return firebase.firestore().collection('leaderboard').doc(this.props.userID).get().then((doc) => {
            if (doc.exists) {
                return ({
                    key: doc.data().UserID,
                    name: doc.data().Name,
                    userID: doc.data().UserID,
                    score: doc.data().Score
                })
            } else {
                return null;
            }
        })
    }

    getAllFriends = (user) => {
        const allFriends = firebase.firestore().collection('allFriends').doc(user.uid).get().then((doc) => {
            return [...doc.data().Friends];
        })
        return allFriends
    }

    scoreSorter = (a, b) => {
        if (a.score == b.score) {
            return a.name < b.name;
        } else {
            return a.score > b.score ? -1 : 1;
        }
    }

    async componentDidMount() {

        const user = firebase.auth().currentUser;
        console.log(user.uid);
        const MyFriends = await this.getAllFriends(user);

        const AllScores = await this.getAllScores();

        console.log("LEADER BOARD")

        console.log(MyFriends)
        console.log(AllScores)

        const AllFriendsScores = AllScores.filter((item) => {
            return MyFriends.includes(item.userID)
        });
        console.log(AllFriendsScores)

        const MyScore = await this.getMyScore();

        AllFriendsScores.sort(this.scoreSorter);

        this.setState({
            AllScores: [...AllScores],
            AllFriendsScores: [...AllFriendsScores],
            MyScore: { ...MyScore },
            MyFriends: [...MyFriends]

        })

    }

    render() {


        const topTenScores = this.state.AllFriendsScores.slice(0, 10);

        const LeaderBoardDisplay = (
            <FlatList
                data={topTenScores}
                renderItem={({ item, index }) => {
                    console.log(item, index)
                    if (item.userID === this.state.MyScore.userID) {
                        return (
                            <UserScore index={index + 1} name={item.name} score={item.score} me={true} />
                        )
                    } else {
                        return (
                            <UserScore index={index + 1} name={item.name} score={item.score} me={false} />
                        )
                    }

                }

                }>
            </FlatList>
        );

        return (
            <View style={styles.container}>
                {LeaderBoardDisplay}
            </View>
        );

    }
}

export default LeaderBoardScreen;


const styles = StyleSheet.create({
    container: {

        backgroundColor: '#01579B',
        width: "100%",
        height: "100%",
        textAlign: "center"


    },


});